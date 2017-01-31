for (var i = 1; i <= 64; i++) {
    document.getElementById("buttons").innerHTML += '<input type="button" value=" " style="font-size:25px" id = "null"; onclick = "whichBack = which; which = id;which = which - 1 + 1; pawnMove();" >&nbsp';
    if (i % 8 === 0) {
        document.getElementById("buttons").innerHTML += "<br>";
    }
}
/*
wP = 1;
wN = 2;
wB = 3;
wR = 4;
wQ = 5;
wK = 6;
bP = 7;
bN = 8;
bB = 9;
bR = 10;
bQ = 11;
bK = 12;
*/
var enpas = [];
var which = 0;
var whichBack = 0;
var array = [];
var allBtn = [];
var foo2 = document.getElementsByTagName("input");
var foo = 0;
var pAllow = 0;
var turn = 1;
var pDouble = 0;
var pTake = [];
var bClick = 0;
var dAllow = 0;
var dPoints = 0;
var dArray = [];
var hAllow = 0;
var hPoints = 0;
var hArray = [];
var nArray = [];
var nAllow = 0;
var kAllow = 0;
var kArray = [];
var kMoveW = false;
var kMoveB = false;
var rMove = [false, false, false, false];
array.length = 119;
for (var i = 0; i <= 119; i++) {
    array[i] = new Array(1);
    if (i <= 19) {
        array[i][0] = 99;
    } else if (i % 10 === 0 || (i + 1) % 10 === 0) {
        array[i][0] = 99;
    } else if (i >= 100) {
        array[i][0] = 99;
    } else {
        array[i][0] = 0;
        foo2[foo].id = i;
        allBtn[i] = foo2[foo];
        foo++;
    }
}
//program wP
for (var i = 31; i <= 38; i++) {
    array[i][0] = 1;
    allBtn[i].value = "P";
}
//program bP
for (var i = 81; i <= 88; i++) {
    array[i][0] = 7;
    allBtn[i].value = "p";
}
//program wB
array[23][0] = 3;
allBtn[23].value = "B";
array[26][0] = 3;
allBtn[26].value = "B";
//program bB
array[93][0] = 9;
allBtn[93].value = "b";
array[96][0] = 9;
allBtn[96].value = "b";
//program wR
array[21][0] = 4;
allBtn[21].value = "R";
array[28][0] = 4;
allBtn[28].value = "R";
//program bR
array[91][0] = 10;
allBtn[91].value = "r";
array[98][0] = 10;
allBtn[98].value = "r";
//program wQ
array[25][0] = 5;
allBtn[25].value = "Q";
//program bQ
array[95][0] = 11;
allBtn[95].value = "q";
//program wN
array[22][0] = 2;
allBtn[22].value = "N";
array[27][0] = 2;
allBtn[27].value = "N";
//program bN
array[92][0] = 8;
allBtn[92].value = "n";
array[97][0] = 8;
allBtn[97].value = "n";
//program wK
array[24][0] = 6;
allBtn[24].value = "K";
//program bK
array[94][0] = 12;
allBtn[94].value = "k";

function btnClick() {
    enpas = [];
    if (turn == 1) {
        if (array[which][0] == 1) {
            pawnSelect(1, 31, 7);
        }
        if (array[which][0] == 3) {
            bishopSelect();
        }
        if (array[which][0] == 4) {
            rookSelect();
        }
        if (array[which][0] == 5) {
            queenSelect();
        }
        if (array[which][0] == 2) {
            knightSelect(7, 12);
        }
        if (array[which][0] == 6) {
            kingSelect(7, 12);
        }

    } else if (turn == -1) {
        if (array[which][0] == 7) {
            pawnSelect(-1, 81, 1);
        }
        if (array[which][0] == 9) {
            bishopSelect();
        }
        if (array[which][0] == 10) {
            rookSelect();
        }
        if (array[which][0] == 11) {
            queenSelect();
        }
        if (array[which][0] == 8) {
            knightSelect(1, 6);
        }
        if (array[which][0] == 12) {
            kingSelect(1, 6);
        }
    }
}

function pawnSelect(pOM, bOW, bOW2) {
    clearColors();
    if (array[which + (pOM * 9)][0] >= bOW2 && array[which + (pOM * 9)][0] <= (bOW2 + 5)) {
        allBtn[which + (pOM * 9)].style.backgroundColor = "rgb(195, 99, 99)";
        pTake[0] = 9;
        pAllow = 1;
    }
    if (array[which + (pOM * 11)][0] >= bOW2 && array[which + (pOM * 11)][0] <= (bOW2 + 5)) {
        allBtn[which + (pOM * 11)].style.backgroundColor = "rgb(195, 99, 99)";
        pTake[1] = 11;
        pAllow = 1;
    }
    for (var a = bOW; a <= (bOW + 7); a++) {
        if (which == a) {
            if (array[which + (pOM * 10)][0] === 0 && array[which + (pOM * 20)][0] === 0) {
                allBtn[which + (pOM * 10)].style.backgroundColor = "rgb(182, 242, 195)";
                allBtn[which + (pOM * 20)].style.backgroundColor = "rgb(182, 242, 195)";
                pAllow = 1;
                pDouble = 1;
            }
        }
    }
    if (array[which + (pOM * 10)][0] === 0) {
        allBtn[which + (pOM * 10)].style.backgroundColor = "rgb(182, 242, 195)";
        pAllow = 1;
    }
    if (turn == 1) {
        if (array[which + 1][1] == -1 && array[which + 11][0] == 0) {
            enpas[0] = which + 11;
            allBtn[which + 11].style.backgroundColor = "rgb(195, 99, 99)";
            pAllow = 1;
        }
        if (array[which - 1][1] == -1 && array[which + 9][0] == 0) {
            enpas[1] = which + 9;
            allBtn[which + 9].style.backgroundColor = "rgb(195, 99, 99)";
            pAllow = 1;
        }
    } else if (turn == -1) {
        if (array[which + 1][1] == 1 && array[which - 9][0] == 0) {
            enpas[0] = which - 9;
            allBtn[which - 9].style.backgroundColor = "rgb(195, 99, 99)";
            pAllow = 1;
        }
        if (array[which - 1][1] == 1 && array[which - 11][0] == 0) {
            enpas[1] = which - 11;
            allBtn[which - 11].style.backgroundColor = "rgb(195, 99, 99)";
            pAllow = 1;
        }
    }
}

function bishopSelect() {
    clearColors();
    dPoints = 0;
    diagonal(1, 11);
    diagonal(-1, 11);
    diagonal(1, 9);
    diagonal(-1, 9);
}

function rookSelect() {
    clearColors();
    hPoints = 0;
    horizontal(-1, 1);
    horizontal(-1, 10);
    horizontal(1, 1);
    horizontal(1, 10);
}

function queenSelect() {
    clearColors();
    dPoints = 0;
    diagonal(1, 11);
    diagonal(-1, 11);
    diagonal(1, 9);
    diagonal(-1, 9);
    horizontal(-1, 1);
    horizontal(-1, 10);
    horizontal(1, 1);
    horizontal(1, 10);
}

function knightSelect(low, high) {
    var miniA = [-12, -21, -19, -8, 8, 19, 21, 12];
    var nCounter = 0;
    for (var i1 = 0; i1 <= 7; i1++) {
        if (array[which + miniA[i1]][0] === 0) {
            nAllow = 1;
            nArray[nCounter] = which + miniA[i1];
            nCounter++;
            allBtn[which + miniA[i1]].style.backgroundColor = "rgb(182, 242, 195)";
        } else if (array[which + miniA[i1]][0] >= low && array[which + miniA[i1]][0] <= high) {
            nAllow = 1;
            nArray[nCounter] = which + miniA[i1];
            nCounter++;
            allBtn[which + miniA[i1]].style.backgroundColor = "rgb(195, 99, 99)";
        }
    }
}

function kingSelect(low, high) {
    var miniA = [-11, -10, -9, 11, 10, 9, 1, -1];
    var kCounter = 0;
    for (var i1 = 0; i1 <= 7; i1++) {
        if (array[which + miniA[i1]][0] === 0) {
            kAllow = 1;
            kArray[kCounter] = which + miniA[i1];
            kCounter++;
            allBtn[which + miniA[i1]].style.backgroundColor = "rgb(182, 242, 195)";
        } else if (array[which + miniA[i1]][0] >= low && array[which + miniA[i1]][0] <= high) {
            kAllow = 1;
            kArray[kCounter] = which + miniA[i1];
            kCounter++;
            allBtn[which + miniA[i1]].style.backgroundColor = "rgb(195, 99, 99)";
        }
    }
    if (turn == 1 && kMoveW === false) {
        if (array[22][0] === 0 && array[23][0] === 0 && rMove[0] === false) {
            kArray[kCounter] = 22;
            allBtn[22].style.backgroundColor = "rgb(182, 242, 195)";
        }
        if (array[25][0] === 0 && array[26][0] === 0 && array[27][0] === 0 && rMove[1] === false) {
            kArray[kCounter] = 26;
            allBtn[26].style.backgroundColor = "rgb(182, 242, 195)";
        }
    } else if (turn == -1 && kMoveB === false) {
        if (array[92][0] === 0 && array[93][0] === 0 && rMove[2] === false) {
            kArray[kCounter] = 92;
            allBtn[92].style.backgroundColor = "rgb(182, 242, 195)";
        }
        if (array[95][0] === 0 && array[96][0] === 0 && array[97][0] === 0 && rMove[3] === false) {
            kArray[kCounter] = 96;
            allBtn[96].style.backgroundColor = "rgb(182, 242, 195)";
        }
    }
}

function kingMove() {
    if (kAllow == 1) {
        kAllow = 0;
        clearColors();
        for (var i = 0; i < kArray.length; i++) {
            if (which == kArray[i]) {
                move();
                if (turn == -1) {
                    kMoveW = true;
                    if (which == 22) {
                        rMove[0] = true;
                        array[21][0] = 0;
                        array[23][0] = 4;
                        allBtn[21].value = " ";
                        allBtn[23].value = "R";
                    }
                    if (which == 26) {
                        rMove[1] = true;
                        array[28][0] = 0;
                        array[25][0] = 4;
                        allBtn[28].value = " ";
                        allBtn[25].value = "R";
                    }
                } else {
                    kMoveB = false;
                    if (which == 92) {
                        rMove[2] = true;
                        array[91][0] = 0;
                        array[93][0] = 10;
                        allBtn[91].value = " ";
                        allBtn[93].value = "r";
                    }
                    if (which == 96) {
                        rMove[3] = true;
                        array[98][0] = 0;
                        array[95][0] = 10;
                        allBtn[98].value = " ";
                        allBtn[95].value = "r";
                    }
                }
                break;
            }
        }
        kArray = [];
        btnClick();
    } else {
        btnClick();
    }
}


function pawnMove() {
    if (pAllow == 1) {
        pAllow = 0;
        for (var i = 0; i <= 1; i++) {
            if (pTake != [] && (whichBack == which - (turn * pTake[i]))) {
                console.log("test");
                for (var i1 = 0; i1 <= array.length - 1; i1++) {
                    array[i1][1] = 0;
                }
                allBtn[whichBack].value = " ";
                array[whichBack][0] = 0;
                if (turn == 1) {
                    allBtn[which].value = "P";
                } else {
                    allBtn[which].value = "p";
                }
                if (turn == 1) {
                    array[which][0] = 1;
                    turn = -1;
                } else if (turn == -1) {
                    array[which][0] = 7;
                    turn = 1;
                }
                break;
            }
        }
        pTake = [];
        if(which == enpas[0] || which == enpas[1]){
            for (var i1 = 0; i1 <= array.length - 1; i1++) {
                    array[i1][1] = 0;
            }
            allBtn[which - (turn * 10)].value = " ";
            array[which - (turn * 10)][0] = 0;
            move();
            enpas = [];
        }
        if ((whichBack == which - (turn * 20) && pDouble == 1) || (whichBack == which - (turn * 10) && array[which][0] === 0)) {
            for (var i1 = 0; i1 <= array.length - 1; i1++) {
                array[i1][1] = 0;
            }
            pDouble = 0;
            if (turn == 1) {
                allBtn[which].value = "P";
            } else {
                allBtn[which].value = "p";
            }
            allBtn[whichBack].value = " ";
            array[whichBack][0] = 0;
            if (turn == 1) {
                array[which][0] = 1;
                turn = -1;
            } else if (turn == -1) {
                array[which][0] = 7;
                turn = 1;
            }
            clearColors();
            if (whichBack == which - (-turn * 20)) {
                //console.log(which);
                if (turn == 1) {
                    array[which][1] = -1;
                } else {
                    array[which][1] = 1;
                }
            }         
        } else {
            pDouble = 0;
            clearColors();
            diagonalMove();
            return 0;
        }
    } else {
        clearColors();
        diagonalMove();
    }
}

function knightMove() {
    if (nAllow == 1) {
        nAllow = 0;
        clearColors();
        for (var i = 0; i < nArray.length; i++) {
            if (which == nArray[i]) {
                move();
                break;
            }
        }
        nArray = [];
        kingMove();
    } else {
        kingMove();
    }
}

function diagonalMove() {
    if (dAllow == 1) {
        dAllow = 0;
        clearColors();
        for (var i = 0; i <= dPoints + 1; i++) {
            if (which == dArray[i]) {
                move();
                break;
            }
        }
        dArray = [];
        dPoints = 0;
        horizontalMove();
    } else {
        horizontalMove();
    }
}

function horizontalMove() {
    if (hAllow == 1) {
        hAllow = 0;
        clearColors();
        for (var i = 0; i <= hPoints + 1; i++) {
            if (which == hArray[i]) {
                move();
                var miniA = [21, 28, 91, 98];
                for (var i1 = 0; i1 <= 3; i1++) {
                    if (whichBack == miniA[i1] && rMove[i1] === false && (array[which][0] == 4 || array[which][0] == 10)) {
                        rMove[i1] = true;
                        break;
                    }
                }
                break;
            }
        }
        hArray = [];
        hPoints = 0;
        knightMove();
    } else {
        knightMove();
    }
}

function diagonal(mOP, lOR) {
    var small = 0;
    var big = 0;
    var run = 1;
    if (turn == 1) {
        small = 1;
        big = 6;
    } else if (turn == -1) {
        small = 7;
        big = 12;
    }
    for (var i = which; run == 1; i = i + (mOP * lOR)) {
        if (array[i][0] >= (small + (turn * 6)) && array[i][0] <= (big + (turn * 6))) {
            allBtn[i].style.backgroundColor = "rgb(195, 99, 99)";
            dArray[dPoints] = i;
            dAllow = 1;
            dPoints++;
            return 0;
        } else if ((array[i + (mOP * lOR)][0] >= small && array[i + (mOP * lOR)][0] <= big) || array[i + (mOP * lOR)][0] == 99) {
            if (i == which) {
                return 0;
            } else {
                allBtn[i].style.backgroundColor = "rgb(182, 242, 195)";
                dArray[dPoints] = i;
                dAllow = 1;
                dPoints++;
                return 0;
            }
        }
        if (i != which) {
            dArray[dPoints] = i;
            dAllow = 1;
            allBtn[i].style.backgroundColor = "rgb(182, 242, 195)";
            dPoints++;
        }
    }
}

function horizontal(mOP, lOR) {
    var small = 0;
    var big = 0;
    var run = 1;
    if (turn == 1) {
        small = 1;
        big = 6;
    } else if (turn == -1) {
        small = 7;
        big = 12;
    }
    for (var i = which; run == 1; i = i + (mOP * lOR)) {
        if (array[i][0] >= (small + (turn * 6)) && array[i][0] <= (big + (turn * 6))) {
            allBtn[i].style.backgroundColor = "rgb(195, 99, 99)";
            hArray[hPoints] = i;
            hAllow = 1;
            hPoints++;
            return 0;
        } else if ((array[i + (mOP * lOR)][0] >= small && array[i + (mOP * lOR)][0] <= big) || array[i + (mOP * lOR)][0] == 99) {
            if (i == which) {
                return 0;
            } else {
                allBtn[i].style.backgroundColor = "rgb(182, 242, 195)";
                hArray[hPoints] = i;
                hAllow = 1;
                hPoints++;
                return 0;
            }
        }
        if (i != which) {
            hArray[hPoints] = i;
            hAllow = 1;
            allBtn[i].style.backgroundColor = "rgb(182, 242, 195)";
            hPoints++;
        }
    }
}

function move() {
    for (var i1 = 0; i1 <= array.length - 1; i1++) {
        array[i1][1] = 0;
    }
    clearColors();
    allBtn[which].value = allBtn[whichBack].value;
    allBtn[whichBack].value = " ";
    array[which][0] = array[whichBack][0];
    array[whichBack][0] = 0;
    if (turn == 1) {
        turn = -1;
    } else if (turn == -1) {
        turn = 1;
    }
}

function clearColors() {
    for (var i = 0; i <= 63; i++) {
        foo2[i].style.backgroundColor = "";
    }
}
