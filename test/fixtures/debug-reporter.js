'use strict';

module.exports = {
    reporter: function (errors) {
        console.log(JSON.stringify(errors, null, '  '));
    }
};
