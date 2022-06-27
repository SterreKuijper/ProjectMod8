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

var elapsedTimeInHours = 0;

function calculateTime() {
    let maxFakeTime = 8 * 60 * 60;      // 8 hours
    let maxRealTime = 60;              // 2 minutes

    let timeText = document.getElementById("time").innerHTML;
    let time = Math.round(parseFloat(timeText))/1000 * maxFakeTime / maxRealTime;
    elapsedTimeInHours = time/3600;

    document.getElementById('time-text').innerHTML = secondsToHms(time);
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}




