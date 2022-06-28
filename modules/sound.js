//setup speaker
var speakerVol = 120; //volume in decibel (dB)
var distToSpeaker = 16; //distance to speaker in meters
var speakerVolMult = -8.656; //speaker multiplier
//var speakerVolComp = 11.9997639898537755 //Compensation value in dB given start dist is 4m
var speakerVolComp = 23.99952797970755; //9898537755 //Compensation value in dB given start dist is 16m
var floatNumComp = 5390; //extra time to run the programm the correct amount of times in milliseconds

//setup  run program
var runTime = 120000; // the time that the program should run in milli seconds
var runIntervalTime = 250; //time before the next time the loop function should run in milliseconds

//set safety criterium: we say that 8 hours of 80dB is safe given that the exchange rate is 3dB
var critSndDur = 8; //time in hours
var critSndLvl = 80; //volume in decibel (dB)
var exchangeRate = 10 //Exchange rate paremeter which is the result of 

//calculated values
var weightedSndLvl;
var sndDose = 0; //begins at zero

//set sound dose thresholds
var maxSndDose = 1000000; //maximum sound dose you could receive
var safeSndDose = 100; //safe daily sound dose
var hearingDamage = 0;  //Damage to the ear



function loop(){

    calcWeightedSndLvl(speakerVol, distToSpeaker);
    calcSndDose();

    if (sndDose <= 100) console.log(sndDose);
    else {
        calcHearingDamage(sndDose);
        console.log("Your hearing damage is:" + hearingDamage +"%" );
    }

    if (sndDose > maxSndDose) console.log("ERROR: Sound Dose went over Maximum");

}

function calcWeightedSndLvl(speakerVol, distToSpeaker){
    weightedSndLvl = speakerVolMult * Math.log(distToSpeaker) + speakerVol + speakerVolComp;
    console.log("weightedSndLvl = " + weightedSndLvl);
} 

function calcSndDose(){
    //passedTime = calcPassedTime();
    //sndDose = (100/critSndDur)*passedTime*10**((weightedSndLvl-critSndLvl)/exchangeRate);
    let timeInterval = 1/60;
    sndDose += (100/critSndDur)*timeInterval*10**((weightedSndLvl-critSndLvl)/exchangeRate);
    console.log("soundDose = " + sndDose);
} 

function calcHearingDamage(){
    hearingDamage = (sndDose-safeSndDose)/(maxSndDose-safeSndDose)*100;
}

function getSndDose(){
    return sndDose;
}

// function calcPassedTime(){
//     let passedTime = 8;
//     return passedTime;
// }

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