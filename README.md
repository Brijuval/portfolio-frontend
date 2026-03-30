# Portfolio Components — Quick Reference
> Every file you need to edit and exactly what to change

---

## 📁 Folder Structure

```
portfolio-components/
│
├── README.md                    ← you are here
│
├── css/                         ← one CSS file per section
│   ├── globals.css              → colors, fonts, shared base styles
│   ├── navbar.css               → navigation bar
│   ├── hero.css                 → hero / landing section
│   ├── about.css                → about me section
│   ├── projects.css             → project cards
│   ├── skills.css               → skill bars + certifications
│   ├── design.css               → creative work gallery
│   ├── blog.css                 → blog posts
│   └── contact.css              → contact form + footer
│
├── sections/                    ← one HTML file per section
│   ├── navbar.html              → top navigation bar
│   ├── hero.html                → name, title, CTA buttons
│   ├── about.html               → terminal card + bio text
│   ├── projects.html            → project cards
│   ├── skills.html              → skill bars + cert cards
│   ├── design.html              → gallery + lightbox
│   ├── blog.html                → blog post cards
│   └── contact.html             → contact form
│
└── js/
    └── main.js                  → ALL JavaScript (cursor, typing, form, filter, lightbox)
```
---

## ✏️  What to edit for common updates

### Change site colors
→ Open `css/globals.css` → edit the `:root { }` block at the top
```css
--green:  #00ff88;   /* primary accent */
--cyan:   #00d4ff;   /* secondary accent */
--amber:  #ffb700;   /* certifications */
```

### Update your name/title
→ Open `sections/hero.html`
- Line with `Valmeeki` → change name
- Line with `hero-tag` → change the pill subtitle
- Line with `hero-desc` → change bio paragraph

### Add a new project
→ Open `sections/projects.html`
- Find the `<!-- ADD NEW PROJECT HERE -->` comment at the bottom
- Uncomment the template block and fill in your details

### Add a new skill
→ Open `sections/skills.html`
- Find `<!-- ADD NEW SKILL HERE -->` inside the right category
- Copy a `.skill-item` block, update name and bar width %

### Add a new certification
→ Open `sections/skills.html`
- Find `<!-- ADD NEW CERT HERE -->` at the bottom of `.cert-list`
- Copy a `.cert-item` block, update icon, name, issuer

### Add a design work image
→ Open `sections/design.html`
1. Create a folder called `images/` next to your `index.html`
2. Put your screenshot inside (e.g. `my-design.jpg`)
3. In the card, replace:
   ```html
   <div class="design-thumb-placeholder">...</div>
   ```
   with:
   ```html
   <img src="images/my-design.jpg" alt="My Design">
   ```
4. Update the card title, description and tools

### Add a new design card
→ Open `sections/design.html`
- Copy any `.design-card` block
- Change `data-cat` to one of: `uiux` | `photo` | `poster` | `web`
- Change badge class to: `badge-uiux` | `badge-photo` | `badge-poster` | `badge-web`
- Change placeholder class to: `ph-uiux` | `ph-photo` | `ph-poster` | `ph-web`

### Add a new blog post
→ Open `sections/blog.html`
- Find `<!-- ADD NEW POST HERE -->` comment
- Uncomment the template block and fill in your details
- Change badge from `COMING SOON` to `LIVE` once published

### Update contact info (email, phone, LinkedIn)
→ Open `sections/contact.html`
- Find the left column links and update each `href` and display text

### Connect the contact form to Django
→ Open `js/main.js`
- Find the `handleSubmit()` function
- Uncomment **Option A** (the `fetch()` block)
- Comment out / delete **Option B** (the fallback block)
- Change the URL from `http://127.0.0.1:8000/api/contact/`
  to your deployed Railway/Render URL when you go live

### Change typing roles in hero
→ Open `js/main.js`
- Find the `roles` array near the top:
```js
const roles = [
  'Software Developer',
  'Cloud Engineer',
  ...
];
```
- Add, remove, or edit any role string

---

## 🔁 How to use these files with your index.html

These component files are your **editing reference** — you edit here,
then copy the updated HTML/CSS/JS into the main `index.html`.

**Workflow for updating a section:**
1. Open the component file (e.g. `sections/projects.html`)
2. Make your change (add a project, update a link, etc.)
3. Copy the entire updated `<section>...</section>` block
4. Open your main `index.html`
5. Find the matching section and replace it
6. Save and refresh browser

**OR** — once you set up Django, you can use Django's
template system to `{% include 'sections/projects.html' %}`
and the files will be loaded automatically!

---

## 🚀 Future: Django Template Setup

When you start your Django backend, move these HTML files into:
```
portfolio_backend/
└── templates/
    └── portfolio/
        ├── base.html          ← wraps everything (head, nav, footer, scripts)
        ├── sections/
        │   ├── hero.html
        │   ├── about.html
        │   ├── projects.html
        │   └── ...
        └── index.html         ← just does {% include %} for each section
```

Your `index.html` in Django becomes:
```html
{% extends 'portfolio/base.html' %}
{% block content %}
  {% include 'portfolio/sections/hero.html' %}
  {% include 'portfolio/sections/about.html' %}
  {% include 'portfolio/sections/projects.html' %}
  {% include 'portfolio/sections/skills.html' %}
  {% include 'portfolio/sections/design.html' %}
  {% include 'portfolio/sections/blog.html' %}
  {% include 'portfolio/sections/contact.html' %}
{% endblock %}
```

Each section becomes a real standalone template file.
That is the professional way to structure a Django portfolio!
