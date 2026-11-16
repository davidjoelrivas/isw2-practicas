# Práctica 5 — Clínica de código completa

Ejemplo: una venta de pulpería con descuento por cliente frecuente e ISV.

- `enfermo.js`: función original con varios code smells y acoplamiento.
- `enfermo.test.js`: mini-runner de caracterización para ambas versiones.
- `infraestructura.js`: registro simulado de ventas, mensajes y tickets.
- `sano.js`: resultado de 5 refactors incrementales.
- `diagnostico.md`: análisis problema → principio → solución.

Ejecutar desde la raíz del repositorio: `node practica-5/enfermo.test.js`.
Los commits conventional documentan cada paso sin modificar el código original.
