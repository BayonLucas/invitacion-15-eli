import AOS from 'aos';

/**
 * 1. CONFIGURACIÓN Y VARIABLES GLOBALES
 */
const CONFIG = {
    pathApp: "https://localhost/",
    pathProducto: "/",
    pathJson: "/json/",
    fechaFestejo: "2026/05/24 21:00:00",
    dispositivo: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || navigator.vendor || window.opera) ? 'mobile' : 'desktop'
};

// Guardamos las rutas de imágenes según el dispositivo y soporte WebP
const getParallaxImages = () => {
    const isWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    const suffix = isWebp ? '.webp' : '.jpg';
    const mobilePrefix = (CONFIG.dispositivo === 'mobile' || window.innerWidth < 768) ? '-mobile' : '';
    
    return {
        portada: `portada${mobilePrefix}${suffix}`,
        instagram: `instagram${mobilePrefix}${suffix}`
    };
};

/**
 * 2. UTILIDADES DE APOYO
 */
const Utils = {
    // Inicializador de animaciones Lottie (Bodymovin)
    initLottie: (selector, path, autoplay = true) => {
        const container = document.querySelector(selector);
        if (!container) return null;
        return bodymovin.loadAnimation({
            wrapper: container,
            animType: 'svg',
            loop: true,
            autoplay: autoplay,
            path: path
        });
    },
    
    // Validador de URL
    isUrl: (string) => {
        try { return Boolean(new URL(string)); } 
        catch (e) { return false; }
    },

    isIOS: () => {
        return /Iphone|iPad|iPod/.test(navigator.userAgent);
    }

};

/**
 * 3. MÓDULOS DE FUNCIONALIDAD
 */

const Countdown = {
    init: () => {
        const targetDate = new Date(CONFIG.fechaFestejo).getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff < 0) {
                clearInterval(timer);
                $('#reloj').html(`<p class="fin-cuenta">${window.lang_textoFinalCuentaRegresiva || '¡Llegó el día!'}</p>`);
                $('.falta').text('');
                return;
            }

            $("#dias .number").text(Math.floor(diff / (1000 * 60 * 60 * 24)));
            $("#horas .number").text(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            $("#minutos .number").text(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
            $("#segundos .number").text(Math.floor((diff % (1000 * 60)) / 1000));
        }, 1000);
    }
};

const MusicPlayer = {
    player: null,
    animIcon: null,

    init: () => {
        // Cargar API de YouTube
        // const tag = document.createElement('script');
        // tag.src = "https://www.youtube.com/iframe_api";
        // document.head.appendChild(tag);

        MusicPlayer.animIcon = Utils.initLottie('.music-anim-icon', CONFIG.pathJson + "music-player-icon.json", false);

        window.onYouTubeIframeAPIReady = () => {
            MusicPlayer.player = new YT.Player('player-musica-fondo', {
                height: '10', width: '10',
                playerVars: { playlist: 'KaM1bCuG4xo', loop: 1 },
                events: { 'onReady': (e) => e.target.setVolume(80) }
            });
        };

        // Eventos de control
        $('body').on('click', '#play-music-modal, #play-pause-music', function(e) {
            e.preventDefault();
            const btn = $('#play-pause-music');
            const estado = btn.attr('data-estado-music');

            if (estado === 'pause' || e.target.id === 'play-music-modal') {
                btn.attr('data-estado-music', 'play');
                MusicPlayer.animIcon?.play();
                MusicPlayer.player?.playVideo();
                $('#modalMusica').modal('hide');
            } else {
                btn.attr('data-estado-music', 'pause');
                MusicPlayer.animIcon?.stop();
                MusicPlayer.player?.pauseVideo();
            }
        });
    }
};

const Forms = {
    init: () => {
        // Manejo de Asistencia
        $('body').on('click', '.confirmar-asistencia', function(e) {
            const evento = $(this).data('evento');
            $('#eventoAsistencia').val(evento);
            $('#modalAsistencia .modal-title').text(evento === 'Fiesta' ? window.lang_titleModalAsistenciaFiesta : window.lang_titleModalAsistenciaCeremonia);
            $('#modalAsistencia').modal({ backdrop: 'static' });
        });

        // Envío de Formularios (Asistencia / Sugerencia)
        // this.bindSubmit('#sendAsistencia', '#formAsistencia', 'confirmar-asistencia.php');
        // this.bindSubmit('#sendSugerenciaCancion', '#formSugerirCancion', 'sugerir-cancion.php');
    },

    bindSubmit: (btnSelector, formSelector, endpoint) => {
        $('body').on('click', btnSelector, function(e) {
            e.preventDefault();
            const $btn = $(this);
            const $form = $(formSelector);
            const formData = new FormData($form[0]);

            $btn.prop("disabled", true).text("Enviando...");

            // fetch(`${CONFIG.pathApp}producto/fetchs/${endpoint}`, { method: "POST", body: formData })
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.error) {
            //             $form.after(`<span id="error-form">${data.desc}</span>`);
            //         } else {
            //             $form.hide().parent().find('.msj-content').show();
            //             setTimeout(() => location.reload(), 3000);
            //         }
            //     })
            //     .finally(() => $btn.prop("disabled", false));
        });
    }
};

/**
 * 4. INICIALIZACIÓN GLOBAL
 */
document.addEventListener('DOMContentLoaded', () => {
    window.animLoader = Utils.initLottie('.loader', CONFIG.pathJson + "corazon.json");
    
    // 1. Plugins estáticos
    Countdown.init();
    MusicPlayer.init();
    Forms.init();
    
    // 2. Animaciones Lottie
    const anims = [
        ['.anim-instagram', CONFIG.pathJson + 'img_instagram.json'],
        ['.anim-fiesta', CONFIG.pathJson + 'img_fiesta.json'],
        ['.anim-regalos', CONFIG.pathJson + 'img_regalo.json'],
        ['.anim-musica', CONFIG.pathJson + 'img_musica.json'],
        ['.anim-galeria', CONFIG.pathJson + 'json_camara.json'],
        ['.corazon-falta', CONFIG.pathJson + 'corazon-falta.json'],
        ['.anim-vestuario', CONFIG.pathJson + 'vestuario.json'],
        ['.anim-tips', CONFIG.pathJson + 'tips.json']
    ];
    anims.forEach(([sel, path]) => Utils.initLottie(sel, path));
    
    // 3. Parallax y AOS (Esperamos a que todo cargue)
    window.addEventListener('load', () => {
        console.log("MAIN CARGADO");
    
        onClickRegalosModal();
        onClickSugerirCancionModal();
        onClickVestuarioModal();
        onClickTipsModal();
        onClickComoLlegarModal();
        
        const images = getParallaxImages();
        $('.preloader-area').delay(1000).fadeOut(500);
        $('.loader').fadeOut(500);
        
        console.log(CONFIG.dispositivo);    
        
        // document.querySelector(".portada-picture").style.backgroundImage = `url('${CONFIG.pathProducto + images.portada}')`;    
        document.querySelector(".portada-picture").appendChild(document.createElement("img")).setAttribute("src", CONFIG.pathProducto + images.portada);

        // if(Utils.isIOS()){
        //     
        // }
        // else {
        //     $('.portada-picture').parallax({ imageSrc: CONFIG.pathProducto + images.portada });        
        // }
        // $('.instagram').parallax({ imageSrc: CONFIG.pathProducto + images.instagram });

        setTimeout(() => {
            AOS.init({ duration: 1000, once: true });
            $('#modalMusica').modal({ backdrop: 'static' });
        }, 100);
        
        setTimeout(() => {
            window.animLoader.destroy();
        }, 2000)
    });
});







//events
const onClickRegalosModal = function (){
    $('body').on('click', 'a.modal-regalos', function(e) {
        e.preventDefault();
    
        $('#modalRegalos').modal({
            backdrop: 'static'
        })
    });
}

const onClickSugerirCancionModal = function (){
    $("body").on("click", "a.sugerir-cancion", function (e) {
        e.preventDefault();
        $("#error-form").remove();

        //@ts-ignore
        $("#modalSugerirCancion").modal({
            backdrop: "static",
        });
    });
}

const onClickVestuarioModal = function (){
    $("body").on("click", "a.modal-vestuario", function (e) {
        e.preventDefault();

        //@ts-ignore
        $("#modalVestuario").modal({
            backdrop: "static",
        });
    });
}

const onClickTipsModal = function (){
    $("body").on("click", "a.modal-tips", function (e) {
        e.preventDefault();

        //@ts-ignore
        $("#modalTips").modal({
            backdrop: "static",
        });
    });
}

const onClickComoLlegarModal = function (){
    // Abrir modal
    $('body').on('click', 'a.modal-como-llegar', function(e) {
      e.preventDefault();

      // Para modelos de 15 años, siempre es Fiesta
      var latitud = -34.614903016530114;
      var longitud = -58.371135930823804;
      var linkMapConfigured = "";
      var iframeSrc = '';
      var linkMaps = '';

      // Validar si hay coordenadas válidas
      var coordenadasValidas = (latitud !== 0 && longitud !== 0 && latitud !== null && longitud !== null);

      // Generar URL del iframe siempre con coordenadas
      if(coordenadasValidas) {
        // IFRAME: Siempre usa coordenadas (es la única forma confiable)
        iframeSrc = 'https://www.google.com/maps?q=' + latitud + ',' + longitud + '&output=embed';
        
        // AMPLIAR MAPA: Usa linkMaps si está configurado, sino usa coordenadas
        if(linkMapConfigured != '' && linkMapConfigured != null) {
          linkMaps = linkMapConfigured;
        } else {
          linkMaps = 'https://www.google.com/maps/search/?api=1&query=' + latitud + ',' + longitud;
        }
      } 
      // No hay coordenadas válidas
      else {
        console.warn('No hay coordenadas configuradas para el mapa');
        iframeSrc = 'https://www.google.com/maps?q=0,0&output=embed';
        linkMaps = linkMapConfigured != '' ? linkMapConfigured : 'https://www.google.com/maps';
      }

      // Mostrar loader y ocultar iframe temporalmente
      $('#mapLoader').removeClass('hidden');
      $('#googleMapIframe').css('opacity', '0');

      // Cargo el iframe con la URL generada
      $('#googleMapIframe').attr('src', iframeSrc);

      // Ocultar loader cuando el iframe termine de cargar
      $('#googleMapIframe').off('load').on('load', function() {
        $('#mapLoader').addClass('hidden');
        $('#googleMapIframe').css('opacity', '1');
      });

      // Genero el link para ampliar mapa
      $('.ampliar-mapa').attr('href', linkMaps);

      // Abrir modal
      // @ts-ignore
      $('#modalMapa').modal({
        backdrop: 'static'
      });

    });

    // Resetear loader cuando se cierra el modal
    $('#modalMapa').on('hidden.bs.modal', function() {
      $('#mapLoader').removeClass('hidden');
      $('#googleMapIframe').css('opacity', '0');
      $('#googleMapIframe').attr('src', '');
    });
}

