# John Henric M. Mendoza | Portfolio Website

Personal portfolio built with HTML, CSS and JavaScript. Live site: https://hein1844967.github.io/

## Features
- Responsive layout for phones, tablets and desktops
- Dark / light mode (saved in the browser)
- Project search and filters, with a detail page for each project
- Downloadable CV and a contact form (Web3Forms)
- SEO: meta tags, Open Graph preview, sitemap.xml, robots.txt

## Folder structure
```
index.html          page structure
css/style.css       all styling (colors are CSS variables)
js/data.js          all content: bio, skills, projects, links
js/main.js          page logic
assets/images/      profile.jpg, og-image.jpg, projects/ screenshots
assets/cv/          CV in PDF format
robots.txt, sitemap.xml, .nojekyll
```

## How to update
- Change text, skills, projects or links in `js/data.js`.
- Replace `assets/images/profile.jpg` to change the profile photo.
- Replace the PDF in `assets/cv/` (keep the same name) to update the CV.
- Contact form: paste your Web3Forms access key in `formKey` in `js/data.js`.

## Technologies
HTML, CSS, JavaScript, GitHub Pages
