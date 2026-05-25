// FakeGraph - Seed data de prueba (idempotente: usa MERGE para evitar duplicados)

// === Fuentes ===
MERGE (f1:Fuente {id: 'f1'}) SET f1.nombre = 'Reuters', f1.dominio = 'reuters.com', f1.verificada = true, f1.puntajeHistorial = 0.92
MERGE (f2:Fuente {id: 'f2'}) SET f2.nombre = 'AP News', f2.dominio = 'apnews.com', f2.verificada = true, f2.puntajeHistorial = 0.89
MERGE (f3:Fuente {id: 'f3'}) SET f3.nombre = 'El País', f3.dominio = 'elpais.com', f3.verificada = true, f3.puntajeHistorial = 0.78
MERGE (f4:Fuente {id: 'f4'}) SET f4.nombre = 'Noticias Ya', f4.dominio = 'noticiasya.com', f4.verificada = false, f4.puntajeHistorial = 0.15
MERGE (f5:Fuente {id: 'f5'}) SET f5.nombre = 'El Confidente', f5.dominio = 'elconfidente.net', f5.verificada = false, f5.puntajeHistorial = 0.08
MERGE (f6:Fuente {id: 'f6'}) SET f6.nombre = 'InfoExpress', f6.dominio = 'infoexpress.org', f6.verificada = false, f6.puntajeHistorial = 0.12
MERGE (f7:Fuente {id: 'f7'}) SET f7.nombre = 'BBC Mundo', f7.dominio = 'bbc.com', f7.verificada = true, f7.puntajeHistorial = 0.94
MERGE (f8:Fuente {id: 'f8'}) SET f8.nombre = 'La Posta Diaria', f8.dominio = 'lapostadiaria.com', f8.verificada = false, f8.puntajeHistorial = 0.05

// === Temas ===
MERGE (t1:Tema {id: 't1'}) SET t1.nombre = 'Política'
MERGE (t2:Tema {id: 't2'}) SET t2.nombre = 'Salud'
MERGE (t3:Tema {id: 't3'}) SET t3.nombre = 'Economía'
MERGE (t4:Tema {id: 't4'}) SET t4.nombre = 'Tecnología'
MERGE (t5:Tema {id: 't5'}) SET t5.nombre = 'Ciencia'
MERGE (t6:Tema {id: 't6'}) SET t6.nombre = 'Sociedad'

// === Claims ===
MERGE (c1:Claim {id: 'c1'}) SET c1.texto = 'Las vacunas causan autismo', c1.hash = 'hash001'
MERGE (c2:Claim {id: 'c2'}) SET c2.texto = 'El gobierno oculta cura del cáncer', c2.hash = 'hash002'
MERGE (c3:Claim {id: 'c3'}) SET c3.texto = 'Nuevo impuesto del 50% a pymes', c3.hash = 'hash003'
MERGE (c4:Claim {id: 'c4'}) SET c4.texto = 'Descubren reactor de fusión fría', c4.hash = 'hash004'
MERGE (c5:Claim {id: 'c5'}) SET c5.texto = 'Fraude electoral en elecciones presidenciales', c5.hash = 'hash005'
MERGE (c6:Claim {id: 'c6'}) SET c6.texto = 'Chip 5G causa cáncer', c6.hash = 'hash006'
MERGE (c7:Claim {id: 'c7'}) SET c7.texto = 'Gobierno repartirá bonos de $50,000', c7.hash = 'hash007'

// === Autores ===
MERGE (a1:Autor {id: 'a1'}) SET a1.nombre = 'Carlos Pérez', a1.handle = '@carlosperez'
MERGE (a2:Autor {id: 'a2'}) SET a2.nombre = 'María García', a2.handle = '@mariagarcia'
MERGE (a3:Autor {id: 'a3'}) SET a3.nombre = 'Juan López', a3.handle = '@juanlopez'
MERGE (a4:Autor {id: 'a4'}) SET a4.nombre = 'Ana Martínez', a4.handle = '@anamartinez'
MERGE (a5:Autor {id: 'a5'}) SET a5.nombre = 'Pedro Ramírez', a5.handle = '@pedroramirez'
MERGE (a6:Autor {id: 'a6'}) SET a6.nombre = 'Lucía Fernández', a6.handle = '@luciafer'

// === Noticias ===
MERGE (n1:Noticia {id: 'n1'}) SET n1.titulo = 'Estudio confirma seguridad de vacunas infantiles',
  n1.contenido = 'Un estudio publicado en The Lancet confirma que no existe relación entre vacunas y autismo...',
  n1.hashContenido = 'h_n1', n1.url = 'reuters.com/salud/vacunas', n1.fechaPublicacion = localdatetime('2026-05-01T10:00:00'), n1.scoreCredibilidad = 0.85

MERGE (n2:Noticia {id: 'n2'}) SET n2.titulo = 'ONG denuncia: gobierno oculta cura del cáncer',
  n2.contenido = 'Una organización no verificada afirma que el gobierno oculta una cura milagrosa...',
  n2.hashContenido = 'h_n2', n2.url = 'elconfidente.net/salud/cura-cancer', n2.fechaPublicacion = localdatetime('2026-05-03T14:30:00'), n2.scoreCredibilidad = 0.12

MERGE (n3:Noticia {id: 'n3'}) SET n3.titulo = 'Nueva política impositiva para pequeñas empresas',
  n3.contenido = 'El ministro de economía anunció un nuevo paquete de medidas fiscales...',
  n3.hashContenido = 'h_n3', n3.url = 'elpais.com/economia/impuestos', n3.fechaPublicacion = localdatetime('2026-05-05T09:00:00'), n3.scoreCredibilidad = 0.72

MERGE (n4:Noticia {id: 'n4'}) SET n4.titulo = 'Científicos logran fusión fría a temperatura ambiente',
  n4.contenido = 'Un laboratorio no acreditado afirma haber logrado fusión fría...',
  n4.hashContenido = 'h_n4', n4.url = 'infoexpress.org/ciencia/fusion', n4.fechaPublicacion = localdatetime('2026-05-07T18:00:00'), n4.scoreCredibilidad = 0.08

MERGE (n5:Noticia {id: 'n5'}) SET n5.titulo = 'Vacunas y autismo: el mito que no muere',
  n5.contenido = 'A pesar de múltiples estudios que lo desmienten, el mito persiste en redes sociales...',
  n5.hashContenido = 'h_n5', n5.url = 'apnews.com/salud/vacunas-mito', n5.fechaPublicacion = localdatetime('2026-05-08T11:00:00'), n5.scoreCredibilidad = 0.90

MERGE (n6:Noticia {id: 'n6'}) SET n6.titulo = 'Récord de desempleo en el tercer trimestre',
  n6.contenido = 'Las cifras de desempleo alcanzaron su nivel más alto en 5 años...',
  n6.hashContenido = 'h_n6', n6.url = 'reuters.com/economia/desempleo', n6.fechaPublicacion = localdatetime('2026-05-10T08:00:00'), n6.scoreCredibilidad = 0.80

MERGE (n7:Noticia {id: 'n7'}) SET n7.titulo = 'Diputado denuncia fraude electoral masivo',
  n7.contenido = 'Sin presentar pruebas, un diputado opositor afirma que hubo fraude en las últimas elecciones...',
  n7.hashContenido = 'h_n7', n7.url = 'lapostadiaria.com/politica/fraude', n7.fechaPublicacion = localdatetime('2026-05-12T09:00:00'), n7.scoreCredibilidad = 0.18

MERGE (n8:Noticia {id: 'n8'}) SET n8.titulo = 'Nueva vacuna contra el cáncer muestra resultados prometedores',
  n8.contenido = 'El ensayo clínico fase III demostró una reducción del 40% en la mortalidad...',
  n8.hashContenido = 'h_n8', n8.url = 'bbc.com/salud/vacuna-cancer', n8.fechaPublicacion = localdatetime('2026-05-14T11:00:00'), n8.scoreCredibilidad = 0.88

MERGE (n9:Noticia {id: 'n9'}) SET n9.titulo = 'Supuesto chip 5G vinculado a enfermedades respiratorias',
  n9.contenido = 'Un video viral afirma sin evidencia que las antenas 5G causan problemas respiratorios...',
  n9.hashContenido = 'h_n9', n9.url = 'elconfidente.net/tecnologia/chip-5g', n9.fechaPublicacion = localdatetime('2026-05-15T16:00:00'), n9.scoreCredibilidad = 0.05

MERGE (n10:Noticia {id: 'n10'}) SET n10.titulo = 'El Banco Central mantiene tasa de interés estable',
  n10.contenido = 'En su reunión mensual, el Banco Central decidió mantener la tasa de referencia...',
  n10.hashContenido = 'h_n10', n10.url = 'reuters.com/economia/tasas', n10.fechaPublicacion = localdatetime('2026-05-16T10:00:00'), n10.scoreCredibilidad = 0.95

MERGE (n11:Noticia {id: 'n11'}) SET n11.titulo = 'Crece el debate sobre la regulación de redes sociales',
  n11.contenido = 'Distintos sectores de la sociedad debaten sobre los límites de la libertad de expresión en plataformas digitales...',
  n11.hashContenido = 'h_n11', n11.url = 'elpais.com/sociedad/redes', n11.fechaPublicacion = localdatetime('2026-05-18T08:00:00'), n11.scoreCredibilidad = 0.55

MERGE (n12:Noticia {id: 'n12'}) SET n12.titulo = 'Polémica por recorte en presupuesto educativo',
  n12.contenido = 'El anuncio del recorte presupuestario generó fuertes críticas de sindicatos docentes...',
  n12.hashContenido = 'h_n12', n12.url = 'bbc.com/politica/educacion', n12.fechaPublicacion = localdatetime('2026-05-19T14:00:00'), n12.scoreCredibilidad = 0.42

MERGE (n13:Noticia {id: 'n13'}) SET n13.titulo = 'Gobierno anuncia bonos de $50,000 para familias',
  n13.contenido = 'Circula en WhatsApp una cadena afirmando que el gobierno repartirá bonos...',
  n13.hashContenido = 'h_n13', n13.url = 'noticiasya.com/economia/bonos', n13.fechaPublicacion = localdatetime('2026-05-20T09:00:00'), n13.scoreCredibilidad = 0.22

MERGE (n14:Noticia {id: 'n14'}) SET n14.titulo = 'Inteligencia Artificial revoluciona diagnóstico médico',
  n14.contenido = 'Un nuevo sistema de IA logra detectar enfermedades con un 95% de precisión...',
  n14.hashContenido = 'h_n14', n14.url = 'apnews.com/tecnologia/ia-salud', n14.fechaPublicacion = localdatetime('2026-05-22T10:00:00'), n14.scoreCredibilidad = 0.76

// === Relaciones Noticia -> Fuente ===
MATCH (n1:Noticia {id: 'n1'}), (f1:Fuente {id: 'f1'}) MERGE (n1)-[:PROVIENE_DE]->(f1);
MATCH (n2:Noticia {id: 'n2'}), (f5:Fuente {id: 'f5'}) MERGE (n2)-[:PROVIENE_DE]->(f5);
MATCH (n3:Noticia {id: 'n3'}), (f3:Fuente {id: 'f3'}) MERGE (n3)-[:PROVIENE_DE]->(f3);
MATCH (n4:Noticia {id: 'n4'}), (f6:Fuente {id: 'f6'}) MERGE (n4)-[:PROVIENE_DE]->(f6);
MATCH (n5:Noticia {id: 'n5'}), (f2:Fuente {id: 'f2'}) MERGE (n5)-[:PROVIENE_DE]->(f2);
MATCH (n6:Noticia {id: 'n6'}), (f1:Fuente {id: 'f1'}) MERGE (n6)-[:PROVIENE_DE]->(f1);
MATCH (n7:Noticia {id: 'n7'}), (f8:Fuente {id: 'f8'}) MERGE (n7)-[:PROVIENE_DE]->(f8);
MATCH (n8:Noticia {id: 'n8'}), (f7:Fuente {id: 'f7'}) MERGE (n8)-[:PROVIENE_DE]->(f7);
MATCH (n9:Noticia {id: 'n9'}), (f5:Fuente {id: 'f5'}) MERGE (n9)-[:PROVIENE_DE]->(f5);
MATCH (n10:Noticia {id: 'n10'}), (f1:Fuente {id: 'f1'}) MERGE (n10)-[:PROVIENE_DE]->(f1);
MATCH (n11:Noticia {id: 'n11'}), (f3:Fuente {id: 'f3'}) MERGE (n11)-[:PROVIENE_DE]->(f3);
MATCH (n12:Noticia {id: 'n12'}), (f7:Fuente {id: 'f7'}) MERGE (n12)-[:PROVIENE_DE]->(f7);
MATCH (n13:Noticia {id: 'n13'}), (f4:Fuente {id: 'f4'}) MERGE (n13)-[:PROVIENE_DE]->(f4);
MATCH (n14:Noticia {id: 'n14'}), (f2:Fuente {id: 'f2'}) MERGE (n14)-[:PROVIENE_DE]->(f2);

// === Relaciones Noticia -> Tema ===
MATCH (n1:Noticia {id: 'n1'}), (t2:Tema {id: 't2'}) MERGE (n1)-[:PERTENECE_A]->(t2);
MATCH (n2:Noticia {id: 'n2'}), (t2:Tema {id: 't2'}) MERGE (n2)-[:PERTENECE_A]->(t2);
MATCH (n3:Noticia {id: 'n3'}), (t3:Tema {id: 't3'}) MERGE (n3)-[:PERTENECE_A]->(t3);
MATCH (n4:Noticia {id: 'n4'}), (t5:Tema {id: 't5'}) MERGE (n4)-[:PERTENECE_A]->(t5);
MATCH (n5:Noticia {id: 'n5'}), (t2:Tema {id: 't2'}) MERGE (n5)-[:PERTENECE_A]->(t2);
MATCH (n6:Noticia {id: 'n6'}), (t3:Tema {id: 't3'}) MERGE (n6)-[:PERTENECE_A]->(t3);
MATCH (n7:Noticia {id: 'n7'}), (t1:Tema {id: 't1'}) MERGE (n7)-[:PERTENECE_A]->(t1);
MATCH (n8:Noticia {id: 'n8'}), (t2:Tema {id: 't2'}) MERGE (n8)-[:PERTENECE_A]->(t2);
MATCH (n9:Noticia {id: 'n9'}), (t4:Tema {id: 't4'}) MERGE (n9)-[:PERTENECE_A]->(t4);
MATCH (n10:Noticia {id: 'n10'}), (t3:Tema {id: 't3'}) MERGE (n10)-[:PERTENECE_A]->(t3);
MATCH (n11:Noticia {id: 'n11'}), (t6:Tema {id: 't6'}) MERGE (n11)-[:PERTENECE_A]->(t6);
MATCH (n12:Noticia {id: 'n12'}), (t1:Tema {id: 't1'}) MERGE (n12)-[:PERTENECE_A]->(t1);
MATCH (n13:Noticia {id: 'n13'}), (t3:Tema {id: 't3'}) MERGE (n13)-[:PERTENECE_A]->(t3);
MATCH (n14:Noticia {id: 'n14'}), (t4:Tema {id: 't4'}) MERGE (n14)-[:PERTENECE_A]->(t4);

// === Relaciones Autor -> Noticia ===
MATCH (a1:Autor {id: 'a1'}), (n6:Noticia {id: 'n6'}) MERGE (a1)-[:PUBLICA]->(n6);
MATCH (a2:Autor {id: 'a2'}), (n1:Noticia {id: 'n1'}) MERGE (a2)-[:PUBLICA]->(n1);
MATCH (a2:Autor {id: 'a2'}), (n5:Noticia {id: 'n5'}) MERGE (a2)-[:PUBLICA]->(n5);
MATCH (a2:Autor {id: 'a2'}), (n8:Noticia {id: 'n8'}) MERGE (a2)-[:PUBLICA]->(n8);
MATCH (a3:Autor {id: 'a3'}), (n2:Noticia {id: 'n2'}) MERGE (a3)-[:PUBLICA]->(n2);
MATCH (a3:Autor {id: 'a3'}), (n4:Noticia {id: 'n4'}) MERGE (a3)-[:PUBLICA]->(n4);
MATCH (a3:Autor {id: 'a3'}), (n9:Noticia {id: 'n9'}) MERGE (a3)-[:PUBLICA]->(n9);
MATCH (a4:Autor {id: 'a4'}), (n3:Noticia {id: 'n3'}) MERGE (a4)-[:PUBLICA]->(n3);
MATCH (a4:Autor {id: 'a4'}), (n11:Noticia {id: 'n11'}) MERGE (a4)-[:PUBLICA]->(n11);
MATCH (a5:Autor {id: 'a5'}), (n7:Noticia {id: 'n7'}) MERGE (a5)-[:PUBLICA]->(n7);
MATCH (a5:Autor {id: 'a5'}), (n13:Noticia {id: 'n13'}) MERGE (a5)-[:PUBLICA]->(n13);
MATCH (a6:Autor {id: 'a6'}), (n10:Noticia {id: 'n10'}) MERGE (a6)-[:PUBLICA]->(n10);
MATCH (a6:Autor {id: 'a6'}), (n12:Noticia {id: 'n12'}) MERGE (a6)-[:PUBLICA]->(n12);
MATCH (a6:Autor {id: 'a6'}), (n14:Noticia {id: 'n14'}) MERGE (a6)-[:PUBLICA]->(n14);

// === Relaciones Noticia -> Claim ===
MATCH (n2:Noticia {id: 'n2'}), (c2:Claim {id: 'c2'}) MERGE (n2)-[:AFIRMA]->(c2);
MATCH (n4:Noticia {id: 'n4'}), (c4:Claim {id: 'c4'}) MERGE (n4)-[:AFIRMA]->(c4);
MATCH (n5:Noticia {id: 'n5'}), (c1:Claim {id: 'c1'}) MERGE (n5)-[:DESMIENTE]->(c1);
MATCH (n5:Noticia {id: 'n5'}), (n1:Noticia {id: 'n1'}) MERGE (n5)-[:CITA]->(n1);
MATCH (n7:Noticia {id: 'n7'}), (c5:Claim {id: 'c5'}) MERGE (n7)-[:AFIRMA]->(c5);
MATCH (n9:Noticia {id: 'n9'}), (c6:Claim {id: 'c6'}) MERGE (n9)-[:AFIRMA]->(c6);
MATCH (n13:Noticia {id: 'n13'}), (c7:Claim {id: 'c7'}) MERGE (n13)-[:AFIRMA]->(c7);
MATCH (n8:Noticia {id: 'n8'}), (c2:Claim {id: 'c2'}) MERGE (n8)-[:DESMIENTE]->(c2);
MATCH (n14:Noticia {id: 'n14'}), (c6:Claim {id: 'c6'}) MERGE (n14)-[:DESMIENTE]->(c6);

// === Usuarios ===
MERGE (u1:Usuario {id: 'u1'}) SET u1.nombre = 'UsuarioBot1', u1.seguidores = 120, u1.antiguedadDias = 3
MERGE (u2:Usuario {id: 'u2'}) SET u2.nombre = 'UsuarioBot2', u2.seguidores = 45, u2.antiguedadDias = 5
MERGE (u3:Usuario {id: 'u3'}) SET u3.nombre = 'UsuarioReal1', u3.seguidores = 1500, u3.antiguedadDias = 720
MERGE (u4:Usuario {id: 'u4'}) SET u4.nombre = 'UsuarioBot3', u4.seguidores = 80, u4.antiguedadDias = 2
MERGE (u5:Usuario {id: 'u5'}) SET u5.nombre = 'UsuarioReal2', u5.seguidores = 3200, u5.antiguedadDias = 1095
MERGE (u6:Usuario {id: 'u6'}) SET u6.nombre = 'UsuarioBot4', u6.seguidores = 200, u6.antiguedadDias = 10
MERGE (u7:Usuario {id: 'u7'}) SET u7.nombre = 'UsuarioReal3', u7.seguidores = 890, u7.antiguedadDias = 540
MERGE (u8:Usuario {id: 'u8'}) SET u8.nombre = 'UsuarioBot5', u8.seguidores = 30, u8.antiguedadDias = 1
MERGE (u9:Usuario {id: 'u9'}) SET u9.nombre = 'UsuarioBot6', u9.seguidores = 150, u9.antiguedadDias = 7
MERGE (u10:Usuario {id: 'u10'}) SET u10.nombre = 'UsuarioReal4', u10.seguidores = 2100, u10.antiguedadDias = 800

// Relaciones COMPARTE
MATCH (u1:Usuario {id: 'u1'}), (n2:Noticia {id: 'n2'}) MERGE (u1)-[:COMPARTE {timestamp: localdatetime('2026-05-03T15:00:00'), plataforma: 'twitter'}]->(n2);
MATCH (u2:Usuario {id: 'u2'}), (n2:Noticia {id: 'n2'}) MERGE (u2)-[:COMPARTE {timestamp: localdatetime('2026-05-03T15:05:00'), plataforma: 'twitter'}]->(n2);
MATCH (u4:Usuario {id: 'u4'}), (n2:Noticia {id: 'n2'}) MERGE (u4)-[:COMPARTE {timestamp: localdatetime('2026-05-03T15:10:00'), plataforma: 'facebook'}]->(n2);
MATCH (u6:Usuario {id: 'u6'}), (n2:Noticia {id: 'n2'}) MERGE (u6)-[:COMPARTE {timestamp: localdatetime('2026-05-03T15:20:00'), plataforma: 'twitter'}]->(n2);
MATCH (u8:Usuario {id: 'u8'}), (n2:Noticia {id: 'n2'}) MERGE (u8)-[:COMPARTE {timestamp: localdatetime('2026-05-03T16:00:00'), plataforma: 'twitter'}]->(n2);
MATCH (u9:Usuario {id: 'u9'}), (n2:Noticia {id: 'n2'}) MERGE (u9)-[:COMPARTE {timestamp: localdatetime('2026-05-03T16:30:00'), plataforma: 'facebook'}]->(n2);

MATCH (u1:Usuario {id: 'u1'}), (n4:Noticia {id: 'n4'}) MERGE (u1)-[:COMPARTE {timestamp: localdatetime('2026-05-07T18:30:00'), plataforma: 'twitter'}]->(n4);
MATCH (u2:Usuario {id: 'u2'}), (n4:Noticia {id: 'n4'}) MERGE (u2)-[:COMPARTE {timestamp: localdatetime('2026-05-07T18:45:00'), plataforma: 'twitter'}]->(n4);
MATCH (u4:Usuario {id: 'u4'}), (n4:Noticia {id: 'n4'}) MERGE (u4)-[:COMPARTE {timestamp: localdatetime('2026-05-07T19:00:00'), plataforma: 'twitter'}]->(n4);
MATCH (u6:Usuario {id: 'u6'}), (n4:Noticia {id: 'n4'}) MERGE (u6)-[:COMPARTE {timestamp: localdatetime('2026-05-07T19:30:00'), plataforma: 'facebook'}]->(n4);
MATCH (u8:Usuario {id: 'u8'}), (n4:Noticia {id: 'n4'}) MERGE (u8)-[:COMPARTE {timestamp: localdatetime('2026-05-07T20:00:00'), plataforma: 'twitter'}]->(n4);
MATCH (u9:Usuario {id: 'u9'}), (n4:Noticia {id: 'n4'}) MERGE (u9)-[:COMPARTE {timestamp: localdatetime('2026-05-07T20:15:00'), plataforma: 'twitter'}]->(n4);

MATCH (u3:Usuario {id: 'u3'}), (n1:Noticia {id: 'n1'}) MERGE (u3)-[:COMPARTE {timestamp: localdatetime('2026-05-01T12:00:00'), plataforma: 'twitter'}]->(n1);
MATCH (u5:Usuario {id: 'u5'}), (n1:Noticia {id: 'n1'}) MERGE (u5)-[:COMPARTE {timestamp: localdatetime('2026-05-01T14:00:00'), plataforma: 'linkedin'}]->(n1);
MATCH (u7:Usuario {id: 'u7'}), (n1:Noticia {id: 'n1'}) MERGE (u7)-[:COMPARTE {timestamp: localdatetime('2026-05-01T16:00:00'), plataforma: 'twitter'}]->(n1);
MATCH (u10:Usuario {id: 'u10'}), (n1:Noticia {id: 'n1'}) MERGE (u10)-[:COMPARTE {timestamp: localdatetime('2026-05-02T09:00:00'), plataforma: 'twitter'}]->(n1);

MATCH (u3:Usuario {id: 'u3'}), (n3:Noticia {id: 'n3'}) MERGE (u3)-[:COMPARTE {timestamp: localdatetime('2026-05-05T10:00:00'), plataforma: 'twitter'}]->(n3);
MATCH (u5:Usuario {id: 'u5'}), (n3:Noticia {id: 'n3'}) MERGE (u5)-[:COMPARTE {timestamp: localdatetime('2026-05-05T11:00:00'), plataforma: 'linkedin'}]->(n3);
MATCH (u7:Usuario {id: 'u7'}), (n3:Noticia {id: 'n3'}) MERGE (u7)-[:COMPARTE {timestamp: localdatetime('2026-05-05T12:00:00'), plataforma: 'twitter'}]->(n3);

MATCH (u3:Usuario {id: 'u3'}), (n5:Noticia {id: 'n5'}) MERGE (u3)-[:COMPARTE {timestamp: localdatetime('2026-05-08T14:00:00'), plataforma: 'twitter'}]->(n5);
MATCH (u5:Usuario {id: 'u5'}), (n5:Noticia {id: 'n5'}) MERGE (u5)-[:COMPARTE {timestamp: localdatetime('2026-05-08T15:00:00'), plataforma: 'twitter'}]->(n5);
MATCH (u10:Usuario {id: 'u10'}), (n5:Noticia {id: 'n5'}) MERGE (u10)-[:COMPARTE {timestamp: localdatetime('2026-05-08T16:00:00'), plataforma: 'linkedin'}]->(n5);

MATCH (u1:Usuario {id: 'u1'}), (n7:Noticia {id: 'n7'}) MERGE (u1)-[:COMPARTE {timestamp: localdatetime('2026-05-12T10:00:00'), plataforma: 'twitter'}]->(n7);
MATCH (u2:Usuario {id: 'u2'}), (n7:Noticia {id: 'n7'}) MERGE (u2)-[:COMPARTE {timestamp: localdatetime('2026-05-12T11:00:00'), plataforma: 'twitter'}]->(n7);
MATCH (u4:Usuario {id: 'u4'}), (n7:Noticia {id: 'n7'}) MERGE (u4)-[:COMPARTE {timestamp: localdatetime('2026-05-12T12:00:00'), plataforma: 'facebook'}]->(n7);
MATCH (u6:Usuario {id: 'u6'}), (n7:Noticia {id: 'n7'}) MERGE (u6)-[:COMPARTE {timestamp: localdatetime('2026-05-12T12:30:00'), plataforma: 'twitter'}]->(n7);
MATCH (u8:Usuario {id: 'u8'}), (n7:Noticia {id: 'n7'}) MERGE (u8)-[:COMPARTE {timestamp: localdatetime('2026-05-12T13:00:00'), plataforma: 'twitter'}]->(n7);

MATCH (u1:Usuario {id: 'u1'}), (n9:Noticia {id: 'n9'}) MERGE (u1)-[:COMPARTE {timestamp: localdatetime('2026-05-15T17:00:00'), plataforma: 'twitter'}]->(n9);
MATCH (u2:Usuario {id: 'u2'}), (n9:Noticia {id: 'n9'}) MERGE (u2)-[:COMPARTE {timestamp: localdatetime('2026-05-15T17:30:00'), plataforma: 'facebook'}]->(n9);
MATCH (u4:Usuario {id: 'u4'}), (n9:Noticia {id: 'n9'}) MERGE (u4)-[:COMPARTE {timestamp: localdatetime('2026-05-15T18:00:00'), plataforma: 'twitter'}]->(n9);
MATCH (u8:Usuario {id: 'u8'}), (n9:Noticia {id: 'n9'}) MERGE (u8)-[:COMPARTE {timestamp: localdatetime('2026-05-15T18:30:00'), plataforma: 'twitter'}]->(n9);
MATCH (u9:Usuario {id: 'u9'}), (n9:Noticia {id: 'n9'}) MERGE (u9)-[:COMPARTE {timestamp: localdatetime('2026-05-15T19:00:00'), plataforma: 'facebook'}]->(n9);

MATCH (u3:Usuario {id: 'u3'}), (n8:Noticia {id: 'n8'}) MERGE (u3)-[:COMPARTE {timestamp: localdatetime('2026-05-14T12:00:00'), plataforma: 'twitter'}]->(n8);
MATCH (u5:Usuario {id: 'u5'}), (n8:Noticia {id: 'n8'}) MERGE (u5)-[:COMPARTE {timestamp: localdatetime('2026-05-14T13:00:00'), plataforma: 'linkedin'}]->(n8);
MATCH (u7:Usuario {id: 'u7'}), (n8:Noticia {id: 'n8'}) MERGE (u7)-[:COMPARTE {timestamp: localdatetime('2026-05-14T14:00:00'), plataforma: 'twitter'}]->(n8);
MATCH (u10:Usuario {id: 'u10'}), (n8:Noticia {id: 'n8'}) MERGE (u10)-[:COMPARTE {timestamp: localdatetime('2026-05-14T15:00:00'), plataforma: 'twitter'}]->(n8);

MATCH (u3:Usuario {id: 'u3'}), (n10:Noticia {id: 'n10'}) MERGE (u3)-[:COMPARTE {timestamp: localdatetime('2026-05-16T11:00:00'), plataforma: 'twitter'}]->(n10);
MATCH (u5:Usuario {id: 'u5'}), (n10:Noticia {id: 'n10'}) MERGE (u5)-[:COMPARTE {timestamp: localdatetime('2026-05-16T12:00:00'), plataforma: 'linkedin'}]->(n10);
MATCH (u7:Usuario {id: 'u7'}), (n10:Noticia {id: 'n10'}) MERGE (u7)-[:COMPARTE {timestamp: localdatetime('2026-05-16T13:00:00'), plataforma: 'twitter'}]->(n10);

MATCH (u1:Usuario {id: 'u1'}), (n13:Noticia {id: 'n13'}) MERGE (u1)-[:COMPARTE {timestamp: localdatetime('2026-05-20T10:00:00'), plataforma: 'twitter'}]->(n13);
MATCH (u2:Usuario {id: 'u2'}), (n13:Noticia {id: 'n13'}) MERGE (u2)-[:COMPARTE {timestamp: localdatetime('2026-05-20T10:30:00'), plataforma: 'facebook'}]->(n13);
MATCH (u4:Usuario {id: 'u4'}), (n13:Noticia {id: 'n13'}) MERGE (u4)-[:COMPARTE {timestamp: localdatetime('2026-05-20T11:00:00'), plataforma: 'twitter'}]->(n13);
MATCH (u6:Usuario {id: 'u6'}), (n13:Noticia {id: 'n13'}) MERGE (u6)-[:COMPARTE {timestamp: localdatetime('2026-05-20T11:30:00'), plataforma: 'twitter'}]->(n13);
MATCH (u8:Usuario {id: 'u8'}), (n13:Noticia {id: 'n13'}) MERGE (u8)-[:COMPARTE {timestamp: localdatetime('2026-05-20T12:00:00'), plataforma: 'facebook'}]->(n13);
MATCH (u9:Usuario {id: 'u9'}), (n13:Noticia {id: 'n13'}) MERGE (u9)-[:COMPARTE {timestamp: localdatetime('2026-05-20T12:30:00'), plataforma: 'twitter'}]->(n13);
