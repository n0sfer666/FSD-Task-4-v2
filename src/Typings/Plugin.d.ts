// types
type tOrientation = 'horizontal' | 'vertical';
type tCssClasses = 'slider' | 'thumbler' | 'connect' | 'tooltip';
type tRange = [number, number];
type tValue = [number] | [number, number];
type tPosition = [number] | [number, number];
type tInputType = 'value' | 'tooltip'
type tConfigInput = {
    value?: [HTMLInputElement] | [HTMLInputElement, HTMLInputElement],
    tooltip?: [HTMLInputElement]
}

type tTumblerData = {
    position?: number,
    value?: number,
    index: number
}
type tModelData = {
    value: tValue,
    position: tPosition,
    index: number
}
// interfaces
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