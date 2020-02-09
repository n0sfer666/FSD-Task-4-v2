## **github docs:** https://n0sfer666.github.io/FSD-Task-4-v2/
## **run test:** npm i && npm run test
---
## Usage: 
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
### Example:
#### HTML
```HTML
    <div id="slider"></div>
    <input type="text" id="input_min">
    <input type="text" id="input_max">
```
#### JS
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
## Terms:

**Thumbler** - the main functional element of the slider (the ball that the user moves along the slider bar) \
**Tooltip** - the block near the thumbler showing the value set by that thumbler \
**Connect** - the colored strip between zero position and the thumbler (or between two thumblers)

---
## Architecture:
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

</p></details>

<details><summary>UML diagram</summary>
<p>

![UML](/img/SRS.png)

</p></details>

### Model (Buisness Logic Layer):
The plugin’s business logic reduce to determining the new value(s) and position(s) of the thumbler(s) based on user actions and sending the necessary data to the view layer to change through the presenter layer;

<details><summary>Methods:</summary>
<p>

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

</p></details>

<details><summary>Variables:</summary>
<p>

```Javascript
value: T_Value 
range: T_Range
step: number
position: T_Position

index_of_active_thumbler: number

callback_list: I_Model_State[]
```

</p></details>

### View (Display and User Interaction Layer)
View renders the plugin, responds to user actions (generates thumbler_state) and sends data to the model. Also changes elements such as thumbler, connect, tooltip when receiving new data from the model.

<details><summary>Methods:</summary>
<p>

- on_change_view
```Javascript
on_change_view(callback: I_Thumbler_State) { ... }
```
Passes callback to thumbler method on_mousedown_and_move

- update
```Javascript
update(model_state: T_Model_Data) { ... }
```
Update thumbler(s), tooltips(s) and connect

</p></details>

<details><summary>Variables:</summary>
<p>

```Javascript
position: T_Position

value_range: T_Range
value_start: T_Value

orientation: T_Orientation;

is_tooltip: boolean;
is_connect: boolean;

slider: HTMLElement;
thumbler: Thumbler[]
connect: Connect[]
tooltip: Tooltip[]

input?: T_Input;
```

</p></details>

#### Helper class
Contains helper methods and variables

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
readonly TO_THUMBLER_POSITION: number = 1e4;
readonly TO_CONNECT_UPDATE: number = 1e2;
```

- get_position_from_value
```Javascript
get_position_from_value(value: number, range: T_Range): number { ... }
```
Return position from value and range

- get_div_element_with_class
```Javascript
get_div_element_with_class( css_class: T_CSS_Classes, orientation: T_Orientation ): HTMLElement
```
Return HTML element with correct class from orientation and type of element

</p></details>

#### Connect class (extends Helper)
creates Connect entinty

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLElement
connect_position: [number, number]
```

- set_connect_position
```Javascript
set_connect_position(position_start: number, position_end: number) { ... }
```

</p></details>

#### Tooltip class (extends Helper)
creates Tooltip entinty

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLElement
tooltip_value: number
```

- set_inner_text
```Javascript
set_inner_text(value: number) { ... }
```
set Tooltip HTML element inner text

</p></details>

#### Thumbler class (extends Helper)
creates Thumbler entinty

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLElement;

thumbler_position: number = 0;
listening: boolean = false;
```

- set_new_position
```Javascript
set_new_position(position: number) { ... }
```

- get_shift
```Javascript
get_shift(element: HTMLElement, event: MouseEvent): number { ... }
```
return the difference between coordinates of the user mouse click and the coordinates of left (or top) thumbler bound

- on_mouse_down_and_move
```Javascript
on_mouse_down_and_move(this: Thumbler, container: HTMLElement, callback: I_Thumbler_State) { ...
```
transfers the possible position (after holding left button of mouse and move) and index of thumbler to callback

</p></details>

### Presenter (Exchange Layer)
Transfers data between view and model.
Presenter havn't method and variables because this is not necessary
