# Evidencia de pruebas — Práctica 4

La suite se ejecutó con JavaScript puro y Node.js, sin frameworks.
Comando: `node practica-4/fiados.test.js`.
Cada prueba utiliza el patrón AAA (Arrange, Act, Assert).

## Fase RED (antes de implementar las validaciones)

```text
❌ Aplica 5% con un día vencido: Esperado 50, recibido 0
❌ Aplica solo 5% aunque hayan pasado 30 días: Esperado 10, recibido 0
✅ Devuelve cero cuando hay 0 días vencidos
✅ Devuelve cero con días negativos
✅ Devuelve cero si el monto es cero
❌ Lanza error si el monto es negativo: Se esperaba un error relacionado con "monto"
❌ Lanza error si los días son texto: Se esperaba un error relacionado con "diasVencidos"
❌ Lanza error si los días son NaN: Se esperaba un error relacionado con "diasVencidos"
❌ Lanza error si no se proporciona el número de días: Se esperaba un error relacionado con "diasVencidos"

Resultado: 3 aprobadas, 6 fallidas
```

## Fase GREEN (después de implementar la función)

```text
✅ Aplica 5% con un día vencido
✅ Aplica solo 5% aunque hayan pasado 30 días
✅ Devuelve cero cuando hay 0 días vencidos
✅ Devuelve cero con días negativos
✅ Devuelve cero si el monto es cero
✅ Lanza error si el monto es negativo
✅ Lanza error si los días son texto
✅ Lanza error si los días son NaN
✅ Lanza error si no se proporciona el número de días

Resultado: 9 aprobadas, 0 fallidas
```

Se conserva el registro de ambos resultados en los archivos `resultado-rojo.txt` y `resultado-verde.txt`.
