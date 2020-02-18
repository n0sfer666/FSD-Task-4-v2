import { Helper } from './entities/Helper';
import { Tumbler } from './entities/Tumbler';
import { Connect } from './entities/Connect';
import { Tooltip } from './entities/Tooltip';
import { Input } from './entities/Input';

class View extends Helper {
  position: tPosition = [0];

  range: tRange = [0, 0];

  start: tValue = [0];

  orientation: tOrientation;

  isTooltip: boolean;

  isConnect: boolean;

  slider: HTMLElement;

  tumbler: Tumbler[] = [];

  connect: Connect[] = [];

  tooltip: Tooltip[] = [];

  inputValue: Input[] = [];

  inputTooltip?: Input;

  constructor(private container: HTMLElement, private config: iConfigView) {
    super();

    this.isTooltip = this.config.isTooltip;
    this.isConnect = this.config.isConnect;
    this.orientation = this.config.orientation;

    this.slider = this.getDivElementWithClass('slider', this.orientation);

    this.init();
  }

  onChangeView(callback: iTumblerCallback) {
    for (let i = 0; i < this.tumbler.length; i++) {
      this.tumbler[i].onMousedownAndMove(this.container, callback);
    }
    if (this.inputValue[0] !== undefined) {
      for (let i = 0; i < this.inputValue.length; i++) {
        this.inputValue[i].onKeydownOrMouseout(callback);
      }
    }
    if (this.inputTooltip && this.isTooltip) {
      this.inputTooltip.onSwitchCheck(this.tooltip);
    }
  }

  update(modelData: tModelData) {
    const i: number = modelData.index;
    const { position } = modelData;
    const { value } = modelData;

    this.setActivetumbler(position, i);

    this.tumbler[i].setNewPosition(position[i]);

    if (this.isTooltip) {
      this.tooltip[i].setInnerText(value[i]);
    }

    if (this.inputValue[0] !== undefined) {
      this.inputValue[i].element.value = String(value[i]);
    }

    if (this.isConnect) {
      if (this.position.length === 1) {
        this.connect[0].setPosition(0, position[0]);
      } else if (position[1]) {
        this.connect[0].setPosition(position[0], position[1]);
      }
    }
  }

  setActivetumbler(position: tPosition, index: number) {
    if (position.length > 1) {
      if (index === 0) {
        this.tumbler[0].element.classList.add('SRS__tumbler_active');
        this.tumbler[1].element.classList.remove('SRS__tumbler_active');
        if (this.isTooltip) {
          this.tooltip[0].element.classList.add('SRS__tooltip_active');
          this.tooltip[1].element.classList.remove('SRS__tooltip_active');
        }
      } else {
        this.tumbler[1].element.classList.add('SRS__tumbler_active');
        this.tumbler[0].element.classList.remove('SRS__tumbler_active');
        if (this.isTooltip) {
          this.tooltip[1].element.classList.add('SRS__tooltip_active');
          this.tooltip[0].element.classList.remove('SRS__tooltip_active');
        }
      }
    }
  }

  init() {
    for (let i = 0; i < this.config.range.length; i++) {
      if (this.range[i] === undefined) {
        this.range.push(this.config.range[i]);
      } else {
        this.range[i] = this.config.range[i];
      }
    }

    for (let i = 0; i < this.config.start.length; i++) {
      if (this.start[i] === undefined) {
        this.start.push(this.config.start[i]);
      } else {
        this.start[i] = this.config.start[i];
      }

      if (this.position[i] === undefined) {
        this.position.push(this.getPositionFromValue(this.start[i], this.range));
      } else {
        this.position[i] = this.getPositionFromValue(this.start[i], this.range);
      }
    }

    for (let i = 0; i < this.position.length; i++) {
      this.tumbler.push(new Tumbler(this.position[i], this.orientation, i));
    }

    if (this.isConnect) {
      if (this.position.length === 1) {
        this.connect.push(new Connect(0, this.position[0], this.orientation));
      } else {
        this.connect.push(new Connect(this.position[0], this.position[1], this.orientation));
      }
      this.slider.append(this.connect[0].element);
    }

    if (this.isTooltip) {
      for (let i = 0; i < this.tumbler.length; i++) {
        this.tooltip.push(new Tooltip(this.start[i], this.orientation));

        this.tumbler[i].element.append(this.tooltip[i].element);
      }
    }

    for (let i = 0; i < this.tumbler.length; i++) {
      this.slider.append(this.tumbler[i].element);
    }

    this.container.append(this.slider);

    if (this.config.input !== undefined && this.config.input.value !== undefined) {
      for (let i = 0; i < this.config.input.value.length; i++) {
        this.inputValue.push(new Input(
          'value',
          this.config.input.value[i],
          this.config.start[i],
          i,
        ));
      }
    }

    if (this.config.input && this.config.input.tooltip) {
      this.inputTooltip = new Input(
        'tooltip',
        this.config.input.tooltip[0],
      );
    }
  }
}

export { View };
