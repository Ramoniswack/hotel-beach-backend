# Database Export

This folder contains the exported MongoDB database collections in JSON format.

## Export Date
Check `metadata.json` for export details.

## Collections Exported

1. **users.json** - User accounts (admin, staff, guests)
2. **rooms.json** - Hotel room data
3. **bookings.json** - Booking records
4. **themes.json** - CMS page content (home, about, explore, etc.)
5. **blogposts.json** - Blog posts
6. **contactsettings.json** - Contact page settings
7. **expenses.json** - Expense tracking records
8. **metadata.json** - Export metadata and statistics

## How to Import

To restore this database backup, you can use the import script:

```bash
npm run import:db
```

Or manually import each collection using MongoDB Compass or mongoimport.

## Security Note

⚠️ **IMPORTANT**: This dump contains sensitive data including:
- User passwords (hashed)
- Email addresses
- Booking information
- API keys in settings

**DO NOT** commit this folder to public repositories!

## Export Command

To create a new export:

```bash
npm run export:db
```

This will overwrite the existing dump files.
