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
// document.addEventListener('keydown', function (event) {

//     window.location = "http://localhost:3000/experience?";

// });

var avatarIsOn = false;

document.addEventListener('keydown', function (event) {
    // right key
    if (event.keyCode == 37) {
        avatarIsOn = true;
    }

    // left key
    if (event.keyCode == 39) {
        avatarIsOn = false;
    }

    if (avatarIsOn === false) {     
        document.getElementById('avatar').classList.remove('pop-up');
        document.getElementById('avatar').classList.remove('hide');     
        document.getElementById('avatar').classList.add('pop-up');
        
        document.getElementById('content').classList.add('out');
    }

    console.log(avatarIsOn);
    if (avatarIsOn === true) {
        document.getElementById('avatar').classList.add('hide');  
        
        
        document.getElementById('content').classList.remove('inf');
        document.getElementById('content').classList.remove('out');     
        document.getElementById('content').classList.add('in');
    }
});

