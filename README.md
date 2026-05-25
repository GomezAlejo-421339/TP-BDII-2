# FakeGraph

Sistema de detección de Fake News basado en grafos Neo4j. Modela noticias, fuentes, usuarios y sus relaciones para calcular un score de credibilidad.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Java 21, Spring Boot 3.4, Spring Data Neo4j 6 |
| Base de datos | Neo4j 5.x (AuraDB o local) |
| Frontend | React 19, Vite 6, TailwindCSS 3, D3.js 7 |
| Herramienta | OpenCode (con comando personalizado `/prompt`) |

## Modelo de grafos

### Nodos

```
Noticia {id, titulo, contenido, hashContenido, url, fechaPublicacion, scoreCredibilidad}
Fuente  {id, nombre, dominio, verificada, puntajeHistorial}
Usuario {id, nombre, seguidores, antiguedadDias}
Autor   {id, nombre, handle}
Tema    {id, nombre}
Claim   {id, texto, hash}
```

### Relaciones

```
(Autor)-[:PUBLICA]->(Noticia)
(Noticia)-[:PROVIENE_DE]->(Fuente)
(Noticia)-[:PERTENECE_A]->(Tema)
(Usuario)-[:COMPARTE {timestamp, plataforma}]->(Noticia)
(Noticia)-[:CITA]->(Noticia)
(Noticia)-[:AFIRMA]->(Claim)
(Noticia)-[:DESMIENTE]->(Claim)
```

### Pipeline de credibilidad

```
Noticia entrante
  → ¿Fuente verificada? (+0.4 sí / +0.1 no)
  → ¿Difusión masiva? (-0.3 si >100 shares)
  → ¿Desmentido por fuentes confiables? (-0.5 si ≥3 desmentidos)
  → Score final (0.0 - 1.0): 🟢 ≥0.6 | 🟡 0.3-0.6 | 🔴 <0.3
```

## Arquitectura

```
Neo4j (AuraDB) ← bolt → Spring Boot API (:8080) ← REST → React Frontend (:5173)
                                      ↑
                              DataSeeder automático
```

## Endpoints REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/noticias` | Listar noticias paginadas |
| GET | `/api/v1/noticias/{id}` | Detalle de noticia |
| POST | `/api/v1/noticias` | Alta de noticia |
| GET | `/api/v1/noticias/{id}/credibilidad` | Score desglosado |
| GET | `/api/v1/noticias/{id}/difusion` | Árbol de comparticiones |
| GET | `/api/v1/noticias/sospechosas` | Noticias de fuentes no verificadas con alta difusión |
| GET | `/api/v1/noticias/credibilidad` | Todas con score calculado |
| GET | `/api/v1/noticias/no-verificadas` | Paginado de fuentes no verificadas |
| POST | `/api/v1/fuentes` | Alta de fuente |
| PUT | `/api/v1/fuentes/{id}/verificar` | Marcar fuente como verificada |
| GET | `/api/v1/fuentes/no-verificadas` | Fuentes no verificadas |
| GET | `/api/v1/grafos/comunidades` | Comunidades detectadas (GDS Louvain) |

## Cómo ejecutar

### 1. Base de datos (Neo4j)

**Opción A — AuraDB (cloud)**
Crear instancia gratis en https://console.neo4j.io. Configurar variables de entorno:

```bash
export NEO4J_URI=neo4j+s://xxxx.databases.neo4j.io
export NEO4J_USERNAME=neo4j
export NEO4J_PASSWORD=tu-password
```

**Opción B — Docker (local)**

```bash
docker run -d --name neo4j -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password neo4j:5
```

### 2. Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

El `DataSeeder` aplica schema (constraints, índices) y seed data automáticamente al iniciar si `app.seed-data: true`.

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173`.

## Comando `/prompt` para OpenCode

Se creó un comando personalizado en `.opencode/commands/prompt.md` que optimiza prompts siguiendo las mejores prácticas de Anthropic.

**Uso:**
```
/prompt <prompt a optimizar>
```

El comando:
1. Analiza el prompt original contra 10 mejores prácticas de Anthropic
2. Asigna rol, estructura XML, contexto, ejemplos y formato de salida
3. Devuelve el prompt optimizado con explicación de cambios

### Mejores prácticas de Anthropic aplicadas

Las reglas de prompting en las que se basa el comando `/prompt` están documentadas en [Claude Prompting Best Practices](https://platform.claude.com/docs/es/build-with-claude/prompt-engineering/claude-prompting-best-practices):

| # | Práctica | Descripción |
|---|----------|-------------|
| 1 | Claridad y dirección | Instrucciones específicas, formato de salida definido |
| 2 | Contexto | Explicar el "por qué" detrás de las instrucciones |
| 3 | Rol | Asignar un rol claro al modelo |
| 4 | Estructura XML | Usar `<instructions>`, `<context>`, `<input>` para organizar |
| 5 | Ejemplos | Incluir ejemplos relevantes en `<example>` |
| 6 | Formato de salida | Decir qué HACER, no qué NO hacer |
| 7 | Verbosidad | Controlar si la respuesta debe ser concisa o detallada |
| 8 | Razonamiento | Indicar "piensa paso a paso" en tareas complejas |
| 9 | Positivo sobre negativo | Reformular "no hagas X" como "haz Y" |
| 10 | Acción explícita | No dejar ambigüedad sobre si debe actuar o solo sugerir |

## Estructura del proyecto

```
FakeGraph/
├── backend/                           # Spring Boot
│   ├── pom.xml
│   └── src/main/java/com/fakegraph/
│       ├── FakeGraphApplication.java
│       ├── model/                     # Noticia, Fuente, Usuario, Autor, Tema, Claim, Comparte
│       ├── repository/                # NoticiaRepo, FuenteRepo, UsuarioRepo + DTOs
│       ├── service/                   # NoticiaService, FuenteService, ComunidadService
│       ├── controller/                # NoticiaController, FuenteController, ComunidadController
│       └── config/                    # WebConfig, Neo4jConfig, DataSeeder, GlobalExceptionHandler
├── frontend/                          # Vite + React
│   ├── package.json
│   └── src/
│       ├── App.jsx                    # /, /noticia/:id, /fuentes
│       ├── components/                # Header, NoticiaCard, CredibilidadChart, GrafoVisualization
│       └── pages/                     # Dashboard, NoticiaDetail, FuentesPage
├── scripts/
│   └── seed.cypher                    # Seed data original (copia de seguridad)
└── .opencode/commands/
    └── prompt.md                      # Comando personalizado /prompt
```

## Correcciones aplicadas durante el desarrollo

1. **YAML con bloques duplicados**: Dos bloques `spring:` en `application.yml` — el segundo pisaba la config de Neo4j.
2. **Seed en ruta incorrecta**: `seed.cypher` estaba en `scripts/` pero el `DataSeeder` lo buscaba en `classpath:`.
3. **Seed no idempotente**: Cambiado de `CREATE` a `MERGE` + `SET` para evitar duplicados al reiniciar.
4. **Faltaban constraints**: Agregadas unique constraints sobre `id` para todos los labels de nodo.
5. **Custom queries con columnas extra**: `RETURN n, f, shares` rompía el mapeo de SDN 6. Cambiado a solo `RETURN n`.
6. **Faltaba `@Transactional`**: Los servicios de lectura no tenían `@Transactional(readOnly = true)`, causando errores al cargar relaciones.
7. **Serialización cíclica**: Agregados `@JsonIgnoreProperties` en relaciones bidireccionales (Noticia ↔ Claim).
8. **Sin manejo de errores**: Creado `GlobalExceptionHandler` con `@RestControllerAdvice` para devolver errores legibles.
9. **Código roto en ComunidadService**: El `finally` hacía una llamada inválida al repository.
10. **Import incorrecto**: `Neo4jClientException` no existe en ese paquete — eliminado del handler.
