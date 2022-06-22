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

function moveInAndOut(idIn, idOut) {
    moveIn(idIn);
    moveOut(idOut);
}


