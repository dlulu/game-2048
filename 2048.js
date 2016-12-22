var _2048 = (function (window, document) {
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
    function canGoUp(matrix) {
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
        var i = 0, j = 0, size = matrix.length, line = [], lineLength = 0;
        switch (d) {
            case 'left':
                for (i = 0; i < size; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[0] === i;
                    });
                    lineLength = line.length;
                    for (j = 0; j < lineLength; j++) {
                        matrix[line[j].flag[0]][line[j].flag[1]] = 0;
                        matrix[i][j] = line[j].value;
                    }
                }
                break;
            case 'right':
                for (i = 0; i < size; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[0] === i;
                    });
                    lineLength = line.length;
                    for (j = 0; j < lineLength; j++) {
                        matrix[line[lineLength - j - 1].flag[0]][line[lineLength - j - 1].flag[1]] = 0;
                        matrix[i][size - j - 1] = line[lineLength - j - 1].value;
                    }
                }
                break;
            case 'up':
                for (i = 0; i < size; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[1] === i;
                    });
                    lineLength = line.length;
                    for (j = 0; j < lineLength; j++) {
                        matrix[line[j].flag[0]][line[j].flag[1]] = 0;
                        matrix[j][i] = line[j].value;
                    }
                }
                break;
            case 'down':
                for (i = 0; i < size; i++) {
                    line = filled.filter(function (item) {
                        return item.flag[1] === i;
                    });
                    lineLength = line.length;
                    for (j = 0; j < lineLength; j++) {
                        matrix[line[lineLength - j - 1].flag[0]][line[lineLength - j - 1].flag[1]] = 0;
                        matrix[size - j - 1][i] = line[lineLength - j - 1].value;
                    }
                }
                break;
        }
    }

    // Merge adjacent items if they are the same and larger than 0.
    function merge(matrix, d, callback) {
        var i = 0, j = 0, size = matrix.length, singleStepScore = 0,
            isFun = (callback instanceof Function);
        switch (d) {
            case 'left':
                for (i = 0; i < size; i++) {
                    for (j = 0; j < size - 1; j++) {
                        if (matrix[i][j] > 0 && matrix[i][j] === matrix[i][j + 1]) {
                            matrix[i][j] *= 2;
                            singleStepScore += matrix[i][j];
                            matrix[i][j + 1] = 0;
                        }
                    }
                }
                break;
            case 'right':
                for (i = 0; i < size; i++) {
                    for (j = size - 1; j > 0; j--) {
                        if (matrix[i][j] > 0 && matrix[i][j] === matrix[i][j - 1]) {
                            matrix[i][j] *= 2;
                            singleStepScore += matrix[i][j];
                            matrix[i][j - 1] = 0;
                        }
                    }
                }
                break;
            case 'up':
                for (i = 0; i < size; i++) {
                    for (j = 0; j < size - 1; j++) {
                        if (matrix[j][i] > 0 && matrix[j][i] === matrix[j + 1][i]) {
                            matrix[j][i] *= 2;
                            singleStepScore += matrix[j][i];
                            matrix[j + 1][i] = 0;
                        }
                    }
                }
                break;
            case 'down':
                for (i = 0; i < size; i++) {
                    for (j = size - 1; j > 0; j--) {
                        if (matrix[j][i] > 0 && matrix[j][i] === matrix[j - 1][i]) {
                            matrix[j][i] *= 2;
                            singleStepScore += matrix[j][i];
                            matrix[j - 1][i] = 0;
                        }
                    }
                }
                break;
        }
        isFun ? callback(singleStepScore) : '';
    }

    // Generate 2 or 4 randomly.
    function random2_4() {
        return Math.floor(Math.random() * 100) >= 50 ? 4 : 2;
    }

    // Find an empty item's coordinate randomly.
    function findEmptyItemCoord(matrix) {
        var len = 0, flag = 0, emptySet = [], size = matrix.length;
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
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

    // Fill numbers in empty items randomly.
    function fillNumbers(matrix) {
        var i = 0, item = [], x, y, size = matrix.length;
        for (i = 0; i < size - 2; i++) {
            item = findEmptyItemCoord(matrix);
            if (item.length === 2) {
                x = item[0];
                y = item[1];
                matrix[x][y] = random2_4();
            }
        }
    }

    // Get window size.
    function getWindowSize() {
        return {
            w: window.screen.width,
            h: window.screen.height
        };
    }

    // Set list items' size.
    function setItemSize(winX, size, elem, wrapper) {
        var itemSize = 0;
        if (winX > 640) {
            return;
        }
        itemSize = (winX - 40 - size * 5) / size + 'px';
        elem.style.width = itemSize;
        elem.style.height = itemSize;
        elem.style.lineHeight = itemSize;
    }

    // Set GUI for 2048
    function initGUI(matrix) {
        var root = document.createElement('div'),
            ul = null,
            i = 0, j = 0, len = matrix.length,
            list = [], item = null;
        var winWidth = getWindowSize().w;
        for (i = 0; i < len; i++) {
            list[i] = [];
            ul = document.createElement('ul');
            for (j = 0; j < len; j++) {
                item = document.createElement('li');
                item.appendChild(document.createElement('div'));
                setItemSize(winWidth, len, item);
                list[i][j] = item;
                ul.appendChild(list[i][j]);
            }
            root.appendChild(ul);
        }
        root.style.position = 'relative';
        return {
            list: list,
            root: root
        };
    }

    // Set background color and font color for every single cell.
    function generateColorByNumber(number) {
        var log = 0;
        var color = {
            '0':  {bgColor: '#cbc2b2', color: '#333'},
            '1':  {bgColor: '#ebe4d9', color: '#333'},
            '2':  {bgColor: '#eedec7', color: '#333'},
            '3':  {bgColor: '#f39763', color: '#fff'},
            '4':  {bgColor: '#f29c5c', color: '#fff'},
            '5':  {bgColor: '#ef8161', color: '#fff'},
            '6':  {bgColor: '#f16432', color: '#fff'},
            '7':  {bgColor: '#eed170', color: '#fff'},
            '8':  {bgColor: '#edce5d', color: '#fff'},
            '9':  {bgColor: '#edc850', color: '#fff'},
            '10': {bgColor: '#edc53f', color: '#fff'},
            '11': {bgColor: '#edc22e', color: '#fff'},
            '12': {bgColor: '#b884ac', color: '#fff'},
            '13': {bgColor: '#b06ca9', color: '#fff'},
            '14': {bgColor: '#7f3d7a', color: '#fff'},
            '15': {bgColor: '#6158b1', color: '#fff'},
            '16': {bgColor: '#3a337b', color: '#fff'},
            '17': {bgColor: '#0f4965', color: '#fff'},
            '18': {bgColor: '#666', color: '#fff'},
            '19': {bgColor: '#333', color: '#fff'},
            '20': {bgColor: '#000', color: '#fff'}
        };
        if (number) {
            log = Math.log2(number);
        }
        return color[String(log)];
    }

    // Set font size for every single cell.
    function generateSizeByNumber(number) {
        var len = String(number).length;
        if (len < 4) {
            return 18;
        }
        if (len < 6) {
            return 16;
        }
        return 14;
    }

    // Draw GUI when matrix move and merge occurd.
    function drawGUI(matrix, list) {
        var i = 0, j = 0, len = matrix.length, color = null, item = null;
        for (i = 0; i < len; i++) {
            for (j = 0; j < len; j++) {
                color = generateColorByNumber(matrix[i][j]);
                item = list[i][j].children[0];
                item.textContent = matrix[i][j] === 0 ? ' ' : matrix[i][j];
                item.style.background = color.bgColor;
                item.style.color = color.color;
                item.style.fontSize = generateSizeByNumber(matrix[i][j]) + 'px';
            }
        }
    }

    // Add key event for global object.
    function registerEvent(callback) {
        function keyEventHandler(event) {
            var code = event.keyCode;
            callback.call(this, code);
        }
        window.addEventListener('keydown', keyEventHandler);
        return keyEventHandler;
    }

    function saveMaxScore(size, score, maxScore) {
        if (score > maxScore) {
            window.localStorage.setItem('maxScore_' + size, score);
        }
    }

    function getMaxScoreFromStorage(size) {
        return parseInt(window.localStorage.getItem("maxScore_" + size) || 0, 10);
    }

    function displayMaxScore(item, score, maxScore) {
        item.textContent = score > maxScore ? score : maxScore;
    }

    function gameOverHandler(rootElement, scoreElement, restartCallback) {
        var wrapper = document.createElement('div'),
            h3 = document.createElement('h3'),
            restartBtn = document.createElement('button');
        h3.className = 'gameover-title';
        restartBtn.className = 'btn-restart';
        wrapper.className = 'gameover-wrapper';
        h3.textContent = 'Game Over!!!';
        restartBtn.textContent = 'Try Again';
        wrapper.appendChild(h3);
        wrapper.appendChild(restartBtn);
        rootElement.appendChild(wrapper);
        restartBtn.addEventListener('click', function () {
            scoreElement.textContent = 0;
            restartCallback.call(this, wrapper);
        });
    }

    function winHandler(rootElement, scoreElement, restartCallback, continueCallback) {
        var wrapper = document.createElement('div'),
            h3 = document.createElement('h3'),
            restartBtn = document.createElement('button'),
            continueBtn = document.createElement('button');
        h3.className = 'win-title';
        restartBtn.className = 'win-restart';
        continueBtn.className = 'win-continue';
        wrapper.className = 'win-wrapper';
        h3.textContent = 'You Win!!!';
        restartBtn.textContent = 'Restart';
        continueBtn.textContent = 'Continue';
        wrapper.appendChild(h3);
        wrapper.appendChild(restartBtn);
        wrapper.appendChild(continueBtn);
        rootElement.appendChild(wrapper);
        restartBtn.addEventListener('click', function () {
            scoreElement.textContent = 0;
            restartCallback.call(this, wrapper);
        });
        continueBtn.addEventListener('click', function () {
            wrapper.remove();
            continueCallback.call(this);
        });
    }

    var GameManager = {
        // Left key.
        ARROW_LEFT: 37,
        // Up key.
        ARROW_UP: 38,
        // Right key.
        ARROW_RIGHT: 39,
        // Down key.
        ARROW_DOWN: 40,

        // Matrix data.
        data: [],
        // Matrix size, default size is 4 x 4.
        size: 4,

        // Game score.
        score: 0,
        // Best score
        bestScore: 0,
        // Game time.
        time: 0,
        // Game steps.
        steps: 0,
        // current max number.
        max: 0,
        // Wrapper element.
        wrapper: null,
        // Root element.
        root: null,
        // All list elements.
        elements: [],
        // Score element.
        scoreElement: null,
        // Max score element.
        maxScoreElement: null,

        // Initial matrix data with random numbers and zeros.
        init: function (config) {
            var i = 0, j = 0, gui = {},
                parent = config.parent;
            this.config = config;
            this.scoreElement = config.scoreElement;
            this.wrapper = config.wrapper;
            this.maxScoreElement = config.max;
            this.size = config.size || 4;
            for (i = 0; i < this.size; i++) {
                this.data[i] = [];
                for (j = 0; j < this.size; j++) {
                    this.data[i][j] = 0;
                }
            }
            gui = initGUI(this.data);
            this.score = 0;
            this.step = 0;
            this.max = 0;
            this.time = 0;
            this.elements = gui.list;
            this.root = gui.root;
            this.isContinue = false;
            this.max = getMaxScoreFromStorage(this.size);
            try {
                if (getWindowSize().w > 640) {
                    this.wrapper.style.width = 40 + this.size * 5 + 60 * this.size + 'px';
                }
                this.scoreElement.textContent = this.score;
                this.maxScoreElement.textContent = this.max;
                parent.appendChild(gui.root);
                return this;
            } catch (e) {
                throw e;
            }
        },

        // Game is beginning
        start: function () {
            var self = this;
            fillNumbers(self.data);
            drawGUI(self.data, self.elements);
            var handler = registerEvent(function (code) {
                if (self.isGameOver()) {
                    window.removeEventListener('keydown', handler);
                    gameOverHandler(self.root, self.scoreElement, function (el) {
                        el.remove();
                        self.root.remove();
                        self.init(self.config).start();
                    });
                    return;
                }
                if (self.notConfirm) {
                    return;
                }
                switch (code) {
                    case self.ARROW_UP:
                        self.go('up');
                        break;
                    case self.ARROW_DOWN:
                        self.go('down');
                        break;
                    case self.ARROW_LEFT:
                        self.go('left');
                        break;
                    case self.ARROW_RIGHT:
                        self.go('right');
                        break;
                }
                drawGUI(self.data, self.elements);
                self.scoreElement.textContent = self.score;
                saveMaxScore(self.size, self.score, self.max);
                displayMaxScore(self.maxScoreElement, self.score, self.max);
                if (self.isWin() && !self.isContinue) {
                    winHandler(self.root, self.scoreElement, function (el) {
                        self.restart();
                    }, function () {
                        self.notConfirm = false;
                        self.isContinue = true;
                    });
                    self.notConfirm = true;
                    return;
                }
            });
            return this;
        },

        restart: function () {
            this.root.remove();
            this.init(this.config).start();
            this.notConfirm = false;
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
        },

        // Move and merge matrix when event triggered.
        go: function (d) {
            var matrix = this.data, self = this;
            if (d) {
                if (this.canGo(d)) {
                    move(matrix, d);
                    merge(matrix, d, function (score) {
                        self.score += score;
                    });
                    move(matrix, d);
                    fillNumbers(matrix);
                    return;
                }
            } else {
                throw 'Parameter direction type required.';
            }
        },

        // Get matrix size.
        getSize: function () {
            return this.size;
        },

        // Calculate current max number.
        calculateMax: function () {
            var i = 0, len = 0, max = [];
            len = this.data.length;
            for (i = 0; i < len; i++) {
                max.push(Math.max(this.data[i]));
            }
            this.max = Math.max(max);
        },

        // Get current max number.
        getMax: function () {
            var i = 0, j = 0, max = 0;
            for (i = 0; i < this.size; i++) {
                for (j = 0; j < this.size; j++) {
                    if (max < this.data[i][j]) {
                        max = this.data[i][j];
                    }
                }
            }
            return max;
        },

        // Win handler
        isWin: function () {
            return this.getMax() === 2048;
        },

        // Is game no way to go.
        isGameOver: function () {
            return !(this.canGo('left') ||
                    this.canGo('right') ||
                    this.canGo('up') ||
                    this.canGo('down'));
        }
    };

    return {
        getScore: GameManager.getScore,
        GameManager: GameManager
    };
}(window, document));
