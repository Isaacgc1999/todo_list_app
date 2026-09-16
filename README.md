# 📝 My Todo List

A to-do app for the browser, rebuilt around its own design system: Apple's layered surfaces, Trade Republic's black-and-white restraint, and Revolut's big, readable numbers. 🚀

Angular 19 · Standalone components · Signals · Angular Material 3 · SCSS design tokens · 77 unit tests

This application allows users to create, complete, and delete tasks, with notes and creation dates saved per task. Every colour, spacing value and animation comes from a shared token system, so the whole app switches between Light, Dark and System appearance instantly, with no unstyled corners.

## ⚽ Playground (run without installing anything)

https://stackblitz.com/~/github.com/Isaacgc1999/todo_list_app

## What makes it interesting

✅ Add tasks from a composer pinned to the bottom of the screen — press **N** to jump to it from anywhere.

🔄 Toggle task status with a circular check that fills in and springs, then folds the task into a collapsible Completed section.

↩️ Undo completing or deleting a task from a toast, no confirmation dialogs needed.

📝 Task details open as a side panel on desktop and a bottom sheet on mobile, with an editable name and notes.

🗑️ Delete tasks from the details view or directly from the list.

💾 Local storage persistence, so tasks and your appearance choice survive a reload.

🌗 **Light / Dark / System** appearance control, defaulting to your OS setting.

📱 Fully responsive: a sidebar layout from 900px up, a single column below.

♿ Built to be usable by everyone: real `checkbox`, `radiogroup`, `progressbar` and `list` roles, visible focus rings, full keyboard support, and animations that respect reduced-motion settings.

# 🎨 Design System

The interface is driven by a token system in `src/styles/_tokens.scss`, using the CSS `light-dark()` function so every colour is declared once for both themes:

- **Surfaces:** a cool grey ground (`--bg`) with white/near-black cards (`--surface`) layered on top — depth from layering, not shadows.
- **One accent:** a single cobalt blue (`--accent`) used only to mark state — checked, selected, focused. Everything else stays black, white and grey.
- **Big numbers:** task progress shown as a large tabular figure ("2/7"), like a balance in a banking app.
- **Type:** the system font (SF Pro on Apple devices), with [Geist](https://fonts.google.com/specimen/Geist) as the web fallback.
- **Angular Material is themed, not fought:** Material reads the same tokens through `mat.theme()`, so the app has zero `!important` overrides.

## Screenshots

Frontend: Angular 19 (Standalone Components, Signals)

Styling: SCSS design tokens / Angular Material 3 (theme-type: color-scheme)

![Task details open as a side panel](docs/screenshots/desktop-details.png)

On a phone the same screens become a single column, and the details arrive as a bottom sheet:

- Angular CDK for responsive breakpoints. <br>

Testing: 77 unit tests (Karma / Jasmine)

# 📂 Project Structure
src/
├── app/
│   ├── animations/       # Row enter/leave animation
│   ├── components/
│   │   ├── todo-home/               # Layout, sidebar, sections, undo toasts
│   │   ├── todo-list/               # Grouped task list
│   │   ├── todo-item/               # Task row with its circular check
│   │   ├── todo-summary/            # Progress card
│   │   ├── todo-task-item-dialog/   # Task details (panel or bottom sheet)
│   │   ├── todo-footer-input/       # Composer wrapper
│   │   └── utils/                   # Composer, appearance control
│   ├── constants/        # Storage keys, date formats, timings, dialog configs
│   ├── models/           # Task, appearance and details types
│   └── services/         # Appearance service, task details service
└── styles/
└── _tokens.scss      # The design tokens (colors, spacing, radius, motion)


The first version worked, but it was three greys stacked on top of each other, with the same drop shadow on every surface.

### Light & Dark

| Light | Dark |
| --- | --- |
| ![Desktop in light mode](docs/screenshots/desktop-light.png) | ![Desktop in dark mode](docs/screenshots/desktop-dark.png) |

### Task details

Details open beside the list on desktop, and as a bottom sheet on mobile:

![Task details as a side panel](docs/screenshots/desktop-details.png)

<p>
  <img src="docs/screenshots/mobile-light.png" alt="Phone in light mode" width="24%">
  <img src="docs/screenshots/mobile-dark.png" alt="Phone in dark mode" width="24%">
  <img src="docs/screenshots/mobile-details.png" alt="Task details as a bottom sheet" width="24%">
  <img src="docs/screenshots/mobile-undo.png" alt="Undo toast after completing a task" width="24%">
</p>

*Tasks shown are example data, not real user data.*

<details>
<summary>🕰️ See the original design</summary>

![The original light theme](https://github.com/user-attachments/assets/3d3c2bb8-8042-493e-a646-011b4f295a90)

![The original dark theme](https://github.com/user-attachments/assets/cc402add-c260-45d8-bf05-b75b96545963)

</details>

![The original dark theme](https://github.com/user-attachments/assets/cc402add-c260-45d8-bf05-b75b96545963)

### 1. Clone the repository
   
- git clone https://github.com/Isaacgc1999/todo_list_app.git

- cd todo_list_app

| Before | After |
| --- | --- |
| 24 colour variables, 12 of them unused, some renamed per theme | ~40 role-named tokens, each defined once for both themes |
| 9 `!important` rules overriding Material's internals | 0, replaced by `mat.theme()` and token overrides |
| 5 font families loaded, 2 actually used | 1 family: the system font, with Geist as a fallback |
| Fixed 15% / 85% split at every screen size | Sidebar at 900px and up, single column below |
| A theme toggle that picked the wrong mode when you clicked the icon | Light / Dark / System, with the system as the default |
| No undo, and a details dialog that never saved | Undo on completing and deleting, and details that save |
| 716 kB initial bundle | 588 kB |

### 3. Run the application
   
- npm start (or `ng serve --open`)

### 4. Run the tests

- npm test

# ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| N | Focus the composer from anywhere |
| Enter | Add the task |
| Esc | Leave the composer, or close the details |
| Tab | Move through rows; every control shows a focus ring |
| ← → | Move between Light, Dark and System |

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#f2f2f7` | `#000000` | The ground behind the grouped lists |
| `--surface` | `#ffffff` | `#1c1c1e` | Rows, cards, the composer, sheets |
| `--label` / `--label-2` | `#0b0b0f` / `#6c6c74` | `#f5f5f7` / `#a1a1a8` | Task names, then dates and counts |
| `--accent` | `#2b5cf5` | `#6e8eff` | Only ever state: checked, selected, focused |
| `--ink` | `#0b0b0f` | `#f5f5f7` | The main action on a screen, and toasts |
| `--success` / `--danger` | `#1f9d55` / `#e0383e` | `#3dd37a` / `#ff6961` | All done, and destructive actions |

Type is the system font, so SF Pro on a Mac or an iPhone, with [Geist](https://fonts.google.com/specimen/Geist) as the fallback everywhere else. Numbers use tabular figures so they don't jitter as they change.

## Keyboard

📅 Due dates and reminders (the design already reserves a warning colour for this).

📋 Multiple lists, with the sidebar becoming real navigation.

## How it is put together

```
src/
├── app/
│   ├── animations/     Row enter and leave animation
│   ├── components/
│   │   ├── todo-home/              Layout, sidebar, sections, undo toasts
│   │   ├── todo-list/              Grouped list
│   │   ├── todo-item/              Task row with its circular check
│   │   ├── todo-summary/           Progress card
│   │   ├── todo-task-item-dialog/  Task details, as a panel or a sheet
│   │   ├── todo-footer-input/      Composer wrapper
│   │   └── utils/                  Composer, appearance control
│   ├── constants/      Storage keys, date formats, timings, dialog configs
│   ├── models/         Task, appearance and details types
│   └── services/       Appearance, and opening the task details
└── styles/
    └── _tokens.scss    The design tokens
```

Two rules keep this tidy: types live in `models/` and constants in `constants/`, so components only ever reference them; and no component hard-codes a colour, a spacing value or a duration.

Tasks are kept in `localStorage`, so there is no backend to run.

## Running it

```bash
git clone https://github.com/Isaacgc1999/todo_list_app.git
cd todo_list_app
npm install
npm start
```

Then open http://localhost:4200.

```bash
npm test          # 77 unit tests in Karma and Jasmine
npm run build     # production build
```

## What could come next

- Due dates and reminders. The warning colour is already reserved in the tokens.
- Several lists, with the sidebar becoming real navigation.
- A backend, so tasks follow you between devices.

## Licence

Released under [CC0 1.0 Universal](LICENSE): public domain, do what you like with it.

## Contact

Isaac García — [@Isaacgc1999](https://github.com/Isaacgc1999) — isaactraba@gmail.com
