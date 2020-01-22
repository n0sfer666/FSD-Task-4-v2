// types
type T_Orientation = 'horizontal' | 'vertical';
type T_CSS_Classes = 'slider' | 'thumbler' | 'connect' | 'tooltip';
type T_Range = [number, number];
type T_Value = [number] | [number, number];
type T_Position = [number] | [number, number];

type T_Thumbler_Data = {
    position_safe_int: number,
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
    value_step:  number;
    is_tooltip:  boolean;
    is_connect:  boolean;
}
interface I_Thumbler_State {
    (thumbler_state: T_Thumbler_Data): void
}