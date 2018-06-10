import $ from "jquery";
import Speedometer from "./Speedometer"

export default class TestStatistics {
    constructor(testUI) {
        this.testUI = testUI;

        this.elementCpm = $('#test-stats-value-cpm');
        this.elementWpm = $('#test-stats-value-wpm');
        this.elementTyposCount = $('#test-stats-value-typos');

        this.speedometer = new Speedometer($('.test-stats .speedometer'));

        this.cpm = 0;
        this.wpm = 0;

        // on every keypress event, countCharacter() gets called. In this method we count raw CPM. Although, it's possible
        // that a user will just spam <some character> + backspace, which will disrupt CPM value.
        // in order to keep it valid, we correct CPM value in countWord() method which counts only unique characters

        this.correctCharactersCount = 0;
        this.correctWordsCount = 0;
        this.correctUniqueCharactersCount = 0;
        this.typosCount = 0;

        this.refreshStatisticsIntervalHandle = 0;
    }

    setCpm(value, onlyRefreshUI) {
        if (!onlyRefreshUI) {
            this.cpm = value;
        }

        this.elementCpm.text(Math.trunc(value));
        this.speedometer.setValue(value);
    }

    setWpm(value, onlyRefreshUI) {
        if (!onlyRefreshUI) {
            this.wpm = value;
        }

        this.elementWpm.text(Math.trunc(value));
    }

    setTyposCount(value) {
        this.typosCount = value;
        this.elementTyposCount.text(this.typosCount);
    }

    countCharacter(isCorrect) {
        if (isCorrect) {
            const testDurationInMinutes = this.testUI.getTestDurationInMinutes();

            if (testDurationInMinutes > 0) {
                this.setCpm(++this.correctCharactersCount / testDurationInMinutes, true);

                // console.log('cpm = ' + this.cpm);
            }
        } else {
            this.setTyposCount(this.typosCount + 1);
        }

        if (this.refreshStatisticsIntervalHandle === 0) {
            this.refreshStatisticsIntervalHandle = setInterval(() => {
                this.refreshStatisticsInterval();
            }, 50);
        }
    }

    countWord() {
        const testDurationInMinutes = this.testUI.getTestDurationInMinutes();

        if (testDurationInMinutes > 0) {
            this.countStatistics();

            this.setCpm(this.correctUniqueCharactersCount / testDurationInMinutes, true);
            this.setWpm(this.correctWordsCount / testDurationInMinutes, true);
        }
    }

    countStatistics() {
        const correctWords = this.testUI.wordsContainer.element.find('.task-word-correct');
        this.correctWordsCount = correctWords.length;

        let charCount = 0;
        for (let word of correctWords) {
            // we count space between words as well
            charCount += ($(word).data('value').length + 1);
        }

        // TODO count chars for unfinished words

        this.correctUniqueCharactersCount = charCount;
    }

    refreshStatisticsInterval() {
        this.setCpm(this.correctCharactersCount / this.testUI.getTestDurationInMinutes(), true);
        this.setWpm(this.correctWordsCount / this.testUI.getTestDurationInMinutes(), true);
        // console.log('cpm on timer = ' + this.cpm);
    }

    stopRefreshingStatistics() {
        this.finalizeStatistics();

        if (this.refreshStatisticsIntervalHandle !== 0) {
            clearInterval(this.refreshStatisticsIntervalHandle);
            this.refreshStatisticsIntervalHandle = 0;
        }
    }

    finalizeStatistics() {
        this.countStatistics();

        this.setCpm(this.correctUniqueCharactersCount / this.testUI.getTotalDurationInMinutes(), false);
        this.setWpm(this.correctWordsCount / this.testUI.getTotalDurationInMinutes(), false);
    }

    reset() {
        this.setCpm(0, false);
        this.setWpm(0, false);
        this.setTyposCount(0);
    }
}
