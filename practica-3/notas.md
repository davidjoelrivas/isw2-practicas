# Notas de diseno - Practica 3

## SRP - Responsabilidad unica

Separe el calculo, el pago, el almacenamiento y la
notificacion en clases con responsabilidades concretas.

## OCP - Abierto/cerrado

Es posible incorporar otra estrategia de pago sin
modificar la clase GestorPedidos.

## LSP - Sustitucion de Liskov

PagoTarjeta y PagoTransferencia utilizan el mismo
contrato: cobrar(total).
Ambas devuelven un comprobante de texto.

## ISP - Segregacion de interfaces

En JavaScript utilizo contratos pequenos:
calcular, cobrar, guardar y enviar.
Cada colaborador proporciona solo la operacion que
necesita el servicio.

## DIP - Inversion de dependencias

GestorPedidos recibe sus colaboradores por constructor.
No crea directamente las implementaciones concretas.

## DRY

Centralice el calculo del total para evitar duplicacion.

## KISS

Utilice clases sencillas y un flujo facil de comprender.

## YAGNI

Evite incorporar funcionalidades que no requiere
el ejercicio, como conexiones reales con bancos.

## Cohesion y acoplamiento

La cohesion mejora al separar responsabilidades.
El acoplamiento disminuye mediante la inyeccion
de dependencias.

## Conclusion

Este refactor facilita el mantenimiento, las pruebas
y la extension del sistema sin cambiar la logica
principal de procesamiento de pedidos.
