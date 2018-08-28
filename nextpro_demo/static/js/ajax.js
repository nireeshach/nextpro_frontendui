function jumpvideo(skiptime) {
    var myvideo = videojs('myvideo');
    myvideo.play();
    myvideo.pause();
    myvideo.currentTime(skiptime);
    myvideo.play();
}

function progressvideo(value) {
    $('#progBar').attr('value', value);
    debugger;
}
$(document).ready(function () {
    $.ajax({
        url: "https://us-central1-sandbox-211511.cloudfunctions.net/annotate-video ",
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            $.each(res.entities, function (i, val) {
                $('#result').append('<li> <a href="#" class="progress" onclick="progressvideo(' + val.confidence + ')">' + val.label + "</a> </li>");
                $('#result').append('<progress id="progBar" value="0" max="10" />');
            });
        }
    })

    $.ajax({
        url: "https://us-central1-sandbox-211511.cloudfunctions.net/athletes-in-video",
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            // $('#result').html(JSON.stringify(res, null, '\t'))
            $.each(res, function (i, val) {
                $('#time').append('<li> <a href="#" class="jump" onclick="jumpvideo(' + val.segments[0].start + ')">' + "player " + val.player_no + '</a> </li>');

            });
        }
    })
});