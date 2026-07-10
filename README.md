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
- GitHub Pages publishing workflow

## Important live-order note

This first version is a static GitHub Pages site. It stores orders in the browser using local storage, which is useful for a demo or in-store prototype, but it is not enough for real customer ordering across different devices.

Before using it for live public ordering, connect a secure backend such as Firebase, Supabase, Google Sheets with an API, Square, Toast, or a custom server. A real backend is also needed for truly private staff passwords.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload these files to the repository.
3. Go to Settings, then Pages.
4. Set the source to GitHub Actions.
5. Push to the `main` branch. The included workflow will publish the site.

## Update store details

Before going live, replace the placeholder address, phone number, hours, products, menu items, and prices with the real Indian Bazaar and Desi Bites information.
