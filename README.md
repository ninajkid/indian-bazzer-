# Indian Bazaar + Desi Bites Website

This is a GitHub Pages-ready website for Indian Bazaar and Desi Bites in Plymouth, Minnesota.

## Included

- Public storefront for groceries and restaurant items
- Product search, category filters, and cart
- Pickup checkout form
- Staff-only order page at `admin.html`
- Staff password setup on first admin visit
- Order status updates: New, Preparing, Ready, Completed, Cancelled
- Manual order entry for phone or counter orders
- CSV export for saved orders
- Google Apps Script order submission to a connected Google Sheet
- GitHub Pages publishing workflow

## Important live-order note

This first version is a static GitHub Pages site. Customer checkout sends orders to the configured Google Apps Script URL, and the site also stores a local browser backup for demos and staff testing.

The current Apps Script URL is used for order submissions but does not expose a readable order-list API for the staff page. The staff page still shows orders saved on the current device. Use the Google Sheet as the central live order record, or update the Apps Script later to support reading and updating orders from the admin page.

A real backend is still recommended for stronger staff login security, payment processing, and cross-device admin status updates.

## Google Sheet connection

Orders are sent to this Apps Script endpoint from `assets/app.js`:

`https://script.google.com/macros/s/AKfycbzbgrhU8O-IyvLVq_dFtHCib2iBx6b3ovlY1iwUyY9KZJTioMKwqpUxjhUBMem5fhE4Aw/exec`

The checkout posts these fields: `action`, `orderId`, `createdAt`, `status`, `source`, `customerName`, `customerPhone`, `pickup`, `pickupDisplay`, `notes`, `itemSummary`, `itemsJson`, and `total`.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload these files to the repository.
3. Go to Settings, then Pages.
4. Set the source to GitHub Actions.
5. Push to the `main` branch. The included workflow will publish the site.

## Update store details

Before going live, replace the placeholder address, phone number, hours, products, menu items, and prices with the real Indian Bazaar and Desi Bites information.
