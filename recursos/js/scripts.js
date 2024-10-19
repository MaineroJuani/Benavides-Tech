// function App(){

//     window.onload = function(event){
//         var app = new App();
//         window.app = app;
//     }

//     App.prototype.processingButton = function(event) {

//         const btn = event.currentTarget;
//         const carruselList = event.currentTarget.parentNode;
//         const track = event.currentTarget.parentNode.querySelector('#track');
//         const carrusel = track.querySelectorAll('.computadoras');

//         const carruselWidth = carrusel[0].offsetWidth;
//         const trackWidht = track.offsetWidth;
//         const listWidht = carruselList.offsetWidth;

//         track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0,-2) * -1);
//         btn.dataset.button == "button-prev" ? prevAction(leftPosition,carruselWidth,track) : nextAction(leftPosition,trackWidht,listWidht,carruselWidth,track);

//     }

//     let prevAction = (leftPosition, carruselWidth, track) => {
//         if(leftPosition > 0){
//             track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;
//         }
//     }

//     let nextAction = (leftPosition, trackWidht, listWidht, carruselWidth, track) => {

//         if(leftPosition < (trackWidht - listWidht)) {
//             if(leftPosition > 0){
//                 track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
//             }
//         }
//     }
// }

function App() {
    window.onload = function(event) {
        var app = new App();
        window.app = app;
    }

    App.prototype.processingButton = function(event) {
        const btn = event.currentTarget;
        const track = document.querySelector('#track');
        const carruselItems = track.querySelectorAll('.computadoras');
        const carruselWidth = carruselItems[0].offsetWidth;

        // Obtenemos la posición actual del track
        let leftPosition = parseFloat(getComputedStyle(track).left) || 0;

        // Si es la flecha de anterior, movemos hacia la izquierda
        if (btn.dataset.button === "button-prev") {
            if (leftPosition < 0) {
                track.style.left = `${leftPosition + carruselWidth}px`;
            }
        }
        // Si es la flecha de siguiente, movemos hacia la derecha
        else if (btn.dataset.button === "button-next") {
            if (Math.abs(leftPosition) < (carruselWidth * (carruselItems.length - 1))) {
                track.style.left = `${leftPosition - carruselWidth}px`;
            }
        }
    }
}