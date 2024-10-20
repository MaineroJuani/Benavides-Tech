// Cargar header y footer automaticamente
document.addEventListener('DOMContentLoaded', function () {
    fetch('recursos/plantillas/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-encabezado').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el header:', error));

    fetch('recursos/plantillas/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-pie').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el footer:', error));
});