# 🧠 Reactive API Console via Chat Interface

A reactive, chat-driven API explorer built with **React**, **RxJS**, and **Redux** — designed to simulate an isolated, multi-API workspace with real-time filtering and a natural language input interface.

---

## 🚀 Features

- ✅ Choose from multiple public APIs (cat, chuck, GitHub and weather)
- 💬 Chat-style interface with RxJS input for commands (`get cat fact`, `get weather Berlin`)
- 📺 Isolated panels for each API response with dragging DND-Kit.
- 🔍 Global filtering with debounced RxJS logic
- 🧪 Unit and E2E testing using Vitest + Cypress

---

## 🧱 Project Structure

```
src/
├── components/       # Reusable UI components
├── hooks/            # Custom RxJS-based hook and Preload panels
├── pages/            # Layout wrapper (sidebar , panels and chat)
├── rxjs/             # Input parsing and filtering
├── store/            # Redux Toolkit setup
├── utils/            # Helpers (highlighting, randomId)
└── App.tsx
```

---

## 🛠️ Tech Stack

| Tech          | Description                          |
| ------------- | ------------------------------------ |
| React + Vite  | Frontend UI + lightning-fast dev     |
| Redux Toolkit | Centralized state (API, UI, chat)    |
| RxJS          | Reactive streams and event pipelines |
| TypeScript    | Static typing for robustness         |
| Vitest        | Unit & component testing             |
| Cypress       | End-to-end behavior testing          |

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/engislam95/APIChatBox.git
   cd APIChatBox
   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Run the development server**

   ```bash
   npm run dev

   ```

4. **Run tests**

   - **Unit/Component Tests (Vitest)**

     ```bash
     npm run test
     ```

   - **E2E Tests (Cypress)**

     ```bash
     npm run cypress:open
     ```

---

## 🧠 Example Commands

| Command              | Behavior                           |
| -------------------- | ---------------------------------- |
| `get cat fact`       | Fetches a random cat fact          |
| `get chuck joke`     | Fetches a random Chuck Norris joke |
| `search chuck kick`  | Searches for jokes with "kick"     |
| `search github john` | GitHub user search with "john"     |
| `get weather Berlin` | Gets current weather in Berlin     |

---

## 🌐 APIs Used

| API                      | Endpoint                                    |
| ------------------------ | ------------------------------------------- |
| Cat Facts                | `https://catfact.ninja/fact`                |
| Chuck Norris Jokes       | `https://api.chucknorris.io/jokes/random`   |
| GitHub Users Search      | `https://api.github.com/search/users?q=...` |
| Weather API (Open-Meteo) | `https://api.open-meteo.com/...`            |

> For weather, city names are mapped to coordinates manually (berlin , munich and paris).

---

## 🧪 Testing Strategy

### ✅ Unit/Component Tests

- Observable streams (RxJS) { chatParser and globalSearch }
- Sidebar switcher { APISidebar }
- Panel rendering { PanelResult }

### 🚀 Cypress E2E Tests

- API switcher { api-switcher.cy }
- Full chat-command flow { chat.cy }
- Global filter { global-filter.cy }

---

## 🎁 Bounce Enhancements (Completed)

- [x] reset command
- [x] Entry/exit animations for panels
- [x] Drag-and-drop/reordering of panels

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## 👨‍💻 Author

**Islam Baidaq**  
Senior Software Engineer / FrontEnd Engineer 🇩🇪 Based in Munich
