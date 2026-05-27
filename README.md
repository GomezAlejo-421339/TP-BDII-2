# FakeGraph

Sistema de detección de Fake News basado en grafos Neo4j. Modela noticias, fuentes, usuarios y sus relaciones para calcular un score de credibilidad en tiempo real utilizando analíticas complejas de grafos.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Java 21, Spring Boot 3.4, Spring Data Neo4j 6 |
| Base de datos | Neo4j 5.x (AuraDB o local) |
| Frontend | React 19, TypeScript, Vite 6, TailwindCSS, D3.js |

## Modelo de Grafos (Esquema Neo4j)

### Nodos

```cypher
Noticia { id, titulo, url, autorNombre, fechaPublicacion, scoreCredibilidad }
Fuente  { id, nombre, dominio, verificada }
Usuario { id, nombre, email, scoreCredibilidad }
Tema    { id, nombre }
```

### Relaciones

```cypher
(Usuario)-[:POSTEO]->(Noticia)              // Quién ingresó la noticia al sistema
(Usuario)-[:COMPARTE]->(Noticia)            // Quién reposteó la noticia
(Usuario)-[:VOTO {tipoVoto}]->(Noticia)     // tipoVoto: VERDADERO, FALSO, DUDOSO
(Noticia)-[:PUBLICADA_EN]->(Fuente)         // Dominio de la URL (ej. reuters.com)
(Noticia)-[:PERTENECE_A]->(Tema)            // Categoría temática
```

## Características Principales

1. **Deduplicación por URL**: Si varios usuarios intentan subir la misma noticia, el sistema la unifica utilizando la operación `MERGE` de Cypher con una restricción de unicidad en la BD.
2. **Sistema de Votación Dinámico**: Cada noticia posee un score de credibilidad que se recalcula instantáneamente basado en la proporción de votos (`VERDADERO` / `FALSO` / `DUDOSO`).
3. **Barra de Credibilidad Tricolor**: Interfaz gráfica para evidenciar fácilmente el estado actual de la credibilidad de la noticia.
4. **Analítica en Tiempo Real (Estadísticas)**: Un dashboard procesa las 8 consultas de análisis complejas establecidas en los requerimientos.

## Consultas de Demostración (Fase 6)

Para demostrar el poder de la base de datos orientada a Grafos, el proyecto incluye un script de demostración con 8 consultas complejas (Traversals, análisis de difusión, recomendaciones).
Se encuentra en el archivo: `docs/demo_queries.cypher`

**Las 8 consultas incluidas y funcionando en la API son:**
1. Cargar/Deduplicar una Noticia (`MERGE`)
2. Votar y recalcular Score de Credibilidad dinámicamente
3. Identificar Noticias sospechosas con alta difusión (Controversiales)
4. Listar Top Usuarios Más Activos (Influencers/Propagadores)
5. Análisis de Fiabilidad de Fuentes de Información
6. Tendencia Temática (Noticias agrupadas por Categoría y credibilidad)
7. Traversal 1: **Recomendación Colaborativa** (Usuarios que votaron igual que tú)
8. Traversal 2: **Cadena de Propagación** de Desinformación (Quién lo inició y sus saltos)

## Cómo Ejecutar

### 1. Base de datos (Neo4j Docker)

```bash
docker run --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/password123 -v neo4j_data:/data -d neo4j:5
```
Se puede visualizar en http://localhost:7474/browser/

> **Nota:** La aplicación utiliza `neo4j-migrations`. Al arrancar el backend por primera vez, se inyectarán las restricciones (`constraints`) y los datos de prueba iniciales (`seed data`) automáticamente.

### 2. Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```
(O correr desde IntelliJ IDEA / VS Code en Java 21)

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
Abrir `http://localhost:5173`.
