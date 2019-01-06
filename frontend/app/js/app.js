/**
 * Created by zhukovsd on 04.06.2017.
 */

// expose pug and css files to Webpack loaders
import '../index.pug'
import '../style.css'

import $ from 'jquery';
import TestUI from './UI/TestUI';
import * as log from "loglevel";

$(document).ready(() => {
    log.setLevel(LOGGING_LEVEL);

    const testUI = new TestUI(60, 500);
});
