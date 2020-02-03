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
### Architecture:
The plugin was written in Typescript in jQuery wrapper using MVP architecture with Passive-View.
<details><summary>Types and Interfaces:</summary>
<p>
    
<details><summary>Types</summary>
<p>

```Javascript
type T_Orientation = 'horizontal' | 'vertical';
type T_CSS_Classes = 'slider' | 'thumbler' | 'connect' | 'tooltip';
type T_Range = [number, number];
type T_Value = [number] | [number, number];
type T_Position = [number] | [number, number];
type T_Input = [HTMLInputElement] | [HTMLInputElement, HTMLInputElement];

type T_Thumbler_Data = {
    position: number,
    index: number
}
type T_Model_Data = {
    value: T_Value,
    position: T_Position,
    index: number
}
```

</p></details>

<details><summary>Interface</summary>
<p>

```Javascript
interface I_Configuration_User {
    readonly orientation: T_Orientation; 
    readonly start: T_Value;
    readonly range: T_Range;
    readonly step: number;
    readonly connect: boolean;
    readonly tooltip: boolean;
    readonly input?: T_Input;
}
interface I_Configuration_Model {
    readonly value_start: T_Value;
    readonly value_range: T_Range;
    readonly value_step:  number;
}
interface I_Configuration_View {
    readonly orientation: T_Orientation,
    readonly value_start: T_Value;
    readonly value_range: T_Range;
    readonly is_tooltip:  boolean;
    readonly is_connect:  boolean;
    readonly input?: T_Input;
}
interface I_Thumbler_State {
    (thumbler_state: T_Thumbler_Data): void
}
interface I_Model_State {
    (model_state: T_Model_Data): void
}
```

</p></details>

</p></p></details>
