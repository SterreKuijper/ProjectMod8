var videoSource = new Array();
videoSource[0] = '/videos/visual1.mp4';
let key = 0; // global
const videoCount = videoSource.length;
const element = document.getElementById("videos");

element.setAttribute("src",videoSource[Math.floor(Math.random() * (videoCount - 0 + 1))]);

function playVideo(videoNum) {
    element.setAttribute("src",videoSource[videoNum]);
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