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

// document.addEventListener('keydown', function (event) {
//     //right key
//     if (event.keyCode == 37) {
//         chosenGenre--;
//     }
//     //left key
//     else if (event.keyCode == 39) {
//         chosenGenre++;
//     }

//     if (chosenGenre >= genreList.length) {
//         chosenGenre = 0;
//     }

//     if (chosenGenre < 0) {
//         chosenGenre = genreList.length - 1;
//     }

//     for (let i = 0; i < genreList.length; i++) {
//         let genre = chosenGenre - i;
//         if (genre >= genreList.length) {
//             genre = chosenGenre + i;
//         }
//         if (genre < 0) {
//             genre = genreList.length - i + chosenGenre;
//         }

//         $(`#genre-${i + 1}`).html(genreList[genre])

//     }
// });

var start = 0;

function progressBar(id) {
    var element = document.getElementById(id);
    element.classList.add("fill-progress-bar");
    start = window.performance.now();

    // setTimeout(function () {
    //     var end = window.performance.now();
    //     var time = end - start;
    //     window.location = "http://localhost:3000/wrapped?time=" + time;
    // }, 61000);
}



document.addEventListener('keydown', function (event) {
    if (event.keyCode == 65) {
        var end = window.performance.now();
        var time = end - start;
        window.location = "http://localhost:3000/wrapped?time=" + time;
    }
});

function audioVisualisation() {

    var audio = document.getElementById("audio");
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    audio.load();
    audio.play();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    const amountOfBars = 128;
    analyser.fftSize = amountOfBars * 4;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2;
    var barHeight;
    var x = 0;


    function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 3.5;

            // barHeight = -(-3 - dataArray[i]/2) *3.5;

            // var b = barHeight + (25 * (i / bufferLength));
            // var g = 250 * (i / bufferLength);
            // var r = 50;

            var b = barHeight / 2 + (25 * (i / bufferLength));
            var g = barHeight / 3;
            var r = barHeight / 4;

            if (b >= 256) { b = 0 }
            if (g >= 256) { g = 0 }
            if (r >= 256) { r = 0 }

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    audio.play();
    renderFrame();
};

let index1 = 1;
let index2 = 2;
let index3 = 3;
let index4 = 4;
let index5 = 5;
let index6 = 6;
let left = true;

document.addEventListener('keydown', function (event) {
    //right key
    if (event.keyCode == 87) {
        document.getElementById('card1').classList.remove(`card${index1}-right`);
        document.getElementById('card2').classList.remove(`card${index2}-right`);
        document.getElementById('card3').classList.remove(`card${index3}-right`);
        document.getElementById('card4').classList.remove(`card${index4}-right`);
        document.getElementById('card5').classList.remove(`card${index5}-right`);
        document.getElementById('card6').classList.remove(`card${index6}-right`);
        document.getElementById('card1').classList.remove(`card${index1}-left`);
        document.getElementById('card2').classList.remove(`card${index2}-left`);
        document.getElementById('card3').classList.remove(`card${index3}-left`);
        document.getElementById('card4').classList.remove(`card${index4}-left`);
        document.getElementById('card5').classList.remove(`card${index5}-left`);
        document.getElementById('card6').classList.remove(`card${index6}-left`);

        if (!left) {
            index1++;
            index2++;
            index3++;
            index4++;
            index5++;
            index6++;
        }
        left = false;

        if (index1 <= 0) index1 = 6;
        if (index2 <= 0) index2 = 6;
        if (index3 <= 0) index3 = 6;
        if (index4 <= 0) index4 = 6;
        if (index5 <= 0) index5 = 6;
        if (index6 <= 0) index6 = 6;
        if (index1 >= 7) index1 = 1;
        if (index2 >= 7) index2 = 1;
        if (index3 >= 7) index3 = 1;
        if (index4 >= 7) index4 = 1;
        if (index5 >= 7) index5 = 1;
        if (index6 >= 7) index6 = 1;

        document.getElementById('card1').classList.add(`card${index1}-right`);
        document.getElementById('card2').classList.add(`card${index2}-right`);
        document.getElementById('card3').classList.add(`card${index3}-right`);
        document.getElementById('card4').classList.add(`card${index4}-right`);
        document.getElementById('card5').classList.add(`card${index5}-right`);
        document.getElementById('card6').classList.add(`card${index6}-right`);
    }
    //left key
    else if (event.keyCode == 81) {
        document.getElementById('card1').classList.remove(`card${index1}-right`);
        document.getElementById('card2').classList.remove(`card${index2}-right`);
        document.getElementById('card3').classList.remove(`card${index3}-right`);
        document.getElementById('card4').classList.remove(`card${index4}-right`);
        document.getElementById('card5').classList.remove(`card${index5}-right`);
        document.getElementById('card6').classList.remove(`card${index6}-right`);
        document.getElementById('card1').classList.remove(`card${index1}-left`);
        document.getElementById('card2').classList.remove(`card${index2}-left`);
        document.getElementById('card3').classList.remove(`card${index3}-left`);
        document.getElementById('card4').classList.remove(`card${index4}-left`);
        document.getElementById('card5').classList.remove(`card${index5}-left`);
        document.getElementById('card6').classList.remove(`card${index6}-left`);

        if (left) {
            index1--;
            index2--;
            index3--;
            index4--;
            index5--;
            index6--;
        }
        left = true;

        if (index1 <= 0) index1 = 6;
        if (index2 <= 0) index2 = 6;
        if (index3 <= 0) index3 = 6;
        if (index4 <= 0) index4 = 6;
        if (index5 <= 0) index5 = 6;
        if (index6 <= 0) index6 = 6;
        if (index1 >= 7) index1 = 1;
        if (index2 >= 7) index2 = 1;
        if (index3 >= 7) index3 = 1;
        if (index4 >= 7) index4 = 1;
        if (index5 >= 7) index5 = 1;
        if (index6 >= 7) index6 = 1;

        document.getElementById('card1').classList.add(`card${index1}-left`);
        document.getElementById('card2').classList.add(`card${index2}-left`);
        document.getElementById('card3').classList.add(`card${index3}-left`);
        document.getElementById('card4').classList.add(`card${index4}-left`);
        document.getElementById('card5').classList.add(`card${index5}-left`);
        document.getElementById('card6').classList.add(`card${index6}-left`);

    }
    console.log(index1);
    console.log(index2);
    console.log(index3);
    console.log(index4);
    console.log(index5);
    console.log(index6);
    console.log('werkt');
});