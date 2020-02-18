import { Helper } from './entities/Helper';
import { Thumbler } from './entities/Thumbler';
import { Connect } from './entities/Connect';
import { Tooltip } from './entities/Tooltip';
import { Input } from './entities/Input';

class View extends Helper {
  position: T_Position = [0];

  value_range: T_Range = [0, 0];

  value_start: T_Value = [0];

  orientation: T_Orientation;

  is_tooltip: boolean;

  is_connect: boolean;

  slider: HTMLElement;

  thumbler: Thumbler[] = [];

  connect: Connect[] = [];

  tooltip: Tooltip[] = [];

  input_value: Input[] = [];

  input_tooltip?: Input;

  constructor(private container: HTMLElement, private configuration: I_Configuration_View) {
    super();

    this.is_tooltip = this.configuration.is_tooltip;
    this.is_connect = this.configuration.is_connect;
    this.orientation = this.configuration.orientation;

    this.slider = this.get_div_element_with_class('slider', this.orientation);

    this.init();
  }

  on_change_view(callback: I_Thumbler_State) {
    for (let i = 0; i < this.thumbler.length; i++) {
      this.thumbler[i].on_mouse_down_and_move(this.container, callback);
    }
    if (this.input_value[0] !== undefined) {
      for (let i = 0; i < this.input_value.length; i++) {
        this.input_value[i].on_keydown_or_mouseout(callback);
      }
    }
    if (this.input_tooltip && this.is_tooltip) {
      this.input_tooltip.on_switch_check(this.tooltip);
    }
  }

  update(model_state: T_Model_Data) {
    const i: number = model_state.index;
    const { position } = model_state;
    const { value } = model_state;

    this.set_active_thumbler(position, i);

    this.thumbler[i].set_new_position(position[i]);

    if (this.is_tooltip) {
      this.tooltip[i].set_inner_text(value[i]);
    }

    if (this.input_value[0] !== undefined) {
      this.input_value[i].element.value = String(value[i]);
    }

    if (this.is_connect) {
      if (this.position.length === 1) {
        this.connect[0].set_connect_position(0, position[0]);
      } else if (position[1]) {
        this.connect[0].set_connect_position(position[0], position[1]);
      }
    }
  }

  set_active_thumbler(position: T_Position, index: number) {
    if (position.length > 1) {
      if (index === 0) {
        this.thumbler[0].element.classList.add('SRS__thumbler_active');
        this.thumbler[1].element.classList.remove('SRS__thumbler_active');
        if (this.is_tooltip) {
          this.tooltip[0].element.classList.add('SRS__tooltip_active');
          this.tooltip[1].element.classList.remove('SRS__tooltip_active');
        }
      } else {
        this.thumbler[1].element.classList.add('SRS__thumbler_active');
        this.thumbler[0].element.classList.remove('SRS__thumbler_active');
        if (this.is_tooltip) {
          this.tooltip[1].element.classList.add('SRS__tooltip_active');
          this.tooltip[0].element.classList.remove('SRS__tooltip_active');
        }
      }
    }
  }

  init() {
    for (let i = 0; i < this.configuration.value_range.length; i++) {
      if (this.value_range[i] === undefined) {
        this.value_range.push(this.configuration.value_range[i]);
      } else {
        this.value_range[i] = this.configuration.value_range[i];
      }
    }

    for (let i = 0; i < this.configuration.value_start.length; i++) {
      if (this.value_start[i] === undefined) {
        this.value_start.push(this.configuration.value_start[i]);
      } else {
        this.value_start[i] = this.configuration.value_start[i];
      }

      if (this.position[i] === undefined) {
        this.position.push(this.get_position_from_value(this.value_start[i], this.value_range));
      } else {
        this.position[i] = this.get_position_from_value(this.value_start[i], this.value_range);
      }
    }

    for (let i = 0; i < this.position.length; i++) {
      this.thumbler.push(new Thumbler(this.position[i], this.orientation, i));
    }

    if (this.is_connect) {
      if (this.position.length === 1) {
        this.connect.push(new Connect(0, this.position[0], this.orientation));
      } else {
        this.connect.push(new Connect(this.position[0], this.position[1], this.orientation));
      }
      this.slider.append(this.connect[0].element);
    }

    if (this.is_tooltip) {
      for (let i = 0; i < this.thumbler.length; i++) {
        this.tooltip.push(new Tooltip(this.value_start[i], this.orientation));

        this.thumbler[i].element.append(this.tooltip[i].element);
      }
    }

    for (let i = 0; i < this.thumbler.length; i++) {
      this.slider.append(this.thumbler[i].element);
    }

    this.container.append(this.slider);

    if (this.configuration.input !== undefined && this.configuration.input.value !== undefined) {
      for (let i = 0; i < this.configuration.input.value.length; i++) {
        this.input_value.push(new Input(
          'value',
          this.configuration.input.value[i],
          this.configuration.value_start[i],
          i,
        ));
      }
    }

    if (this.configuration.input && this.configuration.input.tooltip) {
      this.input_tooltip = new Input(
        'tooltip',
        this.configuration.input.tooltip[0],
      );
    }
  }
}

export { View };
