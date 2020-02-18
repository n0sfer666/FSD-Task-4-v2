class Model {
    value: tValue = [0];

    range: tRange = [0, 0];

    step: number = 0;

    position: tPosition = [0];

    index_of_active_thumbler: number = 0;

    callback_list: iModelCallback[];

    readonly TO_NORMALIZE_POSITION: number = 1e4;

    constructor(private configuration: iConfigModel) {
      this.callback_list = [];

      this.step = this.configuration.value_step;

      this.init();
    }

    set_new_position(thumbler_state: tTumblerData) {
      const { index } = thumbler_state;
      this.index_of_active_thumbler = index;

      const new_value: number = this.get_new_value(thumbler_state);

      this.check_on_step_movement_to_set_val_and_pos(new_value, index);
      // check for collision
      if (this.value.length > 1 && this.value[1]) {
        if (this.value[0] < this.value[1]) {
          this.update();
        } else {
          return false;
        }
      } else {
        this.update();
      }
    }

    get_new_value(thumbler_state: tTumblerData): number {
      const { index } = thumbler_state;
      let new_value: number = this.value[index];
      let position: number;

      if (thumbler_state.position !== undefined) {
        position = Math.round(thumbler_state.position * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION;
        new_value = this.getValue_from_position(position, this.range);
      } else if (thumbler_state.value !== undefined) {
        new_value = thumbler_state.value;

        if (index === 0 && this.value[1]) {
          if (new_value > this.value[1] - this.step) {
            new_value = this.value[1] - this.step;
          }
        }
        if (index === 1) {
          if (new_value < this.value[0] + this.step) {
            new_value = this.value[0] + this.step;
          }
        }
      }
      return new_value;
    }

    check_on_step_movement_to_set_val_and_pos(new_value: number, index: number) {
      const condition: [number, number] = [this.value[index] - this.step, this.value[index] + this.step];

      if (new_value >= condition[1] || new_value <= condition[0]) {
        this.setValue_and_position(new_value, index);
      }
    }

    update() {
      this.callback_list.forEach((callback: iModelCallback) => {
        callback({
          position: this.position,
          value: this.value,
          index: this.index_of_active_thumbler,
        });
      });
    }

    on_change_model(callback: iModelCallback) {
      this.callback_list.push(callback);
    }

    getPosition_from_value(value: number, range: tRange): number {
      const result: number = (value - range[0]) / (range[1] - range[0]);

      return (Math.round(result * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION);
    }

    getValue_from_position(position: number, range: tRange): number {
      const result: number = (position * (range[1] - range[0])) + range[0];

      return (Math.round(result));
    }

    setValue_and_position(new_value: number, i: number) {
      this.value[i] = new_value > 0
        ? (Math.ceil(new_value / this.step) * this.step)
        : (Math.floor(new_value / this.step) * this.step);

      if (i === 0) {
        if (this.value[0] < this.range[0]) {
          this.value[0] = this.range[0];
        }
      }

      if (i === 1 && this.value[1] !== undefined) {
        if (this.value[1] > this.range[1]) {
          this.value[i] = this.range[1];
        }
      }

      this.position[i] = this.getPosition_from_value(this.value[i], this.range);
    }

    init() {
      for (let i = 0; i < this.configuration.value_range.length; i++) {
        if (this.range[i] === undefined) {
          this.range.push(this.configuration.value_range[i]);
        } else {
          this.range[i] = this.configuration.value_range[i];
        }
      }

      for (let i = 0; i < this.configuration.value_start.length; i++) {
        if (this.value[i] === undefined) {
          this.value.push(this.configuration.value_start[i]);
        } else {
          this.value[i] = this.configuration.value_start[i];
        }

        if (this.position[i] === undefined) {
          this.position.push(this.getPosition_from_value(this.value[i], this.range));
        } else {
          this.position[i] = this.getPosition_from_value(this.value[i], this.range);
        }
      }
    }
}

export { Model };
