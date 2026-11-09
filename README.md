# Tanatswa Magwenya — Personal Portfolio

A personal portfolio website for **Tanatswa Magwenya**, a third-year BSc Computer Science
student at **DMI St John the Baptist University, Mangochi, Malawi**.

The website presents my academic background, technical skills, projects and contact
details through a dark, modern interface built with HTML5, CSS3 and vanilla JavaScript.

---

## Live website

- **GitHub repository:** [github.com/TMagwenya/personal-portfolio](https://github.com/TMagwenya/personal-portfolio)
- **Published site:** [tmagwenya.github.io/personal-portfolio](https://tmagwenya.github.io/personal-portfolio/)

---

## Purpose

The portfolio acts as a digital professional identity. It allows potential employers,
internship providers and collaborators to:

- learn who I am and what I study;
- review my technical skills and educational background;
- explore real projects with links to their source code;
- see the animation and interaction techniques I can implement;
- contact me directly by email or GitHub.

---

## Pages

| Page | File | Contents |
| --- | --- | --- |
| Home | `index.html` | Hero introduction, profile photograph, programme, interests, call-to-action buttons, focus areas, selected work |
| About Me | `about.html` | Personal introduction, education table, technical skills, interests, career aspirations, contact details |
| Projects | `projects.html` | Three projects with descriptions, problems solved, technologies, images and GitHub links; project summary table |
| Animated Concepts | `animations.html` | Five animation demonstrations with short explanations |

All four pages share the same navigation menu, footer and external stylesheet.

---

## Technologies used

- **HTML5** — semantic structure (`header`, `nav`, `main`, `section`, `article`, `footer`), headings, paragraphs, lists, tables, images, links and text formatting.
- **CSS3** — custom properties, Flexbox, CSS Grid, gradients, borders, shadows, transitions, keyframe animations, hover effects and responsive media queries.
- **JavaScript (vanilla)** — mobile navigation, typing effect, IntersectionObserver scroll reveals, animated skill bars, project filtering, back-to-top button and dynamic footer year.
- **Google Fonts** — Outfit, Inter and JetBrains Mono.
- **SVG** — original background and project illustrations.
- **GitHub Pages** — hosting (see deployment steps below).

No frameworks, libraries or downloaded templates are used.

---

## Key features

### Home
- Full name and professional welcome message
- Profile photograph integrated into a rotating gradient ring
- Academic programme and professional interests
- Navigation menu and two call-to-action buttons
- Typing animation and floating information chips

### About Me
- Personal introduction using `strong`, `em`, `u`, `br` and `hr`
- Styled education table
- Seven technical skills presented as an unordered list
- Interests and hobbies cards
- Career aspirations as an ordered list
- Clickable email link (`mailto:`) and GitHub profile link

### Projects
- At least three projects per project: title, description, problem, technologies, representative image and repository link
- Project images are clickable links to their repositories
- Filter buttons to sort projects by technology
- Summary table and a GitHub profile call-to-action

### Animated Concepts
1. Animated typing text (JavaScript + CSS cursor)
2. Hover effects and transitions (lift, glow, reveal)
3. Animated background (drifting blobs, orbs and grid)
4. Animated skill indicators (progress bars triggered on scroll)
5. Scroll reveal (`IntersectionObserver`)

Animations respect `prefers-reduced-motion` and do not block reading or navigation.

---

## Folder structure

```
personal-portfolio/
├── index.html
├── about.html
├── projects.html
├── animations.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile.jpg
│   ├── favicon.svg
│   ├── background.svg
│   ├── project-chat.svg
│   ├── project-tourism.svg
│   └── project-wxpython.svg
└── README.md
```

File names are lowercase, meaningful and free of spaces.

---

## Run the website locally

No installation or build step is required.

1. Open the project folder in Visual Studio Code.
2. Open `index.html` in a browser, **or** use the Live Server extension.
3. Alternatively, start a local server from the project folder:

   ```bash
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

A local server is recommended so that relative paths behave exactly as they will on
GitHub Pages.

---

## Publish to GitHub Pages

1. Create a new public repository named `personal-portfolio` on GitHub.
2. Upload the contents of this folder (not the folder itself) to the repository root.
3. Make sure `index.html` is at the root of the repository.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the `/ (root)` folder, then save.
7. Wait for the site to publish and open the generated URL:
   `https://tmagwenya.github.io/personal-portfolio/`
8. Test every navigation link, project link, image and animation on the published site.

---

## Before submitting — checklist

- [x] All three repository links are public and return **200**:
      `TCP-IP-Chat-Application`, `tourism-recommendation-system` and `wxpython`.
- [x] Education table includes Glen View 2 Secondary School, Zimbabwe.
- [ ] Review the skills percentages on `animations.html` and adjust them to your own confidence.
- [ ] Confirm the interests/hobbies on `about.html` reflect you accurately.
- [x] README includes the final GitHub Pages URL and repository URL.
- [ ] Take screenshots of Home, About, Projects and Animated Concepts for submission.
- [ ] Test the site on a phone and a desktop browser.

---

## Accessibility and quality notes

- Every image has descriptive alternative text.
- The profile photograph and project images link to relevant destinations.
- Interactive controls are keyboard accessible and use visible focus styles.
- The mobile menu supports the Escape key and updates `aria-expanded`.
- Animation is reduced automatically for visitors who prefer reduced motion.
- Colour contrast and font sizes are chosen for readability.
- The layout is responsive at desktop, tablet and mobile widths.

---

## Author

**Tanatswa Magwenya**
BSc Computer Science, Year 3
DMI St John the Baptist University, Mangochi, Malawi

- Email: [tanatswamagwenya@gmail.com](mailto:tanatswamagwenya@gmail.com)
- GitHub: [github.com/TMagwenya](https://github.com/TMagwenya)
