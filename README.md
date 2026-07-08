# VenderGo Frontend

VenderGo Frontend is the React app for the VenderGo e-commerce platform. It connects to the Express backend and gives each role a focused dashboard.

This project is written in normal JavaScript, not TypeScript, so students can focus on React concepts, routing, forms, state, context, API calls, and role-based UI.

## What Students Will Learn

- How Vite starts a React development server.
- How React Router maps URLs to pages.
- How layouts share navigation and page structure.
- How protected routes stop unauthenticated users.
- How role-based routes stop users from opening the wrong dashboard.
- How React Context shares auth and cart state.
- How forms collect input and submit API requests.
- How Axios sends requests to the backend.
- How Axios interceptors attach JWT tokens.
- How dashboard pages render data from API responses.
- How order tracking can be shown as a timeline.

## Tech Stack

- ReactJS
- Vite
- React Router
- Axios
- Bootstrap
- Plain JavaScript

## Prerequisites

Install these first:

- Node.js
- npm
- A running VenderGo backend

Check your tools:

```bash
node -v
npm -v
```

## Folder Structure

```text
vendergo-frontend/
  src/
    components/
    context/
    layouts/
    pages/
      public/
      customer/
      supplier/
      station/
      admin/
    services/
    utils/
    App.jsx
    main.jsx
  package.json
  .env.example
  README.md
```

Important folders:

- `src/components/`: reusable UI pieces such as navbar, item cards, badges, timelines, and route guards.
- `src/context/`: `AuthContext` and `CartContext`.
- `src/layouts/`: shared page frames for public pages and dashboards.
- `src/pages/`: route screens grouped by role.
- `src/services/`: API functions that use Axios.
- `src/utils/`: formatting helpers for dates and currency.
- `src/App.jsx`: all React Router route definitions.
- `src/main.jsx`: React entry point.

## Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

Default `.env.example` values:

```env
VITE_API_URL=http://localhost:5000/api
VITE_UPLOADS_URL=http://localhost:5000
```

These values must match the backend server.

Example: if the backend is running on port `5002`, use:

```env
VITE_API_URL=http://localhost:5002/api
VITE_UPLOADS_URL=http://localhost:5002
```

After changing `.env`, restart the Vite dev server.

## Install Dependencies

From this frontend folder:

```bash
npm install
```

## Run the Frontend

```bash
npm run dev
```

Vite usually starts the app at:

```text
http://localhost:5173
```

Open that URL in your browser.

## Backend Must Be Running

The frontend does not store data by itself. It calls the backend API.

Before logging in, make sure the backend works:

```text
http://localhost:5000
```

Expected backend response:

```json
{ "message": "VenderGo API is running" }
```

If your backend uses a different port, update frontend `.env`.

## Default Login Accounts

All seeded accounts use this password:

```text
password123
```

Accounts:

- Admin: `admin@vendergo.test`
- Customer: `customer@vendergo.test`
- Supplier: `supplier@vendergo.test`
- Pickup Station Officer: `station@vendergo.test`

## Pages and Routes

Public pages:

- `/`: home page
- `/about`: project overview
- `/items`: browse items with search and filters
- `/items/:id`: item details
- `/login`: login form
- `/register`: registration form

Customer pages:

- `/customer`: customer dashboard
- `/customer/cart`: cart items and quantities
- `/customer/checkout`: pickup station selection and order placement
- `/customer/orders`: order history
- `/customer/orders/:id`: order details
- `/customer/track/:id`: order tracking timeline

Supplier pages:

- `/supplier`: supplier dashboard
- `/supplier/profile`: supplier business profile
- `/supplier/items/new`: add item with optional image upload
- `/supplier/items`: manage own items
- `/supplier/items/:id/edit`: edit item details and stock
- `/supplier/orders`: accept, reject, pack, and send orders

Pickup station officer pages:

- `/station`: station dashboard
- `/station/orders`: orders assigned to that officer's pickup stations
- `/station/orders/:id`: station order details and tracking notes

Admin pages:

- `/admin`: system statistics
- `/admin/users`: view, activate, and deactivate users
- `/admin/items`: view all items
- `/admin/orders`: view all orders
- `/admin/pickup-stations`: create and view pickup stations
- `/admin/categories`: create and view categories

## How Routing Works

Routes are defined in `src/App.jsx`.

The app uses nested routes:

- `PublicLayout` wraps public pages.
- `DashboardLayout` wraps role dashboards.
- `ProtectedRoute` requires a logged-in user.
- `RoleBasedRoute` requires the correct role.

This means a visitor cannot open `/admin` unless they are logged in as an admin.

## AuthContext

`src/context/AuthContext.jsx` stores:

- current user
- login function
- register function
- logout function
- loading state
- authentication status

When a user logs in:

1. The login form calls `login`.
2. `AuthContext` calls the backend.
3. The JWT is saved in `localStorage`.
4. The user object is saved in React state.
5. The user is sent to their role dashboard.

Logout removes the token and user from `localStorage`.

## CartContext

`src/context/CartContext.jsx` stores:

- cart items
- cart total
- add item function
- update quantity function
- remove item function
- clear cart function

Only customers use the cart. If the logged-in user is not a customer, the cart is cleared in the frontend state.

## API Services

`src/services/api.js` creates the shared Axios client.

The Axios interceptor reads the JWT token from `localStorage` and attaches it to protected requests:

```http
Authorization: Bearer token_here
```

Service files group API calls by feature:

- `authService.js`: login, register, current user
- `itemService.js`: browse, create, edit, delete items
- `cartService.js`: cart actions
- `orderService.js`: customer, supplier, and station order actions
- `trackingService.js`: order tracking history
- `adminService.js`: admin dashboards and management

## Form Submit Pattern

Most forms follow this pattern:

1. Store input values in `useState`.
2. Stop the default browser submit with `event.preventDefault()`.
3. Call a service function.
4. Show success or error feedback.
5. Navigate or reload data after success.

This pattern is repeated so students can recognize and practice it.

## Order Tracking Timeline

`TrackingTimeline.jsx` receives tracking rows from the backend and displays them in order.

Each row shows:

- status
- location
- description
- update time
- user who made the update

The timeline data comes from the backend `order_tracking` table.

## Image Display

Item images are stored by the backend. The frontend combines:

```text
VITE_UPLOADS_URL + item.image
```

If no image exists, the item card uses a placeholder image.

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder. The folder is ignored by git because it is generated output.

Preview the production build:

```bash
npm run preview
```

## Common Problems

Login shows `ERR_CONNECTION`

The frontend cannot reach the backend. Start the backend and check that `VITE_API_URL` matches the backend port.

Login says invalid credentials

Use a seeded email and `password123`, or register a new account.

Dashboard redirects to home

You are logged in with the wrong role for that dashboard.

Images do not load

Check `VITE_UPLOADS_URL` and make sure the backend is serving `/uploads`.

Environment changes do not apply

Restart `npm run dev`. Vite reads `.env` when the dev server starts.

## Suggested Learning Path

1. Start with `src/main.jsx` to see how the app is mounted.
2. Open `src/App.jsx` to understand the route tree.
3. Read `src/context/AuthContext.jsx` to understand login state.
4. Read `src/services/api.js` to understand Axios and JWT headers.
5. Study `src/components/ProtectedRoute.jsx` and `RoleBasedRoute.jsx`.
6. Follow the login form in `pages/public/Login.jsx`.
7. Follow cart actions from `ItemCard.jsx` to `CartContext.jsx` to `cartService.js`.
8. Follow checkout from `Checkout.jsx` to the backend order endpoint.
9. Follow tracking from `TrackOrder.jsx` to `TrackingTimeline.jsx`.
