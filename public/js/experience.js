
// var videoSource = new Array();
// videoSource[0] = './videos/visual1.mp4';
// let key = 0; // global
// const videoCount = videoSource.length;
// const videoElement = document.getElementById("videos");

// element.setAttribute("src", videoSource[0]);
// ``
// function playVideo(videoNum) {
//     videoElement.setAttribute("src", videoSource[videoNum]);
//     videoElement.load();
//     videoElement.play();
// }

// videoElement.addEventListener('ended', myFunctionHandle, false);

// function myFunctionHandle() {
//     key++;
//     if (key == videoCount) {
//         key = 0;
//         playVideo(key);
//     } else {
//         playVideo(key);
//     }
// }

// -----------------------------------

var socket = io("http://localhost:3010");

var start = 0;

function startExperience() {
    start = window.performance.now();
    progressBar('progressbar');
    startTime = start;
    let randomSong = Math.floor(Math.random()*3);
    audioVisualisation(`/audio/${audioInfo[2].files[randomSong]}`);
    changeSongDisplay(2, randomSong);
    socket.emit('start');

}

function progressBar(id) {
    var element = document.getElementById(id);
    element.classList.add("fill-progress-bar");

    setTimeout(function () {
        var end = window.performance.now();
        var time = end - start;
        window.location = "http://localhost:3000/wrapped?time=" + time;
    }, 180000);
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 65) {
        end();
    }
});

function end() {
    var end = window.performance.now();
    var time = end - start;
    mostPopGenre = calcMostPopGenre();
    window.location = "http://localhost:3000/wrapped?time=" + time + `&genre=${mostPopGenre}`;
}

// --------------------------------------------- audio

// var audioSource = new Array();
// audioSource[0] = '/audio/dreams.mp3';

var audioInfo = [{
    genre: "ROCK",
    files: ["ROCK - AC_DC - Highway to Hell.mp3", "ROCK - Joan Jett - I Love Rock 'n' Roll.mp3", "ROCK - Nirvana - Smells Like Teen Spirit.mp3"],
    artist: ["AC/DC", "Joan Jett", "Nirvana"],
    song: ["Highway to Hell", "I love Rock 'n' Roll", "Smells Like Teen Spirit"],
    id: [5, 6, 4]
},
{
    genre: "CHOIR",
    files: ["CHOIR - Carl Orff - Carmina Burana O Fortune.mp3", "CHOIR - Thomas Tallis - Spem in Alium.mp3", "CHOIR - Alleluia - University of Utah Singers.mp3"],
    artist: ["Carl Orff", "Thomas Tallis.wav", "University of Utah Singers"],
    song: ["Carmina Burana O Fortune", "Spem in Alium", "Alleluia"],
    id: [2, 3, 1]

},
{
    genre: "POP",
    files: ["POP - Abba - Dancing Queen.mp3", "POP - The Weeknd - Blinding Lights.mp3", "POP - Ed Sheeran - Shape of You.mp3"],
    artist: ["Abba", "The Weeknd", "Ed Sheeran"],
    song: ["Dancing Queen", "Blinding Lights", "Shape of You"],
    id: [16, 18, 17]
},
{
    genre: "EDM",
    files: ["EDM - ACRAZE - Do It To It.mp3", "EDM - DJ Fresh - Gold Dust (Fox Stevenson Remix).mp3", "EDM - Shouse - Love Tonight.mp3"],
    artist: ["ACRAZE", "DJ Fresh (Fox Stevenson Remix)", "Shouse"],
    song: ["Do It To IT", "Gold Dust (Fox Stevenson Remix)", "Love Tonight"],
    id: [10, 11, 12]
},
{
    genre: "HIPHOP",
    files: ["HIPHOP - Eminem - 'Till I Collapse.mp3", "HIPHOP - Dr Dre Ft. Snoop Dogg - Still D.R.E.mp3", "HIPHOP - 2Pac - Hit Em Up.mp3"],
    artist: ["Eminem", "Dr Dre Ft. Snoop Dogg", "2Pac"],
    song: ["'Till I collapse", "Still D.R.E.", "Hit Em Up"],
    id: [13, 15, 14]
},
{
    genre: "CLASSIC",
    files: ["CLASSIC - Beethoven - Fur Elise.mp3", "CLASSIC - Mozart - Eine Kleine Nachtmusik.mp3", "CLASSIC - Beethoven - Moonlight Sonata.mp3"],
    artist: ["Beethoven", "Mozart", "Beethoven"],
    song: ["Fur Elise", "Eine kleine Nachtmusik", "Moonlight Sonata"],
    id: [7, 9, 8]
},
{
    genre: "HARDSTYLE",
    files: ["HARDSTYLE - Wildstylez Feat. Niels Geusebroek - Year Of Summer.mp3", "HARDSTYLE - Jebroer - Kind van de Duivel.mp3", "HARDSTYLE - Ran-D - Zombie.mp3"],
    artist: ["Wildstylez Feat. Niels Geusebroek", "Jebroer", "Ran-D"],
    song: ["Year Of Summer", "Kind van de Duivel", "Zombie"],
    id: [21, 19, 20]
}];

var audio = document.getElementById("audio");

var context;
var source;

var newSound = null;

function playAudio(song){
    // Audio for playback
    console.log(song);
    newSound = new Howl({
        src: [song],
        html5: false,
      });
      newSound.play();
    
    // Audio for visualizer
    function load(){
        audio.setAttribute("src", song);
        audio.load();
        document.getElementById("audio").volume = 0.004;
        audio.play();
        console.log("Start Visualizer");
    }
    setTimeout(load, 950);
}

function stopAudio(){
    // Stop playback audio
    Howler.stop();

    //Stop visualiser audio
    audio.pause();
    audio.currentTime = 0;
}

var previousAudio;
var randomAudio;

function randomiseAudio() {
    for (let i = 0; i < isPlaying.length; i++) {
        if (isPlaying[i]) {
            //randomAudio = audioInfo[i].files[Math.floor(Math.random() * audioInfo[i].files.length)];
            randomSong = Math.floor(Math.random() * audioInfo[i].files.length);
        }
    }
}

function switchAudio() {
    previousAudio = randomAudio;
    for (let i = 0; i < isPlaying.length; i++) {
        if (isPlaying[i]) {
                // stopAudio();
                // randomiseAudio();
                // if (previousAudio === randomAudio){
                //     randomiseAudio();
                //     audioVisualisation(`/audio/${randomAudio}`);
                // } else {
                //     audioVisualisation(`/audio/${randomAudio}`);
                // }
            stopAudio();
            if (previousAudio === randomAudio){
                randomiseAudio();
                audioVisualisation(`/audio/${audioInfo[i].files[randomSong]}`);
            } else {
                audioVisualisation(`/audio/${audioInfo[i].files[randomSong]}`);
            }
            changeSongDisplay(i, randomSong);
            }
        }
}

function audioVisualisation(song) {

    context = context || new AudioContext();
    source = source || context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    playAudio(song);

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth + 35;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    source.connect(analyser);
    analyser.connect(context.destination);

    const amountOfBars = 64;
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

        //let xFactor = 0.03; * Math.log(i * xFactor)  Math.sqrt(i * xFactor) 
        let xFactor = 3;

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 6.5 * Math.sqrt(i * xFactor);

            // barHeight = dataArray[i] * 6;

            var r = barHeight + (10 * (i / bufferLength));
            var g = 250 * (i / bufferLength);
            var b = 100;

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
var isPlaying = [false, false, true, false, false, false, false];

var randomSong;

var timeOfGenre = [{ genre: "rock", time: 0 }, { genre: "church choir", time: 0 }, { genre: "pop", time: 0 }, { genre: "edm", time: 0 }, { genre: "hip hop", time: 0 }, { genre: "classical music", time: 0 }, { genre: "hardstyle", time: 0 }];

var startTime = null;
var previousGenre = 2;

function rightInput() {    
    startTime = window.performance.now();

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

    for (let i = 0; i < index.length; i++) if (index[i] == 2) {
        isPlaying[i] = true;
        var endTime = window.performance.now();
        console.log(endTime);
        if (startTime != null) timeOfGenre[previousGenre].time += endTime - startTime;
        previousGenre = i; 
        startTime = endTime;
    }
    else isPlaying[i] = false;

    console.log(timeOfGenre);

    for (let i = 0; i < isPlaying.length; i++) {
        if (isPlaying[i]) {
            stopAudio();
            randomSong = Math.floor(Math.random() * audioInfo[i].files.length);
            var idOmdoortesturen = audioInfo[i].id[randomSong];
            socket.emit('new-song', idOmdoortesturen);
            socket.emit('new-genre', isPlaying);
            changeSongDisplay(i, randomSong);
            audioVisualisation(`/audio/${audioInfo[i].files[randomSong]}`);
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

    for (let i = 0; i < index.length; i++) if (index[i] == 3) {
        isPlaying[i] = true;
        var endTime = window.performance.now();
        console.log(startTime);
        console.log(endTime);
        console.log(endTime - startTime);
        if (startTime != null) timeOfGenre[previousGenre].time += endTime - startTime;
        previousGenre = i; 
        startTime = endTime;
    }
    else isPlaying[i] = false;

    console.log(timeOfGenre);

    for (let i = 0; i < isPlaying.length; i++) {
        if (isPlaying[i]) {
            stopAudio();
            randomSong = Math.floor(Math.random() * audioInfo[i].files.length);
            var idOmdoortesturen = audioInfo[i].id[randomSong];
            socket.emit('new-song', idOmdoortesturen);
            socket.emit('new-genre', isPlaying);
            changeSongDisplay(i, randomSong);
            audioVisualisation(`/audio/${audioInfo[i].files[randomSong]}`);
        }
    }
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        rightInput();
    }
    if (event.keyCode == 39) {
        leftInput();
    }
    else if (event.keyCode == 81) {
        const info = addNotification(`<img src="/images/EarplugIcon.png" id="earplug">`);
        setTimeout(() => {
            removeNotification(info);
        }, 2500);
    }
    else if (event.keyCode == 87) {
        const info = addNotification(`<img src="/images/EarplugOutIcon.png" id="earplug">`);
        setTimeout(() => {
            removeNotification(info);
        }, 2500);
    }
});

// -----------------------------------------------------------------------------

const notificationContainer = document.getElementById('notification-container');

function addNotification(message) {
    // create the DIV and add the required classes
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification');

    const innerNotification = message;

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

var sfx1 = new Audio('sfx/scratch1.mp3');
var sfx2 = new Audio('sfx/scratch2.mp3');
var sfx3 = new Audio('sfx/scratch3.mp3');
var sfx4 = new Audio('sfx/scratch4.mp3');
var sfx5 = new Audio('sfx/scratch5.mp3');
var sfx6 = new Audio('sfx/scratch6.mp3');
var trigger = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function scratchReset(){
    trigger = 0;
}

function scratch(){
    trigger++;
    var sound = getRandomInt(1,7);
    console.log(sound, trigger);
    if (trigger == 1){
        switch(sound) {
            case 1:
                sfx1.play();
                break;
            case 2:
                sfx2.play();
                break;
            case 3:
                sfx3.play();
                break;
            case 4:
                sfx4.play();
                break;
            case 5:
                sfx5.play();
                break;
            case 6:
                sfx6.play();
            break;
          }
          setTimeout(scratchReset, 800);
    }    
}

setTimeout(() => {
    //fuck socket.io
    socket.on("input", (data) => {
        var split = data.split(",");
        var button = split[0];
        var direction = split[1];
        var value = split[2];
        console.log(button, direction, value);
        // Browse button scroll left
        if (button == "browse" && direction == "left") {
            rightInput();
        }
        // Browse button scroll right
        if (button == "browse" && direction == "right") {
            leftInput();
        }
        // End experience
        if (button == "reset" && direction == "down") {
            end();
        }
    
        if (button == "crossfader" && (value == "0" || value == "127")) {
            console.log("CROSSFADE");
            switchAudio();
        }
    
        if((button == "jogwheelL" || button == "jogwheelR" )){
            scratch();
        }
    
    });
    
    socket.on("ear", isIn  => {
        const info = addNotification(`<img src="/images/${!isIn ? 'EarplugOutIcon' : 'EarplugIcon'}.png" id="earplug">`);
        console.log('werkt echt niet');
        setTimeout(() => {
            removeNotification(info);
        }, 2500);   
    });
    
    socket.on("present", present  => {
        setAvatar(present);  
    });

    socket.emit('new-song', 17);
}, 200);

function setAvatar(avatarIsOn) {
    if(!avatarIsOn) {
        document.getElementById('avatar').classList.remove('pop-up');
        document.getElementById('avatar').classList.remove('hide');
        document.getElementById('avatar').classList.add('pop-up');

        document.getElementById('start-btn').classList.add('out');
    }else{
        document.getElementById('avatar').classList.add('hide');
        
        document.getElementById('start-btn').classList.remove('in');
        document.getElementById('start-btn').classList.remove('out');
        document.getElementById('start-btn').classList.add('in');
    }
}

function changeSongDisplay(index, song) {
    var title = document.getElementById('title');
    var artist = document.getElementById('artist');

    console.log(song);

    title.innerHTML = audioInfo[index].song[song];
    artist.innerHTML = audioInfo[index].artist[song];
}

function calcMostPopGenre() {
    let highestValue = 0;
    let mostPopGenre = 0;
    for (let i = 0; i < timeOfGenre.length; i++) {
        var value = timeOfGenre[i].time;
        if (value > highestValue) {
            highestValue = value;
            mostPopGenre = i;
        }
    }
    return timeOfGenre[mostPopGenre].genre;
}




