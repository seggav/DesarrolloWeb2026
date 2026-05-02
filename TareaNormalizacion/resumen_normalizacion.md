# Normalización de Bases de Datos — Resumen y Comparación con Ejercicios de Clase

## ¿Qué es la normalización?

La normalización de bases de datos es un proceso de diseño que organiza los datos en estructuras de tablas específicas con el objetivo de:

- Mejorar la integridad de los datos
- Prevenir anomalías (inserción, eliminación, actualización)
- Minimizar la redundancia involuntaria
- Mejorar el rendimiento de las consultas

---

### Tipos de claves
| Clave | Descripción |
|---|---|
| **Principal (PK)** | Identifica de forma única cada fila y  no admite nulos ni duplicados |
| **Compuesta** | PK formada por dos o más columnas |
| **Candidata** | Columna con características de PK pero sin ese rol asignado |
| **Foránea (FK)** | Referencia a la PK de otra tabla para definir relaciones entre tablas |
| **Súper clave** | Similar a la PK compuesta pero con columnas extra innecesarias |

### Tipos de dependencias funcionales
- **Parcial**: un atributo no-clave depende solo de parte de una clave compuesta
- **Transitiva**: un atributo no-clave depende de otro atributo no-clave
- **Multivaluada**: dos columnas son independientes entre sí pero dependen solo de la PK
- **De unión**: la tabla se puede reconstruir sin pérdida al dividirla y reunirla

---

## Formas Normales

### 1FN — Primera Forma Normal
- La tabla debe tener una PK.
- No puede haber grupos repetidos (ej. `child1`, `child2`, `child3`).
- No puede haber celdas con múltiples valores.

**Solución típica**: separar los datos repetidos en una tabla nueva vinculada por FK.

### 2FN — Segunda Forma Normal
- Cumple 1FN.
- Ningún atributo no-clave depende *parcialmente* de la PK compuesta (solo de una parte de ella).

**Ejemplo del artículo**: tabla `(part, warehouse, quantity, warehouse_address)` — `warehouse_address` depende solo de `warehouse`, no de la clave compuesta completa → se separa en dos tablas.

### 3FN — Tercera Forma Normal
- Cumple 2FN.
- Ningún atributo no-clave depende de *otro* atributo no-clave (sin dependencias transitivas).

**Ejemplo del artículo**: en una tabla de empleados, `dept_name` dependía de `dept_num` (no-clave) → se separa en tablas `EMPLOYEE`, `DEPARTMENT` y `EMPLOYEE_DEPARTMENT`.

**Boyce-Codd (BCNF)**: versión más estricta de 3FN que exige el uso de superclaves.

### 4FN — Cuarta Forma Normal
- Cumple 3FN/BCNF.
- No hay dependencias multivaluadas: si un empleado tiene habilidades e idiomas independientes entre sí, deben estar en tablas separadas.

### 5FN — Quinta Forma Normal
- Nivel más alto de normalización.
- La tabla solo puede dividirse en tablas más pequeñas si la tabla original puede reconstruirse exactamente (dependencia de unión). Si la reconstrucción genera filas distintas, la división **no** debe hacerse.

---

## Anomalías que previene la normalización

| Anomalía | Descripción |
|---|---|
| **Inserción** | No se puede insertar un registro porque faltan valores requeridos por la estructura |
| **Eliminación** | Borrar un registro elimina accidentalmente información importante |
| **Actualización** | Un valor se actualiza en un lugar pero no en todos los demás donde está duplicado |

---

## Desafíos de la normalización

- Más tablas implican **más JOINs** en las consultas, lo que puede ser más lento.
- Aumenta la **complejidad general** de la base de datos, requiriendo mayor experiencia de diseño.
- Existe un balance: una base de datos muy normalizada puede tener **peor rendimiento en lectura** que una menos normalizada (desnormalización intencional en ciertos escenarios de analytics).

---

## Comparación con los ejercicios de clase

La base de datos de películas que trabajamos en clase es un ejemplo práctico de normalización aplicada:

### 1FN — cumplida en el diseño
En lugar de tener una columna `actores` con múltiples nombres separados por comas dentro de la tabla `Peliculas`, se creó una tabla intermedia **`PeliculaActor`**. Esto elimina exactamente el grupo repetido que describe el artículo con el ejemplo de `child1, child2, child3`.

### 2FN — cumplida
La tabla `Usuarios` no almacena el nombre del país directamente; lo referencia mediante `pais_id` → tabla `Paises`. Si guardáramos `nombre_pais` en `Usuarios`, crearíamos una dependencia parcial (el nombre del país solo depende del país, no del usuario). Esta separación es el mismo principio que el ejemplo `warehouse / warehouse_address` del artículo.

### 3FN — cumplida
En `Peliculas`, el género se almacena como `genero_id` referenciando la tabla `Generos`, en lugar de escribir `"Acción"` o `"Drama"` directamente. Esto evita la dependencia transitiva: `nombre_genero` dependería de `genero_id` (no-clave) y no de la PK de la película — exactamente el caso `dept_name → dept_num` del artículo.

### JOINs como consecuencia de la normalización
Los ejercicios 6, 7 y 10 requieren JOINs precisamente porque la base de datos está normalizada. Esto es lo que menciona el artículo como desafío: más tablas = más JOINs. Sin embargo, la ganancia en integridad y mantenibilidad justifica el costo, especialmente en bases de datos operacionales como esta.

### Anomalías evitadas
- Si el nombre de un país cambiara, solo se actualiza **una fila** en `Paises`, no todos los usuarios de ese país → sin anomalía de actualización.
- Si se elimina un actor, no se pierde información de la película (la relación está en `PeliculaActor`) → sin anomalía de eliminación.

---


