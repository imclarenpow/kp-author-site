# Repo for Metamorph / Keryn Powell Author Website

[Site Preview](https://html-preview.github.io/?url=https://github.com/imclarenpow/kp-author-site/blob/main/index.html)

## Development Log

### Things to do further along:

- Change the nav references once domain is set up.
- Add robots.txt information
- Add sorting to the books
- Need to add links to purchase books

### 26th December 2024: Day 1 - Scoping, Design & Decision Making

#### Decision Making and Scoping

- Decided on static site hosted on Github Pages making use of 3rd party services such as mailchimp and go daddy for routing and email subscription handling
- Main reason for this is to keep costs as low as possible. Due to the scope of the website anything else would probably be a bit overkill.
- "Backend" is more likely just going to be a script calling json files from a repository.
- This will keep the project very cost effective.

* Noted possible issues - browser caching - will need to figure out a way to make this still work (version number files?).

#### Design

- Spoke to Mum, will use simple web design for easy navigation.
- Will use good contrasting colour palette
- All book covers should be 100px wide

#### Familiarisation

- Added some files to test how GitHub pages works. Many thanks to Stack Overflow for providing this info.

#### Progress Made

- Created boilerplate elements such as the navbar in html.
- Resized image assets that will be used.
- Spoken to Mum about what information we need and created a mock design for the homepage.
- Set up a mailchimp account to manage newsletter.
- created a colour palette
- Social Media Links to page.
- Added necessary files that will be added to in time such as the stylesheet and robots file.
- Script to populate book section on site based on what has been added to the json.
- css for page header
- css for footer (not that important)
- 1 book's info added to json - need more further down the line.
- all images have been added and resized so far.

### 27th December 2024: Day 2

Further development.

#### Progress Made

- Added css to books on front page.
- Added css to newsletter signup
- Added show more / less link and some css around it.
- Added to about page
- Today was to make the pages fit properly on different screens mainly

### 29th December 2024: Day 3

Further development.

#### Progress Made

- Changed header h1 from justify-self to text-align to fix issue where header displayed on left on mobile.
- Added list of articles to about of website
- Added css to list

### 30th December 2024: Day 4

Further Development.

#### Progress Made

- Added Search Bar for Page
- Added links to books

### 31st December 2024: Day 5

Further Development

#### Progress Made

- Added Grid css for books
- Changed around how the search bar appears
- Cleaned up CSS somewhat
- still cracking

### 7th March 2026

React app migration and tidy-up.

#### Progress Made

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
