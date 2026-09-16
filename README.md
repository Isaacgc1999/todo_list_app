# 📝 My Todo List

A to-do app for the browser, rebuilt around its own design system: Apple's layered surfaces, Trade Republic's black-and-white restraint, and Revolut's big, readable numbers. 🚀

# 📚 Project Description

This application allows users to create, complete, and delete tasks, with notes and creation dates saved per task. Every colour, spacing value and animation comes from a shared token system, so the whole app switches between Light, Dark and System appearance instantly, with no unstyled corners.

# ⚙️ Key Features

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

# 🚀 Technologies Used

Frontend: Angular 19 (Standalone Components, Signals)

Styling: SCSS design tokens / Angular Material 3 (theme-type: color-scheme)

Additional Libraries:

- rxjs for reactive state management.

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


# 📸 Screenshots

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

# 🚀 Installation and Setup

### 1. Clone the repository
   
- git clone https://github.com/Isaacgc1999/todo_list_app.git

- cd todo_list_app

### 2. Install dependencies
   
- npm install

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

# 📈 Future Enhancements (Roadmap)

🔧 User authentication to save personalized tasks.

🔍 Optional filters to display pending, completed, or all tasks. 

📅 Due dates and reminders (the design already reserves a warning colour for this).

📋 Multiple lists, with the sidebar becoming real navigation.

# 🤝 Contributions

Contributions are welcome!

To contribute:

- Fork the repository.

- Create a new branch: git checkout -b feature/new-feature.

- Make your changes and commit: git commit -m "Description of the new feature".

- Push your changes: git push origin feature/new-feature.

- Create a Pull Request. <br>

# 📄 License

This project is licensed under the Creative Commons License. 


# 👨‍💻 Contact

Developer: Isaac García

📧 Email: isaactraba@gmail.com
