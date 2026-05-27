// FakeGraph — Migración V002: Datos de Prueba (Seed Data)
// Usa MERGE + SET para ser IDEMPOTENTE: se puede ejecutar múltiples veces
// sin crear duplicados. Si el nodo ya existe, solo actualiza sus propiedades.
//
// Estructura del seed:
//   1. Fuentes (sitios web verificados y no verificados)
//   2. Temas (categorías de noticias)
//   3. Usuarios de prueba
//   4. Noticias (con deduplicación por URL)
//   5. Relaciones Noticia → Fuente (PUBLICADA_EN)
//   6. Relaciones Noticia → Tema (PERTENECE_A)
//   7. Relaciones Usuario → Noticia (POSTEO)
//   8. Relaciones Usuario → Noticia (VOTO con tipoVoto)
//   9. Relaciones Usuario → Noticia (COMPARTE / reposteo)

// =============================================================================
// 1. FUENTES
// =============================================================================

MERGE (f1:Fuente {dominio: 'reuters.com'})
SET f1.nombre = 'Reuters', f1.verificada = true, f1.scoreCredibilidad = 0.92;

MERGE (f2:Fuente {dominio: 'apnews.com'})
SET f2.nombre = 'AP News', f2.verificada = true, f2.scoreCredibilidad = 0.89;

MERGE (f3:Fuente {dominio: 'elpais.com'})
SET f3.nombre = 'El País', f3.verificada = true, f3.scoreCredibilidad = 0.85;

MERGE (f4:Fuente {dominio: 'bbc.com'})
SET f4.nombre = 'BBC Mundo', f4.verificada = true, f4.scoreCredibilidad = 0.91;

MERGE (f5:Fuente {dominio: 'infobae.com'})
SET f5.nombre = 'Infobae', f5.verificada = true, f5.scoreCredibilidad = 0.72;

MERGE (f6:Fuente {dominio: 'noticiasya.com'})
SET f6.nombre = 'Noticias Ya', f6.verificada = false, f6.scoreCredibilidad = 0.15;

MERGE (f7:Fuente {dominio: 'elconfidente.net'})
SET f7.nombre = 'El Confidente', f7.verificada = false, f7.scoreCredibilidad = 0.08;

MERGE (f8:Fuente {dominio: 'lapostadiaria.com'})
SET f8.nombre = 'La Posta Diaria', f8.verificada = false, f8.scoreCredibilidad = 0.12;

// =============================================================================
// 2. TEMAS
// =============================================================================

MERGE (t1:Tema {nombre: 'Política'});
MERGE (t2:Tema {nombre: 'Salud'});
MERGE (t3:Tema {nombre: 'Economía'});
MERGE (t4:Tema {nombre: 'Tecnología'});
MERGE (t5:Tema {nombre: 'Ciencia'});
MERGE (t6:Tema {nombre: 'Sociedad'});

// =============================================================================
// 3. USUARIOS DE PRUEBA
// =============================================================================

MERGE (u1:Usuario {email: 'ana@example.com'})
SET u1.nombre = 'Ana García', u1.scoreCredibilidad = 75;

MERGE (u2:Usuario {email: 'carlos@example.com'})
SET u2.nombre = 'Carlos López', u2.scoreCredibilidad = 60;

MERGE (u3:Usuario {email: 'maria@example.com'})
SET u3.nombre = 'María Fernández', u3.scoreCredibilidad = 90;

MERGE (u4:Usuario {email: 'pedro@example.com'})
SET u4.nombre = 'Pedro Ramírez', u4.scoreCredibilidad = 30;

MERGE (u5:Usuario {email: 'lucia@example.com'})
SET u5.nombre = 'Lucía Martínez', u5.scoreCredibilidad = 85;

// =============================================================================
// 4. NOTICIAS
// La URL es la clave de deduplicación (MERGE por URL).
// scoreCredibilidad inicial = 0.5 (neutro), se recalcula con los votos.
// =============================================================================

MERGE (n1:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'})
SET n1.titulo = 'Estudio confirma seguridad de vacunas infantiles',
    n1.autorNombre = 'Dr. James Wilson',
    n1.fechaPublicacion = datetime('2026-05-01T10:00:00'),
    n1.scoreCredibilidad = 0.87;

MERGE (n2:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'})
SET n2.titulo = 'ONG denuncia: gobierno oculta cura del cáncer',
    n2.autorNombre = null,
    n2.fechaPublicacion = datetime('2026-05-03T14:30:00'),
    n2.scoreCredibilidad = 0.12;

MERGE (n3:Noticia {url: 'https://elpais.com/economia/2026/nueva-politica-impositiva-pymes'})
SET n3.titulo = 'Nueva política impositiva para pequeñas empresas',
    n3.autorNombre = 'Redacción El País',
    n3.fechaPublicacion = datetime('2026-05-05T09:00:00'),
    n3.scoreCredibilidad = 0.75;

MERGE (n4:Noticia {url: 'https://noticiasya.com/fusion-fria-temperatura-ambiente'})
SET n4.titulo = 'Científicos logran fusión fría a temperatura ambiente',
    n4.autorNombre = null,
    n4.fechaPublicacion = datetime('2026-05-07T18:00:00'),
    n4.scoreCredibilidad = 0.08;

MERGE (n5:Noticia {url: 'https://apnews.com/salud/2026/vacunas-autismo-mito'})
SET n5.titulo = 'Vacunas y autismo: el mito que no muere',
    n5.autorNombre = 'Sarah Johnson',
    n5.fechaPublicacion = datetime('2026-05-08T11:00:00'),
    n5.scoreCredibilidad = 0.92;

MERGE (n6:Noticia {url: 'https://reuters.com/economia/2026/desempleo-tercer-trimestre'})
SET n6.titulo = 'Récord de desempleo en el tercer trimestre',
    n6.autorNombre = 'Reuters Staff',
    n6.fechaPublicacion = datetime('2026-05-10T08:00:00'),
    n6.scoreCredibilidad = 0.82;

MERGE (n7:Noticia {url: 'https://lapostadiaria.com/fraude-electoral-masivo'})
SET n7.titulo = 'Diputado denuncia fraude electoral masivo sin presentar pruebas',
    n7.autorNombre = null,
    n7.fechaPublicacion = datetime('2026-05-12T09:00:00'),
    n7.scoreCredibilidad = 0.15;

MERGE (n8:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'})
SET n8.titulo = 'Nueva vacuna contra el cáncer muestra resultados prometedores',
    n8.autorNombre = 'BBC Health',
    n8.fechaPublicacion = datetime('2026-05-14T11:00:00'),
    n8.scoreCredibilidad = 0.88;

MERGE (n9:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'})
SET n9.titulo = 'Supuesto chip 5G vinculado a enfermedades respiratorias',
    n9.autorNombre = null,
    n9.fechaPublicacion = datetime('2026-05-15T16:00:00'),
    n9.scoreCredibilidad = 0.05;

MERGE (n10:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
SET n10.titulo = 'Inteligencia Artificial revoluciona el diagnóstico médico',
    n10.autorNombre = 'Redacción Infobae',
    n10.fechaPublicacion = datetime('2026-05-20T10:00:00'),
    n10.scoreCredibilidad = 0.78;

// =============================================================================
// 5. RELACIONES: Noticia → Fuente (PUBLICADA_EN)
// =============================================================================

MATCH (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'}),
      (f:Fuente {dominio: 'reuters.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'}),
      (f:Fuente {dominio: 'elconfidente.net'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://elpais.com/economia/2026/nueva-politica-impositiva-pymes'}),
      (f:Fuente {dominio: 'elpais.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://noticiasya.com/fusion-fria-temperatura-ambiente'}),
      (f:Fuente {dominio: 'noticiasya.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://apnews.com/salud/2026/vacunas-autismo-mito'}),
      (f:Fuente {dominio: 'apnews.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://reuters.com/economia/2026/desempleo-tercer-trimestre'}),
      (f:Fuente {dominio: 'reuters.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://lapostadiaria.com/fraude-electoral-masivo'}),
      (f:Fuente {dominio: 'lapostadiaria.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'}),
      (f:Fuente {dominio: 'bbc.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'}),
      (f:Fuente {dominio: 'elconfidente.net'})
MERGE (n)-[:PUBLICADA_EN]->(f);

MATCH (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'}),
      (f:Fuente {dominio: 'infobae.com'})
MERGE (n)-[:PUBLICADA_EN]->(f);

// =============================================================================
// 6. RELACIONES: Noticia → Tema (PERTENECE_A)
// =============================================================================

MATCH (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'}),
      (t:Tema {nombre: 'Salud'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'}),
      (t:Tema {nombre: 'Salud'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://elpais.com/economia/2026/nueva-politica-impositiva-pymes'}),
      (t:Tema {nombre: 'Economía'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://noticiasya.com/fusion-fria-temperatura-ambiente'}),
      (t:Tema {nombre: 'Ciencia'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://apnews.com/salud/2026/vacunas-autismo-mito'}),
      (t:Tema {nombre: 'Salud'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://reuters.com/economia/2026/desempleo-tercer-trimestre'}),
      (t:Tema {nombre: 'Economía'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://lapostadiaria.com/fraude-electoral-masivo'}),
      (t:Tema {nombre: 'Política'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'}),
      (t:Tema {nombre: 'Salud'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'}),
      (t:Tema {nombre: 'Tecnología'})
MERGE (n)-[:PERTENECE_A]->(t);

MATCH (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'}),
      (t:Tema {nombre: 'Tecnología'})
MERGE (n)-[:PERTENECE_A]->(t);

// =============================================================================
// 7. RELACIONES: Usuario → Noticia (POSTEO)
// Quién cargó la noticia en la plataforma FakeGraph.
// =============================================================================

MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-01T12:00:00')}]->(n);

MATCH (u:Usuario {email: 'carlos@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-03T15:00:00')}]->(n);

MATCH (u:Usuario {email: 'maria@example.com'}),
      (n:Noticia {url: 'https://elpais.com/economia/2026/nueva-politica-impositiva-pymes'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-05T10:00:00')}]->(n);

MATCH (u:Usuario {email: 'pedro@example.com'}),
      (n:Noticia {url: 'https://noticiasya.com/fusion-fria-temperatura-ambiente'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-07T19:00:00')}]->(n);

MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://apnews.com/salud/2026/vacunas-autismo-mito'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-08T13:00:00')}]->(n);

MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://reuters.com/economia/2026/desempleo-tercer-trimestre'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-10T09:00:00')}]->(n);

MATCH (u:Usuario {email: 'carlos@example.com'}),
      (n:Noticia {url: 'https://lapostadiaria.com/fraude-electoral-masivo'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-12T10:00:00')}]->(n);

MATCH (u:Usuario {email: 'maria@example.com'}),
      (n:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-14T12:00:00')}]->(n);

MATCH (u:Usuario {email: 'pedro@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-15T17:00:00')}]->(n);

MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
MERGE (u)-[:POSTEO {fecha: datetime('2026-05-20T11:00:00')}]->(n);

// =============================================================================
// 8. RELACIONES: Usuario → Noticia (VOTO)
// Votos de usuarios sobre noticias. Afectan el scoreCredibilidad.
// tipoVoto: VERDADERO | FALSO | DUDOSO
// =============================================================================

// Noticias confiables — mayoría vota VERDADERO
MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-01T14:00:00'), v.comentario = 'Fuente confiable, estudio revisado por pares.';

MATCH (u:Usuario {email: 'maria@example.com'}),
      (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-02T09:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-02T10:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'pedro@example.com'}),
      (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'DUDOSO', v.fecha = datetime('2026-05-03T08:00:00'), v.comentario = 'No leí el estudio completo.';

// Noticias falsas — mayoría vota FALSO
MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-04T10:00:00'), v.comentario = 'No hay ninguna evidencia científica.';

MATCH (u:Usuario {email: 'maria@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-04T11:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-04T12:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'carlos@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-04T13:00:00'), v.comentario = 'Yo lo vi en varios lados.';

// Chip 5G — totalmente falso
MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-16T09:00:00'), v.comentario = 'Desinformación comprobada.';

MATCH (u:Usuario {email: 'maria@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-16T10:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-16T11:00:00'), v.comentario = null;

// Vacuna contra el cáncer — confiable
MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-14T15:00:00'), v.comentario = 'BBC es una fuente verificada.';

MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-14T16:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'carlos@example.com'}),
      (n:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'DUDOSO', v.fecha = datetime('2026-05-14T17:00:00'), v.comentario = 'Hay que esperar más estudios.';

// IA en diagnóstico médico — votos mixtos (noticia polémica)
MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-21T09:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'carlos@example.com'}),
      (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-21T10:00:00'), v.comentario = 'El 95% me parece exagerado.';

MATCH (u:Usuario {email: 'pedro@example.com'}),
      (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'VERDADERO', v.fecha = datetime('2026-05-21T11:00:00'), v.comentario = null;

MATCH (u:Usuario {email: 'maria@example.com'}),
      (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
MERGE (u)-[v:VOTO]->(n)
SET v.tipoVoto = 'FALSO', v.fecha = datetime('2026-05-21T12:00:00'), v.comentario = 'Infobae no siempre es confiable en tech.';

// =============================================================================
// 9. RELACIONES: Usuario → Noticia (COMPARTE / Reposteo)
// Difusión de noticias. Permite trazar la cadena de propagación.
// =============================================================================

// Noticias falsas con alta difusión (caso sospechoso)
MATCH (u:Usuario {email: 'pedro@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/gobierno-oculta-cura-cancer'})
MERGE (u)-[:COMPARTE {timestamp: datetime('2026-05-05T10:00:00'), plataforma: 'web'}]->(n);

MATCH (u:Usuario {email: 'carlos@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'})
MERGE (u)-[:COMPARTE {timestamp: datetime('2026-05-16T14:00:00'), plataforma: 'web'}]->(n);

MATCH (u:Usuario {email: 'pedro@example.com'}),
      (n:Noticia {url: 'https://elconfidente.net/chip-5g-enfermedades'})
MERGE (u)-[:COMPARTE {timestamp: datetime('2026-05-16T15:00:00'), plataforma: 'web'}]->(n);

// Noticias confiables compartidas por usuarios de alta reputación
MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://reuters.com/salud/2026/vacunas-infantiles-seguras'})
MERGE (u)-[:COMPARTE {timestamp: datetime('2026-05-02T11:00:00'), plataforma: 'web'}]->(n);

MATCH (u:Usuario {email: 'maria@example.com'}),
      (n:Noticia {url: 'https://bbc.com/salud/2026/vacuna-cancer-resultados'})
MERGE (u)-[:COMPARTE {timestamp: datetime('2026-05-15T09:00:00'), plataforma: 'web'}]->(n);

MATCH (u:Usuario {email: 'ana@example.com'}),
      (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
MERGE (u)-[:COMPARTE {timestamp: datetime('2026-05-21T13:00:00'), plataforma: 'web'}]->(n);

MATCH (u:Usuario {email: 'lucia@example.com'}),
      (n:Noticia {url: 'https://infobae.com/tecnologia/2026/ia-diagnostico-medico'})
MERGE (u)-[:COMPARTE {timestamp: datetime('2026-05-21T14:00:00'), plataforma: 'web'}]->(n);
