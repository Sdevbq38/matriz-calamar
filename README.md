# Matriz de decisión ponderada — Mini granja solar (Calamar, Guaviare)

Aplicación web interactiva (React + Vite) para validar y justificar las decisiones
preliminares del proyecto mediante una matriz de decisión ponderada.

Permite ajustar la importancia de cada criterio con sliders, ver el ranking de
alternativas en tiempo real, editar nombres y calificaciones, y copiar un resumen
para el documento del proyecto.

---

## Cómo publicarla en internet (GitHub + Vercel)

Sigue estos pasos una sola vez. Al final tendrás un enlace permanente (por ejemplo
`matriz-calamar.vercel.app`) que puedes convertir en código QR para la exposición.

### Requisito previo
Instala Node.js (versión 18 o superior) desde https://nodejs.org si aún no lo tienes.
Esto solo es necesario si quieres probar la web en tu computador antes de publicarla.
Para publicarla NO es estrictamente obligatorio, porque Vercel la compila por ti.

### Paso 1 — Crear cuenta en GitHub
1. Entra a https://github.com y crea una cuenta gratuita.
2. Pulsa el botón **New** (o el "+") para crear un repositorio nuevo.
3. Ponle un nombre, por ejemplo `matriz-calamar`. Déjalo **Public**. No marques
   "Add a README" (este proyecto ya trae uno). Pulsa **Create repository**.

### Paso 2 — Subir estos archivos al repositorio
La forma más sencilla, sin usar la terminal:
1. En la página del repositorio recién creado, pulsa el enlace
   **"uploading an existing file"** (o ve a Add file → Upload files).
2. Arrastra **todo el contenido de esta carpeta** (los archivos y la carpeta `src`).
   - Importante: arrastra los archivos y la carpeta `src` completa, NO la carpeta
     `matriz-calamar` por fuera. En GitHub deben quedar `index.html`,
     `package.json`, `src/`, etc. en la raíz del repositorio.
   - NO subas la carpeta `node_modules` (no existe todavía, y no debe subirse).
3. Abajo, pulsa **Commit changes**.

### Paso 3 — Conectar Vercel
1. Entra a https://vercel.com y pulsa **Sign up**. Elige **Continue with GitHub**
   (así Vercel queda conectado a tu cuenta de GitHub).
2. Ya dentro, pulsa **Add New… → Project**.
3. Vercel mostrará tus repositorios de GitHub. Busca `matriz-calamar` y pulsa **Import**.
4. Vercel detecta automáticamente que es un proyecto **Vite**. No cambies nada:
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (automático)
   - Output Directory: `dist` (automático)
5. Pulsa **Deploy** y espera ~1 minuto.

### Paso 4 — Obtener el enlace
Cuando termine, Vercel te dará una URL pública, por ejemplo
`https://matriz-calamar.vercel.app`. Ese es tu enlace permanente.
Puedes personalizar el nombre en **Settings → Domains** si quieres algo más corto.

### Paso 5 — Generar el código QR
Con ese enlace ya puedes crear el QR (por ejemplo en un generador de QR en línea,
o pídemelo y te lo genero como imagen para Canva).

---

## Probar en tu computador (opcional)
Si quieres verla antes de publicar:

```bash
npm install
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

---

## Notas
- Todos los valores (pesos y calificaciones) son **preliminares y modificables**.
- El escenario base está calibrado para reflejar las decisiones que el equipo ya tomó.
- Si cambias los datos, edita el archivo `src/data.js` y vuelve a subir; Vercel
  redespliega solo al detectar el cambio en GitHub.
