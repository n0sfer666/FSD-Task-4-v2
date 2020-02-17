import { SimpleRangeSlider } from '../../dist/SimpleRangeSlider';

$(document).ready(function() {
    // console.log('ready!');
    var input_x_1 = [document.getElementById('input_x_1_min')];
    var input_check_x_1 = [document.getElementById('input_check_x_1')];

    var slider_x_1 = $('#slider_x_1').SimpleRangeSlider({
        input: {
            value: input_x_1,
            tooltip: input_check_x_1
        }
    });
    
    var input_x_2 = [
        document.getElementById('input_x_2_min'),
        document.getElementById('input_x_2_max')
    ];
    var input_check_x_2 = [document.getElementById('input_check_x_2')];

    var slider_x_2 = $('#slider_x_2').SimpleRangeSlider({
        range: [-100, 100],
        start: [-75, 75],
        step: 5,
        tooltip: true,
        input: {
            value: input_x_2,
            tooltip: input_check_x_2
        }
    });

    var input_y_1 = [document.getElementById('input_y_1_min')];
    var input_check_y_1 = [document.getElementById('input_check_y_1')];

    var slider_y_1 = $('#slider_y_1').SimpleRangeSlider({
        orientation: 'vertical',
        range: [-1000, 1000],
        start: [0],
        step: 10,
        tooltip: true,
        connect: false,
        input: {
            value: input_y_1,
            tooltip: input_check_y_1
        }
    });

    var input_y_2 = [
        document.getElementById('input_y_2_min'),
        document.getElementById('input_y_2_max')
    ]
    var input_check_y_2 = [document.getElementById('input_check_y_2')];

    var slider_y_2 = $('#slider_y_2').SimpleRangeSlider({
        orientation: 'vertical',
        range: [-10000, 10000],
        start: [-5000, 5000],
        step: 100,
        input: {
            value: input_y_2,
            tooltip: input_check_y_2
        }
    });
})