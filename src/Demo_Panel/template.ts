class Template {
  range_input_min: HTMLInputElement;
  range_input_max: HTMLInputElement;

  start_input_min: HTMLInputElement;
  start_input_max: HTMLInputElement;

  step_input: HTMLInputElement;

  orientation_input: HTMLInputElement;

  connect_input: HTMLInputElement;

  demo_panel: HTMLElement;
  constructor() {
    // range line
    let range_text: HTMLElement = document.createElement('span');
      range_text.innerText = 'Range: ';
    this.range_input_min = document.createElement('input');
      this.range_input_min.setAttribute('type', 'text');
      this.range_input_min.value = '-100';
    this.range_input_max = document.createElement('input');
      this.range_input_max.setAttribute('type', 'text');
      this.range_input_max.value = '100';
    let range_line = document.createElement('div');
      range_line.append(range_text, this.range_input_min, this.range_input_max);
    // start line
    let start_text: HTMLElement = document.createElement('span');
      start_text.innerText = 'Start: ';
    this.start_input_min = document.createElement('input');
      this.start_input_min.setAttribute('type', 'text');
      this.start_input_min.value = '-50';
    this.start_input_max = document.createElement('input');
      this.start_input_max.setAttribute('type', 'text');
      this.start_input_max.value = '50';
    let start_line = document.createElement('div');
      start_line.append(start_text, this.start_input_min, this.start_input_max);
    // step line
    let step_text: HTMLElement = document.createElement('span');
      step_text.innerText = 'Step: ';
    this.step_input = document.createElement('input');
      this.step_input.setAttribute('type', 'text');
      this.step_input.value = '10';
    let step_line = document.createElement('div');
      step_line.append(step_text, this.step_input);
    // orientation line
    let orientation_text: HTMLElement = document.createElement('span');
      orientation_text.innerText = 'Orientation horizontal/vertical: ';
    this.orientation_input = document.createElement('input');
      this.orientation_input.setAttribute('type', 'checkbox');
      this.orientation_input.checked = true;
    let orientation_line: HTMLElement = document.createElement('div');
      orientation_line.append(orientation_text, this.orientation_input);
    // connect line
    let connect_text: HTMLElement = document.createElement('span');
      connect_text.innerText = 'Connect on/off: ';
    this.connect_input = document.createElement('input');
      this.connect_input.setAttribute('type', 'checkbox');
      this.connect_input.checked = true;
    let connect_line: HTMLElement = document.createElement('div');
      connect_line.append(connect_text, this.connect_input);

    this.demo_panel = document.createElement('div');
      this.demo_panel.append(range_line, start_line, step_line, orientation_line, connect_line);
  }
}
export {Template}