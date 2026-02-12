
// Al cargar abro modal
prealoaderOption.on("load", function() {
    $('#modalMusica').modal({
        backdrop: 'static'
    });
});

// Btn play music modal
$('body').on('click', '#play-music-modal', function(e) {
    e.preventDefault();

    $('#play-pause-music').attr('data-estado-music', 'play');
    animMusicAnimIcon.play();
    player.playVideo();

    $('#modalMusica').modal('hide');
});
