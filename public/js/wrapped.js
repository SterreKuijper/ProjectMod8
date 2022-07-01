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

var elapsedTimeInHours = 0; //to Jelle

function calculateTime() {
    let maxFakeTime = 8 * 60 * 60;      // 8 hours
    let maxRealTime = 180;              // 3 minutes

    let timeText = document.getElementById("time").innerHTML;
    let time = Math.round(parseFloat(timeText)) / 1000 * maxFakeTime / maxRealTime;
    elapsedTimeInHours = time / 3600;

    document.getElementById('time-text').innerHTML = secondsToHms(time);

    moveIn('card1');
    send(elapsedTimeInHours);
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? (m > 0 || (!(m > 0) && s > 0) ? " hour, " : " hour") : (m > 0 || (!(m > 0) && s > 0) ? " hours, " : " hours")) : "";
    var mDisplay = m > 0 ? m + (m == 1 ? (s > 0 ? " minute, " : " minute") : (s > 0 ? " minutes, " : " minutes")) : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

// document.addEventListener('keydown', function (event) {
//     if (event.keyCode == 90) {
//         window.location = "http://localhost:3000/standby-screen";
//     }
// });

var socket = io("http://localhost:3010");

function startWrapped() {
    calculateTime();
    socket.emit('stop');

    // moveIn('card3');

    moveIn('card1');

    setTimeout(function () {
        moveInAndOut('card2', 'card1');
    }, 10000);

    setTimeout(function () {
        moveInAndOut('card3', 'card2');
    }, 20000);

    // end wrapped
    setTimeout(() => {
        window.location = "http://localhost:3000/standby-screen";
    }, 25000);
}

function send(input) {

    //socket.emit('wrapped', "100");

    if (socket.emit) {
        socket.emit('wrapped', input);
    }

}


setTimeout(() => {
    socket.on("calculation", (data) => {
        console.log(data);
    });

    socket.on("dose", soundDose => {
        console.log(`dose: ${soundDose}`);
        setDose(Math.round(soundDose)); 
    });
}, 200);


function setDose(dose) {
    document.getElementById('dose').innerHTML = dose + "%";
}

function setProgressBar(dose) {
    document.getElementById('progress-bar').style.width = '20%';
}

function setfact(sndDose) {
    console.log('werkt');
    var planecalc = sndDose/125000;    
    var horncalc = sndDose/12500;
    var alarmcalc = sndDose/626;    

    var plane = `This is the same as standing next to an jet plane for <strong style="color:#982CFF">${planecalc} hours</strong>.`
    var horn = `This is the same as standing next to an car horn for <strong style="color:#982CFF">${horncalc} hours</strong>.`
    var alarm = `This is the same as listening to an fire alarm for <strong style="color:#982CFF">${alarmcalc} hours</strong>.`

    var facts = [plane, horn, alarm];

    randomfact = Math.floor(Math.random() * 3);
    randomfact2 = randomfact + 1;
    if (randomfact2 == 3) randomfact2 = 0;
    document.getElementById('fact1').innerHTML = facts[randomfact];
    document.getElementById('fact2').innerHTML = facts[randomfact2];
}

