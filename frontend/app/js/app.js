/**
 * Created by zhukovsd on 04.06.2017.
 */

// import Swagger from 'swagger-client';
import $ from 'jquery';

import TestUI from './UI/TestUI';

$(document).ready(() => {
    const testUI = new TestUI(10, 500);

    // alert('ready');
});

// Swagger('/v2/api-docs')
//     .then( client => {
//         // alert(JSON.stringify(client.spec));
//
//         client.apis['test-controller'].messageUsingGET({name: 'mate'}).then((res) => {
//             alert(JSON.stringify(res.body));
//         });
// });
