// Importamos AOS aquí para que esté disponible
import AOS from 'aos';

// 1. Variables Globales (Las colgamos de window para que funcionen como en FixDate)
window._pathApp = "https://localhost/";
window._pathProducto = "/";
window._pathJson = "/json/";
window.fechaCuentaRegresiva = "2026/05/24 21:00:00"; // Formato ISO es más seguro

// 2. Consulta dispositivo (Lo movemos arriba para poder usarlo)
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
window.device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ? 'mobile' : 'desktop';

// 3. Funciones de soporte
window.support_format_webp = function() {
    var elem = document.createElement('canvas');
    return (!!(elem.getContext && elem.getContext('2d'))) && (elem.toDataURL('image/webp').indexOf('data:image/webp') == 0);
};

// 4. Lógica de Imágenes
let imageParallax = '';
let imageInstagramParallax = '';

if (window.device === 'mobile' || window.innerWidth < 768) {
    imageParallax = window.support_format_webp() ? 'portada-mobile.webp' : 'portada-mobile.jpg';
    imageInstagramParallax = window.support_format_webp() ? 'instagram_mobile.webp' : 'instagram_mobile.jpg';
} else {
    imageParallax = window.support_format_webp() ? 'portada.webp' : 'portada.jpg';
    imageInstagramParallax = window.support_format_webp() ? 'instagram.webp' : 'instagram.jpg';
}

// 4. Cuenta Regresiva
// Set the date we're counting down to
var countDownDate = new Date(fechaCuentaRegresiva).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    // document.getElementById("reloj").innerHTML = days + " días " + hours + "hs " +  minutes + "m " + seconds + "s ";

    $("#dias .number").text(days);
    $("#horas .number").text(hours);
    $("#minutos .number").text(minutes);
    $("#segundos .number").text(seconds);

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("reloj").innerHTML = '<p class="fin-cuenta">' +
        lang_textoFinalCuentaRegresiva + '</p>';
        $('.falta').text('');
    }
}, 1000);


// initializeAnimations();





  


// 5. Inicialización de Plugins (Aseguramos que el DOM esté listo)
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();

    // Portada Parallax
    // @ts-ignore
    $('.portada-picture').parallax({
        imageSrc: window._pathProducto + imageParallax
    });

    // Instagram Parallax
    // @ts-ignore
    $('.instagram').parallax({
        imageSrc: window._pathProducto + imageInstagramParallax
    });

    // Preloader y AOS
    window.addEventListener('load', function() {
        const $preloader = $('.loader');
        const $preloaderArea = $('.preloader-area');

        $preloader.fadeOut(500);
        $preloaderArea.delay(100).fadeOut(500);

        // Verificamos si animLoader existe antes de intentar destruirlo
        if (window.animLoader) {
            window.animLoader.destroy();
        }

        setTimeout(() => {
            AOS.init({ duration: 1000, once: true });
        }, 100);
    });
});







// Functions
const initializeClassAnimation = function(className, jsonPath) {
    let svgContainer = document.querySelector(className);

    let anim = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: true,
      path: _pathProducto + jsonPath
    });

    anim.play();
}

const initializeAnimations = function() {
    initializeClassAnimation('.anim-instagram', 'json/img_instagram.json');
    initializeClassAnimation('.anim-fiesta', 'json/img_fiesta.json');
    initializeClassAnimation('.anim-regalos', 'json/img_regalo.json');
    initializeClassAnimation('.anim-galeria', 'json/json_camara.json');    
    initializeClassAnimation('.corazon-falta', 'json/corazon-falta.json');    
}