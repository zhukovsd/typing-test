import $ from "jquery";

import WordsContainer from "./WordsContainer";
import WordsInputField from "./WordsInputField";
import TestStatistics from "./Statistics/TestStatistics";

export default class TestUI {
    constructor(wordsCount) {
        // this.inputElement = $('.test-ui-input');

        this.testTimerElement = $('.test-timer');

        this.wordsInputField = new WordsInputField($('.test-ui-input'));
        this.wordsContainer = new WordsContainer(this, $('.words-container'), wordsCount).populate().setToFirstWord();

        this.statistics = new TestStatistics(this);

        this.isTestStarted = false;
        this.testStartTimestamp = null;

        this.remainingSeconds = 0;
        this.testIntervalHandle = 0;

        this.wordsInputField.element.keypress(event => {
            this.testInputKeypress(event);
        });
    }

    getTestDurationInMinutes() {
        const testDurationInMilliseconds = new Date() - this.testStartTimestamp;
        return testDurationInMilliseconds / 1000 / 60;
    }

    testInputKeypress(event) {
        if (!this.isTestStarted) {
            this.isTestStarted = true;
            this.testStartTimestamp = new Date();

            this.testIntervalHandle = setInterval(() => {
                this.testInterval();
            }, 1000);
        }
    }

    testInterval() {
        // const remainingTimestamp = new Date(60 * 1000 - (new Date() - this.testStartTimestamp));

        // console.log(`${remainingTimestamp.getMinutes()}:${remainingTimestamp.getSeconds()}`);

        this.remainingSeconds = 60 - Math.round((new Date() - this.testStartTimestamp) / 1000);
        // console.log('remaining seconds = ' + this.remainingSeconds)

        const remainingTimeString = (this.remainingSeconds >= 10) ? `0:${this.remainingSeconds}` : `0:0${this.remainingSeconds}`;
        // console.log(remainingTimeString);

        this.testTimerElement.text(remainingTimeString);
    }
}