var videoSource = new Array();
videoSource[0] = '/videos/visual1.mp4';
let key = 0; // global
const videoCount = videoSource.length;
const videoElement = document.getElementById("videos");

// element.setAttribute("src", videoSource[0]);
``
function playVideo(videoNum) {
    videoElement.setAttribute("src", videoSource[videoNum]);
    videoElement.load();
    videoElement.play();
}

videoElement.addEventListener('ended', myFunctionHandle, false);

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

    setTimeout(function () {
        var end = window.performance.now();
        var time = end - start;
        window.location = "http://localhost:3000/wrapped?time=" + time;
    }, 180000);
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 65) {
        var end = window.performance.now();
        var time = end - start;
        window.location = "http://localhost:3000/wrapped?time=" + time;
    }
});

// --------------------------------------------- audio

// var audioSource = new Array();
// audioSource[0] = '/audio/dreams.mp3';

var audioInfo = [{
    genre: "ROCK",
    files: ["ROCK - AC_DC - Highway to Hell.wav", "ROCK - Joan Jett - I Love Rock 'n' Roll.wav", "ROCK - Nirvana - Smells Like Teen Spirit.wav"],
    artist: ["AC/DC", "Joan Jett", "Nirvana"],
    song: ["Highway to Hell", "I love Rock 'n' Roll", "Smells Like Teen Spirit"]
},
{
    genre: "CHOIR",
    files: ["CHOIR - Carl Orff - Carmina Burana O Fortune.wav", "CHOIR - Thomas Tallis - Spem in Alium.wav", "CHOIR - Alleluia - University of Utah Singers.wav"],
    artist: ["Carl Orff", "Thomas Tallis.wav", "University of Utah Singers"],
    song: ["Carmina Burana O Fortune", "Spem in Alium", "Alleluia"]
},
{
    genre: "POP",
    files: ["POP - Abba - Dancing Queen.wav", "POP - The Weeknd - Blinding Lights.wav", "POP - Ed Sheeran - Shape of You.wav"],
    artist: ["Abba", "The Weeknd", "Ed Sheeran"],
    song: ["Dancing Queen", "Blinding Lights", "Shape of You"]
},
{
    genre: "EDM",
    files: ["EDM - ACRAZE - Do It To It.wav", "EDM - DJ Fresh - Gold Dust (Fox Stevenson Remix).wav", "EDM - Shouse - Love Tonight.wav"],
    artist: ["ACRAZE", "DJ Fresh (Fox Stevenson Remix)", "Shouse"],
    song: ["Do It To IT", "Gold Dust (Fox Stevenson Remix)", "Love Tonight"]
},
{
    genre: "HIPHOP",
    files: ["HIPHOP -  Eminem - 'Till I Collapse.wav", "HIPHOP - Dr Dre Ft. Snoop Dogg - Still D.R.E.wav", "HIPHOP - 2Pac - Hit Em Up.wav"],
    artist: ["Eminem", "Dr Dre Ft. Snoop Dogg", "2Pac"],
    song: ["'Till I collapse", "Still D.R.E.", "Hit Em Up"]
},
{
    genre: "CLASSIC",
    files: ["CLASSIC - Beethoven - Fur Elise.wav", "CLASSIC - Mozart - Eine Kleine Nachtmusik.wav", "CLASSIC - Beethoven - Moonlight Sonata.wav"],
    artist: ["Beethoven", "Mozart", "Beethoven"],
    song: ["Fur Elise", "Eine kleine Nachtmusik", "Moonlight Sonata"]
},
{
    genre: "HARDSTYLE",
    files: ["HARDSTYLE - Wildstylez Feat. Niels Geusebroek - Year Of Summer.wav", "HARDSTYLE - Jebroer - Kind van de Duivel.wav", "HARDSTYLE - Ran-D - Zombie.wav"],
    artist: ["Wildstylez Feat. Niels Geusebroek", "Jebroer", "Ran-D"],
    song: ["Year Of Summer", "Kind van de Duivel", "Zombie"]
}];

var audio = document.getElementById("audio");

var context;
var source;

function playAudio(song) {
    audio.setAttribute("src", song);
    audio.load();
    audio.play();
}

function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

function audioVisualisation(song) {
    context = context || new AudioContext();
    source = source || context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    playAudio(song);

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    source.connect(analyser);
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

            var r = barHeight + (25 * (i / bufferLength));
            var g = 250 * (i / bufferLength);
            var b = 50;

            // var b = barHeight / 2 + (25 * (i / bufferLength));
            // var g = barHeight / 3;
            // var r = barHeight / 4;

            // if (b >= 256) { b = 0 }
            // if (g >= 256) { g = 0 }
            // if (r >= 256) { r = 0 }

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

// 1: Rock
// 2: Church Choir
// 3: Pop
// 4: EDM
// 5: Hip Hop
// 6: Classical Music

document.addEventListener('keydown', function (event) {
    //right key
    if (event.keyCode == 37) {
        for (let i = 0; i < index.length; i++) {
            document.getElementById(`card${i + 1}`).classList.remove(`card${index[i]}-right`);
            document.getElementById(`card${i + 1}`).classList.remove(`card${index[i]}-left`);
        }

        for (let i = 0; i < index.length; i++) if (!left) index[i]++;

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
                audioVisualisation(`/audio/${audioInfo[i].files[Math.floor(Math.random() * audioInfo[i].files.length)]}`);
            }
        }
    }
    //left key
    else if (event.keyCode == 39) {
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
                audioVisualisation(`/audio/${audioInfo[i].files[Math.floor(Math.random() * audioInfo[i].files.length)]}`);
            }
        }
    }

    else if (event.keyCode == 81) {
        const info = addNotification();
        setTimeout(() => {
            removeNotification(info);
        }, 2500);
    }
});


// -----------------------------------------------------------------------------

const notificationContainer = document.getElementById('notification-container');

function addNotification() {
    // create the DIV and add the required classes
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification');

    const innerNotification = `
        <img src="/images/EarplugIcon.png" id="earplug">
	`;

    // insert the inner elements
    newNotification.innerHTML = innerNotification;

    // add the newNotification to the container
    notificationContainer.appendChild(newNotification);

    return newNotification;
}

function removeNotification(notification) {
    notification.classList.add('hide');

    // remove notification from the DOM after 0.5 seconds
    setTimeout(() => {
        notificationContainer.removeChild(notification);
    }, 500);
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 90) {
        window.location = "http://localhost:3000/standby-screen";
    }
});






