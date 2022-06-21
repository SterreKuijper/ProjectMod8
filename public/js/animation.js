
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
            elem.style.height= height + "px";
        }
    }

}

function updateGraphs() {
    for (let i = 1; i < 11; i++) {
        barGraph(Math.floor(Math.random() * 300) + 100, 'bar' + i);
    }
}