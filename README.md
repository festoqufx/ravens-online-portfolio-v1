# Ravenom’s Project Portfolio

A static portfolio grid for Ferdinand Estoque’s web projects. Cards can be filtered by framework, searched by title or tag, sorted, and viewed in light or dark theme.

Adapted from [MKAbuMattar’s Portfolio Filter](https://codepen.io/MKAbuMattar/pen/VwwKrdx) on CodePen.

## Features

- **Framework filters** — All, React, Vue, and Angular
- **Search** — matches project titles, descriptions, tags, and framework names
- **Sort** — default order, name A–Z, name Z–A, or by framework
- **Project count** — shows how many items match the current filters
- **Light / dark theme** — toggle in the toolbar; preference is saved in `localStorage` and falls back to the system color scheme
- **Project cards** — screenshot, short description on hover, tags, GitHub, and live demo links

Clicking a tag on a card fills the search field with that tag.

## Run locally

This is a static site. No build step is required.

1. Open `index.html` in a browser, or serve the folder:

   ```bash
   npx serve .
   ```

2. Keep the `img/` directory next to `index.html` so project screenshots load.

## Project structure

```
dist/
├── index.html      # Markup, project cards, and toolbar
├── style.css       # Layout, card styles, and theme variables
├── script.js       # Isotope filter, search, sort, count, and theme
├── img/            # Project screenshots
└── README.md
```

## Tech

- HTML, CSS, JavaScript
- [Bootstrap 4](https://getbootstrap.com/docs/4.1/)
- [jQuery](https://jquery.com/) and [Isotope](https://isotope.metafizzy.co/)
- [Font Awesome](https://fontawesome.com/)

## License

MIT. Original CodePen layout © Mohammad Abu Mattar.
