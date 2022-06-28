
var videoSource = new Array();
videoSource[0] = './videos/visual1.mp4';
let key = 0; // global
const videoCount = videoSource.length;
const audioElement = document.getElementById("videos");

// element.setAttribute("src", videoSource[0]);
``
function playVideo(videoNum) {
    audioElement.setAttribute("src", videoSource[videoNum]);
    audioElement.load();
    audioElement.play();
}

audioElement.addEventListener('ended', myFunctionHandle, false);

function myFunctionHandle() {
    key++;
    if (key == videoCount) {
        key = 0;
        playVideo(key);
    } else {
        playVideo(key);
    }
}

// -----------------------------------

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

// ---------------------------------------------

var audioSource = new Array();
audioSource[0] = '/audio/dreams.mp3';

var audio = document.getElementById("audio");

function playAudio() {
    audioElement.setAttribute("src", audioSource[0]);
    audioElement.load();
    audioElement.play();
}

function stopAudio() {
    audioElement.pause();
    audio.currentTime = 0;
}

function audioVisualisation() {

    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    playAudio();

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

let left = true;
var index = [1, 2, 3, 4, 5, 6];
var isPlaying = [false, false, true, false, false, false];

    
    function rightInput() {
        for (let i = 0; i < index.length; i++) {
            document.getElementById(`card${i + 1}`).classList.remove(`card${index[i]}-right`);
            document.getElementById(`card${i + 1}`).classList.remove(`card${index[i]}-left`);
        }

        for (let i = 0; i < index.length; i++) if(!left) index[i]++;

        left = false;

        for (let i = 0; i < index.length; i++) if (index[i] <= 0) index[i] = 6;
        for (let i = 0; i < index.length; i++) if (index[i] >= 7) index[i] = 1;

        for (let i = 0; i < index.length; i++) {
            document.getElementById(`card${i + 1}`).classList.add(`card${index[i]}-right`);
        }

        for (let i = 0; i < index.length; i++) if (index[i] == 2) isPlaying[i] = true;
        else isPlaying[i] = false;

        for (let i = 0; i < isPlaying.length; i++) {
            if (isPlaying[i]) {
                stopAudio();
                playAudio();
                audioVisualisation()
            }
        }
    }

    //left key
    function leftInput() {
        for (let i = 0; i < index.length; i++) {
            document.getElementById(`card${i + 1}`).classList.remove(`card${index[i]}-right`);
            document.getElementById(`card${i + 1}`).classList.remove(`card${index[i]}-left`);
        }

        for (let i = 0; i < index.length; i++) if (left) index[i]--;

        left = true;

        for (let i = 0; i < index.length; i++) if (index[i] <= 0) index[i] = 6;
        for (let i = 0; i < index.length; i++) if (index[i] >= 7) index[i] = 1;

        for (let i = 0; i < index.length; i++) document.getElementById(`card${i + 1}`).classList.add(`card${index[i]}-left`);

        for (let i = 0; i < index.length; i++) if (index[i] == 3) isPlaying[i] = true;
        else isPlaying[i] = false;

        for (let i = 0; i < isPlaying.length; i++) {
            if (isPlaying[i]) {
                stopAudio();
                playAudio();
                audioVisualisation()
            }
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 37){
            rightInput();
        }
        if (event.keyCode == 39){
            leftInput();
        }
    });





