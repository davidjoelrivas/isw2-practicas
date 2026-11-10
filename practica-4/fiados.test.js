const { calcularMora } = require('./fiados');

let aprobadas = 0;
let fallidas = 0;
function assertEqual(actual, esperado) {
  if (!Object.is(actual, esperado)) throw new Error(`Esperado ${esperado}, recibido ${actual}`);
}
function assertThrows(fn, mensaje) {
  let error;
  try { fn(); } catch (e) { error = e; }
  if (!error || !String(error.message).includes(mensaje)) {
    throw new Error(`Se esperaba un error relacionado con "${mensaje}"`);
  }
}
function test(nombre, fn) {
  try { fn(); aprobadas++; console.log(`✅ ${nombre}`); }
  catch (error) { fallidas++; console.error(`❌ ${nombre}: ${error.message}`); }
}

// Cada prueba sigue Arrange, Act, Assert (AAA).
test('Aplica 5% con un día vencido', () => {
  // Arrange
  const monto = 1000, dias = 1;
  // Act
  const mora = calcularMora(monto, dias);
  // Assert
  assertEqual(mora, 50);
});

test('Aplica solo 5% aunque hayan pasado 30 días', () => {
  // Arrange
  const monto = 200, dias = 30;
  // Act
  const mora = calcularMora(monto, dias);
  // Assert
  assertEqual(mora, 10);
});

test('Devuelve cero cuando hay 0 días vencidos', () => {
  // Arrange
  const monto = 500, dias = 0;
  // Act
  const mora = calcularMora(monto, dias);
  // Assert
  assertEqual(mora, 0);
});

test('Devuelve cero con días negativos', () => {
  // Arrange
  const monto = 500, dias = -4;
  // Act
  const mora = calcularMora(monto, dias);
  // Assert
  assertEqual(mora, 0);
});

test('Devuelve cero si el monto es cero', () => {
  // Arrange
  const monto = 0, dias = 8;
  // Act
  const mora = calcularMora(monto, dias);
  // Assert
  assertEqual(mora, 0);
});

test('Lanza error si el monto es negativo', () => {
  // Arrange
  const monto = -100, dias = 3;
  // Act
  const accion = () => calcularMora(monto, dias);
  // Assert
  assertThrows(accion, 'monto');
});

test('Lanza error si los días son texto', () => {
  // Arrange
  const monto = 100, dias = 'tres';
  // Act
  const accion = () => calcularMora(monto, dias);
  // Assert
  assertThrows(accion, 'diasVencidos');
});

test('Lanza error si los días son NaN', () => {
  // Arrange
  const monto = 100, dias = NaN;
  // Act
  const accion = () => calcularMora(monto, dias);
  // Assert
  assertThrows(accion, 'diasVencidos');
});

test('Lanza error si no se proporciona el número de días', () => {
  // Arrange
  const monto = 100, dias = undefined;
  // Act
  const accion = () => calcularMora(monto, dias);
  // Assert
  assertThrows(accion, 'diasVencidos');
});

console.log(`\nResultado: ${aprobadas} aprobadas, ${fallidas} fallidas`);
if (fallidas > 0) process.exitCode = 1;
