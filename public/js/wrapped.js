function moveCard(id, end) {
    let interval = 0;
    const element = document.getElementById(id);
    let pos = 0;
    clearInterval(interval);
    interval = setInterval(move, 10);
    function move() {
        if (pos == end) {
            clearInterval(interval);
        } else {
            pos++;
            element.style.top = pos + "px";
        }
    }
}

function moveIn(id) {
    var element = document.getElementById(id);
    element.style.display = 'block';
    element.classList.add("card-move-in");
    $('.btn').blur();
}

function moveOut(id) {
    var element = document.getElementById(id);
    element.classList.remove("card-move-in");
    element.classList.add("card-move-out");
    element.style.display = 'block';
    $('.btn').blur();
}

function moveInAndOut(idIn, idOut){
    moveIn(idIn);
    moveOut(idOut);
}




function myMove() {
    let id = null;
    const elem = document.getElementById("animate");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}

function barGraph(maxHeight, idBar) {
    let id = null;
    const elem = document.getElementById(idBar);
    let height = 0;
    clearInterval(id);
    id = setInterval(frame, 0.5);
    function frame() {
        if (height == maxHeight) {
            clearInterval(id);
        } else {
            height++;
            elem.style.height = height + "px";
        }
    }

}

function updateGraphs() {
    for (let i = 1; i < 11; i++) {
        barGraph(Math.floor(Math.random() * 250) + 100, 'bar' + i);
    }
}