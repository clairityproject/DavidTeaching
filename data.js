$(document).ready(function () {

    var limit = 3;

    $("#make400").click(function () {
        console.log("400!");
        limit = 400;
        redraw();
    });

    $("#make100").click(function () {
        console.log("100!");
        limit = 100;
        redraw();
    });


function redraw() {
    var url = "http://ec2-54-201-87-182.us-west-2.compute.amazonaws.com/api/v1/datapoint/?limit=" + limit;
    var temps = [];

    function logger(index, value) {
        //console.log(index + ": " + value.temperature);
        temps.push(value.temperature);
    }


    function processJSON(data) {
        $.each(data.objects, logger);
        $('#container').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Fruit Consumption'
            },

            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                data: temps
            }]
        });
    }

    // get the data
    $.getJSON(url, processJSON);
}

//intial 
redraw();


});
//OLD CODE
// var url = "http://ec2-54-201-87-182.us-west-2.compute.amazonaws.com/api/v1/datapoint/?limit=3";
// $.getJSON(url, function (data) {
// 	$.each(data.objects, function( index, value ) {
//   	console.log( index + ": " + value.temperature );
// 	});
// });