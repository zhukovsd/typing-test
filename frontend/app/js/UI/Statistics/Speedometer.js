import $ from "jquery";

export default class Speedometer {
    static get DEFAULT_ANIMATION_DURATION() {
        return 200;
    };

    constructor(element) {
        this.element = element;
        this.elementPointer = this.element.find('.pointer');
        this.elementsNumbers = this.element.find('.num');

        this.minPointerAngle = 96.5;
        this.maxPointerAngle = 263.5;

        this.currentValue = 0;
        this.currentGearIndex = 0;
        this.currentPointerAngle = this.minPointerAngle;

        this.gears = [
            // {from: 0, to: 100},
            // {from: 90, to: 250},
            // {from: 200, to: 450},
            // {from: 400, to: 700},
            // {from: 650, to: 1000}

            {from: 0, to: 100},
            {from: 90, to: 200},
            {from: 190, to: 300},
            {from: 290, to: 400},
            {from: 390, to: 500},
            {from: 490, to: 600},
            {from: 590, to: 700},
            {from: 690, to: 800},
            {from: 790, to: 900}
        ];

        // this.setValue(100);

        // this.elementPointer.css('transform', 'rotate(263.5deg)');
        // this.elementPointer.transform()
    }

    calculatePointerAngle(value, minValue, maxValue) {
        const pointerAnglePercentage = (value - minValue) / (maxValue - minValue);
        return this.minPointerAngle + (this.maxPointerAngle - this.minPointerAngle)
            * pointerAnglePercentage;
    }

    setValue(value, animationDuration, animationStepCallback) {
        let currentGear = this.gears[this.currentGearIndex];

        if ((value < currentGear.from) || (value > currentGear.to)) {
            currentGear = this.switchGear(value);
        }

        //if (false) {
            // transform: rotate(105deg)
            this.animatePointer(value, animationDuration, animationStepCallback);
        //}
    }

    switchGear(value) {
        let gearIndex = 0;

        for (const index in this.gears) {
            const gear = this.gears[index];

            if ((value >= gear.from) && (value <= gear.to)) {
                // console.log(gear);

                this.currentGearIndex = index;

                // console.log('switching gear to ' + this.currentGearIndex);
                this.setSpeedometerNumbers(gear);

                return gear;
            }
        }
    }

    setSpeedometerNumbers(gear) {
        const interval = (gear.to - gear.from) / (this.elementsNumbers.length - 1);

        // console.log(gear + ', ' + gear.from);

        for (let i = 0; i < this.elementsNumbers.length; i++) {
            $(this.elementsNumbers[i]).text(Math.round(gear.from + interval * i));
        }
    }

    // static calculateAnimationDuration(from, to) {
    //     const degreesPerMillisecond = 0.1;
    //     let duration = Math.abs(to - from) / degreesPerMillisecond;
    //
    //     console.log('duration = ' + duration);
    //     return duration;
    //     // return 1000;
    // }

    animatePointer(value, animationDuration, animationStepCallback) {
        let currentGear = this.gears[this.currentGearIndex];
        const angle = this.calculatePointerAngle(value, currentGear.from, currentGear.to);

        if (!animationDuration) animationDuration = Speedometer.DEFAULT_ANIMATION_DURATION;

        // console.lo

        const speedometer = this;

        // we use a pseudo object for the animation
        // (starts from `0` to `angle`), you can name it as you want
        $({deg: this.currentPointerAngle, value: this.currentValue}).animate({deg: angle, value: value}, {
            // duration: Speedometer.calculateAnimationDuration(this.currentPointerAngle, angle),
            duration: animationDuration,
            step: function (stepValue, currentStep) {
                // console.log('step ' + stepValue + ', ' + JSON.stringify(currentStep));

                let currentAngle = currentStep.elem.deg;

                // ?
                if (currentAngle > speedometer.maxPointerAngle) {
                    currentAngle = speedometer.maxPointerAngle;
                }

                speedometer.currentPointerAngle = currentAngle;

                // in the step-callback (that is fired each step of the animation),
                // you can use the `now p`aramter which contains the current
                // animation-position (`0` up to `angle`)
                speedometer.elementPointer.css({
                    transform: 'rotate(' + currentAngle + 'deg)'
                });

                if (animationStepCallback) {
                    animationStepCallback(currentStep.elem.value);
                }
            }
        });
    }
}