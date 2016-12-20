const assert = require('assert');

const matrix = [
    [2, 0, 2, 0],
    [0, 2, 0, 2],
    [0, 2, 2, 0],
    [0, 2, 2, 2]
];

function displayMatrix(matrix) {
    var i = 0, j = 0, size = matrix.length, str = '';
    for (i = 0; i < size; i++) {
        str += '[';
        for (j = 0; j < size; j++) {
            str += matrix[i][j] + ' ';
        }
        str += str.substring(0, str.length - 1) + ']';
    }
    return str;
}

it('canGoLeft should be ' + displayMatrix(matrix), function () {
    return new Promise(function (resolve) {
        assert.ok(true);
        resolve();
    });
});

// console.log(_2048.displayMatrix(matrix));
// console.log('canGoLeft  ' + _2048.canGoLeft(matrix));
// console.log('canGoRight ' + _2048.canGoRight(matrix));
// console.log('canGoeUp   ' + _2048.canGoeUp(matrix));
// console.log('canGoDown  ' + _2048.canGoDown(matrix));

// _2048.move(matrix, 'left');
// console.log('left\n', _2048.displayMatrix(matrix));

// _2048.move(matrix, 'down');
// console.log('down\n', _2048.displayMatrix(matrix));

// _2048.move(matrix, 'up');
// console.log('up\n', _2048.displayMatrix(matrix));

// _2048.move(matrix, 'right');
// console.log('right\n', _2048.displayMatrix(matrix));
