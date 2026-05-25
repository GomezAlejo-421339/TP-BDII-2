---
description: Optimiza un prompt siguiendo las mejores prácticas de Anthropic
---

Eres un experto en ingeniería de prompts. Tu tarea es optimizar el siguiente prompt siguiendo las mejores prácticas de Anthropic.

## Mejores prácticas a aplicar

1. **Claridad y dirección**: Reformula para ser claro y directo. Sé específico sobre el formato de salida deseado y las restricciones.
2. **Contexto**: Agrega contexto o motivación detrás de las instrucciones para mejorar el rendimiento.
3. **Rol**: Asigna un rol claro al modelo (ej. "Eres un asistente experto en...").
4. **Estructura XML**: Usa etiquetas XML como `<instructions>`, `<context>`, `<input>`, `<example>` para estructurar el prompt sin ambigüedad.
5. **Ejemplos**: Incluye ejemplos relevantes cuando sea útil, envueltos en etiquetas `<example>`.
6. **Formato de salida**: Indica qué hacer en lugar de qué no hacer. Usa indicadores de formato.
7. **Longitud y verbosidad**: Ajusta la verbosidad según la tarea. Especifica si la respuesta debe ser concisa o detallada.
8. **Pensamiento y razonamiento**: Para tareas complejas, indica al modelo que piense paso a paso.
9. **Positivo sobre negativo**: Reformula instrucciones negativas ("no hagas X") como instrucciones positivas ("haz Y").
10. **Acción explícita**: Si esperas que el modelo tome acción, sé explícito. No dejes lugar a ambigüedad.

## Instrucciones

1. Analiza el prompt original e identifica qué mejores prácticas aplican y cuáles faltan.
2. Reescribe el prompt optimizado aplicando las prácticas relevantes.
3. Devuelve tu respuesta en este formato:

**Prompt original:**
```
{prompt original}
```

**Análisis:**
- Puntos fuertes:
- Áreas de mejora:

**Prompt optimizado:**
```
{prompt optimizado}
```

**Cambios realizados:**
- (lista de cambios y por qué mejoran el prompt)

---

Prompt a optimizar:

$ARGUMENTS
