import $ from "jquery";
import * as log from 'loglevel';

import WordsContainer from "./WordsContainer";
import WordsInputField from "./WordsInputField";
import TestStatistics from "./Statistics/TestStatistics";
import TestResults from "./TestResults";

export default class TestUI {
    constructor(testDurationInSeconds, wordsCount) {
        // this.inputElement = $('.test-ui-input');

        this.testDurationInSeconds = testDurationInSeconds;
        this.testTimerElement = $('.test-timer');
        this.newTestElement = $('.new-test');
        this.restartElement = $('.restart');

        this.wordsInputField = new WordsInputField($('.test-ui-input'));
        this.wordsContainer = new WordsContainer(this, $('.words-container'), wordsCount).populate().setToFirstWord();

        this.statistics = new TestStatistics(this);
        this.results = new TestResults(this);

        this.isTestStarted = false;
        this.testStartTimestamp = null;
        this.ignoreInput = false;

        this.remainingSeconds = 0;
        this.testIntervalHandle = 0;

        this.wordsInputField.element.keypress(event => {
            this.testInputKeypress(event);
        });

        this.newTestElement.click(event => {
            this.newTest();
        });

        this.restartElement.click(event => {
            this.restart(event);
        });

        this.wordsInputField.element.focus();
    }

    getTestDurationInMinutes() {
        const testDurationInMilliseconds = new Date() - this.testStartTimestamp;
        return testDurationInMilliseconds / 1000 / 60;
    }

    getTotalDurationInMinutes() {
        return this.testDurationInSeconds / 60;
    }

    testInputKeypress(event) {
        // events queue can still emit events after the test was finished so we have to track that
        if (!this.ignoreInput && !this.isTestStarted) {
            this.testStarted();
        } else if (this.ignoreInput) {
            log.info("new test was not started due to ignoreInput flag");
        }
    }

    testInterval() {
        // const remainingTimestamp = new Date(60 * 1000 - (new Date() - this.testStartTimestamp));

        // console.log(`${remainingTimestamp.getMinutes()}:${remainingTimestamp.getSeconds()}`);

        this.remainingSeconds = this.testDurationInSeconds
            - Math.round((new Date() - this.testStartTimestamp) / 1000);
        // console.log('remaining seconds = ' + this.remainingSeconds)

        // assume that remaining time is always 0:59 or less
        const remainingTimeString = (this.remainingSeconds >= 10) ? `0:${this.remainingSeconds}`
            : `0:0${this.remainingSeconds}`;

        this.testTimerElement.text(remainingTimeString);

        if (this.remainingSeconds === 0) {
            this.testFinished(true);
        }
    }

    testStarted() {
        log.trace("test started");

        this.isTestStarted = true;
        this.testStartTimestamp = new Date();

        this.testIntervalHandle = setInterval(() => {
            this.testInterval();
        }, 1000);

        this.toggleTestResults(false);
    }

    testFinished(submitResults) {
        log.trace("test finished");

        // this.unsetWordsInputFieldEvent();
        this.ignoreInput = true;
        this.isTestStarted = false;

        if (this.testIntervalHandle !== 0) {
            clearInterval(this.testIntervalHandle);
            this.testIntervalHandle = 0;

        }

        this.statistics.stopRefreshingStatistics();
        this.results.elementCpm.text(Math.trunc(this.statistics.cpm));
        this.results.elementWpm.text(Math.trunc(this.statistics.wpm));

        // this.results.speedometer.setValue(67.89, 3000, value => {
        //     this.results.elementPercentage.text(value.toFixed(2));
        // });

        if (submitResults) {
            this.toggleTestResults(true);
            this.submitResults();
        }
    }

    toggleTestResults(show) {
        if (show) {
            // hide test controls, show results
            this.wordsContainer.element.hide();
            this.results.element.show();

            this.wordsInputField.element.hide();
            this.newTestElement.show();
        } else {
            // show test controls, hide results
            this.wordsContainer.element.show();
            this.results.element.hide();

            this.wordsInputField.element.show();
            this.newTestElement.hide();
        }
    }

    submitResults() {
        $.ajax({
            type: 'get',
            url: '/rest/getPlacement',
            data:
                {
                    cpm: Math.trunc(this.statistics.cpm),
                    wpm: Math.trunc(this.statistics.wpm),
                    typosCount: this.statistics.typosCount
                },
            success: response => {
                this.results.speedometer.setValue(parseFloat(response.percentage), 2500, value => {
                    this.results.elementPercentage.text(value.toFixed(2));
                });
            },
            error: (xhr, textStatus, errorThrown) => {

            }
        });
    }

    newTest() {
        this.ignoreInput = false;

        this.testTimerElement.text('1:00');
        this.results.speedometer.setValue(0, 0);
        this.results.elementPercentage.text('0.00');

        this.wordsContainer.reset();
        this.statistics.reset();
        this.toggleTestResults(false);

        this.wordsInputField.element.val('');
        this.wordsInputField.element.focus();

        // TODO scroll words container to the top
    }

    restart() {
        this.testFinished(false);
        this.newTest();
    }
}