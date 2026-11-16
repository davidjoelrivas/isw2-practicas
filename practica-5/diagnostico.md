# Práctica 5 — Clínica de código (pulpería)

## Objetivo

Conservar el comportamiento de una venta mientras se mejoran la legibilidad,
la capacidad de prueba y el desacoplamiento. `enfermo.js` permanece intacto
como evidencia del **antes**. `sano.js` registra la evolución del **después**.

## Diagnóstico

| Problema detectado | Principio relacionado | Refactor aplicado |
|---|---|---|
| Nombres `x`, `a`, `b`, `t`, `r`, `q`, `v` sin intención | M1: nombres expresivos / Clean Code | Renombrar funciones y variables según su propósito (commit 2). |
| Validaciones mezcladas con el cálculo | SOLID n.º 1: SRP (S), una responsabilidad | Extraer `validarPedido` y `validarProducto` (commit 3). |
| Literales `500`, `0.1`, `0.15`, `100` sin significado visible | M1: evitar números mágicos | Crear constantes de negocio y redondeo (commit 4). |
| Condición anidada del descuento | M1: reducir anidación y facilitar lectura | Aplicar `early return` en `aplicarDescuento` (commit 5). |
| Cálculo, guardado, mensajes e impresión en un mismo procedimiento | SOLID n.º 1: SRP (S) | Extraer `calcularVenta` y colaboradores específicos (commit 6). |
| Dependencia directa de `infraestructura.js` para los efectos | SOLID n.º 5: DIP (D) | Inyectar servicios por contrato pequeño, con valores por defecto (commit 6). |
| Riesgo de alterar reglas al refactorizar | M1: principio 6, tests antes del refactor | Escribir 8 pruebas de caracterización antes de crear `sano.js` (commit 1). |

**Nota sobre numeración:** los n.º 1 y 5 identifican respectivamente el primer y
quinto principio de SOLID; el n.º 6 sobre tests procede del material de M5.
Los demás principios de Clean Code aparecen por nombre: su número exacto en
el decálogo de M1 debe cotejarse con el material de clase antes de entregar.
No se inventan equivalencias numéricas que no estén verificadas.

## Comportamiento protegido

- Venta regular de L 100 → L 115 con ISV del 15 %.
- Cliente frecuente con compra de L 500 → L 517.50 luego de descuento e ISV.
- Cliente no frecuente con L 500 → L 575.00.
- Frecuente debajo de L 500 → sin descuento.
- Validaciones de pedido, cliente, cantidad y stock sin efectos secundarios.
- Igual formato de detalle, notificación y ticket en ambas versiones.
- Prueba adicional que confirma inyección de servicios en la versión sana.

## Evidencia y ejecución

Desde la raíz del repositorio:

```bash
node practica-5/enfermo.test.js
git log --oneline main..feature/practica-5
```

El mini-runner usa `node:assert/strict`, sin `npm install`. Los tests se
corren después de cada refactor y antes de cada commit; un fallo detiene
la ejecución. La infraestructura en memoria es intencional para evitar
persistencias o notificaciones externas durante las pruebas.
