import { SimpleRangeSlider } from '../../dist/SimpleRangeSlider';

$(document).ready(function() {
    // console.log('ready!');
    var slider_x_1 = $('#slider_x_1').SimpleRangeSlider({});
    
    var slider_x_2 = $('#slider_x_2').SimpleRangeSlider({
        range: [-100, 100],
        start: [-75, 75],
        step: 5,
        tooltip: true
    });

    var slider_y_1 = $('#slider_y_1').SimpleRangeSlider({
        orientation: 'vertical',
        range: [-1000, 1000],
        start: [0],
        step: 10,
        tooltip: true,
        connect: false
    });

    var slider_y_2 = $('#slider_y_2').SimpleRangeSlider({
        orientation: 'vertical',
        range: [-10000, 10000],
        start: [-5000, 5000],
        step: 100
    });
})