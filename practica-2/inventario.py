def agregar_producto(inventario, nombre, cantidad):
    if not nombre or not nombre.strip():
        raise ValueError("El nombre es obligatorio")

    if not isinstance(cantidad, int) or cantidad <= 0:
        raise ValueError("La cantidad debe ser positiva")

    inventario = inventario.copy()
    inventario[nombre] = inventario.get(nombre, 0) + cantidad

    return inventario


def consultar_producto(inventario, nombre):
    return inventario.get(nombre, 0)
