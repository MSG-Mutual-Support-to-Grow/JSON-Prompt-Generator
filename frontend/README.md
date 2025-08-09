
# Plain Text to JSON Prompt Converter

A modern web app to convert plain text into structured JSON format, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Features

- **Instant Conversion:** Convert plain text to JSON with a single click.
- **Copy to Clipboard:** Easily copy the generated JSON (with a professional clipboard icon).
- **Keyboard Shortcut:** Submit with Ctrl + Enter.
- **Responsive UI:** Clean, modern interface styled with Tailwind CSS.
- **Error Handling:** User-friendly error messages for failed conversions.

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📦 Project Structure

```
frontend/
├── public/              # Static assets (optional, Vite can use root)
├── src/
│   ├── App.tsx          # Main React component
│   ├── index.tsx        # Entry point
│   └── services/
│       └── api.ts       # API calls to backend
├── index.html           # Main HTML file
├── package.json         # Project metadata & scripts
├── tsconfig.json        # TypeScript config
├── vite.config.js       # Vite config
└── tailwind.config.js   # Tailwind CSS config
```

---

## 🖥️ Getting Started

### 1. **Install dependencies**

```bash
npm install
```

### 2. **Run the development server**

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 3. **Build for production**

```bash
npm run build
```

---

## ✨ Usage

1. Paste or type your plain text into the input area.
2. Click **Convert** or press Ctrl + Enter.
3. View and copy the generated JSON.

---

## 📁 Configuration

- **Tailwind CSS:** Utility-first styling in all components.
- **Vite:** Fast dev server and optimized builds.
- **TypeScript:** Type safety throughout the codebase.

---

## 🙏 Credits

- Inspired by modern prompt engineering tools.
- Built with ❤️ using open-source technologies.
