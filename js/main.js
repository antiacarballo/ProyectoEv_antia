document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-menu");
    const tituloPrincipal = document.querySelector(".titulo-principal");
    const numeritoCarrito = document.getElementById("numerito");

    let productos = [];
    let contadorCarrito = 0;

    // Cargar productos desde productos.json
    fetch("./js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then((data) => {
            productos = data; // Guardar los productos
            mostrarProductos(productos); // Mostrar todos los productos inicialmente
        })
        .catch((error) => console.error("Error al cargar los productos:", error));

    // Función para mostrar productos
    function mostrarProductos(productosElegidos) {
        productosContainer.innerHTML = ""; // Limpiar contenedor

        productosElegidos.forEach((producto) => {
            const productoHTML = `
                <div class="producto">
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                    </div>
                </div>
            `;
            productosContainer.innerHTML += productoHTML;
        });

        actualizarBotonesAgregar(); // Actualizar eventos de los botones "Agregar"
    }

    // Filtrar y mostrar solo los primeros 5 productos de una categoría
    function mostrarTopCinco(categoriaId) {
        const productosFiltrados = productos.filter((producto) => producto.categoria.id === categoriaId);
        const topCinco = productosFiltrados.slice(0, 5); // Obtener solo los primeros 5
        mostrarProductos(topCinco); // Mostrar los productos filtrados
    }

    // Configurar eventos para botones de categorías
    botonesCategorias.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.currentTarget.classList.contains("boton-carrito")) return; // No hacer nada si es el botón del carrito

            // Lógica para cambiar la categoría mostrada
            if (e.currentTarget.id === "todos") {
                tituloPrincipal.innerText = "Todos los productos";
                mostrarProductos(productos);
            } else if (e.currentTarget.id === "moviles") {
                tituloPrincipal.innerText = "Móviles";
                mostrarTopCinco("moviles");
            } else if (e.currentTarget.id === "portatiles") {
                tituloPrincipal.innerText = "Portátiles";
                mostrarProductos(productos.filter((producto) => producto.categoria.id === "portatiles"));
            } else if (e.currentTarget.id === "televisiones") {
                tituloPrincipal.innerText = "Televisores";
                mostrarProductos(productos.filter((producto) => producto.categoria.id === "televisiones"));
            }

            // Actualizar clase 'active' en los botones de categorías
            botonesCategorias.forEach((boton) => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
        });
    });

    // Actualizar eventos de botones "Agregar"
    function actualizarBotonesAgregar() {
        const botonesAgregar = document.querySelectorAll(".producto-agregar");
        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                const productId = e.currentTarget.dataset.id;
                console.log(`Producto agregado al carrito: ${productId}`);
                contadorCarrito++; // Incrementar contador del carrito
                actualizarCarritoUI(); // Actualizar la interfaz del carrito
            });
        });
    }

    // Actualizar el número del carrito en la UI
    function actualizarCarritoUI() {
        numeritoCarrito.textContent = contadorCarrito;
    }
});
