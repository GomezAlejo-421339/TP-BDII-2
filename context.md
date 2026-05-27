# FakeGraph — Cambios realizados

## Sesión: Estadísticas reales de BD + Dashboard mejorado + Seed data enriquecido

---

## 1. Estadísticas reales de BD (antes mostraba métricas de API HTTP)

### Backend — Nuevos DTOs en `com.fakegraph.repository`

| Archivo | Descripción |
|---------|-------------|
| `DistribucionCredibilidad.java` | rango (Crítica/Dudosa/Confiable), cantidad, porcentaje |
| `NoticiasPorFuenteStats.java` | fuente, verificada, total, credibilidadPromedio |
| `NoticiasPorTemaStats.java` | tema, total, credibilidadPromedio |
| `TopUsuarioStats.java` | nombre, totalShares, seguidores |
| `TendenciaStats.java` | fecha, total, credibilidadPromedio |
| `ResumenDBStats.java` | totalNoticias, credibilidadPromedio, totalFuentes, totalFuentesVerificadas, totalClaims, totalUsuarios |

### Backend — `EstadisticasService.java` modificado
- Inyecta `Driver` de Neo4j además del `MetricaConsultaRepository` original
- Nuevos métodos que ejecutan Cypher directo contra la BD:
  - `obtenerResumenDB()` — counts y promedios de todas las entidades
  - `obtenerDistribucion()` — distribución de scores (rojo/amarillo/verde)
  - `obtenerNoticiasPorFuente()` — agrupado por fuente
  - `obtenerNoticiasPorTema()` — agrupado por tema
  - `obtenerTopUsuarios()` — top 10 usuarios que más comparten
  - `obtenerTendencia()` — tendencia temporal de noticias
- Los métodos originales de métricas de API se mantienen como respaldo

### Backend — `EstadisticasController.java` modificado
- Nuevos endpoints:
  - `GET /api/v1/estadisticas/resumen-bd`
  - `GET /api/v1/estadisticas/distribucion`
  - `GET /api/v1/estadisticas/por-fuente`
  - `GET /api/v1/estadisticas/por-tema`
  - `GET /api/v1/estadisticas/usuarios-top`
  - `GET /api/v1/estadisticas/tendencia`
- Endpoints viejos (resumen, endpoints, errores, historial) se mantienen

### Frontend — Nuevos componentes

| Archivo | Descripción |
|---------|-------------|
| `CredibilidadDonut.jsx` | Donut chart D3.js con distribución de credibilidad, labels en arcos, tooltip |
| `FuentesBarChart.jsx` | Barras verticales D3.js: noticias por fuente (verde=verificada, rojo=no) |
| `TemaBarChart.jsx` | Barras horizontales D3.js: noticias por tema, color por credibilidad |
| `TopUsuariosRanking.jsx` | Ranking visual con barras de progreso y seguidores |
| `TendenciaLineChart.jsx` | Línea temporal D3.js con noticias y credibilidad promedio |

### Frontend — `EstadisticasPage.jsx` rediseñado
- 6 StatsCards: Noticias, Credibilidad prom., Fuentes, Fuentes verificadas %, Claims, Usuarios
- Gráficos: donut de distribución, barras por fuente, barras por tema, ranking de usuarios, línea temporal
- Eliminadas las tablas de endpoints HTTP, errores y historial de API

---

## 2. Dashboard mejorado

### Layout modificado (`Dashboard.jsx`)
- Antes: `lg:grid-cols-3` con noticias en `col-span-2` y charts en `col-span-1` (muy angosto)
- Ahora: `lg:grid-cols-2` con noticias a la izquierda e histograma a la derecha
- Grafo de relaciones abajo en fila completa (más espacio)

### Histograma agrandado (`CredibilidadChart.jsx`)
- Dimensiones: 280×200 → **450×250**
- Labels de cantidad sobre cada barra
- Tooltips más grandes
- Leyenda de colores debajo

### Grafo de relaciones (`GrafoVisualization.jsx`) — reescrito con `react-force-graph-2d`
- **Nodos con texto visible** (título de noticia, nombre de fuente/tema)
- **Flechas direccionales** en los links
- **Partículas animadas** en los links
- **Click en nodo** de noticia → navega al detalle
- **Hover tooltip** con detalles (credibilidad, fuente)
- **ResizeObserver** para ancho responsive del contenedor
- **Zoom y arrastre** con física suave
- Labels con fondo blanco semitransparente

---

## 3. Fix donut chart (`CredibilidadDonut.jsx`)

- **Labels de porcentaje dentro de los arcos** (texto blanco con borde oscuro)
- Datos ordenados por cantidad descendente
- Legend ahora muestra `"Confiable: 7 (50%)"` (cantidad + porcentaje)
- Tooltip usa `clientX/Y` en vez de `offsetX/Y` (posicionamiento correcto)
- Labels aparecen con delay (`400ms`) después de la animación de arcos
- Tamaño de fuente adaptativo según porcentaje del slice
- SVG agrandado: 280×260 → **340×310**

---

## 4. Seed data enriquecido (`seed.cypher`)

### Antes: 6 noticias, Ahora: **14 noticias**

| ID | Título | Score | Categoría |
|----|--------|-------|-----------|
| n1 | Estudio confirma seguridad de vacunas infantiles | 0.85 | Confiable |
| n2 | ONG denuncia: gobierno oculta cura del cáncer | 0.12 | Crítica |
| n3 | Nueva política impositiva para pequeñas empresas | 0.72 | Confiable |
| n4 | Científicos logran fusión fría a temperatura ambiente | 0.08 | Crítica |
| n5 | Vacunas y autismo: el mito que no muere | 0.90 | Confiable |
| n6 | Récord de desempleo en el tercer trimestre | 0.80 | Confiable |
| **n7** | Diputado denuncia fraude electoral masivo | **0.18** | Crítica |
| **n8** | Nueva vacuna contra el cáncer muestra resultados prometedores | **0.88** | Confiable |
| **n9** | Supuesto chip 5G vinculado a enfermedades respiratorias | **0.05** | Crítica |
| **n10** | El Banco Central mantiene tasa de interés estable | **0.95** | Confiable |
| **n11** | Crece el debate sobre la regulación de redes sociales | **0.55** | Dudosa |
| **n12** | Polémica por recorte en presupuesto educativo | **0.42** | Dudosa |
| **n13** | Gobierno anuncia bonos de $50,000 para familias | **0.22** | Crítica |
| **n14** | Inteligencia Artificial revoluciona diagnóstico médico | **0.76** | Confiable |

### Otros cambios en seed:
- 2 fuentes nuevas: `BBC Mundo` (verificada), `La Posta Diaria` (no verificada)
- 1 tema nuevo: `Sociedad`
- 3 claims nuevos: fraude electoral, chip 5G, bonos
- 2 autores nuevos: Pedro Ramírez, Lucía Fernández
- Muchas más relaciones COMPARTE (usuarios compartiendo noticias falsas y reales)
- Relaciones DESMIENTE y CITA adicionales

---

## 5. Librerías instaladas

```bash
npm install react-force-graph-2d
```

---

## 6. Issues conocidos (no corregidos)

1. **Encoding de caracteres español**: `Crítica` se muestra como `CrA-tica` en PowerShell `Invoke-RestMethod`. Es un problema de codificación en la cadena Neo4j → Jackson → JSON, probablemente del lado de PowerShell. En el frontend (navegador) se ve correctamente.

2. **Serialización de relaciones Neo4j**: Cuando `Invoke-RestMethod` convierte el JSON, los objetos anidados (`fuente`, `tema`) aparecen como strings `"@{...}"` en la consola, pero el JSON real que recibe el frontend es correcto.

3. ~~**ADVERTENCIA**: Las queries paginadas `findNoticiasNoVerificadas` y `findAllOrderByScore` en `NoticiaRepository.java` faltan los parámetros `$skip` y `$limit`. Esto es preexistente, no introducido en esta sesión.~~ **(FALSO: Spring Boot 3.4.1 + SDN 6+ inyecta SKIP/LIMIT automáticamente)**

---

## Session 1b — Fixes (24 mayo)

### Errores encontrados y corregidos

| Prioridad | Archivo | Problema | Fix |
|-----------|---------|----------|-----|
| 🔴 Crítico | `FuentesBarChart.jsx` | `.transition()` se aplicaba al `<title>` en vez del `<rect>` → barras invisibles | Separar `.append('title')` y aplicar `.transition()` sobre la variable `rects` |
| 🔴 Crítico | `TemaBarChart.jsx` | Mismo bug: transition al `<title>` en vez del rect | Mismo fix |
| 🟡 Medio | `CredibilidadChart.jsx` | Tooltip usaba `offsetX/Y` (bug con scroll) en vez de `clientX/Y` | Cambiado a `clientX/Y` + `position: fixed` |
| 🟢 Bajo | `EstadisticasService.java` | Cast inseguro `Object[]` en `obtenerDistribucion()` | Usar `DistribucionCredibilidad` directo en dos pasos |

### No requiere fix
- `findAllOrderByScore` es dead code (nunca llamado)
- Paginación sin `$skip`/`$limit` **no es bug** en SDN 6+

---

## Archivos modificados/resumen

### Backend (8 archivos nuevos, 2 modificados)
```
NUEVOS:
  repository/DistribucionCredibilidad.java
  repository/NoticiasPorFuenteStats.java
  repository/NoticiasPorTemaStats.java
  repository/TopUsuarioStats.java
  repository/TendenciaStats.java
  repository/ResumenDBStats.java

MODIFICADOS:
  service/EstadisticasService.java
  controller/EstadisticasController.java
  resources/seed.cypher
```

### Frontend (5 archivos nuevos, 4 modificados)
```
NUEVOS:
  components/CredibilidadDonut.jsx
  components/FuentesBarChart.jsx
  components/TemaBarChart.jsx
  components/TopUsuariosRanking.jsx
  components/TendenciaLineChart.jsx

MODIFICADOS:
  pages/EstadisticasPage.jsx      (rediseño completo)
  pages/Dashboard.jsx             (layout, graph upgrade)
  components/CredibilidadChart.jsx (agrandado)
  components/GrafoVisualization.jsx (reescrito con react-force-graph-2d)
```

---

## Sesión: Registro/Login de Usuarios con Contraseñas SHA-256 + Panel de Confiabilidad y Limpieza de Código Muerto (27 mayo)

### Backend — Cambios Realizados
- **Seguridad (Cifrado SHA-256)**:
  - Nueva clase `com.fakegraph.utils.PasswordUtils` utilizando `MessageDigest` y `HexFormat` de Java 21 para cifrado y validación.
- **Entidades y Base de Datos**:
  - `Usuario.java`: Mapeados campos `seguidores`, `antiguedadDias` y `passwordHash`.
  - `seed.cypher`: Actualizado para proveer correos (`usuariobot1@ejemplo.com`, etc.) y `passwordHash` (para contraseña por defecto `password123`) a todos los usuarios cargados por defecto.
- **DTOs y Solicitudes**:
  - `UsuarioRequestDTO.java`: Añadido el campo `password`.
  - `UsuarioResponseDTO.java`: Añadidos los campos `scoreCredibilidad`, `seguidores` y `antiguedadDias`.
  - Nuevo DTO `LoginRequestDTO.java` para capturar credenciales en el inicio de sesión.
- **Servicios y Controladores**:
  - `UsuarioService.java`: Actualizados métodos de registro (encriptación) y login (comprobación hash y control de email no registrado).
  - `UsuarioController.java`: Expuesto el endpoint `POST /api/v1/usuarios/login` y mantenida la restricción CRUD.
- **Consistencia del Grafo (Cascada)**:
  - `UsuarioRepository.java`: Agregada consulta nativa en cascada `recalcularUsuariosQueVotaron` que actualiza dinámicamente la confiabilidad de los usuarios en base a la veracidad final de las noticias que votaron.
  - `NoticiaService.java`: Invoca a la query en cascada tras recalcular la credibilidad de una noticia.
- **Limpieza de Código Muerto**:
  - Eliminada la entidad de base de datos no referenciada `MetricaConsulta.java`.

### Frontend — Cambios Realizados
- **Gestión de Sesión**:
  - Nuevo contexto `AuthContext.tsx` que interactúa con `localStorage` y provee `user`, `login` y `logout` de manera centralizada.
  - `App.tsx` envuelto en `AuthProvider` con la nueva ruta `/login` incorporada.
- **Vistas y Componentes**:
  - Nueva página `LoginPage.tsx` (diseño glassmorphism refinado, loading states e input tipo password).
  - `RegisterPage.tsx` actualizado para incluir contraseña, validar largo mínimo e iniciar sesión inmediatamente al registrarse.
  - `Header.tsx` dinámico: Muestra avatar "👋 [Nombre]" y botón "Salir" si está logueado; y enlaces "Ingresar" / "Registrarse" si no. Botón "Publicar Noticia" redirige/advierte si se ingresa como visitante anónimo.
  - `UsuariosPage.tsx` rediseñada: Operaciones CRUD removidas por completo. Muestra enmascaramiento parcial de emails (`us***@mail.com`) y barras de progreso animadas según reputación (Confiable: Verde, Dudosa: Amarillo, Crítica: Rojo).
  - `NoticiaDetail.tsx`: Muestra banner explicativo y bloquea acciones de votos/reposteos a invitados anónimos.
- **Limpieza de Código Muerto y Fixes**:
  - Eliminado el componente obsoleto `EndpointRanking.tsx`.
  - Corregidas las rutas relativas a Temas en `TemasPage.tsx` anteponiendo el prefijo `/api/v1` para evitar respuestas HTTP 404 del proxy de Vite.

---

## Archivos modificados/resumen (Nueva Sesión)

### Backend (2 archivos nuevos, 6 modificados, 1 eliminado)
```
NUEVOS:
  utils/PasswordUtils.java
  DTO/requests/LoginRequestDTO.java

MODIFICADOS:
  model/nodos/Usuario.java
  DTO/requests/UsuarioRequestDTO.java
  DTO/response/UsuarioResponseDTO.java
  repository/UsuarioRepository.java
  service/UsuarioService.java
  controller/UsuarioController.java
  service/NoticiaService.java
  resources/seed.cypher

ELIMINADOS:
  model/MetricaConsulta.java
```

### Frontend (2 archivos nuevos, 7 modificados, 1 eliminado)
```
NUEVOS:
  context/AuthContext.tsx
  pages/LoginPage.tsx

MODIFICADOS:
  App.tsx
  components/Header.tsx
  pages/RegisterPage.tsx
  pages/UsuariosPage.tsx
  pages/NoticiaDetail.tsx
  pages/TemasPage.tsx

ELIMINADOS:
  components/EndpointRanking.tsx
```

