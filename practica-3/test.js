const test = require("node:test");
const assert = require("node:assert/strict");

const {
  CalculadoraTotal,
  PagoTarjeta,
  PagoTransferencia,
  RepositorioPedidos,
  NotificadorPedidos,
  GestorPedidos
} = require("./despues");

const pedido = {
  cliente: "Ana",
  productos: [
    { precio: 100, cantidad: 2 },
    { precio: 50, cantidad: 1 }
  ]
};

for (const [nombre, Pago] of [
  ["tarjeta", PagoTarjeta],
  ["transferencia", PagoTransferencia]
]) {
  test(`procesa correctamente pago por ${nombre}`, () => {
    const repositorio = new RepositorioPedidos();

    const gestor = new GestorPedidos(
      new CalculadoraTotal(),
      new Pago(),
      repositorio,
      new NotificadorPedidos()
    );

    const resultado = gestor.procesar(pedido);

    assert.equal(resultado.total, 250);
    assert.match(resultado.comprobante, /250/);
    assert.equal(repositorio.pedidos.length, 1);
    assert.equal(repositorio.pedidos[0].total, 250);
  });
}
