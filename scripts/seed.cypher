// FakeGraph - Seed data de prueba

CREATE (f1:Fuente {id: 'f1', nombre: 'Reuters', dominio: 'reuters.com', verificada: true, puntajeHistorial: 0.92})
CREATE (f2:Fuente {id: 'f2', nombre: 'AP News', dominio: 'apnews.com', verificada: true, puntajeHistorial: 0.89})
CREATE (f3:Fuente {id: 'f3', nombre: 'El País', dominio: 'elpais.com', verificada: true, puntajeHistorial: 0.78})
CREATE (f4:Fuente {id: 'f4', nombre: 'Noticias Ya', dominio: 'noticiasya.com', verificada: false, puntajeHistorial: 0.15})
CREATE (f5:Fuente {id: 'f5', nombre: 'El Confidente', dominio: 'elconfidente.net', verificada: false, puntajeHistorial: 0.08})
CREATE (f6:Fuente {id: 'f6', nombre: 'InfoExpress', dominio: 'infoexpress.org', verificada: false, puntajeHistorial: 0.12})

CREATE (t1:Tema {id: 't1', nombre: 'Política'})
CREATE (t2:Tema {id: 't2', nombre: 'Salud'})
CREATE (t3:Tema {id: 't3', nombre: 'Economía'})
CREATE (t4:Tema {id: 't4', nombre: 'Tecnología'})
CREATE (t5:Tema {id: 't5', nombre: 'Ciencia'})

CREATE (c1:Claim {id: 'c1', texto: 'Las vacunas causan autismo', hash: 'hash001'})
CREATE (c2:Claim {id: 'c2', texto: 'El gobierno oculta cura del cáncer', hash: 'hash002'})
CREATE (c3:Claim {id: 'c3', texto: 'Nuevo impuesto del 50% a pymes', hash: 'hash003'})
CREATE (c4:Claim {id: 'c4', texto: 'Descubren reactor de fusión fría', hash: 'hash004'})

CREATE (a1:Autor {id: 'a1', nombre: 'Carlos Pérez', handle: '@carlosperez'})
CREATE (a2:Autor {id: 'a2', nombre: 'María García', handle: '@mariagarcia'})
CREATE (a3:Autor {id: 'a3', nombre: 'Juan López', handle: '@juanlopez'})
CREATE (a4:Autor {id: 'a4', nombre: 'Ana Martínez', handle: '@anamartinez'})

CREATE (n1:Noticia {id: 'n1', titulo: 'Estudio confirma seguridad de vacunas infantiles',
  contenido: 'Un estudio publicado en The Lancet confirma que no existe relación entre vacunas y autismo...',
  hashContenido: 'h_n1', url: 'reuters.com/salud/vacunas', fechaPublicacion: datetime('2026-05-01T10:00:00'), scoreCredibilidad: 0.85})

CREATE (n2:Noticia {id: 'n2', titulo: 'ONG denuncia: gobierno oculta cura del cáncer',
  contenido: 'Una organización no verificada afirma que el gobierno oculta una cura milagrosa...',
  hashContenido: 'h_n2', url: 'elconfidente.net/salud/cura-cancer', fechaPublicacion: datetime('2026-05-03T14:30:00'), scoreCredibilidad: 0.12})

CREATE (n3:Noticia {id: 'n3', titulo: 'Nueva política impositiva para pequeñas empresas',
  contenido: 'El ministro de economía anunció un nuevo paquete de medidas fiscales...',
  hashContenido: 'h_n3', url: 'elpais.com/economia/impuestos', fechaPublicacion: datetime('2026-05-05T09:00:00'), scoreCredibilidad: 0.72})

CREATE (n4:Noticia {id: 'n4', titulo: 'Científicos logran fusión fría a temperatura ambiente',
  contenido: 'Un laboratorio no acreditado afirma haber logrado fusión fría...',
  hashContenido: 'h_n4', url: 'infoexpress.org/ciencia/fusion', fechaPublicacion: datetime('2026-05-07T18:00:00'), scoreCredibilidad: 0.08})

CREATE (n5:Noticia {id: 'n5', titulo: 'Vacunas y autismo: el mito que no muere',
  contenido: 'A pesar de múltiples estudios que lo desmienten, el mito persiste en redes sociales...',
  hashContenido: 'h_n5', url: 'apnews.com/salud/vacunas-mito', fechaPublicacion: datetime('2026-05-08T11:00:00'), scoreCredibilidad: 0.90})

CREATE (n6:Noticia {id: 'n6', titulo: 'Récord de desempleo en el tercer trimestre',
  contenido: 'Las cifras de desempleo alcanzaron su nivel más alto en 5 años...',
  hashContenido: 'h_n6', url: 'reuters.com/economia/desempleo', fechaPublicacion: datetime('2026-05-10T08:00:00'), scoreCredibilidad: 0.80})

MATCH (n1:Noticia {id: 'n1'}), (f1:Fuente {id: 'f1'}) CREATE (n1)-[:PROVIENE_DE]->(f1);
MATCH (n2:Noticia {id: 'n2'}), (f5:Fuente {id: 'f5'}) CREATE (n2)-[:PROVIENE_DE]->(f5);
MATCH (n3:Noticia {id: 'n3'}), (f3:Fuente {id: 'f3'}) CREATE (n3)-[:PROVIENE_DE]->(f3);
MATCH (n4:Noticia {id: 'n4'}), (f6:Fuente {id: 'f6'}) CREATE (n4)-[:PROVIENE_DE]->(f6);
MATCH (n5:Noticia {id: 'n5'}), (f2:Fuente {id: 'f2'}) CREATE (n5)-[:PROVIENE_DE]->(f2);
MATCH (n6:Noticia {id: 'n6'}), (f1:Fuente {id: 'f1'}) CREATE (n6)-[:PROVIENE_DE]->(f1);

MATCH (n1:Noticia {id: 'n1'}), (t2:Tema {id: 't2'}) CREATE (n1)-[:PERTENECE_A]->(t2);
MATCH (n2:Noticia {id: 'n2'}), (t2:Tema {id: 't2'}) CREATE (n2)-[:PERTENECE_A]->(t2);
MATCH (n3:Noticia {id: 'n3'}), (t3:Tema {id: 't3'}) CREATE (n3)-[:PERTENECE_A]->(t3);
MATCH (n4:Noticia {id: 'n4'}), (t5:Tema {id: 't5'}) CREATE (n4)-[:PERTENECE_A]->(t5);
MATCH (n5:Noticia {id: 'n5'}), (t2:Tema {id: 't2'}) CREATE (n5)-[:PERTENECE_A]->(t2);
MATCH (n6:Noticia {id: 'n6'}), (t3:Tema {id: 't3'}) CREATE (n6)-[:PERTENECE_A]->(t3);

MATCH (a1:Autor {id: 'a1'}), (n6:Noticia {id: 'n6'}) CREATE (a1)-[:PUBLICA]->(n6);
MATCH (a2:Autor {id: 'a2'}), (n1:Noticia {id: 'n1'}) CREATE (a2)-[:PUBLICA]->(n1);
MATCH (a2:Autor {id: 'a2'}), (n5:Noticia {id: 'n5'}) CREATE (a2)-[:PUBLICA]->(n5);
MATCH (a3:Autor {id: 'a3'}), (n2:Noticia {id: 'n2'}) CREATE (a3)-[:PUBLICA]->(n2);
MATCH (a3:Autor {id: 'a3'}), (n4:Noticia {id: 'n4'}) CREATE (a3)-[:PUBLICA]->(n4);
MATCH (a4:Autor {id: 'a4'}), (n3:Noticia {id: 'n3'}) CREATE (a4)-[:PUBLICA]->(n3);

MATCH (n2:Noticia {id: 'n2'}), (c2:Claim {id: 'c2'}) CREATE (n2)-[:AFIRMA]->(c2);
MATCH (n4:Noticia {id: 'n4'}), (c4:Claim {id: 'c4'}) CREATE (n4)-[:AFIRMA]->(c4);

MATCH (n5:Noticia {id: 'n5'}), (c1:Claim {id: 'c1'}) CREATE (n5)-[:DESMIENTE]->(c1);

MATCH (n5:Noticia {id: 'n5'}), (n1:Noticia {id: 'n1'}) CREATE (n5)-[:CITA]->(n1);

CREATE (:Usuario {id: 'u1', nombre: 'UsuarioBot1', seguidores: 120, antiguedadDias: 3}),
       (:Usuario {id: 'u2', nombre: 'UsuarioBot2', seguidores: 45, antiguedadDias: 5}),
       (:Usuario {id: 'u3', nombre: 'UsuarioReal1', seguidores: 1500, antiguedadDias: 720}),
       (:Usuario {id: 'u4', nombre: 'UsuarioBot3', seguidores: 80, antiguedadDias: 2}),
       (:Usuario {id: 'u5', nombre: 'UsuarioReal2', seguidores: 3200, antiguedadDias: 1095}),
       (:Usuario {id: 'u6', nombre: 'UsuarioBot4', seguidores: 200, antiguedadDias: 10}),
       (:Usuario {id: 'u7', nombre: 'UsuarioReal3', seguidores: 890, antiguedadDias: 540}),
       (:Usuario {id: 'u8', nombre: 'UsuarioBot5', seguidores: 30, antiguedadDias: 1}),
       (:Usuario {id: 'u9', nombre: 'UsuarioBot6', seguidores: 150, antiguedadDias: 7}),
       (:Usuario {id: 'u10', nombre: 'UsuarioReal4', seguidores: 2100, antiguedadDias: 800});

MATCH (u1:Usuario {id: 'u1'}), (n2:Noticia {id: 'n2'}) CREATE (u1)-[:COMPARTE {timestamp: datetime('2026-05-03T15:00:00'), plataforma: 'twitter'}]->(n2);
MATCH (u2:Usuario {id: 'u2'}), (n2:Noticia {id: 'n2'}) CREATE (u2)-[:COMPARTE {timestamp: datetime('2026-05-03T15:05:00'), plataforma: 'twitter'}]->(n2);
MATCH (u4:Usuario {id: 'u4'}), (n2:Noticia {id: 'n2'}) CREATE (u4)-[:COMPARTE {timestamp: datetime('2026-05-03T15:10:00'), plataforma: 'facebook'}]->(n2);
MATCH (u6:Usuario {id: 'u6'}), (n2:Noticia {id: 'n2'}) CREATE (u6)-[:COMPARTE {timestamp: datetime('2026-05-03T15:20:00'), plataforma: 'twitter'}]->(n2);
MATCH (u8:Usuario {id: 'u8'}), (n2:Noticia {id: 'n2'}) CREATE (u8)-[:COMPARTE {timestamp: datetime('2026-05-03T16:00:00'), plataforma: 'twitter'}]->(n2);
MATCH (u9:Usuario {id: 'u9'}), (n2:Noticia {id: 'n2'}) CREATE (u9)-[:COMPARTE {timestamp: datetime('2026-05-03T16:30:00'), plataforma: 'facebook'}]->(n2);

MATCH (u1:Usuario {id: 'u1'}), (n4:Noticia {id: 'n4'}) CREATE (u1)-[:COMPARTE {timestamp: datetime('2026-05-07T18:30:00'), plataforma: 'twitter'}]->(n4);
MATCH (u2:Usuario {id: 'u2'}), (n4:Noticia {id: 'n4'}) CREATE (u2)-[:COMPARTE {timestamp: datetime('2026-05-07T18:45:00'), plataforma: 'twitter'}]->(n4);
MATCH (u4:Usuario {id: 'u4'}), (n4:Noticia {id: 'n4'}) CREATE (u4)-[:COMPARTE {timestamp: datetime('2026-05-07T19:00:00'), plataforma: 'twitter'}]->(n4);
MATCH (u6:Usuario {id: 'u6'}), (n4:Noticia {id: 'n4'}) CREATE (u6)-[:COMPARTE {timestamp: datetime('2026-05-07T19:30:00'), plataforma: 'facebook'}]->(n4);
MATCH (u8:Usuario {id: 'u8'}), (n4:Noticia {id: 'n4'}) CREATE (u8)-[:COMPARTE {timestamp: datetime('2026-05-07T20:00:00'), plataforma: 'twitter'}]->(n4);
MATCH (u9:Usuario {id: 'u9'}), (n4:Noticia {id: 'n4'}) CREATE (u9)-[:COMPARTE {timestamp: datetime('2026-05-07T20:15:00'), plataforma: 'twitter'}]->(n4);

MATCH (u3:Usuario {id: 'u3'}), (n1:Noticia {id: 'n1'}) CREATE (u3)-[:COMPARTE {timestamp: datetime('2026-05-01T12:00:00'), plataforma: 'twitter'}]->(n1);
MATCH (u5:Usuario {id: 'u5'}), (n1:Noticia {id: 'n1'}) CREATE (u5)-[:COMPARTE {timestamp: datetime('2026-05-01T14:00:00'), plataforma: 'linkedin'}]->(n1);
MATCH (u7:Usuario {id: 'u7'}), (n1:Noticia {id: 'n1'}) CREATE (u7)-[:COMPARTE {timestamp: datetime('2026-05-01T16:00:00'), plataforma: 'twitter'}]->(n1);
MATCH (u10:Usuario {id: 'u10'}), (n1:Noticia {id: 'n1'}) CREATE (u10)-[:COMPARTE {timestamp: datetime('2026-05-02T09:00:00'), plataforma: 'twitter'}]->(n1);

MATCH (u3:Usuario {id: 'u3'}), (n3:Noticia {id: 'n3'}) CREATE (u3)-[:COMPARTE {timestamp: datetime('2026-05-05T10:00:00'), plataforma: 'twitter'}]->(n3);
MATCH (u5:Usuario {id: 'u5'}), (n3:Noticia {id: 'n3'}) CREATE (u5)-[:COMPARTE {timestamp: datetime('2026-05-05T11:00:00'), plataforma: 'linkedin'}]->(n3);
MATCH (u7:Usuario {id: 'u7'}), (n3:Noticia {id: 'n3'}) CREATE (u7)-[:COMPARTE {timestamp: datetime('2026-05-05T12:00:00'), plataforma: 'twitter'}]->(n3);

MATCH (u3:Usuario {id: 'u3'}), (n5:Noticia {id: 'n5'}) CREATE (u3)-[:COMPARTE {timestamp: datetime('2026-05-08T14:00:00'), plataforma: 'twitter'}]->(n5);
MATCH (u5:Usuario {id: 'u5'}), (n5:Noticia {id: 'n5'}) CREATE (u5)-[:COMPARTE {timestamp: datetime('2026-05-08T15:00:00'), plataforma: 'twitter'}]->(n5);
MATCH (u10:Usuario {id: 'u10'}), (n5:Noticia {id: 'n5'}) CREATE (u10)-[:COMPARTE {timestamp: datetime('2026-05-08T16:00:00'), plataforma: 'linkedin'}]->(n5);
