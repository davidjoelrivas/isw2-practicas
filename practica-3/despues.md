# Practica 3 - Despues del refactor

Archivo refactorizado: `despues.js`.

## Cambios realizados

1. CalculadoraTotal calcula los montos.
2. PagoTarjeta y PagoTransferencia procesan pagos.
3. RepositorioPedidos almacena los pedidos.
4. NotificadorPedidos realiza las notificaciones.
5. GestorPedidos coordina las operaciones.

## Resultado

Cada clase tiene una responsabilidad definida.
Los metodos de pago pueden intercambiarse sin
modificar GestorPedidos.

Las dependencias se reciben desde el constructor.
Esto facilita las pruebas y el mantenimiento.

El comportamiento principal se conserva:
se calcula el total y se genera un comprobante.
