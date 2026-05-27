// FakeGraph — Migración V001: Schema, Constraints e Índices
// Este archivo se ejecuta UNA sola vez al iniciar la aplicación (neo4j-migrations).
// IMPORTANTE: No modificar este archivo una vez ejecutado en producción.
// Para cambios de schema, crear V002, V003, etc.

// =============================================================================
// CONSTRAINTS DE UNICIDAD
// Garantizan que MERGE funcione correctamente sin crear duplicados.
// =============================================================================

// La URL es la clave de deduplicación de noticias.
// Si una URL ya existe, MERGE la retorna sin crear un nuevo nodo.
CREATE CONSTRAINT noticia_url IF NOT EXISTS
  FOR (n:Noticia) REQUIRE n.url IS UNIQUE;

// El dominio es la clave de deduplicación de fuentes.
// Se extrae automáticamente de la URL al crear una noticia.
CREATE CONSTRAINT fuente_dominio IF NOT EXISTS
  FOR (f:Fuente) REQUIRE f.dominio IS UNIQUE;

// El email es la clave de unicidad de usuarios.
// Un usuario no puede registrarse dos veces con el mismo email.
CREATE CONSTRAINT usuario_email IF NOT EXISTS
  FOR (u:Usuario) REQUIRE u.email IS UNIQUE;

// El nombre del tema es único (Política, Salud, Economía, etc.)
CREATE CONSTRAINT tema_nombre IF NOT EXISTS
  FOR (t:Tema) REQUIRE t.nombre IS UNIQUE;

// =============================================================================
// ÍNDICES PARA QUERIES FRECUENTES
// Mejoran el rendimiento de las consultas más usadas en el dashboard.
// =============================================================================

// Ordenar noticias por credibilidad (dashboard principal)
CREATE INDEX noticia_score IF NOT EXISTS
  FOR (n:Noticia) ON (n.scoreCredibilidad);

// Ordenar noticias por fecha de publicación (timeline)
CREATE INDEX noticia_fecha IF NOT EXISTS
  FOR (n:Noticia) ON (n.fechaPublicacion);

// Filtrar fuentes verificadas vs no verificadas
CREATE INDEX fuente_verificada IF NOT EXISTS
  FOR (f:Fuente) ON (f.verificada);
