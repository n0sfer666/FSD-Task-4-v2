## **github docs:** https://n0sfer666.github.io/FSD-Task-4-v2/
## **run test:** npm i && npm run test
---
## Usage: 
```JavaScript
    import '/path/to/SimpleRangeSlider.min.js'
    let slider = $('#container_id').SimpleRangeSlider({
        orientation: 'horizontal' or 'vertical',
        range: [number, number], // [min value, max value]
        start: [number] or [number, number], // for one or two tumbler(s) !cannot out of range!
        step: number,
        connect: boolean, // stripe between two tumbler or 0 and tumbler
        tooltip: boolean, // block(s) near tumbler(s) with value
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

**Tumbler** - the main functional element of the slider (the ball that the user moves along the slider bar) \
**Tooltip** - the block near the tumbler showing the value set by that tumbler \
**Connect** - the colored strip between zero position and the tumbler (or between two tumblers)

---
## Architecture:
The plugin was written in Typescript in jQuery wrapper using MVP architecture with Passive-View.
<details><summary>Types and Interfaces:</summary>
<p>
    
<details><summary>Types</summary>
<p>

```Javascript
type tOrientation = 'horizontal' | 'vertical';
type tCssClasses = 'slider' | 'tumbler' | 'connect' | 'tooltip';
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
    readonly start: tValue;
    readonly range: tRange;
    readonly step:  number;
}
interface iConfigView {
    readonly orientation: tOrientation,
    readonly start: tValue;
    readonly range: tRange;
    readonly isTooltip:  boolean;
    readonly isConnect:  boolean;
    readonly input?: tConfigInput;
}
interface iTumblerCallback {
    (tumblerData: tTumblerData): void
}
interface iModelCallback {
    (modelData: tModelData): void
}

```

</p></details>

</p></details>

<details><summary>UML diagram</summary>
<p>

![UML](/img/SRS.png)

</p></details>

### Model (Business Logic Layer):
The plugin’s business logic reduce to determining the new value(s) and position(s) of the tumbler(s) based on user actions and sending the necessary data to the view layer to change through the presenter layer;

<details><summary>Methods:</summary>
<p>

- **setNewPosition**
 ```Javascript
 setNewPosition(tumblerData: tTumblerData) { ... };
 ```
The main method of the model. It receives data from the view layer, than makes the necessary calculations and through the update() method sends new data back to the view layer (using presenter layer)
(check for a step movement, collision of two tumblers)

- **update**
 ```Javascript
update() { ... };
 ```
The method starts a callback from the callback's list to send data calculated by the setNewPosition method
 
- **on_change_model**
 ```Javascript
on_change_model(callback: iModelCallback) { ... };
 ```
The method adds a callback to callback's list
 
- **getPositionFromValue**
 ```Javascript
getPositionFromValue(value: number, range: tRange): number { ... };
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

activeIndex: number

callbackList: iModelCallback[]
```

</p></details>

### View (Display and User Interaction Layer)
View renders the plugin, responds to user actions (generates tumblerData) and sends data to the model. Also changes elements such as tumbler, connect, tooltip when receiving new data from the model.

<details><summary>Methods:</summary>
<p>

- onChangeView
```Javascript
onChangeView(callback: iTumblerCallback) { ... }
```
Passes callback to tumbler method on_mousedown_and_move

- update
```Javascript
update(modelData: tModelData) { ... }
```
Update tumbler(s), tooltips(s) and connect

</p></details>

<details><summary>Variables:</summary>
<p>

```Javascript
position: tPosition

range: tRange
start: tValue

orientation: tOrientation;

isTooltip: boolean;
isConnect: boolean;

slider: HTMLElement;
tumbler: Tumbler[]
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
readonly TO_TUMBLER_POSITION: number = 1e4;
readonly TO_CONNECT_UPDATE: number = 1e2;
```

- getPositionFromValue
```Javascript
getPositionFromValue(value: number, range: tRange): number { ... }
```
Return position from value and range

- getDivElementWithClass
```Javascript
getDivElementWithClass( cssClass: tCssClasses, orientation: tOrientation ): HTMLElement
```
Return HTML element with correct class from orientation and type of element

</p></details>

#### Connect class (extends Helper)
creates Connect entity

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLElement
position: [number, number]
```

- setPosition
```Javascript
setPosition(startPosition: number, endPosition: number) { ... }
```

</p></details>

#### Tooltip class (extends Helper)
creates Tooltip entity

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLElement
value: number
```

- setInnerText
```Javascript
setInnerText(value: number) { ... }
```
set Tooltip HTML element inner text

- switchHidden
```Javascript
switchHidden(this: Tooltip, isVisible: boolean) { ... }
```
set element.hidden = true, if isVisible === false and vice versa

</p></details>

#### Tumbler class (extends Helper)
creates tumbler entity

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLElement;

position: number = 0;
listening: boolean = false;
```

- setNewPosition
```Javascript
setNewPosition(position: number) { ... }
```

- getShift
```Javascript
getShift(element: HTMLElement, event: MouseEvent): number { ... }
```
return the difference between coordinates of the user mouse click and the coordinates of left (or top) tumbler bound

- onMousedownAndMove
```Javascript
onMousedownAndMove(this: Tumbler, container: HTMLElement, callback: iTumblerCallback) { ... }
```
transfers the possible position (after holding left button of mouse and move) and index of tumbler to callback

</p></details>

#### Input class (extends Helper)
creates Input entity

<details><summary>Methods and Variables:</summary>
<p>

```Javascript
element: HTMLInputElement;
type: 'value' | 'tooltip';
```

- onKeydownOrMouseout
```Javascript
onKeydownOrMouseout(this: Input, callback: iTumblerCallback) { ... }
```
creates two listeners (keydown and mouseout) or return false if type not equal value. Listeners are run callback with value of input

- onSwitchCheck
```Javascript
onSwitchCheck(this: Input, tooltip: Tooltip[]) { ... }
```
creates listener (change) or return false of type not equal tooltip. Listener are run tooltip.switch(false) if input element not checked and vice versa (for all tooltips).

</p></details>

### Presenter (Exchange Layer)
Transfers data between view and model.
Presenter have not method and variables because this is not necessary
