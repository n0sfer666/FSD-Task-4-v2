// types
type T_Orientation = 'horizontal' | 'vertical';
type T_CSS_Classes = 'slider' | 'thumbler' | 'connect' | 'tooltip';
type T_Range = [number, number];
type T_Value = [number] | [number, number];
type T_Position = [number] | [number, number];
type T_Input = [HTMLInputElement] | [HTMLInputElement, HTMLInputElement];

type T_Thumbler_Data = {
    position?: number,
    value?: number,
    index: number
}
type T_Model_Data = {
    value: T_Value,
    position: T_Position,
    index: number
}
// interfaces
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
interface I_Tooltip_Switch {
    (is_visible: boolean): void
}