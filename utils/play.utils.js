'use strict';

module.exports = (function () {
    const that = {};

    that.random = function (n) {
        return ((parseInt((Math.random() * 10).toPrecision(1))) % n);
    };

    that.jumbleWord = function (w) {
        w = w.split('');
        let n = w.length,
            jumble = 0,
            temp = 0;
        while (n) {
            jumble = that.random(n);


            temp = w[jumble];
            w[jumble] = w[n - 1];
            w[n - 1] = temp;
            n--;
        }
        return w.join('');
    };
    return that;
})();
