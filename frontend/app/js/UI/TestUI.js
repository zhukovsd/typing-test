import $ from "jquery";

import WordsContainer from "./WordsContainer";
import WordsInputField from "./WordsInputField";

export default class TestUI {
    constructor(wordsCount) {
        // this.inputElement = $('.test-ui-input');

        this.wordsInputField = new WordsInputField($('.test-ui-input'));
        this.wordsContainer = new WordsContainer(this, $('.words-container'), wordsCount).populate().setToFirstWord();
    }
}