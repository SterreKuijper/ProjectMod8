var videoSource = new Array();
videoSource[0] = '/videos/v1.mp4';
videoSource[1] = '/videos/v2.mp4';
videoSource[2] = '/videos/v3.mp4';
videoSource[3] = '/videos/v4.mp4';
videoSource[4] = '/videos/v5.mp4';
videoSource[5] = '/videos/v6.mp4';
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
document.addEventListener('keydown', function (event) {

    window.location = "http://localhost:3000/experience?";

});

var socket = io("http://localhost:3010");

setTimeout(() => {
    //fuck socket.io
    socket.on("present", present  => {
        setAvatar(present); 
    });

    socket.emit('new-song', 0);
}, 200);

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 82) {
        setAvatar(false);
    }
    if (event.keyCode == 69) {
        setAvatar(true);
    }
});

function setAvatar(avatarIsOn) {
    if(!avatarIsOn) {
        document.getElementById('avatar').classList.remove('pop-up');
        document.getElementById('avatar').classList.remove('hide');
        document.getElementById('avatar').classList.add('pop-up');

        document.getElementById('content').classList.add('out');
    }else{        
        document.getElementById('content').classList.remove('in');
        document.getElementById('content').classList.remove('out');
        document.getElementById('content').classList.add('in');

        document.getElementById('avatar').classList.add('hide');
    }
}

function proceed(){
    window.location = "http://localhost:3000/experience?";
}

// Input from controller

var socket = io("http://localhost:3010");
socket.on("input", (data) => {
var split = data.split(",");
var button = split[0];
var direction = split[1];
var value = split[2];
console.log(button, direction, value);
proceed();
});

