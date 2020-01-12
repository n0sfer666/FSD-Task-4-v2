// types
type T_Orientation = 'horizontal' | 'vertical';
type T_Range = [number, number];
type T_Value = [number] | T_Range;
type T_Position = T_Value;
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