import { setCoordinates, fillInputDots, objectDisappear, objectAppear, fillColor, setColor, unsetColor } from "./animation-utility.js";
'use strict';

window.simulationStatus = simulationStatus;
window.restartCircuit = restartCircuit;
window.setSpeed = setSpeed;
window.setInput = setInput;
// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");

// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;

// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
const instructionBox = document.getElementsByClassName("instructions-box")[0];
const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";

const EMPTY = "";
const STATUS = document.getElementById("play-or-pause");
const OBSERV = document.getElementById("observations");
const SPEED = document.getElementById("speed");

let currPos = 0;

const OBJECTS = [document.getElementById("input"), document.getElementById("output")];
const TEXTINPUT = [document.createElementNS(svgns, "text")];
const TEXTOUTPUT = [document.createElementNS(svgns, "text")];
const INPUTDOTS = [document.createElementNS(svgns, "circle"), document.createElementNS(svgns, "circle"), document.createElementNS(svgns, "circle"), document.createElementNS(svgns, "circle")];
const OUTPUTDOTS = [document.createElementNS(svgns, "circle")];


let timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
let decide = false;
let circuitStarted = false;

function demoWidth() {
    if (width < 1024) {
        circuitBoard.style.height = "600px";
    } else {
        circuitBoard.style.height = `${windowHeight - circuitBoardTop - 20}px`;
    }
    sidePanels[0].style.height = circuitBoard.style.height;
}
// Instruction box
function instructionBoxInit() {
    instructionBox.addEventListener("click", () => {
        instructionBox.classList.toggle("expand");
    });
}

//initialise input text
function textIOInit() {
    for (const text of TEXTINPUT) {
        text.textContent = 2;
    }
}
function outputCoordinates() {
    setCoordinates(696,406,TEXTOUTPUT[0]);
    svg.append(TEXTOUTPUT[0]);
}

function inputDotsDisappear() {
    for (const inputDot of INPUTDOTS) {
        objectDisappear(inputDot);
    }
}
function inputDotsAppear() {
    for (const inputDot of INPUTDOTS) {
        objectAppear(inputDot);
    }
}
function outputDotsDisappear(){
    for (const outputDot of OUTPUTDOTS) {
        objectDisappear(outputDot);
    }   
}
function outputDotsAppear(){
    for (const outputDot of OUTPUTDOTS) {
        objectAppear(outputDot);
    }   
}


// function to disappear the output text
function outputDisappear() {
    for (const text of TEXTOUTPUT) {
        objectDisappear(text);
    }
}
// function to appear the input text
function clearObservation() {
    OBSERV.innerHTML = EMPTY;
}
function allDisappear() {
    inputDotsDisappear();
    outputDotsDisappear();
    objectDisappear(TEXTINPUT[0]);
    outputDisappear();
    for (const object of OBJECTS) {
        fillColor(object, "#008000");
    }
}

function setInputDots(){
    setter("1",INPUTDOTS[1]);
    setter("0",INPUTDOTS[2]);
    setter("0",INPUTDOTS[3]);
}

function setInput() {
    if (TEXTINPUT[0].textContent !== "0" && timeline.progress() === 0) {
        changeTo0(25, 545, 0, 0);
    }
    else if (TEXTINPUT[0].textContent !== "1" && timeline.progress() === 0) {
        changeTo1(25, 545, 0, 0);
    }
    setter(TEXTINPUT[0].textContent,INPUTDOTS[0]);
}

function changeTo1(coordinateX, coordinateY, object, textObject) {
    TEXTINPUT[textObject].textContent = 1;
    svg.appendChild(TEXTINPUT[textObject]);
    setCoordinates(coordinateX, coordinateY, TEXTINPUT[textObject]);

    fillColor(OBJECTS[object], "#29e");
    objectAppear(TEXTINPUT[0])
    clearObservation();
}

function changeTo0(coordinateX, coordinateY, object, textObject) {
    TEXTINPUT[textObject].textContent = 0;
    svg.appendChild(TEXTINPUT[textObject]);
    setCoordinates(coordinateX, coordinateY, TEXTINPUT[textObject]);

    fillColor(OBJECTS[object], "#eeeb22");
    objectAppear(TEXTINPUT[0])
    clearObservation();
}

function reboot() {
    for (const text of TEXTINPUT) {
        text.textContent = 2;
    }
}
function display() {
    OBSERV.innerHTML = "Simulation has finished. Press Reset to start again";
}
function setter(value, component) {
    //toggles the text content a of input/output component b
    if (value === "1") {
        unsetColor(component);
    }
    else if (value === "0") {
        setColor(component);
    }
}


function changeSpeed(newSpeed) {
    if (TEXTINPUT[0].textContent !== "2" && timeline.progress() !== 1) {
        timeline.resume();
        timeline.timeScale(newSpeed);
        OBSERV.innerHTML = newSpeed + "x speed";
        decide = true;
        STATUS.innerHTML = "Pause";
    }
}
function setSpeed(speed) {
    if (circuitStarted) {
        if (speed === "1") {
            changeSpeed(1);
        }
        else if (speed === "2") {
            changeSpeed(2);
        }
        else if (speed === "4") {
            changeSpeed(4);
        }
    }
}
function restartCircuit() {
    if (!circuitStarted) {
        circuitStarted = true;
    }

    timeline.seek(0);
    timeline.pause();
    allDisappear();
    reboot();
    clearObservation();
    decide = false;
    STATUS.innerHTML = "Start";
    OBSERV.innerHTML = "Successfully restored";
    SPEED.selectedIndex = 0;

}

function simulationStatus() {
    if (!decide) {
        startCircuit();
    }
    else if (decide) {
        stopCircuit();
    }
}
function stopCircuit() {
    if (timeline.time() !== 0 && timeline.progress() !== 1) {
        timeline.pause();
        OBSERV.innerHTML = "Simulation has been stopped.";
        decide = false;
        STATUS.innerHTML = "Start";
        SPEED.selectedIndex = 0;
    }
    else if (timeline.progress() === 1) {
        OBSERV.innerHTML = "Please Restart the simulation";
    }
}
function startCircuit() {
    if (!circuitStarted) {
        circuitStarted = true;
    }
    if (TEXTINPUT[0].textContent !== "2") {
        timeline.play();
        timeline.timeScale(1);
        OBSERV.innerHTML = "Simulation has started.";
        decide = true;
        STATUS.innerHTML = "Pause";
        SPEED.selectedIndex = 0;
    }
    else {
        OBSERV.innerHTML = "Please set the value of input to 0 or 1";
    }
    if (timeline.progress() === 1) {
        OBSERV.innerHTML = "Please Restart the simulation";
    }
}

function inputDots() {
    //sets the coordinates of the input dots
    for (const inputDot of INPUTDOTS) {
        fillInputDots(inputDot, 200, 200, 15, "#FF0000");
        svg.append(inputDot);
    }
}
function outputDots() {
    //sets the coordinates of the input dots
    for (const outputDot of OUTPUTDOTS) {
        fillInputDots(outputDot, 200, 200, 15, "#FF0000");
        svg.append(outputDot);
    }
}

function simulator2(){
    if(TEXTINPUT[0].textContent === "0"){
        setter("1",OUTPUTDOTS[0]);
        timeline.to(OUTPUTDOTS[0], {
            motionPath: {
                path: "#path3",
                align: "#path3",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },
    
            duration: 4,
            delay: 5,
            repeat: 0,
            repeatDelay: 3,
            yoyo: true,
            ease: "none",
            paused: false,
    
        }, 0);
    }
    else{
        setter("0",OUTPUTDOTS[0]);
        timeline.to(OUTPUTDOTS[0], {
            motionPath: {
                path: "#path4",
                align: "#path4",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },
    
            duration: 4,
            delay: 5,
            repeat: 0,
            repeatDelay: 3,
            yoyo: true,
            ease: "none",
            paused: false,
    
        }, 0);
    }
}


function simulator1() {
    timeline.to(INPUTDOTS[0], {
        motionPath: {
            path: "#path6",
            align: "#path6",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 4,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(INPUTDOTS[1], {
        motionPath: {
            path: "#path1",
            align: "#path1",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 4,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(INPUTDOTS[2], {
        motionPath: {
            path: "#path2",
            align: "#path2",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 4,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(INPUTDOTS[3], {
        motionPath: {
            path: "#path5",
            align: "#path5",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 4,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
}

function outputHandler(){
    if(TEXTINPUT[0].textContent === "0"){
        TEXTOUTPUT[0].textContent = "1";
    }
    else{
        TEXTOUTPUT[0].textContent = "0";
    }
    objectAppear(TEXTOUTPUT[0]);
    setter(TEXTOUTPUT[0].textContent,OBJECTS[1]);
}


//execution starts here
gsap.registerPlugin(MotionPathPlugin);
demoWidth();
instructionBoxInit();
textIOInit();
outputCoordinates();
inputDotsDisappear();
outputDotsDisappear();
inputDots();
outputDots();
outputDisappear();

// calling all the functions that are going to initialise
timeline.add(setInputDots,0);
timeline.add(inputDotsAppear,0);
timeline.add(simulator1,0);
timeline.add(inputDotsDisappear,5);
timeline.add(outputDotsAppear,5);
timeline.add(simulator2,5);
timeline.add(outputDotsDisappear,9);
timeline.add(outputHandler,9);
timeline.add()
timeline.add(display, 10);
timeline.eventCallback("onComplete", display);
timeline.pause();
inputDotsDisappear();
outputDotsDisappear();
