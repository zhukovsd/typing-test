import $ from "jquery";
import Speedometer from "./Statistics/Speedometer"

export default class TestResults {
    constructor(testUI) {
        this.testUI = testUI;

        this.element = $('.test-results-container');
        this.elementCpm = $('#test-results-value-cpm');
        this.elementWpm = $('#test-results-value-wpm');
        this.elementPercentage = $('#test-results-value-percentage');

        // this.elementTyposCount = $('#test-stats-value-typos');

        this.speedometer = new Speedometer($('.test-results-container .speedometer'));
    }
}