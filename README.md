# ⬡ Webexa — Web Examiner

Webexa is an elegant, minimalist browser utility designed to extract visual assets and design systems from any webpage in a single click. It operates 100% locally in your browser, requiring no extensions, no accounts, and collecting absolutely zero user data.

---

## ✨ Features

- **🖼️ Image Extractor:** Automatically detects all page images (including inline `<img>` tags, CSS `background-image` styles, and Open Graph metadata). Preview them in a responsive grid and download individually or packaged in a `.zip` archive.
- **🎨 Style Extractor:** Instantly extracts the website's color palette (frequency-sorted, with one-click HEX copying) and typography (arranged by headings, body text, and code with live previews).
- **🔒 Privacy First:** 100% local execution. Webexa does not access, use, or store user accounts, browsing history, cookies, or personal files.
- **🚀 Zero Installation:** Runs as a simple browser bookmarklet. Drag the button to your bookmark bar and use it anywhere.
- **🌐 Bilingual Support:** Native interface support in both English and Spanish.

---

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** Shadcn UI (Radix Primitives)
- **Icons:** Lucide React

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Layouts, pages, custom favicon)
│   ├── globals.css       # Tailwind CSS variables & global styles
│   ├── layout.tsx        # Base wrapper configuration
│   └── page.tsx          # Landing page routing entrypoint
├── components/           # React components
│   ├── ui/               # Core Shadcn UI custom components
│   └── shared/           # Webexa shared features (mockups, sections, logo)
├── lib/                  # Helper utilities and custom contexts
│   ├── LanguageContext   # Localization state and dictionary loader
│   ├── translations      # Dict translation definitions (EN/ES)
│   └── utils            # Utility helpers (cn class merger)
public/
├── bookmarklet.js        # Source unminified bookmarklet injector script
└── bookmarklet.min.txt   # Compiled compact bookmarklet code for URL deployment
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm (installed with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amedast/Webexa.git
   cd Webexa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build and Deploy

To create an optimized production build of the Next.js landing page:
```bash
npm run build
```

---

## ⚡ Minifying the Bookmarklet Injector

The source code for the browser tool injection resides in `public/bookmarklet.js`. If you make modifications to the injection script, you should compile and minify it into `public/bookmarklet.min.txt` as a single line starting with `javascript:`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use and adapt it for your own needs.
