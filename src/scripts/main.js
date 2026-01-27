// Importamos AOS aquí para que esté disponible
import AOS from 'aos';

// 1. Variables Globales (Las colgamos de window para que funcionen como en FixDate)
window._pathApp = "https://localhost/";
window._pathProducto = "/"; // Cambiado de @/ a / (el navegador no entiende @)
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
    imageInstagramParallax = window.support_format_webp() ? 'img/instagram_mobile.webp' : 'img/instagram_mobile.jpg';
} else {
    imageParallax = window.support_format_webp() ? 'portada.webp' : 'portada.jpg';
    imageInstagramParallax = window.support_format_webp() ? 'img/instagram.webp' : 'img/instagram.jpg';
}

// 5. Inicialización de Plugins (Aseguramos que el DOM esté listo)
document.addEventListener('DOMContentLoaded', () => {
    
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