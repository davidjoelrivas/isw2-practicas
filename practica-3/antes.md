# Practica 3 - Antes del refactor

## Caso: procesamiento de pedidos

Archivo original: `antes.js`.

La clase GestorPedidos calcula el total, selecciona el
metodo de pago, guarda el pedido y notifica al cliente.

## Problemas encontrados

- SRP: la clase tiene varias responsabilidades.
- OCP: agregar un pago requiere modificar sus condiciones.
- DIP: el flujo depende de operaciones concretas.
- ISP: no existen contratos pequenos por responsabilidad.
- LSP: no hay estrategias intercambiables de pago.

## Diagnostico

La cohesion es baja porque se mezclan tareas diferentes.
El acoplamiento es alto porque el flujo de negocio
depende directamente de cada operacion.
