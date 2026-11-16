// Mini-runner sin Jest ni dependencias: node practica-5/enfermo.test.js
const assert = require('node:assert/strict');
const infra = require('./infraestructura');
const original = require('./enfermo').procesarVenta;
const fs = require('node:fs');
const path = require('node:path');
const versiones = [['enfermo', original]];
if (fs.existsSync(path.join(__dirname, 'sano.js'))) {
  versiones.push(['sano', require('./sano').procesarVenta]);
}
let correctas = 0;
let fallidas = 0;
function test(nombre, tarea) {
  try { tarea(); correctas++; console.log(`  ✓ ${nombre}`); }
  catch (error) { fallidas++; console.error(`  ✗ ${nombre}: ${error.message}`); }
}
function producto(cantidad = 2, precio = 50, stock = 5) {
  return { nombre: 'Arroz', cantidad, precio, stock };
}
for (const [version, vender] of versiones) {
  console.log(`\nPruebas de ${version}`);
  test('total, detalle y tres efectos observables', () => {
    infra.limpiar();
    const venta = vender({ items: [producto()] }, { nombre: 'Ana', frecuente: false });
    assert.deepEqual(venta, { cliente: 'Ana', total: 115, detalle: ['Arroz: 2 x L 50.00'] });
    assert.deepEqual(infra.estado.ventas, [venta]);
    assert.deepEqual(infra.estado.mensajes, [{ nombre: 'Ana', texto: 'Compra L 115.00' }]);
    assert.deepEqual(infra.estado.tickets, ['Ticket Ana: L 115.00']);
  });
  test('cliente frecuente con umbral de 500', () => {
    infra.limpiar();
    const venta = vender({ items: [producto(1, 500)] }, { nombre: 'Luis', frecuente: true });
    assert.equal(venta.total, 517.5);
  });
  test('cliente no frecuente: sin descuento', () => {
    infra.limpiar();
    const venta = vender({ items: [producto(1, 500)] }, { nombre: 'Luis', frecuente: false });
    assert.equal(venta.total, 575);
  });
  test('frecuente debajo del umbral no recibe descuento', () => {
    infra.limpiar();
    const venta = vender({ items: [producto(1, 499)] }, { nombre: 'Luis', frecuente: true });
    assert.equal(venta.total, 573.85);
  });
  test('pedido inválido no genera efectos', () => {
    infra.limpiar();
    assert.throws(() => vender(null, { nombre: 'Ana' }), /Pedido inválido/);
    assert.equal(infra.estado.ventas.length, 0);
  });
  test('cliente inválido no genera efectos', () => {
    infra.limpiar();
    assert.throws(() => vender({ items: [producto()] }, null), /Cliente inválido/);
    assert.equal(infra.estado.mensajes.length, 0);
  });
  test('stock insuficiente no genera efectos', () => {
    infra.limpiar();
    assert.throws(() => vender({ items: [producto(5, 50, 2)] }, { nombre: 'Ana' }), /Producto inválido/);
    assert.equal(infra.estado.tickets.length, 0);
  });
  test('cantidad no válida no genera efectos', () => {
    infra.limpiar();
    assert.throws(() => vender({ items: [producto(0)] }, { nombre: 'Ana' }), /Producto inválido/);
    assert.equal(infra.estado.ventas.length, 0);
  });
}
if (fs.existsSync(path.join(__dirname, 'sano.js')) && typeof require('./sano').calcularVenta === 'function') {
  test('sano permite inyectar colaboradores sin usar infraestructura real', () => {
    infra.limpiar();
    const llamadas = [];
    const falsos = {
      guardar: (venta) => llamadas.push(['guardar', venta.total]),
      notificar: (nombre, texto) => llamadas.push(['notificar', nombre, texto]),
      imprimir: (texto) => llamadas.push(['imprimir', texto])
    };
    const venta = require('./sano').procesarVenta({ items: [producto()] }, { nombre: 'Ana' }, falsos);
    assert.equal(venta.total, 115);
    assert.equal(llamadas.length, 3);
    assert.equal(infra.estado.ventas.length, 0);
  });
}
console.log(`\nResultado: ${correctas} correctas; ${fallidas} fallidas.`);
if (fallidas > 0) process.exitCode = 1;
