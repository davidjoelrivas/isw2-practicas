class CalculadoraTotal {
  calcular(productos) {
    return productos.reduce(
      (suma, p) => suma + p.precio * p.cantidad, 0
    );
  }
}

class PagoTarjeta {
  cobrar(total) {
    return `Tarjeta: L ${total}`;
  }
}

class PagoTransferencia {
  cobrar(total) {
    return `Transferencia: L ${total}`;
  }
}

class RepositorioPedidos {
  constructor() {
    this.pedidos = [];
  }

  guardar(pedido) {
    this.pedidos.push(pedido);
  }
}

class NotificadorPedidos {
  enviar(pedido) {
    return `Notificacion enviada a ${pedido.cliente}`;
  }
}

class GestorPedidos {
  constructor(calculadora, pago, repositorio, notificador) {
    this.calculadora = calculadora;
    this.pago = pago;
    this.repositorio = repositorio;
    this.notificador = notificador;
  }

  procesar(pedido) {
    const total = this.calculadora.calcular(pedido.productos);
    const comprobante = this.pago.cobrar(total);

    this.repositorio.guardar({ ...pedido, total });
    this.notificador.enviar(pedido);

    return { total, comprobante };
  }
}

module.exports = {
  CalculadoraTotal,
  PagoTarjeta,
  PagoTransferencia,
  RepositorioPedidos,
  NotificadorPedidos,
  GestorPedidos
};
