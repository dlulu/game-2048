var _2048 = (function (window) {
    // Is an array could be merged or moved from right to left.
    function canGoLeft(matrix) {
        var i = 0, j = 0, _size = matrix.length;
        for (i = 0; i < _size; i++) {
            for (j = 0; j < _size - 1; j++) {
                if (matrix[i][j] > 0 && matrix[i][j] === matrix[i][j + 1]) {
                    return true;
                }
                if (matrix[i][j] === 0 && matrix[i][j + 1] > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // Is an array could be merged or moved from left to right.
    function canGoRight(matrix) {
        var i = 0, j = 0, _size = matrix.length;
        for (i = 0; i < _size; i++) {
            for (j = 0; j < _size - 1; j++) {
                if (matrix[i][j] > 0 && matrix[i][j] === matrix[i][j + 1]) {
                    return true;
                }
                if (matrix[i][j] > 0 && matrix[i][j + 1] === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // Is an array could be merged or moved from bottom to top.
    function canGoeUp(matrix) {
        var i = 0, j = 0, _size = matrix.length;
        for (i = 0; i < _size; i++) {
            for (j = 0; j < _size - 1; j++) {
                if (matrix[j][i] > 0 && matrix[j][i] === matrix[j + 1][i]) {
                    return true;
                }
                if (matrix[j][i] === 0 && matrix[j + 1][i] > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // Is an array could be merged or moved from top to bottom.
    function canGoDown(matrix) {
        var i = 0, j = 0, _size = matrix.length;
        for (i = 0; i < _size; i++) {
            for (j = 0; j < _size - 1; j++) {
                if (matrix[j][i] > 0 && matrix[j][i] === matrix[j + 1][i]) {
                    return true;
                }
                if (matrix[j][i] > 0 && matrix[j + 1][i] === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // Get all items' information, include its' coordinates and value,
    // that larger than 0 of matrix
    function getFilledItems(matrix) {
        var i = 0, j = 0, size = matrix.length, filled = [];
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                if (matrix[i][j] > 0) {
                    filled.push({
                        flag: [i, j],
                        value: matrix[i][j]
                    });
                }
            }
        }
        return filled;
    }

    // Move item of matrix to make all numbers(>0) to go one side.
    function move(matrix, d) {
        var filled = getFilledItems(matrix);
        var i = 0, j = 0, len = matrix.length, line = [], lineLength = 0;
        switch (d) {
            case 'left':
                for (i = 0; i < len; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[1] === i;
                    });
                    lineLength = line.length;
                    for (j = 0; j < lineLength; j++) {
                        matrix[i][j] = line[j].value;
                        matrix[line[j].flag[0]][line[j].flag[1]] = 0;
                    }
                }
                break;
            case 'right':
                for (i = 0; i < len; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[1] === i;
                    });
                    lineLength = line.length;
                    for (j = len - 1; j >= lineLength; j--) {
                        matrix[i][j] = line[j].value;
                        matrix[line[j].flag[0]][line[j].flag[1]] = 0;
                    }
                }
                break;
            case 'up':
                for (i = 0; i < len; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[0] === i;
                    });
                    lineLength = line.length;
                    for (j = 0; j < lineLength; j++) {
                        matrix[j][i] = line[j].value;
                        matrix[line[j].flag[0]][line[j].flag[1]] = 0;
                    }
                }
                break;
            case 'down':
                for (i = 0; i < len; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[0] === i;
                    });
                    lineLength = line.length;
                    for (j = len - 1; j >= lineLength; j--) {
                        matrix[j][i] = line[len - j - 1].value;
                        matrix[line[len - j - 1].flag[0]][line[len - j - 1].flag[1]] = 0;
                    }
                }
                break;
        }
    }

    var Matrix = {
        // Matrix data
        data: [],

        // Matrix size, default size is 4 x 4.
        size: 4,

        // Initial matrix data with 0.
        init: function () {
            var i = 0, j = 0;
            for (i = 0; i < this.size; i++) {
                this.data[i] = [];
                for (j = 0; j < this.size; j++) {
                    this.data[i][j] = 0;
                }
            }
        },

        // Set size of matrix, default size is 4.
        setSize: function (size) {
            this.size = size;
        },

        // Get matrix size.
        getSize: function () {
            return this.size;
        },

        // Sugar for array can be merged or moved.
        canGo: function (d) {
            var matrix = this.data;
            switch (d) {
                case 'left':
                    return canGoLeft(matrix);
                case 'right':
                    return canGoRight(matrix);
                case 'up':
                    return canGoUp(matrix);
                case 'down':
                    return canGoDown(matrix);
            }
            throw 'Parameter direction type required.';
        }

    };

    var Score = {
        score: 0,
        setScore: function (score) {
            this.score = score;
        },
        getScore: function () {
            return this.score;
        }
    };

    var Gui = {

    };

    var Operator = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        // Add event for direction key.
        addKeyEvent: function (element, callback) {
            element.addEventListener('keyup', function (e) {
                var code = e.keyCode;
                if (callback instanceof Function) {
                    callback.call(code);
                }
            });
        }
    };


    // 随机生成2或4
    function random2_4() {
        return Math.floor(Math.random() * 100) >= 50 ? 4 : 2;
    }

    // 随机找到一个空白节点坐标
    function findEmptyItemCoord() {
        var len = 0, flag = 0;
        emptySet = [];
        for (i = 0; i < _size; i++) {
            for (j = 0; j < _size; j++) {
                if (matrix[i][j] === 0) {
                    emptySet.push([i, j]);
                }
            }
        }
        len = emptySet.length;
        if (len === 0) {
            return [];
        } else if (len === 1) {
            return emptySet[0];
        }
        flag = Math.floor(Math.random() * len);
        return emptySet[flag];
    }

    // 在空白处填充随机数字
    function fillNumberBySize() {
        var i = 0, item = [], x, y;
        for (i = 0; i < _size - 2; i++) {
            item = findEmptyItemCoord();
            if (item.length === 2) {
                x = item[0];
                y = item[1];
                matrix[x][y] = random2_4();
                filledSet.push({
                    flag: [x, y],
                    value: matrix[x][y]
                });
            }
        }
    }

    // 根据数字随机生成颜色
    function randomColorByNumber(number) {

    }

    function init() {
        initMatrix();
        fillNumberBySize();
        return this;
    }

    function displayMatrix(matrix) {
        var i = 0, j = 0, str = '', _size = matrix.length;
        for (i = 0; i < _size; i++) {
            str += '\n[';
            for (j = 0; j < _size; j++) {
                str += matrix[i][j] + '  ';
            }
            str = str.substring(0, str.length - 2);
            str += ']';
        }
        return str;
    }

    return {
        canGoLeft: canGoLeft,
        canGoRight: canGoRight,
        canGoeUp: canGoeUp,
        canGoDown: canGoDown,
        getFilledItems: getFilledItems,
        move: move,
        displayMatrix: displayMatrix
    };
}(window));

var matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
console.log(_2048.displayMatrix(matrix));
console.log('canGoLeft  ' + _2048.canGoLeft(matrix));
console.log('canGoRight ' + _2048.canGoRight(matrix));
console.log('canGoeUp   ' + _2048.canGoeUp(matrix));
console.log('canGoDown  ' + _2048.canGoDown(matrix));
console.log(_2048.getFilledItems(matrix));
_2048.move(matrix, 'up');
console.log('up\n', _2048.displayMatrix(matrix));
_2048.move(matrix, 'down');
console.log('down\n', _2048.displayMatrix(matrix));
_2048.move(matrix, 'left');
console.log('left\n', _2048.displayMatrix(matrix));
_2048.move(matrix, 'right');
console.log('right\n', _2048.displayMatrix(matrix));
