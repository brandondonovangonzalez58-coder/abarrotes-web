// ===== Catálogo de 20 productos =====
let productos = [
  { id: 1,  nombre: 'Leche',        precio: 24.5, categoria: 'lacteos',    icono: 'fa-bottle-water' },
  { id: 2,  nombre: 'Pan',          precio: 18.0, categoria: 'panaderia',  icono: 'fa-bread-slice' },
  { id: 3,  nombre: 'Huevos',       precio: 42.0, categoria: 'lacteos',    icono: 'fa-egg' },
  { id: 4,  nombre: 'Frijoles',     precio: 22.0, categoria: 'despensa',   icono: 'fa-seedling' },
  { id: 5,  nombre: 'Arroz',        precio: 28.0, categoria: 'despensa',   icono: 'fa-bowl-rice' },
  { id: 6,  nombre: 'Refresco',     precio: 20.0, categoria: 'bebidas',    icono: 'fa-mug-hot' },
  { id: 7,  nombre: 'Manzanas',     precio: 35.0, categoria: 'frutas',     icono: 'fa-apple-whole' },
  { id: 8,  nombre: 'Zanahorias',   precio: 15.0, categoria: 'frutas',     icono: 'fa-carrot' },
  { id: 9,  nombre: 'Pollo',        precio: 85.0, categoria: 'carnes',     icono: 'fa-drumstick-bite' },
  { id: 10, nombre: 'Pescado',      precio: 95.0, categoria: 'carnes',     icono: 'fa-fish' },
  { id: 11, nombre: 'Queso',        precio: 55.0, categoria: 'lacteos',    icono: 'fa-cheese' },
  { id: 12, nombre: 'Vino',         precio: 120.0, categoria: 'bebidas',   icono: 'fa-wine-bottle' },
  { id: 13, nombre: 'Detergente',   precio: 38.0, categoria: 'limpieza',   icono: 'fa-spray-can' },
  { id: 14, nombre: 'Jabón',        precio: 15.0, categoria: 'limpieza',   icono: 'fa-soap' },
  { id: 15, nombre: 'Galletas',     precio: 22.0, categoria: 'despensa',   icono: 'fa-cookie' },
  { id: 16, nombre: 'Chile',        precio: 12.0, categoria: 'frutas',     icono: 'fa-pepper-hot' },
  { id: 17, nombre: 'Yogur',        precio: 18.5, categoria: 'lacteos',    icono: 'fa-bottle-water' },
  { id: 18, nombre: 'Tortillas',    precio: 20.0, categoria: 'despensa',   icono: 'fa-bread-slice' },
  { id: 19, nombre: 'Agua',         precio: 12.0, categoria: 'bebidas',    icono: 'fa-bottle-water' },
  { id: 20, nombre: 'Limones',      precio: 25.0, categoria: 'frutas',     icono: 'fa-lemon' }



  { id: 21, nombre: 'Café',         precio: 45.0, categoria: 'bebidas',    icono: 'fa-mug-hot' }

];

// ===== Carrito =====
let carrito = [];

// ===== Elementos del DOM =====
const contenedor = document.getElementById('productos');
const listaCarrito = document.getElementById('carrito');
const totalEl = document.getElementById('total');
const mensaje = document.getElementById('mensaje');
const contadorProductos = document.getElementById('contadorProductos');
const contadorCarrito = document.getElementById('contadorCarrito');
const buscarInput = document.getElementById('buscar');
const categoriaSelect = document.getElementById('categoria');
const sinResultados = document.getElementById('sinResultados');

// ===== Renderizar productos =====
function renderProductos() {
  const busqueda = buscarInput.value.toLowerCase().trim();
  const categoria = categoriaSelect.value;

  const filtrados = productos.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda);
    const coincideCategoria = categoria === 'todas' || p.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });

  contenedor.innerHTML = '';

  if (filtrados.length === 0) {
    sinResultados.style.display = 'block';
  } else {
    sinResultados.style.display = 'none';
    filtrados.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'producto';
      div.style.animationDelay = `${i * 0.05}s`;
      div.innerHTML = `
        <i class="fa-solid ${p.icono} icono"></i>
        <div class="nombre">${p.nombre}</div>
        <div class="categoria-tag">${p.categoria}</div>
        <div class="precio">$${p.precio.toFixed(2)}</div>
        <button onclick="agregar(${p.id})">
          <i class="fa-solid fa-plus"></i> Agregar
        </button>
      `;
      contenedor.appendChild(div);
    });
  }

  contadorProductos.textContent = productos.length;
}

// ===== Agregar al carrito =====
function agregar(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  carrito.push({ ...p });
  dibujarCarrito();
  mostrarMensaje(`<i class="fa-solid fa-circle-check"></i> ${p.nombre} agregado`);
}

// ===== Quitar del carrito =====
function quitar(i) {
  carrito.splice(i, 1);
  dibujarCarrito();
}

// ===== Dibujar carrito =====
function dibujarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <li style="color:#aaa; justify-content:center; border:none;">
        <i class="fa-solid fa-cart-plus"></i>&nbsp; Carrito vacío
      </li>`;
  } else {
    carrito.forEach((p, i) => {
      total += p.precio;
      const li = document.createElement('li');
      li.innerHTML = `
        <span><i class="fa-solid ${p.icono}"></i> ${p.nombre} — $${p.precio.toFixed(2)}</span>
        <button onclick="quitar(${i})" title="Quitar">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      `;
      listaCarrito.appendChild(li);
    });
  }

  totalEl.textContent = `$${total.toFixed(2)}`;
  contadorCarrito.textContent = carrito.length;
}

// ===== Mensaje temporal =====
let timeoutId;
function mostrarMensaje(texto) {
  mensaje.innerHTML = texto;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => mensaje.innerHTML = '', 1800);
}

// ===== Botón comprar =====
document.getElementById('comprar').onclick = () => {
  if (carrito.length === 0) {
    mostrarMensaje('<i class="fa-solid fa-triangle-exclamation"></i> El carrito está vacío');
    return;
  }
  const total = carrito.reduce((s, p) => s + p.precio, 0);
  mostrarMensaje(`<i class="fa-solid fa-party-horn"></i> ¡Gracias por tu compra! Total: $${total.toFixed(2)}`);
  carrito = [];
  dibujarCarrito();
};

// ===== Botón vaciar =====
document.getElementById('vaciar').onclick = () => {
  if (carrito.length === 0) return;
  carrito = [];
  dibujarCarrito();
  mostrarMensaje('<i class="fa-solid fa-trash"></i> Carrito vaciado');
};

// ===== Filtros =====
buscarInput.addEventListener('input', renderProductos);
categoriaSelect.addEventListener('change', renderProductos);

// ===== Modal de administración =====
const modal = document.getElementById('modalAdmin');
const btnAdmin = document.getElementById('btnAdmin');
const cerrarModal = document.getElementById('cerrarModal');

btnAdmin.onclick = () => {
  modal.classList.add('activo');
  renderTabla();
};

cerrarModal.onclick = () => modal.classList.remove('activo');

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('activo');
});

// ===== Renderizar tabla de administración =====
function renderTabla() {
  const tbody = document.getElementById('tablaProductos');
  tbody.innerHTML = '';

  if (productos.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="5" style="text-align:center; color:#aaa; padding:20px;">
        <i class="fa-solid fa-box-open"></i> No hay productos
      </td></tr>`;
    return;
  }

  productos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><i class="fa-solid ${p.icono} icono-tabla"></i></td>
      <td>
        <input class="input-editar" value="${p.nombre}" 
               onchange="editarProducto(${p.id}, 'nombre', this.value)">
      </td>
      <td>
        <select class="input-editar" onchange="editarProducto(${p.id}, 'categoria', this.value)">
          <option value="lacteos"    ${p.categoria === 'lacteos'    ? 'selected' : ''}>Lácteos</option>
          <option value="panaderia"  ${p.categoria === 'panaderia'  ? 'selected' : ''}>Panadería</option>
          <option value="despensa"   ${p.categoria === 'despensa'   ? 'selected' : ''}>Despensa</option>
          <option value="bebidas"    ${p.categoria === 'bebidas'    ? 'selected' : ''}>Bebidas</option>
          <option value="limpieza"   ${p.categoria === 'limpieza'   ? 'selected' : ''}>Limpieza</option>
          <option value="carnes"     ${p.categoria === 'carnes'     ? 'selected' : ''}>Carnes</option>
          <option value="frutas"     ${p.categoria === 'frutas'     ? 'selected' : ''}>Frutas y Verduras</option>
        </select>
      </td>
      <td>
        <input class="input-editar" type="number" step="0.01" min="0.01" value="${p.precio}"
               onchange="editarProducto(${p.id}, 'precio', parseFloat(this.value))">
      </td>
      <td>
        <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ===== Editar producto =====
function editarProducto(id, campo, valor) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  if (campo === 'precio' && (isNaN(valor) || valor <= 0)) {
    mostrarMensaje('<i class="fa-solid fa-triangle-exclamation"></i> Precio inválido');
    renderTabla();
    return;
  }
  p[campo] = valor;
  renderProductos();
  mostrarMensaje('<i class="fa-solid fa-pen"></i> Producto actualizado');
}

// ===== Eliminar producto =====
function eliminarProducto(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  productos = productos.filter(p => p.id !== id);
  renderTabla();
  renderProductos();
  mostrarMensaje('<i class="fa-solid fa-trash"></i> Producto eliminado');
}

// ===== Agregar producto desde el formulario =====
document.getElementById('formProducto').addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('nuevoNombre').value.trim();
  const precio = parseFloat(document.getElementById('nuevoPrecio').value);
  const categoria = document.getElementById('nuevaCategoria').value;
  const icono = document.getElementById('nuevoIcono').value;

  if (!nombre || isNaN(precio) || precio <= 0 || !categoria) {
    mostrarMensaje('<i class="fa-solid fa-triangle-exclamation"></i> Completa todos los campos');
    return;
  }

  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  productos.push({ id: nuevoId, nombre, precio, categoria, icono });

  e.target.reset();
  renderTabla();
  renderProductos();
  mostrarMensaje(`<i class="fa-solid fa-circle-check"></i> ${nombre} agregado`);
});

// ===== Inicializar =====
renderProductos();
dibujarCarrito();


