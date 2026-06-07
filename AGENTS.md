# Guía de Desarrollo y Buenas Prácticas - Web Bookmarker

Este archivo contiene las directrices, estándares y mejores prácticas de desarrollo para que los agentes y programadores mantengan la consistencia en el proyecto **Web Bookmarker**.

---

## 🚀 Tecnologías Principales

- **Framework:** Next.js (App Router, React 19)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Componentes:** Shadcn UI (Radix Primitives)
- **Gestión de Paquetes:** npm

---

## 📂 Estructura del Proyecto

El proyecto sigue la convención de `src/` directory:

```text
src/
├── app/                  # Directorio del App Router (Páginas, Layouts, APIs)
│   ├── globals.css       # Estilos globales y variables de Tailwind
│   ├── layout.tsx        # Layout raíz
│   └── page.tsx          # Página de inicio
├── components/           # Componentes reutilizables de React
│   ├── ui/               # Componentes base de Shadcn UI (Button, etc.)
│   └── shared/           # Componentes compartidos de negocio
├── lib/                  # Funciones de utilidad y helpers comunes
│   └── utils.ts          # Utilidades (cn para Tailwind merge)
```

---

## 🛠️ Reglas y Buenas Prácticas de Programación

### 1. Componentes de React (Server vs Client)
- **Por defecto:** Todos los componentes dentro de `src/app/` son **React Server Components (RSC)**.
- **Client Components:** Añade la directiva `"use client"` únicamente a los componentes que requieran interactividad (hooks como `useState`, `useEffect`, `usePathname`, interactividad de usuario, eventos, etc.).
- **Co-locación:** Mantén los componentes específicos de una ruta cerca de su página o en `src/components/shared/` si son reutilizables en múltiples vistas.

### 2. Estilos con Tailwind CSS v4 y Shadcn
- **Obligatoriedad de Shadcn:** Es estrictamente obligatorio utilizar los componentes de **Shadcn UI** para cualquier elemento de interfaz de usuario soportado por la librería (como botones, diálogos, formularios, inputs, modales, etc.). No se deben recrear ni utilizar elementos HTML básicos o librerías externas alternativas si existe un componente equivalente en Shadcn UI.
- Usa las clases de utilidad de Tailwind CSS.
- Para unir clases condicionalmente, utiliza la función `cn` exportada desde `@/lib/utils`.
  ```tsx
  import { cn } from "@/lib/utils";

  export function CustomButton({ className, active }: CustomButtonProps) {
    return (
      <button className={cn("px-4 py-2 rounded-md transition-colors", active ? "bg-primary text-white" : "bg-muted", className)}>
        Click me
      </button>
    );
  }
  ```
- **Diseño Premium:** El diseño debe sentirse premium y profesional. Usa transiciones suaves (`transition-all duration-300`), sombras sutiles, esquinas redondeadas elegantes y una paleta de colores coherente basada en variables CSS de Shadcn/Tailwind.

### 3. Tipado con TypeScript
- Evita el uso de `any`. Define siempre interfaces y tipos explícitos para todas las propiedades (Props), respuestas de API y estados.
- Utiliza utilidades de TypeScript cuando sea necesario (`Pick`, `Omit`, `Partial`).
- Prefiere la inferencia de tipos cuando sea obvia, pero sé explícito en las firmas de funciones y retornos complejos.

### 4. Importaciones y Alias
- Utiliza siempre el alias de importación `@/` configurado en `tsconfig.json` para evitar rutas relativas largas (`../../components/...`).
  - Correcto: `import { Button } from "@/components/ui/button"`
  - Incorrecto: `import { Button } from "../../../components/ui/button"`

### 5. Convenciones de Nombres
- **Componentes:** PascalCase (ej. `BookmarkCard.tsx`).
- **Funciones y Variables:** camelCase (ej. `getBookmarkData`).
- **Archivos de Utilidades/Hooks:** camelCase (ej. `useLocalStorage.ts`, `auth.ts`).

---

## 🛠️ Habilidades de Agente (Skills)

El proyecto cuenta con habilidades (skills) especializadas en la carpeta [.agents/skills](file:///c:/Users/alexm/Desktop/Proyectos/web-bookmarker/.agents/skills) que los agentes deben utilizar y referenciar de forma obligatoria según la tarea:

- **Búsqueda de Skills ([find-skills](file:///c:/Users/alexm/Desktop/Proyectos/web-bookmarker/.agents/skills/find-skills/SKILL.md)):** Se debe utilizar para buscar o instalar nuevas habilidades cuando se requiera funcionalidad extendida.
- **Diseño Frontend ([frontend-design](file:///c:/Users/alexm/Desktop/Proyectos/web-bookmarker/.agents/skills/frontend-design/SKILL.md)):** Instrucciones para crear interfaces de usuario premium y de nivel de producción que superen la estética genérica de la IA.
- **Creador de Skills ([skill-creator](file:///c:/Users/alexm/Desktop/Proyectos/web-bookmarker/.agents/skills/skill-creator/SKILL.md)):** Directrices para crear, optimizar y medir el rendimiento de nuevas habilidades.
- **Mejores Prácticas de React/Vercel ([vercel-react-best-practices](file:///c:/Users/alexm/Desktop/Proyectos/web-bookmarker/.agents/skills/vercel-react-best-practices/SKILL.md)):** Normas de rendimiento y renderizado para Next.js y React 19 basadas en la ingeniería de Vercel.
- **Directrices de Diseño Web ([web-design-guidelines](file:///c:/Users/alexm/Desktop/Proyectos/web-bookmarker/.agents/skills/web-design-guidelines/SKILL.md)):** Auditoría de UX, accesibilidad y cumplimiento de las directrices de interfaz de usuario.

---

## ⚡ Flujo de Trabajo y Consistencia

1. **Añadir Componentes de Shadcn:** Para añadir nuevos componentes base de la librería, utiliza:
   ```bash
   npx shadcn@latest add <component-name>
   ```
2. **Validación de Código:** Ejecuta el linter antes de hacer commits para asegurar la consistencia del código:
   ```bash
   npm run lint
   ```
3. **Manejo de Errores y Carga (Loading):**
   - Utiliza archivos `loading.tsx` y `error.tsx` de Next.js para estados de carga y manejo de errores a nivel de ruta de forma declarativa.
