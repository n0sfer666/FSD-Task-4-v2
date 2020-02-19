class Model {
    value: tValue = [0];

    range: tRange = [0, 0];

    step: number = 0;

    position: tPosition = [0];

    activeIndex: number = 0;

    callbackList: iModelCallback[];

    readonly TO_NORMALIZE_POSITION: number = 1e4;

    constructor(private config: iConfigModel) {
      this.callbackList = [];

      this.step = this.config.step;

      this.init();
    }

    setNewPosition(tumblerData: tTumblerData) {
      const { index } = tumblerData;
      this.activeIndex = index;

      const newValue: number = this.getNewValue(tumblerData);

      this.checkStepCondition(newValue, index);
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

    getNewValue(tumblerData: tTumblerData): number {
      const { index } = tumblerData;
      let newValue: number = this.value[index];
      let position: number;

      if (tumblerData.position !== undefined) {
        const tmpPosition: number = Math.round(tumblerData.position * this.TO_NORMALIZE_POSITION);
        position = tmpPosition / this.TO_NORMALIZE_POSITION;
        newValue = this.getValueFromPosition(position, this.range);
      } else if (tumblerData.value !== undefined) {
        newValue = tumblerData.value;

        if (index === 0 && this.value[1]) {
          if (newValue > this.value[1] - this.step) {
            newValue = this.value[1] - this.step;
          }
        }
        if (index === 1) {
          if (newValue < this.value[0] + this.step) {
            newValue = this.value[0] + this.step;
          }
        }
      }
      return newValue;
    }

    checkStepCondition(newValue: number, index: number) {
      const condition: [number, number] = [
        this.value[index] - this.step,
        this.value[index] + this.step,
      ];

      if (newValue >= condition[1] || newValue <= condition[0]) {
        this.setValueAndPosition(newValue, index);
      }
    }

    update() {
      this.callbackList.forEach((callback: iModelCallback) => {
        callback({
          position: this.position,
          value: this.value,
          index: this.activeIndex,
        });
      });
    }

    onChangeModel(callback: iModelCallback) {
      this.callbackList.push(callback);
    }

    getPositionFromValue(value: number, range: tRange): number {
      const result: number = (value - range[0]) / (range[1] - range[0]);

      return (Math.round(result * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION);
    }

    getValueFromPosition(position: number, range: tRange): number {
      const result: number = (position * (range[1] - range[0])) + range[0];

      return (Math.round(result));
    }

    setValueAndPosition(newValue: number, i: number) {
      this.value[i] = newValue > 0
        ? (Math.ceil(newValue / this.step) * this.step)
        : (Math.floor(newValue / this.step) * this.step);

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

      this.position[i] = this.getPositionFromValue(this.value[i], this.range);
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
        if (this.value[i] === undefined) {
          this.value.push(this.config.start[i]);
        } else {
          this.value[i] = this.config.start[i];
        }

        if (this.position[i] === undefined) {
          this.position.push(this.getPositionFromValue(this.value[i], this.range));
        } else {
          this.position[i] = this.getPositionFromValue(this.value[i], this.range);
        }
      }
    }
}

export { Model };
