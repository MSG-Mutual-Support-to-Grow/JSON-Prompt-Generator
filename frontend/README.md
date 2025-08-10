# Text to JSON Prompt Converter

A modern web application for converting plain text into structured JSON prompts, designed to enhance AI model comprehension and integration with modern applications.

## Features

- **Text to JSON Conversion**: Instantly transform your plain text into a structured JSON prompt with metadata.
- **Conversion History**: View your latest 5 conversions for quick reference and reuse.
- **Copy to Clipboard**: Easily copy generated JSON outputs.
- **Responsive UI**: Clean, mobile-friendly interface built with React and Tailwind CSS.
- **Sidebar Navigation**: Effortlessly switch between the converter and history views.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/text-to-json-converter.git
   cd text-to-json-converter/frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your web browser.

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── TextToJsonConverter.tsx
│   │   └── HistoryView.tsx
│   └── ...
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── ...
```

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/icons/)

## Customization

- **Prompt Structure**: The JSON structure can be customized in [`TextToJsonConverter.tsx`](src/components/TextToJsonConverter.tsx).
- **History Limit**: Adjust the number of stored conversions in [`App.tsx`](src/App.tsx).

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

**Text to JSON Prompt Converter** – Make your prompts smarter and more structured!
