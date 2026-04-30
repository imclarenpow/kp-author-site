# Keryn Powell Author Website

> Repo for Metamorph / Keryn Powell Author Website

**[Site Preview](https://html-preview.github.io/?url=https://github.com/imclarenpow/kp-author-site/blob/main/index.html)**

---

## Environment Variables

The app expects the following Vite environment variables to be defined (locally in a `.env` file, and in production on Cloudflare Pages):

| Variable | Description |
|---|---|
| `VITE_SANITY_PROJECT_ID` | Your Sanity project ID |
| `VITE_SANITY_DATASET` | Your Sanity dataset name |
| `VITE_SANITY_API_VERSION` | Sanity API version (e.g. `2023-10-01`) |

For local development, create a `.env` file in the project root with the following contents, replacing the placeholder values with your own:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=your_dataset
VITE_SANITY_API_VERSION=2023-10-01
```

## Deployment

When deploying to Cloudflare Pages, configure the same environment variables (`VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION`) in the project settings.

---

## Development Log

### Day 1 — Scoping, Design & Decision Making

**Decision Making and Scoping**

- Decided on static site hosted on Github Pages making use of 3rd party services such as mailchimp and go daddy for routing and email subscription handling
- Main reason for this is to keep costs as low as possible. Due to the scope of the website anything else would probably be a bit overkill.
- "Backend" is more likely just going to be a script calling json files from a repository.
- This will keep the project very cost effective.

> **Note:** Possible issues with browser caching — will need to figure out a way to make this still work (version number files?).

**Design**

- Spoke to Mum, will use simple web design for easy navigation.
- Will use good contrasting colour palette
- All book covers should be 100px wide

**Familiarisation**

- Added some files to test how GitHub pages works. Many thanks to Stack Overflow for providing this info.

**Progress Made**

- Created boilerplate elements such as the navbar in html.
- Resized image assets that will be used.
- Spoken to Mum about what information we need and created a mock design for the homepage.
- Set up a mailchimp account to manage newsletter.
- Created a colour palette
- Social media links to page.
- Added necessary files that will be added to in time such as the stylesheet and robots file.
- Script to populate book section on site based on what has been added to the json.
- CSS for page header
- CSS for footer (not that important)
- 1 book's info added to json — need more further down the line.
- All images have been added and resized so far.

---

### 27th December 2024 — Day 2

Further development.

**Progress Made**

- Added CSS to books on front page.
- Added CSS to newsletter signup
- Added show more / less link and some CSS around it.
- Added to about page
- Today was to make the pages fit properly on different screens mainly

---

### 29th December 2024 — Day 3

Further development.

**Progress Made**

- Changed header h1 from `justify-self` to `text-align` to fix issue where header displayed on left on mobile.
- Added list of articles to about of website
- Added CSS to list

---

### 30th December 2024 — Day 4

Further development.

**Progress Made**

- Added search bar for page
- Added links to books

---

### 31st December 2024 — Day 5

Further development.

**Progress Made**

- Added grid CSS for books
- Changed around how the search bar appears
- Cleaned up CSS somewhat
- still cracking

---

### 7th March 2026 — React Migration & Tidy-up

**Progress Made**

- Refactored the React app into a reusable structure using layouts, pages, and shared components.
- Added route-based navigation (`/`, `/about`, `/news`) and a not-found page.
- Moved site metadata/navigation/social links into a shared config file.
- Switched social icons to proper React Font Awesome imports for Facebook and Instagram.
- Fixed Vite asset resolution for the header logo using the public asset path.
- Ported the About page content and styles from the static version.
- Ported the News page newsletter form and styles from the static version.
- Built the Home page using `public/assets/docs/books.json` as the data source.
- Added reusable books components (`BookGrid`, `BookCard`) and tiled layout matching the static site.
- Updated Home page UI by removing the top books label and search bar.
- Removed the Show More/Show Less behavior; book cards now show a truncated blurb preview, with the full blurb available in the book details modal.
- Added subtle border-radius styling to book cards/images.
- Removed unused code (`BookSearchBar` component) and validated with lint/build.

---

### 11th March 2026 — Shared Components, Content Source Abstraction & Modal/News Improvements

**Progress Made**

- Added reusable shared UI primitives: `Card` and `Modal` components with dedicated styles in `src/components/common/`.
- Refactored the books flow to use shared primitives (`BookCard`, `BookDetailsModal`) and centralized modal behavior.
- Added shared hooks for reusable data/UI logic: `useCardModalController`, `useSourceCollection`, and `useUniformCardHeight`.
- Refactored `useBookModalController` and `useBooksData` to use shared controller/data-loading patterns.
- Added content source abstraction via `src/config/contentSources.js` and `src/utils/contentSourceClient.js` to support multiple data backends.
- Added `useNewsPosts` and wired the News page to Sanity-backed post loading.
- Added `NewsPostModal` (with styling) and updated `NewsPage` to render interactive news cards with modal open/close behavior.
- Updated card-to-modal trigger behavior so opening animations are driven from full card activation, not only title clicks.
- Tuned modal open animation math to keep the popup transition visibly clear when card and modal sizes are similar.
- Added support for local environment variables to configure Sanity project/dataset/API version.
- Documented required Vite env vars in this README so contributors can create a local `.env` file.