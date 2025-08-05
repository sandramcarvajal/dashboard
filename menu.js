const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Ordenar columnas al hacer clic en el encabezado
function ordenarTabla(colIndex) {
  const tabla = document.getElementById("tablaVehiculos");
  const filas = Array.from(tabla.tBodies[0].rows);
  const asc = tabla.dataset.orden === "asc" ? false : true;
  filas.sort((a, b) => {
    let valA = a.cells[colIndex].innerText.trim();
    let valB = b.cells[colIndex].innerText.trim();

    // Convertir a número si es posible
    valA = isNaN(valA) ? valA : Number(valA.replace(/[^0-9.-]+/g,""));
    valB = isNaN(valB) ? valB : Number(valB.replace(/[^0-9.-]+/g,""));

    if (valA > valB) return asc ? 1 : -1;
    if (valA < valB) return asc ? -1 : 1;
    return 0;
  });

  filas.forEach(fila => tabla.tBodies[0].appendChild(fila));
  tabla.dataset.orden = asc ? "asc" : "desc";
}

// Filtrar por marca
function filtrarTabla() {
  const filtro = document.getElementById("filtroTabla").value.toLowerCase();
  const filas = document.querySelectorAll("#tablaVehiculos tbody tr");

  filas.forEach(fila => {
    const celdas = Array.from(fila.cells);
    const coincide = celdas.some(celda =>
      celda.innerText.toLowerCase().includes(filtro)
    );
    fila.style.display = coincide ? "" : "none";
  });
}