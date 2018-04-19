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

    setCpm(value) {
        this.cpm = value;
        this.elementCpm.text(Math.trunc(this.cpm));
        this.speedometer.setValue(this.cpm);
    }

    countCharacter(isCorrect) {
        if (isCorrect) {
            const testDurationInMinutes = this.testUI.getTestDurationInMinutes();

            if (testDurationInMinutes > 0) {
                this.setCpm(++this.correctCharactersCount / testDurationInMinutes);

                console.log('cpm = ' + this.cpm);
            }
        } else {
            this.elementTyposCount.text(++this.typosCount);
        }

        if (this.refreshStatisticsIntervalHandle === 0) {
            this.refreshStatisticsIntervalHandle = setInterval(() => {
                this.refreshStatisticsInterval();
            }, 50);
        }
    }

    countWord(isCorrect, wordLength) {
        const testDurationInMinutes = this.testUI.getTestDurationInMinutes();

        if (testDurationInMinutes > 0) {
            if (isCorrect) {
                this.correctWordsCount++;
                this.correctUniqueCharactersCount += (wordLength + 1); // we count space between words as well
            }

            this.wpm = this.correctWordsCount / testDurationInMinutes;
            this.elementWpm.text(Math.trunc(this.wpm));

            this.setCpm(this.correctUniqueCharactersCount / testDurationInMinutes);

            console.log('cpm corrected to ' + this.cpm);
        }
    }

    refreshStatisticsInterval() {
        this.setCpm(this.correctCharactersCount / this.testUI.getTestDurationInMinutes());
        // console.log('cpm on timer = ' + this.cpm);
    }

    stopRefreshingStatistics() {
        if (this.refreshStatisticsIntervalHandle !== 0) {
            clearInterval(this.refreshStatisticsIntervalHandle);
            this.refreshStatisticsIntervalHandle = 0;
        }
    }
}
