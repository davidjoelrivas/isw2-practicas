class GestorPedidos {
  procesar(pedido) {
    const total = pedido.productos.reduce(
      (suma, producto) =>
        suma + producto.precio * producto.cantidad, 0
    );

    let comprobante;

    if (pedido.tipoPago === "tarjeta") {
      comprobante = `Tarjeta: L ${total}`;
    } else if (pedido.tipoPago === "transferencia") {
      comprobante = `Transferencia: L ${total}`;
    } else {
      throw new Error("Metodo de pago no soportado");
    }

    console.log("Guardando pedido en la base de datos");
    console.log("Enviando correo al cliente");

    return { total, comprobante };
  }
}

module.exports = { GestorPedidos };
