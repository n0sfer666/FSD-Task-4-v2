// types
type T_Configuration_Orientation = 'horizontal' | 'vertical';

// interfaces
interface I_Configuration_User {
    readonly orientation: T_Configuration_Orientation; 
    readonly start: [number] | [number, number];
    readonly range: [number, number];
    readonly step: number;
    readonly connect: boolean;
    readonly tooltip: boolean;
}
interface I_Configuration_Model {
    value_start: [number] | [number, number];
    value_range: [number, number];
    value_step:  number;
}
interface I_Configuration_View {
    orientation: T_Configuration_Orientation,
    value_start: [number] | [number, number];
    value_range: [number, number];
    value_step:  number;
    is_tooltip:  boolean;
    is_connect:  boolean;
}