## **github docs:** https://n0sfer666.github.io/FSD-Task-4-v2/
## **run test:** npm i && npm run test
---
### Usage: 
```JavaScript
    import '/path/to/SimpleRangeSlider.min.js'
    let slider = $('#container_id').SimpleRangeSlider({
        orientation: 'horizontal' or 'vertical',
        range: [number, number], // [min value, max value]
        start: [number] or [number, number], // for one or two thumbler(s) !cannot out of range!
        step: number,
        connect: boolean, // stripe between two thumbler or 0 and thumbler
        tooltip: boolean, // block(s) near thumbler(s) with value
        input: [HTMLInputElement] or [HTMLInputElement, HTMLInputElement] // you need to create
                                                                    //  one or two input with id
    })
```
#### Example:
##### HTML
```HTML
    <div id="slider"></div>
    <input type="text" id="input_min">
    <input type="text" id="input_max">
```
##### JS
```JavaScript
var input = [
    document.getElementById('input_min'),
    document.getElementById('input_max')
]

var slider = $('#slider').SimpleRangeSlider({
    range: [-100, 100],
    start: [-75, 75],
    step: 5,
    tooltip: true,
    connect: true,
    input: input
});
```
---
