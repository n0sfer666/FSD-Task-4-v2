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

#### Model (Buisness Logic Layer):
The plugin’s business logic boils down to determining the new value(s) and position(s) of the thumbler(s) based on user actions and sending the necessary data to the view layer to change through the presenter layer;
##### Methods:
 - **set_new_position**
 ```Javascript
 set_new_position(thumbler_state: T_Thumbler_Data) { ... };
 ```
The main method of the model. It receives data from the view layer, than makes the necessary calculations and through the update() method sends new data back to the view layer (using presenter layer)
(check for a step movement, collision of two thumblers)

- **update**
 ```Javascript
update() { ... };
 ```
The method starts a callback from the callback's list to send data calculated by the set_new_position method
 
- **on_change_model**
 ```Javascript
on_change_model(callback: I_Model_State) { ... };
 ```
The method adds a callback to callback's list
 
- **get_position_from_value**
 ```Javascript
get_position_from_value(value: number, range: T_Range): number { ... };
 ```
The method is return a position based on value and range
 
- **get_value_from_position**
 ```Javascript
get_value_from_position(position: number, range: T_Range): number { ... };
 ```
 The method is return a value based on position and range
 
 - **set_value_and_position**
 ```Javascript
 set_value_and_position(new_value: number, i: number)
 ```
The method is set value and position in variables of class. If new_value bigger than (or less than) range, value equal min or max of range
 
