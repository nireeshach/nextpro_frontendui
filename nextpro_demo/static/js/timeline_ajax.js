var player_list = [];
var start_time = [];

function parseCSV(results) {
    // var results = $.csv.toObjects(file);
    google.charts.load("current", { packages: ["timeline"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'player' });
        dataTable.addColumn({ type: 'datetime', id: 'Start' });
        dataTable.addColumn({ type: 'datetime', id: 'End' });
        // var player_l = timeLine();
        $.each(results, function (index, value) {
            var startTime = value["start"],
                endTime = value["end"],
                startParts = startTime.split(":"),
                endParts = endTime.split(":");

            for (k in value) {
                if (value[k].toLowerCase() == "x") {
                    var player = k.toString();
                    dataTable.addRows([
                        [
                            player,
                            new Date(0, 0, 0, startParts[0], startParts[1], startParts[2]),
                            new Date(0, 0, 0, endParts[0], endParts[1], endParts[2])],
                    ]);
                }
            }
            google.visualization.events.addListener(chart, 'select', function () {
                var selection = chart.getSelection();
                if (selection) {
                    var value = dataTable.getValue(selection[0].row, 1);

                    var d = new Date(value);
                    var starttime_seconds = d.getSeconds();
                    var starttime_min = d.getMinutes() * 60;
                    var starttime_hours = d.getHours() * 60 * 60;
                    var currentTime_stop = starttime_hours + starttime_min + starttime_seconds;
                    var myvideo = videojs('myvideo');
                    var playPromise = myvideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {

                            myvideo.pause();
                        });
                    }

                    myvideo.currentTime(currentTime_stop);
                    myvideo.load();
                }
            });

        });

        var options = {
            timeline: { groupByRowLabel: true },
            bar: { groupWidth: "20%" },
            width: 300,
            hieght: 20,
            colors: ['#cbb69d'],

        };

        chart.draw(dataTable, {
            hAxis: {
                format: 'mm:ss',
                maxValue: new Date(0, 0, 0, 0, 6, 0),
                minValue: new Date(0, 0, 0, 0, 0, 0)
            }, options,
        });
    }


}


$(document).ready(function () {
    var csvdata = [];

    $.ajax({
        type: "GET",
        url: "/static/data/players_data.csv",
        dataType: "text",
        success: function (data) {
            csvdata = $.csv.toObjects(data);
            $.ajax({
                type: "GET",
                url: "/static/data/labels_data.csv",
                dataType: "text",
                success: function (data) {
                    finalData = csvdata.concat($.csv.toObjects(data))
                    parseCSV(finalData);
                }
            });

        }
    });
});
