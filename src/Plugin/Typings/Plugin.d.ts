interface I_Configuration {
    readonly orientation: T_Configuration_Orientation; 
    readonly start: [number] | [number, number];
    readonly range: [number, number];
    readonly step: number;
    readonly connect: boolean;
    readonly tooltip: boolean;
}

type T_Configuration_Orientation = 'horizontal' | 'vertical';