import $ from 'jquery';
import WordsDictionary from '../WordsDictionary';
import {} from 'jquery.caret';

export default class WordsContainer {
    constructor(testui, element, wordsCount) {
        this.testui = testui;
        this.element = element;
        this.wordsCount = wordsCount;

        this.scrollableContainer =  this.element.find('.scrollable-words-container');

        this.currentWordIndex = -1;
        this.currentWordElement = undefined;
        this.currentWord = '';

        this._currentLineIndex = 0;

        // this.testui.wordsInputField.element.keypress(event => {
        //     this.testInputKeypress(event);
        // });

        // refresh words/characters UI
        this.testui.wordsInputField.element.on('input', event => {
            this.testInputInput(event);
        });

        // calculate statistics
        this.testui.wordsInputField.element.keypress(event => {
            this.testInputKeypress(event);
        });

        // calculate caret position
        this.testui.wordsInputField.element.keydown(event => {
            this.testInputKeydown(event);
        });
    }

    createWordElement(value) {
        // div.task-word= text

        // return $('<div></div>').addClass('task-word').text(value);
        const span = $('<span></span>').addClass('plain-word').text(value);
        return $('<div></div>').addClass('task-word')/*.addClass('underline')*/.append(span);
    }

    populate() {
        // alert(JSON.stringify(Words));

        const words = WordsDictionary.asArray();

        for (let i = 0; i < this.wordsCount; i++) {
            const value = words[Math.floor(Math.random() * words.length)];

            const wordElement = this.createWordElement(value);
            wordElement.data('value', value);

            wordElement.appendTo(this.scrollableContainer);
        }

        return this;
    }

    initCurrentWord() {
        let isFirstWord = true;
        let previousWordPositionTop = 0;

        if (this.currentWordElement !== undefined) {
            isFirstWord = false;
            this.currentWordElement.removeClass('task-word-current underline');

            previousWordPositionTop = this.currentWordElement.offset().top;
        }
        this.currentWordElement = $(this.scrollableContainer.children().get(this.currentWordIndex));

        // this.currentWord = this.currentWordElement.text().replace(String.fromCharCode(0x200B), '');
        this.currentWord = this.currentWordElement.data('value');
        this.currentWordElement.removeClass('task-word-incorrect').removeClass('task-word-correct').addClass('task-word-current');

        if (this.currentWordElement.find('.task-word-typed-char').length === 0) {
            this.initCharElementsForTheCurrentWord();
        }
        this.currentWordCharElements = this.currentWordElement.children('.task-word-typed-char');

        this.setCaretPosition(0, 0);

        if (!isFirstWord) {
            const currentWordPositionTop = this.currentWordElement.offset().top;

            if (currentWordPositionTop > previousWordPositionTop) {
                // alert('next line!');
                this.currentLineIndex++;
            } else if (currentWordPositionTop < previousWordPositionTop) {
                // alert('previous line!');
                this.currentLineIndex--;
            }
        }
    }

    setToFirstWord() {
        this.currentWordIndex = 0;
        this.initCurrentWord();

        return this;
    }

    nextWord() {
        this.currentWordIndex++;
        this.initCurrentWord();

        return this;
    }

    previousWord() {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.initCurrentWord();
        }

        let value = this.currentWordElement.data('user-input');
        this.testui.wordsInputField.element.val(value);

        return this;
    }

    initCharElementsForTheCurrentWord() {
        const word = this.currentWordElement.text();

        for (let i = 0; i < word.length; i++) {
            const letterElement = $('<span></span>').addClass('task-word-typed-char').text(word.charAt(i)).hide();

            letterElement.appendTo(this.currentWordElement);
        }
    }

    refreshCurrentWordCharacterElements(value) {
        // let correctCharsCount = 0;
        // let isLastCharCorrect = true;
        //
        // for (let i = 0; i < this.currentWord.length; i++) {
        //     if (this.currentWord.charAt(i) === value.charAt(i)) {
        //         correctCharsCount++;
        //     } else {
        //         isLastCharCorrect = false;
        //         break;
        //     }
        // }
        //
        // // show many <spans> for individual chars we need
        // const charElementsCount = isLastCharCorrect ? correctCharsCount : correctCharsCount + 1;
        //
        // console.log(`charElementsCount = ${charElementsCount}, slice = ${this.currentWord.slice(charElementsCount)}`);

        // console.log(`slice count = ${this.currentWord.length - value.length}, result = ${this.currentWord.slice(value.length)}`);

        let plainText = this.currentWord.slice(value.length);
        // some text needs to be presented otherwise elements will reposition themselves
        if (plainText === '') plainText = '\u200B';

        this.currentWordElement.find('.plain-word').text(plainText);

        (this.currentWordCharElements).each((index, elem) => {
            const e = $(elem);

            if (index < value.length) {
                if (this.currentWord.charAt(index) === value.charAt(index)) {
                    e.removeClass('task-word-typed-char-incorrect');
                } else {
                    e.addClass('task-word-typed-char-incorrect');
                }

                e.show();
            } else {
                e.hide();
            }
        });
    }

    get currentLineIndex() {
        return this._currentLineIndex;
    }

    set currentLineIndex(value) {
        const prevValue = this._currentLineIndex;

        if (prevValue !== value) {
            this._currentLineIndex = value;

            let scrollTo = 39;

            if ((value > prevValue) && (value >= 3)) {
                //scroll down
                this.scrollableContainer.animate({top: `-=${scrollTo}px`}, 200);
            } else if ((value < prevValue) && (value >=2)) {
                // scroll up
                this.scrollableContainer.animate({top: `+=${scrollTo}px`}, 200);
            }
        }
    }

    // createCharElement(char, isCorrect) {
    //     const charElement = $('<span></span>').addClass('task-word-typed-char').text(char);
    //
    //     charElement.appendTo(this.currentWordElement);
    // }

    // update words/chars HTML elements, correct statistics
    testInputInput(event) {
        let value = this.testui.wordsInputField.element.val();

        this.currentWordElement.data('user-input', value);

        // console.log(`input event, current word = ${this.currentWord}, input value = ${value}`);

        if (value.charAt(value.length - 1) === ' ') {
            value = value.slice(0, value.length - 1);

            let isCorrectWord = value === this.currentWord;
            if (isCorrectWord) {
                this.currentWordElement.removeClass('task-word-incorrect').addClass('task-word-correct');
            } else {
                this.currentWordElement.removeClass('task-word-correct').addClass('task-word-incorrect');
            }

            this.testui.statistics.countWord();
            this.nextWord();
            this.testui.wordsInputField.element.val('');
        } else {
            this.refreshCurrentWordCharacterElements(value);
        }
    }

    // count statistics
    testInputKeypress(event) {
        let text = this.currentWord;
        let caretPosition = $(this.testui.wordsInputField.element).caret('pos');

        // console.log('keypress, text = ' + text, 'caret position = ' + caretPosition);

        const expectedChar = (caretPosition < text.length) ? text.charAt(caretPosition) : ' ';
        // console.log(`pressed = ${event.key}, expected = ${expectedChar}`);

        let isCorrect = event.key === expectedChar;
        // if (isCorrect) {
        //      console.log('correct char')
        // } else {
        //      console.log('incorrect char');
        // }

        this.testui.statistics.countCharacter(isCorrect);
    }

    // calculate caret position
    testInputKeydown(event) {
        let caretPosition = $(this.testui.wordsInputField.element).caret('pos');
        let textLength = this.testui.wordsInputField.element.val().length;

        if (event.keyCode === 8) { // backspace
            if (textLength === 0) {
                // console.log('back to the previous word');
                this.previousWord();
            }
        } else if (event.keyCode === 37) { // left arrow
            // ctrl + left arrow
            if (event.ctrlKey) {
                caretPosition = 0;
            } else {
                caretPosition = Math.max(0, caretPosition - 1);
            }
        } else if (event.keyCode === 39) { // right arrow
            // ctrl + right arrow
            if (event.ctrlKey) {
                caretPosition = textLength;
            } else {
                caretPosition = Math.min(textLength, caretPosition + 1);
            }
        } else if (event.keyCode === 36) { // Home
            caretPosition = 0;
        } else if (event.keyCode === 35) { // End
            caretPosition = textLength;
        } else if (event.key.length === 1) { // a character was typed
            textLength++;
            caretPosition++;
        }

        // console.log('keydown, text length = ' + textLength + ', caret position = ' + caretPosition);

        this.setCaretPosition(caretPosition, textLength);

        // if (caretPosition === textLength) {
        //     this.currentWordElement.addClass('underline');
        //     this.currentWordCharElements.removeClass('underline');
        // } else {
        //     this.currentWordElement.removeClass('underline');
        //     this.currentWordCharElements.removeClass('underline');
        //     $(this.currentWordCharElements[caretPosition]).addClass('underline');
        // }
    }

    setCaretPosition(value, textLength) {
        if (value === textLength) {
            // set caret to the next char being typed
            this.currentWordElement.addClass('underline');
            this.currentWordCharElements.removeClass('underline');
        } else {
            // caret was shifted to the left
            this.currentWordElement.removeClass('underline');
            this.currentWordCharElements.removeClass('underline');
            $(this.currentWordCharElements[value]).addClass('underline');
        }
    }

    clear() {
        this.scrollableContainer.find('.task-word').remove();

        return this;
    }

    reset() {
        this.currentLineIndex = 0;
        this.scrollableContainer.css('top', 0);

        return this.clear().populate().setToFirstWord();
    }
}