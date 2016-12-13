var _2048 = (function (window) {
    var matrix = [],
        _size = 4,
        ARROW_LEFT = 37,
        ARROW_UP = 38,
        ARROW_RIGHT = 39,
        ARROW_DOWN = 40,
        score = 0;

    // 设置矩阵大小
    function setSize(size) {
        _size = size;
    }

    // 获取矩阵大小
    function getSize() {
        return _size;
    }

    // 获取分数
    function getScore() {
        return score;
    }

    function getMatrix() {
        return matrix;
    }

    // 初始化矩阵
    function initMatrix() {
        var i = 0, j = 0;
        for (i = 0; i < _size; i++) {
            matrix[i] = [];
            for (j = 0; j < _size; j++) {
                matrix[i][j] = 0;
            }
        }
    }

    // 能否横向合并
    function canMergeX() {
        var i = 0, j = 0;
        for (i = 0; i < _size; i++) {
            for (j = 0; j < _size - 1; j++) {
                if (matrix[i][j] > 0 && matrix[i][j] === matrix[i][j + 1]) {
                    return true;
                }
            }
        }
        return false;
    }

    // 能否纵向合并
    function canMergeY() {
        var i = 0, j = 0;
        for (i = 0; i < _size - 1; i++) {
            for (j = 0; j < _size; j++) {
                if (matrix[j][i] > 0 && matrix[j][i] === matrix[j][i + 1]) {
                    return true;
                }
            }
        }
        return false;
    }

    // 向左合并
    function mergeLeft() {
        var i = 0, j = 0;
        if (canMergeX()) {
            for (i = 0; i < _size; i++) {
                for (j = 0; j < _size - 1; j++) {
                    if (matrix[i][j] > 0) {
                        matrix[i][j] *= 2;
                        matrix[i][j + 1] = 0;
                    }
                }
            }
        }
    }

    // 向上合并
    function mergeUp() {
        if (canMergeY()) {

        }
    }

    // 向右合并
    function mergeRight() {
        if (canMergeX()) {

        }
    }

    // 向下合并
    function mergeDown() {
        if (canMergeY()) {

        }
    }

    // 随机生成2或4
    function random2_4() {
        return Math.floor(Math.random() * 100) >= 50 ? 4 : 2;
    }

    // 获取空白节点列表
    function getEmptyItems() {
        var i = 0, j = 0, emptyItems = [];
        for (i = 0; i < _size; i++) {
            for (j = 0; j < _size; j++) {
                if (matrix[i][j] === 0) {
                    emptyItems.push([i, j]);
                }
            }
        }
        return emptyItems;
    }

    // 随机找到一个空白节点坐标
    function findEmptyItemCoord() {
        var items = getEmptyItems(), len = 0, flag = 0;
        len = items.length;
        if (len === 0) {
            return [];
        } else if (len === 1) {
            return items[0];
        }
        flag = Math.floor(Math.random() * len);
        return items[flag];
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

    return {
        init: init,
        setSize: setSize,
        getSize: getSize,
        getScore: getScore,
        getMatrix: getMatrix
    };
}(window));

console.log(_2048.init().getMatrix());
