import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/User';

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    userId: string; // Add userId alias for compatibility
    email: string;
    role: UserRole;
    name?: string;
  };
}

// Verify JWT token
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No authentication token provided',
      });
      return;
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, jwtSecret) as {
      id: string;
      email: string;
      role: UserRole;
    };

    // Check if user exists and is active
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'User not found or inactive',
      });
      return;
    }

    // Attach user to request
    (req as AuthRequest).user = {
      id: decoded.id,
      userId: decoded.id, // Add userId alias
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Check if user has required role
export const checkRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    if (!allowedRoles.includes(authReq.user.role)) {
      res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
        userRole: authReq.user.role,
      });
      return;
    }

    next();
  };
};

// Middleware shortcuts for common role checks
export const isGuest = checkRole(UserRole.GUEST, UserRole.STAFF, UserRole.ADMIN);
export const isStaff = checkRole(UserRole.STAFF, UserRole.ADMIN);
export const isAdmin = checkRole(UserRole.ADMIN);

// Alias for checkRole to match common naming convention
export const authorize = (roles: UserRole[]) => checkRole(...roles);

// Optional authentication - doesn't fail if no token provided
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(token, jwtSecret) as {
        id: string;
        email: string;
        role: UserRole;
        name?: string;
      };

      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        (req as AuthRequest).user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          name: user.name
        } as any;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
