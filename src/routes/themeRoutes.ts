import express from 'express';
import PageContent from '../models/Theme';
import { authenticate, isAdmin } from '../middleware/auth';

const router = express.Router();

// GET /api/content - Get all page content (public)
router.get('/', async (req, res) => {
  try {
    const pages = await PageContent.find().sort({ pageName: 1 });
    res.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching page content',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/content/:pageName - Get content for specific page (public)
router.get('/:pageName', async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageName: req.params.pageName });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page content not found',
      });
    }

    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching page content',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/content - Create or update page content (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { pageName } = req.body;
    
    let page = await PageContent.findOne({ pageName });
    
    if (page) {
      Object.assign(page, req.body);
      await page.save();
    } else {
      page = new PageContent(req.body);
      await page.save();
    }

    res.json({
      success: true,
      message: 'Page content saved successfully',
      data: page,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error saving page content',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/content/:pageName - Update page content (admin only)
router.put('/:pageName', authenticate, isAdmin, async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageName: req.params.pageName });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page content not found',
      });
    }

    // Remove _id and __v from the update data to avoid Mongoose errors
    const { _id, __v, ...updateData } = req.body;
    
    Object.assign(page, updateData);
    await page.save();

    res.json({
      success: true,
      message: 'Page content updated successfully',
      data: page,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating page content',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
