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
        input: { // value: input(text), tooltip: input(checkbox)
            value: [HTMLInputElement] | [HTMLInputElement, HTMLInputElement],
            tooltip: [HTMLInputElement]
        }
    })
```
### Example:
#### HTML
```HTML
    <div id="slider"></div>
    <input type="text" id="input_min">
    <input type="text" id="input_max">
    <input type="checkbox" id="input_check">
```
#### JS
```JavaScript
var input = {
    value: [
        document.getElementById('input_min'),
        document.getElementById('input_max')
        ],
    tooltip: [document.getElementById('input_check')]
}

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
**Connect** - the colored strip between zero position and the thumbler (or between two tumblers)

---
## Architecture:
The plugin was written in Typescript in jQuery wrapper using MVP architecture with Passive-View.
<details><summary>Types and Interfaces:</summary>
<p>
    
<details><summary>Types</summary>
<p>

```Javascript
type tOrientation = 'horizontal' | 'vertical';
type tCssClasses = 'slider' | 'thumbler' | 'connect' | 'tooltip';
type tRange = [number, number];
type tValue = [number] | [number, number];
type tPosition = [number] | [number, number];
type tConfigInput = {
    value?: [HTMLInputElement] | [HTMLInputElement, HTMLInputElement],
    tooltip?: [HTMLInputElement]
}

type tTumblerData = {
    position: number,
    index: number
}
type tModelData = {
    value: tValue,
    position: tPosition,
    index: number
}
```

</p></details>

<details><summary>Interface</summary>
<p>

```Javascript
interface iConfigUser {
    readonly orientation: tOrientation; 
    readonly start: tValue;
    readonly range: tRange;
    readonly step: number;
    readonly connect: boolean;
    readonly tooltip: boolean;
    readonly input?: tConfigInput;
}
interface iConfigModel {
    readonly value_start: tValue;
    readonly value_range: tRange;
    readonly value_step:  number;
}
interface iConfigView {
    readonly orientation: tOrientation,
    readonly value_start: tValue;
    readonly value_range: tRange;
    readonly is_tooltip:  boolean;
    readonly is_connect:  boolean;
    readonly input?: tConfigInput;
}
interface iTumblerCallback {
    (thumbler_state: tTumblerData): void
}
interface iModelCallback {
    (model_state: tModelData): void
}

```

</p></details>

</p></details>

<details><summary>UML diagram</summary>
<p>

![UML](/img/SRS.png)

</p></details>

### Model (Business Logic Layer):
The plugin’s business logic reduce to determining the new value(s) and position(s) of the thumbler(s) based on user actions and sending the necessary data to the view layer to change through the presenter layer;

<details><summary>Methods:</summary>
<p>

- **set_new_position**
 ```Javascript
 set_new_position(thumbler_state: tTumblerData) { ... };
 ```
The main method of the model. It receives data from the view layer, than makes the necessary calculations and through the update() method sends new data back to the view layer (using presenter layer)
(check for a step movement, collision of two tumblers)

- **update**
 ```Javascript
update() { ... };
 ```
The method starts a callback from the callback's list to send data calculated by the set_new_position method
 
- **on_change_model**
 ```Javascript
on_change_model(callback: iModelCallback) { ... };
 ```
The method adds a callback to callback's list
 
- **getPosition_from_value**
 ```Javascript
getPosition_from_value(value: number, range: tRange): number { ... };
 ```
The method is return a position based on value and range
 
- **getValue_from_position**
 ```Javascript
getValue_from_position(position: number, range: tRange): number { ... };
 ```
 The method is return a value based on position and range
 
 - **setValue_and_position**
 ```Javascript
 setValue_and_position(new_value: number, i: number)
 ```
The method is set value and position in variables of class. If new_value bigger than (or less than) range, value equal min or max of range

</p></details>

<details><summary>Variables:</summary>
<p>

```Javascript
value: tValue 
range: tRange
step: number
position: tPosition

index_of_active_thumbler: number

callback_list: iModelCallback[]
```

</p></details>

### View (Display and User Interaction Layer)
View renders the plugin, responds to user actions (generates thumbler_state) and sends data to the model. Also changes elements such as thumbler, connect, tooltip when receiving new data from the model.

<details><summary>Methods:</summary>
<p>

- on_change_view
```Javascript
on_change_view(callback: iTumblerCallback) { ... }
```
Passes callback to thumbler method on_mousedown_and_move

- update
```Javascript
update(model_state: tModelData) { ... }
```
Update thumbler(s), tooltips(s) and connect

</p></details>

<details><summary>Variables:</summary>
<p>

```Javascript
position: tPosition

value_range: tRange
value_start: tValue

orientation: tOrientation;

is_tooltip: boolean;
is_connect: boolean;

slider: HTMLElement;
thumbler: Thumbler[]
connect: Connect[]
tooltip: Tooltip[]

input?: tConfigInput;
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

- getPosition_from_value
```Javascript
getPosition_from_value(value: number, range: tRange): number { ... }
```
Return position from value and range

- get_div_element_with_class
```Javascript
get_div_element_with_class( css_class: tCssClasses, orientation: tOrientation ): HTMLElement
```
Return HTML element with correct class from orientation and type of element

</p></details>

#### Connect class (extends Helper)
creates Connect entity

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLElement
connectPosition: [number, number]
```

- set_connectPosition
```Javascript
set_connectPosition(position_start: number, position_end: number) { ... }
```

</p></details>

#### Tooltip class (extends Helper)
creates Tooltip entity

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

- switch_hidden
```Javascript
switch_hidden(this: Tooltip, is_visible: boolean) { ... }
```
set element.hidden = true, if is_visible === false and vice versa

</p></details>

#### Thumbler class (extends Helper)
creates Thumbler entity

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
on_mouse_down_and_move(this: Thumbler, container: HTMLElement, callback: iTumblerCallback) { ... }
```
transfers the possible position (after holding left button of mouse and move) and index of thumbler to callback

</p></details>

#### Input class (extends Helper)
creates Input entity

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLInputElement;
type: 'value' | 'tooltip';
```

- on_keydown_or_mouseout
```Javascript
on_keydown_or_mouseout(this: Input, callback: iTumblerCallback) { ... }
```
creates two listeners (keydown and mouseout) or return false if type not equal value. Listeners are run callback with value of input

- on_switch_check
```Javascript
on_switch_check(this: Input, tooltip: Tooltip[]) { ... }
```
creates listener (change) or return false of type not equal tooltip. Listener are run tooltip.switch(false) if input element not checked and vice versa (for all tooltips).

</p></details>

### Presenter (Exchange Layer)
Transfers data between view and model.
Presenter have not method and variables because this is not necessary
