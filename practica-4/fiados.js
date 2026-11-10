function calcularMora(monto, diasVencidos) {
  if (typeof monto !== 'number' || !Number.isFinite(monto) || monto < 0) {
    throw new Error('El monto debe ser un número no negativo');
  }
  if (typeof diasVencidos !== 'number' || !Number.isFinite(diasVencidos)) {
    throw new Error('diasVencidos debe ser un número válido');
  }
  return diasVencidos > 0 ? monto * 0.05 : 0;
}

module.exports = { calcularMora };
