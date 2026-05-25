// FakeGraph - Schema Neo4j
// Ejecutar al iniciar la base de datos

CREATE CONSTRAINT noticia_id IF NOT EXISTS FOR (n:Noticia) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT fuente_id IF NOT EXISTS FOR (f:Fuente) REQUIRE f.id IS UNIQUE;
CREATE CONSTRAINT usuario_id IF NOT EXISTS FOR (u:Usuario) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT autor_id IF NOT EXISTS FOR (a:Autor) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT tema_id IF NOT EXISTS FOR (t:Tema) REQUIRE t.id IS UNIQUE;
CREATE CONSTRAINT claim_id IF NOT EXISTS FOR (c:Claim) REQUIRE c.id IS UNIQUE;

CREATE CONSTRAINT noticia_hash IF NOT EXISTS FOR (n:Noticia) REQUIRE n.hashContenido IS UNIQUE;
CREATE CONSTRAINT fuente_dominio IF NOT EXISTS FOR (f:Fuente) REQUIRE f.dominio IS UNIQUE;
CREATE CONSTRAINT claim_hash IF NOT EXISTS FOR (c:Claim) REQUIRE c.hash IS UNIQUE;

CREATE INDEX noticia_fecha IF NOT EXISTS FOR (n:Noticia) ON (n.fechaPublicacion);
CREATE INDEX noticia_score IF NOT EXISTS FOR (n:Noticia) ON (n.scoreCredibilidad);
CREATE INDEX usuario_seguidores IF NOT EXISTS FOR (u:Usuario) ON (u.seguidores);

CREATE CONSTRAINT metrica_id IF NOT EXISTS FOR (m:MetricaConsulta) REQUIRE m.id IS UNIQUE;
CREATE INDEX metrica_timestamp IF NOT EXISTS FOR (m:MetricaConsulta) ON (m.timestamp);
CREATE INDEX metrica_endpoint IF NOT EXISTS FOR (m:MetricaConsulta) ON (m.endpoint);
