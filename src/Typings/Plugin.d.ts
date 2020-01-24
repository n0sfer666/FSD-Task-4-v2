// types
type T_Orientation = 'horizontal' | 'vertical';
type T_CSS_Classes = 'slider' | 'thumbler' | 'connect' | 'tooltip';
type T_Range = [number, number];
type T_Value = [number] | [number, number];
type T_Position = [number] | [number, number];

type T_Thumbler_Data = {
    position: number,
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
}
interface I_Configuration_Model {
    value_start: T_Value;
    value_range: T_Range;
    value_step:  number;
}
interface I_Configuration_View {
    orientation: T_Orientation,
    value_start: T_Value;
    value_range: T_Range;
    is_tooltip:  boolean;
    is_connect:  boolean;
}
interface I_Thumbler_State {
    (thumbler_state: T_Thumbler_Data): void
}
interface I_Model_State {
    (model_state: T_Model_Data): void
}