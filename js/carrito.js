document.addEventListener("DOMContentLoaded", () => {
    const carritoVacio = document.getElementById("carrito-vacio");
    const carritoComprado = document.getElementById("carrito-comprado");
    const carritoProductos = document.getElementById("carrito-productos");
    const carritoAcciones = document.getElementById("carrito-acciones");
    const numeritoCarrito = document.getElementById("numerito");

    let productosEnCarrito = []; 
    let totalCarrito = 0;

   
    productosEnCarrito.push({
        id: "01",
        titulo: "Portatil 01",
        precio: 1000,
        cantidad: 1,
    });

    
    function actualizarEstadoCarrito() {
        if (productosEnCarrito.length === 0) {
            carritoVacio.style.display = "block"; 
            carritoComprado.style.display = "none"; 
            carritoProductos.style.display = "none"; 
            carritoAcciones.style.display = "none"; 
        } else {
            carritoVacio.style.display = "none"; 
            carritoComprado.style.display = "none"; 
            carritoProductos.style.display = "block"; 
            carritoAcciones.style.display = "block"; 
            numeritoCarrito.textContent = productosEnCarrito.length;

            
            totalCarrito = productosEnCarrito.reduce((total, producto) => {
                return total + (producto.precio * producto.cantidad);
            }, 0);
            document.getElementById("Total").textContent = `$${totalCarrito}`;
        }
    }

    
    function confirmarCompra() {
        const confirmar = confirm("¿Estás seguro de que quieres comprar estos productos?");
        if (confirmar) {
            realizarCompra();
        }
    }

    function realizarCompra() {
        productosEnCarrito = []; 
        carritoComprado.style.display = "block";
        carritoVacio.style.display = "none"; 
        carritoProductos.style.display = "none";
        carritoAcciones.style.display = "none"; 
        numeritoCarrito.textContent = 0; 
    }

    function confirmarVaciarCarrito() {
        const confirmar = confirm("¿Estás seguro de que quieres vaciar el carrito?");
        if (confirmar) {
            vaciarCarrito();
        }
    }

    function vaciarCarrito() {
        productosEnCarrito = []; 
        actualizarEstadoCarrito(); 
    }

    function eliminarProducto(id) {
        productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id); 
        actualizarEstadoCarrito(); 
    }

    actualizarEstadoCarrito();

    document.querySelector(".carrito-acciones-comprar").addEventListener("click", confirmarCompra);
    document.querySelector(".carrito-acciones-vaciar").addEventListener("click", confirmarVaciarCarrito); 
    document.querySelectorAll(".carrito-producto-eliminar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productId = e.currentTarget.dataset.id;
            confirmarEliminarProducto(productId);
        });
    });

    function confirmarEliminarProducto(productId) {
        const confirmar = confirm("¿Estás seguro de que quieres eliminar este producto?");
        if (confirmar) {
            eliminarProducto(productId);
        }
    }
});
