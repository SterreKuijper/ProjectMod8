#include <FastLED.h>
#include "patterns.h"
#include "commands.h"

#define NUM_LEDS 4     /* The amount of pixels/leds you have */
#define DATA_PIN_LEFT 12    /* The pin your data line is connected to */
#define DATA_PIN_RIGHT 16    /* The pin your data line is connected to */
#define LED_TYPE WS2812B /* I assume you have WS2812B leds, if not just change it to whatever you have */
#define BRIGHTNESS 255   /* Control the brightness of your leds */
#define SATURATION 255   /* Control the saturation of your leds */
#define MAX_QUEUE_LENGTH 10

#include <WiFi.h>

CRGB leds_left[NUM_LEDS];
CRGB leds_right[NUM_LEDS];

const char* ssid     = "asdf";
const char* password = "asdfasdf";
const char* host = "192.168.137.1";    //host of Hylke
const int port = 8080;                

byte* patternQueue[MAX_QUEUE_LENGTH];
int patternLengths[MAX_QUEUE_LENGTH];
int currentFrame = 0;
unsigned long lastFrameTime = 0;
bool loopFirstInQueue = false;

int delayTime = 15;

int rainbowCounter = 0;
int rainbowDelay = delayTime;
unsigned long rainbowTime = 0;
WiFiClient client;

void setup() {
  FastLED.addLeds<LED_TYPE, DATA_PIN_LEFT, GRB>(leds_left, NUM_LEDS);
  FastLED.addLeds<LED_TYPE, DATA_PIN_RIGHT, GRB>(leds_right, NUM_LEDS);
  FastLED.setBrightness(255);
  Serial.begin(9600);
}

void loop() {
  if(WiFi.status() != WL_CONNECTED) {
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
      //check if the loading animation is already queued, if not, queue them.
      if(patternQueue[0] != connectingSequence) {
        clearQueue();
        delayTime = 100;
        queuePattern(connectingSequence, CONNECT_LENGTH);
      }

      //play the loading animation asynchronously so we don't end up wasting time playing the animation
      showPatternAsync();
    }

    //we got connected, empty the queue
    clearQueue();

    //show an animation that shows that connection succeeded
    //Pick the green, yellow one for testing of BPM purpose
    queuePattern(flashYellow, FLASH_YELLOW_LENGTH);
    loopFirstInQueue = true;
  }
  
  if(!client.connected()) {
    //as client.connect() blocks execution of other code, do a little animation indicating that we're trying to connect
    showPatternBlocking(tcpConnectingSequence, 50, TCP_CONNECTING_LENGTH - 24);
    showPatternBlocking(tcpConnectingSequence, 100, TCP_CONNECTING_LENGTH);
    if (!client.connect(host, port)) {
      showPatternBlocking(tcpConnectionFailed, 200, TCP_FAILED_LENGTH);
      return;
    }
    delayTime = 100;
    queuePattern(connectedSequence, CONNECTED_LENGTH);
  }

    
  while(client.available()) {   
    Serial.print(delayTime);
    
    char prefix = client.read();
    if(prefix == 'C') {
      //it is addressed to color, check the requested command
      int command = client.readStringUntil('\r').toInt();
      switch(command) {
        case COMMAND_FLASH_RED:
          queuePattern(flashRed, FLASH_RED_LENGTH);
          loopFirstInQueue = true;
          break;
        case COMMAND_FLASH_ORANGE:
          queuePattern(flashOrange, FLASH_ORANGE_LENGTH);
          loopFirstInQueue = true;
          break;  
        case COMMAND_FLASH_YELLOW:
          queuePattern(flashYellow, FLASH_YELLOW_LENGTH);
          loopFirstInQueue = true;
          break;
        case COMMAND_FLASH_GREEN:
          queuePattern(flashGreen, FLASH_GREEN_LENGTH);
          loopFirstInQueue = true;
          break;    
        case COMMAND_CLEAR_QUEUE:
          clearQueue();
          break;
      }
    }
    
    /*depending on the song we change the delaytime*/
    if(prefix == 'S') {
      //it is addressed to song, check the requested command
      int song = client.readStringUntil('\r').toInt();
      switch(song) {
        case 1:
          delayTime = 857;   /*CHOIR - Alleluia - University of Utah Singers – 70 bpm a*/
          break;  
        case 2:
          delayTime = 857;   /*Carl Orff - Carmina Burana O Fortune */
          break; 
        case 3:
          delayTime = 811;   /*Thomas Tallis - Spem in Alium*/
          break;     
        case 4:
          delayTime = 513;  /*Nirvana - Smells Like Teen Spirit*/
          break;  
        case 5:
          delayTime = 517;   /*AC_DC - Highway to Hell*/
          break;  
        case 6:
          delayTime = 632;   /*Joan Jett - I Love Rock 'n' Roll */
          break;      
        case 7:
          delayTime = 441;  /*Fur Elise*/
          break; 
        case 8:
          delayTime = 870;   /*Beethoven - Moonlight Sonata*/
          break; 
        case 9:
          delayTime = 469;   /*Mozart - Eine Kleine Nachtmusik – */
          break; 
        case 10:
          delayTime = 240;   /*Acraze – Do it to it */
          break;
        case 11:
          delayTime = 480;   /*DJ Fresh - Gold Dust (Fox Stevenson Remix)*/
          break;
        case 12:
          delayTime = 480;   /*Shouse - Love Tonight */
          break;
        case 13:
          delayTime = 480;   /*Eminem - 'Till I Collapse */
          break;
        case 14:
          delayTime = 480;   /*2Pac - Hit Em Up*/
          break;
        case 15:
          delayTime = 480;  /*Dr Dre Ft. Snoop Dogg - Still D.R.E */
          break;
        case 16:
          delayTime = 549;   /*ABBA - dancing queen*/
          break;
        case 17:
          delayTime = 625;   /*Ed Sheeran - Shape of you*/
          break;
        case 18:
          delayTime = 702;   /*The Weeknd - Blinding Lights */
          break;
        case 19:
          delayTime = 769;   /*Jebroer - Kind van de Duivel */
          break;
        case 20:
          delayTime = 387;   /*Ran-D – Zombie*/
          break;
        case 21:
          delayTime = 400;   /*Wildstylez Feat. Niels Geusebroek - Year Of Summer  */
          break;                           
      }
    }
  }

  if(patternQueue[0] == NULL) {
    rainbowFull();
  }else{
    showPatternAsync();
  }
    
}

void queuePattern(byte pattern[], int patternLength) {
  for(int i = 0; i < MAX_QUEUE_LENGTH; i++) {
    if(patternQueue[i] == NULL) {
      patternQueue[i] = pattern;
      patternLengths[i] = patternLength;
      return;
    }
  }
}

void setRowToColor(CRGB leds[], CRGB color) {
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i] = color;
  }
}

void setAllToColor(CRGB color) {
  setRowToColor(leds_left, color);
  setRowToColor(leds_right, color);
}

void showPatternBlocking(byte pattern[], int stepDelay, int patternLength) {
  for(int i = 0; i < patternLength / 24; i++) {
    for(int j = 0; j < 8; j++) {
      CRGB color = {pattern[i * 24 + j * 3], pattern[i * 24 + j * 3 + 1], pattern[i * 24 + j * 3 + 2]}; 
      if(j < 4) { 
        leds_left[j] = color;
      }else{
        leds_right[j - 4] = color;
      }
    }
    FastLED.show();
    delay(stepDelay);
  }
}

void showPatternAsync() {
  int patternLength = patternLengths[0];
  byte* pattern = patternQueue[0];
  
  if(pattern != NULL && millis() - lastFrameTime >= delayTime && currentFrame < patternLength / 24) {
    //play out a frame of the animation
    for(int j = 0; j < 8; j++) {
      CRGB color = {pattern[currentFrame * 24 + j * 3], pattern[currentFrame * 24 + j * 3 + 1], pattern[currentFrame * 24 + j * 3 + 2]}; 
      if(j < 4) { 
        leds_left[j] = color;
      }else{
        leds_right[j - 4] = color;
      }
    }
    currentFrame++;
    lastFrameTime = millis();
    FastLED.show();
  }else if(currentFrame == patternLength / 24) {
    //animation finished

    currentFrame = 0;
    lastFrameTime = 0;
    if(!loopFirstInQueue) {
      for(int i = 0; i < MAX_QUEUE_LENGTH - 1; i++) {
        patternQueue[i] = patternQueue[i + 1];
        patternLengths[i] = patternLengths[i + 1];
      }
      patternQueue[MAX_QUEUE_LENGTH - 1] = NULL;
      patternLengths[MAX_QUEUE_LENGTH - 1] = 0;
    }
  }
}

void rainbowSnake() {
  for (int j = 0; j < 255; j++) {
    setRowToColor(leds_left, CRGB::Black);
    setRowToColor(leds_right, CRGB::Black);
    if(j % 8 < NUM_LEDS) {
      leds_left[j % 4] = CHSV(j, SATURATION, BRIGHTNESS); /* The higher the value 4 the less fade there is and vice versa */;
    }else{
      leds_right[j % 4] = CHSV(j, SATURATION, BRIGHTNESS); /* The higher the value 4 the less fade there is and vice versa */;
    }
    FastLED.show();
    delay(100); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
  }
}

void rainbowFull() {
  if(millis() - rainbowTime >= rainbowDelay) {
    for(int i = 0; i < 8; i++) {
      if(i < 4) {
        leds_left[i] = CHSV(rainbowCounter, SATURATION, BRIGHTNESS); /* The higher the value 4 the less fade there is and vice versa */;
      }else{
        leds_right[i - 4] = CHSV(rainbowCounter, SATURATION, BRIGHTNESS); /* The higher the value 4 the less fade there is and vice versa */;
      }
    }
    FastLED.show();
    rainbowTime = millis(); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
    rainbowCounter++;
    if(rainbowCounter > 255) {
      rainbowCounter = 0;
    }
  }
}

void clearQueue() {
  for(int i = 0; i < MAX_QUEUE_LENGTH; i++) {
    patternQueue[i] = NULL;
  }
}
