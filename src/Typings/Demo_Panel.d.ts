interface I_DEMO_Input {
  readonly value: [HTMLInputElement, HTMLInputElement];
  readonly tooltip: [HTMLInputElement];
}
interface I_DEMO_defaultConfig {
  range: [number, number];
  start: T_DEMO_Start;
  step: number;
}
type T_DEMO_Start = [number] | [number, number];