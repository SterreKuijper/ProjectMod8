var videoSource = new Array();
videoSource[0] = '/videos/visual1.mp4';
let key = 0; // global
const videoCount = videoSource.length;
const element = document.getElementById("videos");

element.setAttribute("src", videoSource[0]);

function playVideo(videoNum) {
    element.setAttribute("src", videoSource[videoNum]);
    element.load();
    element.play();
}

element.addEventListener('ended', myFunctionHandle, false);

function myFunctionHandle() {
    key++;
    if (key == videoCount) {
        key = 0;
        playVideo(key);
    } else {
        playVideo(key);
    }
}

var genreList = ["Rock", "Classical Music", "Hip Hop", "EDM", "Pop", "Church Choir"];
const genreTitle = document.getElementById("genre-1");
let chosenGenre = 0;
let randomGenre = Math.floor(Math.random() * genreList.length)

for (let i = 0; i < genreList.length; i++) {
    let genre = randomGenre - i;
    if (genre >= genreList.length) {
        genre = chosenGenre + i;
    }
    if (genre < 0) {
        genre = genreList.length - i + chosenGenre;
    }

    $(`#genre-${i + 1}`).html(genreList[genre])
}

// genreTitle.innerHTML = genreList[randomGenre];

document.addEventListener('keydown', function (event) {
    //right key
    if (event.keyCode == 37) {
        chosenGenre--;
    }
    //left key
    else if (event.keyCode == 39) {
        chosenGenre++;
    }

    if (chosenGenre >= genreList.length) {
        chosenGenre = 0;
    }

    if (chosenGenre < 0) {
        chosenGenre = genreList.length - 1;
    }

    for (let i = 0; i < genreList.length; i++) {
        let genre = chosenGenre - i;
        if (genre >= genreList.length) {
            genre = chosenGenre + i;
        }
        if (genre < 0) {
            genre = genreList.length - i + chosenGenre;
        }

        console.log(genreList[genre]);

        $(`#genre-${i + 1}`).html(genreList[genre])

    }
});

var start = 0;

function progressBar(id) {
    var element = document.getElementById(id);
    element.classList.add("fill-progress-bar");
    start = window.performance.now();

    setTimeout(function () {
        var end = window.performance.now();
        var time = end - start;
        window.location = "http://localhost:3000/wrapped?time=" + time;
    }, 61000);
}



document.addEventListener('keydown', function (event) {
    if (event.keyCode == 65) {
        var end = window.performance.now();
        var time = end - start;
        window.location = "http://localhost:3000/wrapped?time=" + time;
    }
});

