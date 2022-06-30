
//setup socket
const socket = require("./socket");


//setup speaker
var speakerVol; //volume in decibel (dB)
var distToSpeaker = 4; //distance to speaker in meters
var distToSpeaker1;
var distToSpeaker2;
var speakerVolMult = -8.656; //speaker multiplier
var speakerVolComp = 11.9997639898537755 //Compensation value in dB given start dist is 4m DEBUGGING
//var speakerVolComp = 23.99952797970755; //9898537755 //Compensation value in dB given start dist is 16m
var floatNumComp = 4090; //extra time to run the programm the correct amount of times in milliseconds

//setup  run program
var runTime = 180000; // the time that the program should run in milli seconds
var runIntervalTime = 375; //time before the next time the loop function should run in milliseconds

//set safety criterium: we say that 8 hours of 80dB is safe given that the exchange rate is 3dB
var critSndDur = 8; //time in hours
var critSndLvl = 80; //volume in decibel (dB)
var exchangeRate = 10 //Exchange rate paremeter which is the result of 

//calculated & received values
var weightedSndLvl1;
var weightedSndLvl2;
var totWeightedSndLvl;
var sndDose = 0; //begins at zero
var earplugsIn = false;
var activeGenre = [false, true, false, false, false, false];

//set sound dose thresholds
var maxSndDose = 1000000; //maximum sound dose you could receive
var safeSndDose = 100; //safe daily sound dose
var hearingDamage = 0;  //Damage to the ear

const tcpServer = require('./tcpserver');

const { request } = require('express');


function loop(){
    calcDistToSpeaker();
    setSpeakerVol(activeGenre);
    calcTotWeightedSndLvl(speakerVol, distToSpeaker1, distToSpeaker2);
    calcSndDose();

    if (sndDose <= 100) console.log(sndDose);
    else {
        calcHearingDamage(sndDose);
        //console.log("Your hearing damage is:" + hearingDamage +"%" ); //DEBUGGING
    }

    if (sndDose > maxSndDose) console.log("ERROR: Sound Dose went over Maximum");
}

function calcDistToSpeaker(){
    let relXPosToSpeaker1 = 10 - tcpServer.getXPos();
    let relXPosToSpeaker2 = 21 - tcpServer.getXPos();
    let relYPosToSpeaker1 = tcpServer.getYPos();
    let relYPosToSpeaker2 = tcpServer.getYPos(); 
    distToSpeaker1 = Math.sqrt((relXPosToSpeaker1 * 4) ** 2 + (relYPosToSpeaker1 * 8) ** 2); 
    distToSpeaker2 = Math.sqrt((relXPosToSpeaker2 * 4) ** 2 + (relYPosToSpeaker2 * 8) ** 2);
    //console.log(tcpServer.getXPos(), tcpServer.getYPos());
    //console.log(relXPosToSpeaker1, relXPosToSpeaker2, relYPosToSpeaker1, relYPosToSpeaker2);
    //onsole.log(distToSpeaker1,distToSpeaker2);
}

function setSpeakerVol(activeGenre){
    if(activeGenre[0]) speakerVol = 120; //Rock music
    else if(activeGenre[1]) speakerVol = 80; //Choir music
    else if(activeGenre[2]) speakerVol = 100; //Pop music
    else if(activeGenre[3]) speakerVol = 110; //EDM music
    else if(activeGenre[4]) speakerVol = 105; //Hiphop music
    else if(activeGenre[5]) speakerVol = 90; //Classic music
    console.log(speakerVol);
}

function calcTotWeightedSndLvl(speakerVol, distToSpeaker1, distToSpeaker2){
    weightedSndLvl1 = speakerVolMult * Math.log(distToSpeaker1) + speakerVol + speakerVolComp;
    weightedSndLvl2 = speakerVolMult * Math.log(distToSpeaker2) + speakerVol + speakerVolComp;
    //weightedSndLvl1 = 100; DEBUGGING
    //weightedSndLvl2 = 100; DEBUGGING
    totWeightedSndLvl = Math.log(10 ** (weightedSndLvl1/10) + 10 ** (weightedSndLvl2/10))/Math.log(10) * 10;
    if(tcpServer.getEar() == true) totWeightedSndLvl -= 20; 
    console.log("totWeightedSndLvl = " + totWeightedSndLvl);
} 

function calcSndDose(){
    //passedTime = calcPassedTime();
    //sndDose = ((100/critSndDur)*passedTime*10**((totWeightedSndLvl-critSndLvl)/exchangeRate))/100;
    let timeInterval = 1/60;
    sndDose += (100/critSndDur)*timeInterval*10**((totWeightedSndLvl-critSndLvl)/exchangeRate);
    console.log("soundDose = " + sndDose);

    if(sndDose>0 && sndDose<100){
        var commandOmdoortesturen = 3;
    }
    else if(sndDose>=100 && sndDose<1000){
        var commandOmdoortesturen = 2;
    }
    else if(sndDose>=1000 && sndDose<10000){
        var commandOmdoortesturen = 1;
    }
    else if(sndDose>=100000){
        var commandOmdoortesturen = 0;
    }
    socket.sendSoundDose(sndDose, commandOmdoortesturen);
} 

function calcHearingDamage(){
    hearingDamage = (sndDose-safeSndDose)/(maxSndDose-safeSndDose)*100;
}

//Dit moet terug naar el client
function getSndDose(){
    return sndDose;
}
socket.sendSound(getSndDose());

function calcPassedTime(){

    passedTime = 8;
    //Time from client.
    //passedTime = socket.passedTime;
    //console.log(socket.passedTime);
    //passedTime = wrapped.getElapsedTime();
    return passedTime;
}

console.log("Dit bestand doet ook echt wel");

var runProgrammeInterval = setInterval(loop, runIntervalTime);

function stopProgramme(){
    clearInterval(runProgrammeInterval);
    console.log("The Fesitval is Over!")
}

setTimeout(stopProgramme, runTime + floatNumComp);

[{
    genre: "CHOIR",
    files: ["CHOIR - Carl Orff - Carmina Burana O Fortune.wav", "CHOIR - Thomas Tallis - Spem in Alium.wav", "CHOIR - Alleluia - University of Utah Singers.wav"],
    artist: ["Carl Orff", "Thomas Tallis.wav", "University of Utah Singers"],
    song: ["Carmina Burana O Fortune", "Spem in Alium", "Alleluia"]
},
{
    genre: "CLASSIC",
    files: ["CLASSIC - Beethoven - Fur Elise.wav", "CLASSIC - Mozart - Eine Kleine Nachtmusik.wav", "CLASSIC - Beethoven - Moonlight Sonata.wav"],
    artist: ["Beethoven", "Mozart", "Beethoven"],
    song: ["Fur Elise", "Eine kleine Nachtmusik", "Moonlight Sonata"]
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
    genre: "POP",
    files: ["POP - Abba - Dancing Queen.wav", "POP - The Weeknd - Blinding Lights.wav", "POP - Ed Sheeran - Shape of You.wav"],
    artist: ["Abba", "The Weeknd", "Ed Sheeran"],
    song: ["Dancing Queen", "Blinding Lights", "Shape of You"]
},
{
    genre: "ROCK",
    files: ["ROCK - AC_DC - Highway to Hell.wav", "ROCK - Joan Jett - I Love Rock 'n' Roll.wav", "ROCK - Nirvana - Smells Like Teen Spirit.wav"],
    artist: ["AC/DC", "Joan Jett", "Nirvana"],
    song: ["Highway to Hell", "I love Rock 'n' Roll", "Smells Like Teen Spirit"]
},
{
    genre: "HARDSTYLE",
    files: ["HARDSTYLE - Wildstylez Feat. Niels Geusebroek - Year Of Summer.wav", "HARDSTYLE - Jebroer - Kind van de Duivel.wav", "HARDSTYLE - Ran-D - Zombie.wav"],
    artist: ["Wildstylez Feat. Niels Geusebroek", "Jebroer", "Ran-D"],
    song: ["Year Of Summer", "Kind van de Duivel", "Zombie"]
}]