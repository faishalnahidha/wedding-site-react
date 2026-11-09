# Project structure

Meteor + React wedding invitation site (`wedding-site-react` 1.2.1). Guests open a personalized page; an admin CMS manages recipients and RSVPs.

Client entry is `client/main.jsx`. Server entry is `server/main.js`. Both are set in `package.json` under `meteor.mainModule`.

## Routes

| Path | Component | Purpose |
| --- | --- | --- |
| `/` | `LandingPage` | Invitation with a generic guest name |
| `/:id` | `LandingPage` | Invitation for one recipient (`id` is the Mongo `_id`, lowercased) |
| `/ims` | `CMS` | Invitation management: login, add/remove guests, copy invite links |

`App.jsx` wraps those routes in MUI `ThemeProvider` (`imports/ui/theme.js`). Unknown recipient ids render `ErrorPage`.

## Tree

```
wedding-site-react/
├── client/
│   ├── main.html          # document shell, meta tags, #react-target
│   ├── main.jsx           # Meteor.startup → React render + BrowserRouter
│   └── main.css
├── server/
│   └── main.js            # accounts seed, recipients seed, loads API
├── imports/
│   ├── api/
│   │   ├── recipientsMethods.js
│   │   └── recipientsPublications.js
│   ├── db/
│   │   └── RecipientsCollection.js
│   ├── lib/
│   │   ├── variables.js   # couple, events, gallery, gifts, WhatsApp text
│   │   └── mapRsvp.js     # Yes/No/Maybe → Indonesian labels
│   └── ui/
│       ├── App.jsx
│       ├── theme.js
│       ├── containers/    # older withTracker wrappers; App does not import them
│       ├── pages/
│       └── components/
├── public/
│   └── img/               # favicon, gallery, brand and payment logos
├── tests/
│   └── main.js
├── package.json
├── .eslintrc.json
└── .prettierrc
```

## Data

`RecipientsCollection` is the Mongo collection `recipients`. A document is `{ _id, name, createdAt, rsvp?, message? }`. `_id` is the invite slug.

**Publications** (`imports/api/recipientsPublications.js`)

- `recipients` — full collection (CMS)
- `recipients.one` — one guest by id (landing page; hides `createdAt`)
- `recipients.latestMessages` — up to 8 guests who left a message

**Methods** (`imports/api/recipientsMethods.js`)

- `recipients.insert` / `recipients.remove` — logged-in users only
- `recipients.updateRsvp` — guest RSVP and message (no login check)

`server/main.js` creates a seed account (`user` / `password`) if missing, and inserts one sample recipient when the collection is empty.

## UI

Pages subscribe with `useTracker` from `meteor/react-meteor-data`. `LandingPage` and `CMS` own that logic. `imports/ui/containers/` still has the older `withTracker` versions (`LandingPageContainer`, `CMSContainer`) and is not mounted by `App`.

**Landing page sections** (`imports/ui/pages/landing-page-section/`), top to bottom:

| File | Role |
| --- | --- |
| `IntroSection.jsx` | Cover, guest name, scroll actions |
| `ContentSection.jsx` | Couple and event copy |
| `LocationSection.jsx` | Akad and reception locations |
| `GallerySection.jsx` | Photo grid |
| `MessageSlideSection.jsx` | Recent guest messages |
| `CovidSection.jsx` | Health guidelines |
| `InputFormSection.jsx` | RSVP form |
| `WeddingGiftSection.jsx` | Gift account details |

Shared pieces live in `imports/ui/components/`: footer, back-to-top, lightbox, invitation dialogs, recipient message dialogs, SVG icons, and a Lottie file.

Copy that changes per wedding (names, dates, maps, gallery paths, bank accounts, domain, WhatsApp text) is in `imports/lib/variables.js`. Static images those paths point at are under `public/img/`.

**CMS** (`imports/ui/pages/CMS.jsx`) shows `Login` until `Meteor.user()` exists, then a recipient table (desktop) or list (mobile), plus `AddInvitationDialog`, `DesktopRecipientMessageDialog`, and `MobileRecipientDetailDialog`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | `meteor run` |
| `npm test` | lint, then Mocha once |
| `npm run test-app` | full-app Mocha watch |
| `npm run lint` | ESLint |
| `npm run visualize` | production bundle visualizer |
