import unittest
from inventario import agregar_producto, consultar_producto


class TestInventario(unittest.TestCase):

    def test_agregar_producto(self):
        inventario = agregar_producto({}, "Arroz", 5)
        self.assertEqual(inventario["Arroz"], 5)

    def test_consultar_producto(self):
        inventario = {"Azucar": 10}
        self.assertEqual(
            consultar_producto(inventario, "Azucar"), 10
        )

    def test_cantidad_invalida(self):
        with self.assertRaises(ValueError):
            agregar_producto({}, "Arroz", -5)


if __name__ == "__main__":
    unittest.main()
