# Portfolio Frontend

Single-page portfolio site for Valmeeki Singh. The frontend is a static portfolio page built from `index.html` plus supporting CSS, JavaScript, images, and a Django backend for the contact form.

## Repository Layout

- `index.html` - the full portfolio page, including all sections, styles, and scripts
- `css/` - shared styles and section-specific CSS files
- `js/main.js` - JavaScript for typing effects, filters, modals, lightbox, and form handling
- `sections/` - section-level HTML files used as editing references
- `images/` - profile assets, screenshots, certificates, and project images
- `backend/` - Django contact API used by the portfolio form

## Local Setup

### Frontend

Open `index.html` directly in a browser, or serve the folder with a local server for better asset handling.

Example with Python:

```powershell
python -m http.server 5500
```

Then open `http://127.0.0.1:5500`.

### Backend

If you want the contact form to send messages, use the Django backend in `backend/`.

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API defaults to `http://127.0.0.1:8000`.

## Key Sections in `index.html`

- Hero: name, role text, CTA buttons, resume link
- About: short bio, profile image, social links
- Projects: PMEC-X, TweetForge AI, dashboard, portfolio
- Skills: stack summary and certifications
- Achievements: competitions and certificates
- Design: UI/UX, Photoshop, and poster work
- Writing: PMEC-X paper and other articles
- Contact: form plus direct contact links

## Updating Content

### Add or edit a project

- Find the matching project card in the Projects section
- Update the title, description, tags, and links
- If needed, update the matching `projectDetails` entry in the script block near the bottom of `index.html`

### Add or edit a writing entry

- Find the card inside the Writing section
- Update the title, status badge, excerpt, and article modal data
- For conference papers, keep the card summary short and put full author/mentor details in the modal body

### Update images

- Replace files inside `images/` and keep the same filename, or update the `src` path in `index.html`
- Use compressed images where possible to keep the page fast

### Update the contact form

- Edit the fetch URL in the `handleSubmit()` function near the bottom of `index.html`
- Point it to your local backend in development and your deployed backend in production

## Common Files to Edit

- `index.html` - main content and interactive behavior
- `css/globals.css` - site-wide colors, typography, spacing
- `css/projects.css` - project card styling if you split styles out later
- `backend/portfolio_backend/settings.py` - CORS, CSRF, and email settings
- `backend/contact/views.py` - contact form API logic

## Deployment Notes

- Frontend can be deployed as a static site
- Backend must expose the `/api/contact/` route and allow your frontend domain through CORS and CSRF settings
- If the contact form stops working after deployment, check the backend environment variables first

## Notes

- This README matches the current repository layout.
- If you later split the page into reusable sections, you can reintroduce separate component documentation.
