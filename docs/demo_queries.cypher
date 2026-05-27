// ==========================================
// DEMO QUERIES - FakeGraph (Neo4j)
// ==========================================
// Estas 8 consultas demuestran el poder de la base de datos orientada a grafos 
// para resolver problemas de Fake News que serían muy costosos en SQL.

// ---------------------------------------------------------
// 1. Cargar/Deduplicar una Noticia (MERGE)
// ---------------------------------------------------------
// Si la URL ya existe, no crea duplicados, simplemente la devuelve.
MERGE (n:Noticia {url: 'https://reuters.com/salud/2026/nueva-vacuna'})
ON CREATE SET 
    n.titulo = 'Nueva vacuna aprobada',
    n.fechaPublicacion = localdatetime(),
    n.scoreCredibilidad = 0.5
RETURN n;

// ---------------------------------------------------------
// 2. Votar y recalcular Score de Credibilidad
// ---------------------------------------------------------
// Tras un voto, se recalcula el score dinámicamente según la proporción de votos positivos.
MATCH (u:Usuario)-[v:VOTO]->(n:Noticia)
WHERE id(n) = 1 // ID de ejemplo
WITH n, count(v) as total,
     sum(case when v.tipoVoto = 'VERDADERO' then 1 else 0 end) as positivos
SET n.scoreCredibilidad = CASE WHEN total > 0 THEN (positivos * 1.0 / total) ELSE 0.5 END
RETURN n.titulo, n.scoreCredibilidad, total;

// ---------------------------------------------------------
// 3. Noticias sospechosas con alta difusión (Controversiales)
// ---------------------------------------------------------
// Busca noticias que tienen mucha actividad (votos y reposteos)
// pero su credibilidad está en zona de riesgo o dividida.
MATCH (n:Noticia)
OPTIONAL MATCH (n)<-[v:VOTO]-()
OPTIONAL MATCH (n)<-[c:COMPARTE]-()
WITH n, count(DISTINCT v) AS votos, count(DISTINCT c) AS reposteos
WHERE votos > 0 AND (n.scoreCredibilidad < 0.4 OR (n.scoreCredibilidad > 0.4 AND n.scoreCredibilidad < 0.6))
RETURN n.titulo, n.scoreCredibilidad, votos, reposteos
ORDER BY reposteos DESC, votos DESC LIMIT 10;

// ---------------------------------------------------------
// 4. Top Usuarios Más Activos (Influencers)
// ---------------------------------------------------------
// Usuarios que más difunden información en la red.
MATCH (u:Usuario)-[:COMPARTE]->(n:Noticia)
RETURN u.nombre, count(n) AS noticiasCompartidas
ORDER BY noticiasCompartidas DESC LIMIT 5;

// ---------------------------------------------------------
// 5. Análisis de Fuentes de Información
// ---------------------------------------------------------
// Qué fuentes (dominios) publican más noticias y cuál es su credibilidad promedio.
MATCH (n:Noticia)-[:PUBLICADA_EN]->(f:Fuente)
RETURN f.nombre AS fuente, f.verificada AS verificada, count(n) AS totalNoticias, avg(n.scoreCredibilidad) AS credibilidadPromedio
ORDER BY totalNoticias DESC;

// ---------------------------------------------------------
// 6. Tendencia Temática (Noticias por Tema)
// ---------------------------------------------------------
// Identifica qué temas son los más candentes y su nivel de confianza general.
MATCH (n:Noticia)-[:PERTENECE_A]->(t:Tema)
RETURN t.nombre AS tema, count(n) AS cantidad, avg(n.scoreCredibilidad) AS credibilidadPromedio
ORDER BY cantidad DESC;

// ---------------------------------------------------------
// 7. Traversal 1: Recomendación Colaborativa (El motor de recomendación)
// ---------------------------------------------------------
// "Usuarios que confiaron en lo mismo que tú, también confiaron en..."
MATCH (yo:Usuario {id: 1})-[:VOTO {tipoVoto: 'VERDADERO'}]->(n1:Noticia)
      <-[:VOTO {tipoVoto: 'VERDADERO'}]-(otroUsuario:Usuario)
      -[:VOTO {tipoVoto: 'VERDADERO'}]->(nRecomendada:Noticia)
WHERE yo <> otroUsuario
  AND NOT (yo)-[:VOTO]->(nRecomendada)
  AND NOT (yo)-[:POSTEO]->(nRecomendada)
WITH nRecomendada, count(DISTINCT otroUsuario) as coincidencias
RETURN nRecomendada.titulo AS recomendacion, coincidencias
ORDER BY coincidencias DESC LIMIT 5;

// ---------------------------------------------------------
// 8. Traversal 2: Cadena de Propagación de Desinformación
// ---------------------------------------------------------
// Rastrear cómo se viralizó una noticia específica desde su creador
// saltando de usuario en usuario (hasta 5 niveles de profundidad).
MATCH path = (origen:Usuario)-[:POSTEO]->(n:Noticia {id: 1})<-[:COMPARTE*1..5]-(propagador:Usuario)
RETURN nodes(path) AS cadenaViral, length(path) AS saltos
ORDER BY saltos ASC;
