import $ from "jquery";

export default class Speedometer {
    constructor(element) {
        this.element = element;
        this.elementPointer = this.element.find('.pointer');

        this.minPointerDegree = 96.5;
        this.maxPointerDegree = 0;

        // this.elementPointer.css('transform', 'rotate(263.5deg)');
        // this.elementPointer.transform()
    }
}