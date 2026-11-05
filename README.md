# Arc-en-ciel

**Show up for your community.** Arc-en-ciel is a community service platform where people discover, create and join local social events, from winter clothes drives to neighbourhood cleanups and tree plantations.

## Live Site

**https://arc-en-ciel-swart.vercel.app**

## Repositories

| Part | Repository |
|---|---|
| Client (this repo) | https://github.com/fahim0057/Arc-en-ciel |
| Server (Express API) | https://github.com/fahim0057/Arc-en-ciel-server- |

## Key Features

- **Browse upcoming events.** A public events page lists every event that is still ahead of us, soonest first. Events whose dates have passed are hidden automatically.
- **Search and filter.** Find events by title or location and narrow them by type (Cleanup, Plantation, Donation and more). The filters live in the URL, so a filtered view can be shared or bookmarked.
- **Create events with smart validation.** Logged-in users can post an event with a title, description, type, thumbnail URL, location and date. Past dates are blocked in the date picker, the form and the server, and the form shows a live image preview.
- **One-click Join Event.** Event details are public, but joining requires a login. Logged-out visitors are sent to Login and returned to the same event afterwards, and nobody can join the same event twice.
- **Secure authentication.** Email and password sign-up with password rules (uppercase, lowercase, at least 6 characters) and Google sign-in, built with Better Auth. A live checklist shows which password rules are met.
- **Private pages that survive a reload.** Create Event, Manage Events, Joined Events and Profile are protected on the server, so a logged-in user is never bounced to Login on refresh.
- **Manage your own events.** Edit an event in a dialog or delete it after a confirmation. The API checks ownership on every change, so users can only modify their own events.
- **Joined events, sorted by date.** See everything you signed up for, split into upcoming and past events.
- **Profile update.** Change your display name and photo, with a live preview before saving.
- **Polished, responsive UI.** Light and dark themes, skeleton loaders while data loads, toast notifications instead of browser alerts, equal-height event cards, and layouts for mobile, tablet and desktop.

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Hero, features, 6 upcoming events, gallery, newsletter |
| `/events` | Public | All upcoming events with search and type filter |
| `/events/[id]` | Public | Event details and Join Event button |
| `/login`, `/register` | Public | Email/password and Google authentication |
| `/create-event` | Private | Create a new event |
| `/manage-events` | Private | Edit or delete your own events |
| `/joined-events` | Private | Events you joined, sorted by date |
| `/profile` | Private | Update your name and photo |

## Tech Stack

**Client:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod, Sonner, next-themes

**Authentication:** Better Auth (email/password, Google, JWT plugin)

**Server:** Node.js, Express 5, TypeScript, MongoDB (native driver), Zod, jose

**Hosting:** Vercel (client and server), MongoDB Atlas

## How It Works

The app is split into two repositories. The Next.js client handles the interface and authentication with Better Auth, which stores users and sessions in MongoDB. For protected actions, the client fetches a short-lived JWT and sends it to the Express API. The API verifies the token against the client's public keys and takes the user's identity from it, never from the request body.
