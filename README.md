# Template del Curso: API con Javascript

## 📖 ¿Qué es este proyecto?

Este proyecto es un **template funcional** que simula una tienda online completa. Los estudiantes pueden ver y usar todas las funcionalidades que aprenderán a programar durante el curso:

- **Ver productos** en un catálogo
- **Crear productos** nuevos  
- **Editar productos** existentes
- **Eliminar productos** con confirmación

**⚠️ IMPORTANTE:** Todo funciona con datos **falsos** (mock data). Durante el curso aprenderás a conectar esto con una API real.

## 🎯 ¿Para qué sirve?

Este template te permite **ver el resultado final** antes de empezar a programar. Es como ver la foto de la caja de un rompecabezas antes de armarlo.

✅ **Lo que ya funciona:**
- Interfaz completa y profesional
- Formularios con validación
- Filtros y búsqueda
- Estados de carga y errores
- Navegación entre páginas

❌ **Lo que aprenderás en el curso:**
- Conectar con APIs reales
- Manejar peticiones HTTP
- Procesar respuestas del servidor
- Manejar errores de conexión

## 🚀 Cómo empezar

### Requisitos previos
- **Node.js** instalado en tu computadora ([descargar aquí](https://nodejs.org/))
- Un **editor de código** como VS Code, Cursor, neovim, zed, etc.
- **Terminal** o línea de comandos

### Pasos para ejecutar el proyecto

1. **Descargar** este proyecto a tu computadora

2. **Abrir terminal** en la carpeta del proyecto

3. **Instalar dependencias:**
   ```bash
   npm install
   ```
   *Esto descarga las herramientas necesarias (toma unos segundos)*

4. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```
   *Verás un mensaje: "🚀 Servidor iniciado en http://localhost:3000"*

5. **Abrir en tu navegador:**
   ```
   http://localhost:3000
   ```

**¡Listo!** Ya puedes explorar la aplicación funcionando.

## 📁 ¿Cómo está organizado el proyecto?

El proyecto tiene una estructura muy simple y fácil de entender:

```
api-course-template/
├── .nvmrc                # Versión de Node.js (22) para el proyecto
├── package.json          # Lista de dependencias del proyecto
├── server.js             # Servidor web (solo 12 líneas de código)
├── README.md             # Este archivo con instrucciones
└── public/               # Carpeta con todos los archivos web
    ├── index.html        # Página principal (catálogo de productos)
    ├── detail.html       # Página de detalle de cada producto
    ├── create.html       # Página para crear productos nuevos
    ├── edit.html         # Página para editar productos
    ├── styles.css        # Estilos y diseño de todas las páginas
    └── mock-data.js      # Productos y categorías de ejemplo
```

### 🔍 Explicación de cada archivo:

**📄 index.html** - La página principal
- Muestra todos los productos en un catálogo con imágenes
- Permite buscar y filtrar productos por categoría
- Enlaces a detalle del producto (imagen y título)  
- Botones para ver, editar y eliminar productos

**📄 detail.html** - Detalle completo del producto
- Información completa: precio, descripción, categoría, fechas  
- Galería de imágenes con imagen principal destacada
- Breadcrumb para navegación clara
- Acciones: editar, eliminar, volver al catálogo

**📄 create.html** - Formulario de creación  
- Permite agregar productos nuevos al catálogo
- Validación en tiempo real de todos los campos
- Vista previa automática de las imágenes
- Estados de carga y confirmación visual

**📄 edit.html** - Formulario de edición
- Carga automáticamente los datos del producto existente
- Formulario pre-poblado listo para modificar
- Misma validación y UX que la creación
- Manejo de errores si el producto no existe

**📄 styles.css** - Diseño visual
- Contiene todos los estilos de las páginas  
- Hace que se vea bien en móviles y computadoras
- Define colores, espacios y animaciones

**📄 mock-data.js** - Datos de ejemplo
- Contiene productos y categorías falsos basados en la API real
- Simula exactamente lo que vendría de https://fakeapi.platzi.com/
- Se usa para que todo funcione sin internet

**📄 .nvmrc** - Versión de Node.js
- Especifica que el proyecto usa Node.js versión 22
- Permite que todos usen la misma versión con `nvm use`

## 🛠️ ¿Qué tecnologías usa?

Este proyecto usa tecnologías **básicas y estándar** que todo desarrollador web debe conocer:

### 🌐 **HTML** - La estructura de las páginas (lo que ves)
Aprende las bases con estos cursos de Platzi:
- **[Fundamentos Técnicos de HTML](https://platzi.com/cursos/fundamentos-html-1752162362/)** - Etiquetas semánticas, estructura básica y anatomía de cada etiqueta
- **[Curso Definitivo de HTML y CSS](https://platzi.com/cursos/html-css/)** - Layouts adaptables y buenas prácticas semánticas  
- **[Curso Práctico de HTML y CSS](https://platzi.com/cursos/html-practico/)** - Construye un clon de Google paso a paso

### 🎨 **CSS** - El diseño y colores (cómo se ve)
Domina los estilos con:
- **[Fundamentos de CSS para Interfaces Web Modernas](https://platzi.com/cursos/fundamentos-css-web-1752533240/)** - Flexbox, CSS Grid, variables, responsive design y mobile-first
- **[Curso Definitivo de HTML y CSS](https://platzi.com/cursos/html-css/)** - Flexbox avanzado y layouts fluidos

### ⚡ **JavaScript** - La funcionalidad (cómo se comporta)
Programa la interactividad con:
- **[Curso de Fundamentos de JavaScript](https://platzi.com/cursos/javascript/)** - Variables, funciones, arrays, objetos, promesas y asincronía
- **[Curso de JavaScript desde Cero a Profesional](https://platzi.com/cursos/javascript-cero-pro-1753825462/)** - JavaScript completo para cualquier background técnico
- **[Fundamentos de APIs REST con JavaScript](https://platzi.com/cursos/apis-rest-js-1753743543/)** - GET, POST, DELETE y manipulación de datos dinámicos

### 🔧 **Hono.js** - Un servidor web súper simple (solo para mostrar las páginas)
Un framework ligero que aprenderás sobre la marcha. Es tan simple que no necesitas curso específico - ¡el código del template es suficiente!

**💡 ¿Por qué estas tecnologías?**
- Son las **bases** de cualquier página web
- No necesitas aprender frameworks complicados  
- Lo que aprendas aquí funciona en **cualquier proyecto**
- Es lo que usan las empresas reales

## ✨ ¿Qué puedes hacer en la aplicación?

### 🏠 Página Principal (`index.html`)
Al abrir la aplicación verás:
- **Lista de productos** en tarjetas organizadas con imágenes
- **Barra de búsqueda** para encontrar productos por nombre  
- **Filtro por categorías** (Ropa, Electrónicos, etc.)
- **Enlaces al detalle** (haz clic en imagen o título del producto)
- **Botones de acción** en cada producto:
  - 👁️ Ver - Para ver detalle completo
  - ✏️ Editar - Para modificar el producto
  - 🗑️ Eliminar - Para borrarlo (pide confirmación)

### 👁️ Detalle del Producto (`detail.html`)
Al hacer clic en un producto verás:
- **Imagen principal** en alta resolución
- **Navegación breadcrumb** (Inicio › Categoría › Producto)
- **Información completa**:
  - Precio destacado con moneda
  - Descripción completa del producto
  - Categoría como badge
  - ID del producto y slug
  - Fechas de creación y última actualización
- **Acciones disponibles**:
  - ✏️ Editar producto
  - 🗑️ Eliminar producto (con confirmación)
  - ← Volver al catálogo

### ➕ Crear Producto (`create.html`)
- **Formulario completo** con campos para:
  - Título del producto
  - Precio en dólares
  - Categoría (desplegable)
  - Descripción detallada
  - URL de imagen
- **Vista previa** de la imagen automática
- **Validación en tiempo real** (te dice si algo está mal)
- **Animaciones de carga** cuando "guardas" el producto
- **Redirección automática** al catálogo tras crear

### ✏️ Editar Producto (`edit.html`)  
- **Formulario pre-llenado** con los datos actuales del producto
- **Mismas validaciones** que crear producto
- **Vista previa** de imagen actualizable
- **Manejo de errores** si el producto no existe
- **Confirmación visual** cuando guardas cambios
- **Redirección automática** al catálogo tras editar

### 🔄 Flujo completo de navegación
El template simula un e-commerce real con navegación completa:

1. **Catálogo** (`index.html`) → Ver todos los productos
2. **Detalle** (`detail.html`) → Información completa de un producto  
3. **Crear** (`create.html`) → Agregar producto nuevo
4. **Editar** (`edit.html`) → Modificar producto existente
5. **Eliminar** → Confirmación y eliminación desde cualquier página

**🚀 ¡Es una aplicación web completa y funcional!** Solo que con datos falsos en lugar de una API real.

## 🎓 ¿Cómo se relaciona con el curso?

### ❌ Lo que NO hace este template (lo aprenderás en el curso):
- **Conectarse a internet** - Todo es local y falso
- **Hablar con servidores reales** - Los datos no se guardan de verdad
- **Manejar errores de conexión** - Como cuando no hay internet
- **Autenticación** - Login con usuarios y contraseñas
- **Seguridad** - Protección de datos sensibles

### ✅ Lo que SÍ te muestra (tu objetivo final):
- **Interfaz profesional** - Cómo debe verse tu aplicación terminada
- **Flujos completos** - Todo el proceso de crear, editar, eliminar
- **Experiencia de usuario** - Loading, errores, confirmaciones
- **Código limpio** - Estructura y organización profesional
- **Responsive design** - Funciona en móviles y computadoras

## 📚 La API que usaremos en el curso

Durante el curso trabajaremos con la **API de Platzi**: https://fakeapi.platzi.com/

Esta API nos permite:
- **Obtener productos** - Como Amazon o MercadoLibre
- **Crear productos nuevos** - Agregar al catálogo
- **Modificar productos** - Cambiar precios, descripciones
- **Eliminar productos** - Quitar del catálogo
- **Filtrar por categorías** - Ropa, electrónicos, etc.

**Ejemplo de producto real de la API:**
```json
{
  "id": 84,
  "title": "Classic Red Jogger Sweatpants",
  "price": 98,
  "description": "Cómodos pants rojos para ejercicio...",
  "category": {
    "id": 10,
    "name": "Clothes"
  },
  "images": ["https://i.imgur.com/imagen.jpeg"]
}
```

## 🗺️ Plan de aprendizaje

1. **Empiezas aquí** → Exploras este template funcionando
2. **Aprendes conceptos** → Qué son las APIs y HTTP  
3. **Programas gradualmente** → Reemplazas datos falsos por reales
4. **Manejas errores** → Qué hacer cuando algo falla
5. **Optimizas** → Haces que funcione mejor y más rápido

### 🎯 Rutas de especialización en Platzi

Una vez domines los fundamentos, puedes especializarte:

**Frontend (lo que ve el usuario):**
- **[Desarrollo Frontend con Angular](https://platzi.com/ruta/desarrollo-frontend-angular/)** - Framework robusto para aplicaciones grandes

**Backend (el servidor y APIs):**
- **[Desarrollo Backend con Node.js](https://platzi.com/ruta/desarrollo-backend-con-nodejs/)** - APIs, Express, NestJS, JWT, WebSockets
- **[Desarrollo Backend con PHP](https://platzi.com/ruta/desarrollo-backend-con-php/)** - Laravel, Symfony, APIs robustas
- **[Desarrollo Backend con Ruby](https://platzi.com/ruta/desarrollo-backend-con-ruby/)** - Ruby on Rails, desarrollo ágil

## 🚨 Solución de problemas comunes

**🔴 "No me funciona `npm install`"**
- Verifica que tienes Node.js instalado: `node --version`
- Cierra y vuelve a abrir la terminal
- Asegúrate de estar en la carpeta correcta

**🔴 "El servidor no inicia"**
- Verifica que el puerto 3000 esté libre
- Cierra otras aplicaciones que usen ese puerto
- Intenta con: `npm run dev`

**🔴 "No veo los productos"**
- Revisa que hayas abierto http://localhost:3000
- Presiona F12 y mira si hay errores en la consola
- Recarga la página con Ctrl+F5

**🔴 "Las imágenes no cargan"**
- Es normal, son URLs de ejemplo
- Prueba con URLs reales de imágenes
- Las imágenes pueden tardar en cargar

## 💡 Consejos para estudiantes

- **🔍 Explora todo** - Haz clic en todos los botones
- **📝 Lee el código** - Abre los archivos HTML y CSS
- **🧪 Experimenta** - Cambia colores, textos, estilos
- **❓ Pregunta** - Si algo no entiendes, investiga
- **⏱️ Tómate tu tiempo** - No hay prisa por entender todo

---

**🎯 Template creado para el curso "API con Javascript"**  
**👥 Enfocado en principiantes • 🍦 Vanilla JS • 🚀 Sin dependencias pesadas**
