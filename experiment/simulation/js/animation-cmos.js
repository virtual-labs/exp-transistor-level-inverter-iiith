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
const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";

const EMPTY = "";
const status = document.getElementById("play-or-pause");
const observ = document.getElementById("observations");
const speed = document.getElementById("speed");

const objects = [
    document.getElementById("input"),
    document.getElementById("output")
];
const textInput = [document.createElementNS(svgns, "text")];
const textOutput = [document.createElementNS(svgns, "text")];
const inputDots = [
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle")
];
const outputDots = [
    document.createElementNS(svgns, "circle")
];

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

//initialise input text
function textIOInit() {
    for (const text of textInput) {
        text.textContent = 2;
    }
}
function outputCoordinates() {
    setCoordinates(646, 391, textOutput[0]);
    svg.append(textOutput[0]);
}

function inputDotsDisappear() {
    for (const inputDot of inputDots) {
        objectDisappear(inputDot);
    }
}
function inputDotsAppear() {
    for (const inputDot of inputDots) {
        objectAppear(inputDot);
    }
}
function outputDotsDisappear() {
    for (const outputDot of outputDots) {
        objectDisappear(outputDot);
    }
}
function outputDotsAppear() {
    for (const outputDot of outputDots) {
        objectAppear(outputDot);
    }
}


// function to disappear the output text
function outputDisappear() {
    for (const text of textOutput) {
        objectDisappear(text);
    }
}
// function to appear the input text
function clearObservation() {
    observ.innerHTML = EMPTY;
}
function allDisappear() {
    inputDotsDisappear();
    outputDotsDisappear();
    objectDisappear(textInput[0]);
    outputDisappear();
    for (const object of objects) {
        fillColor(object, "#008000");
    }
}

function setInputDots() {
    setter("1", inputDots[1]);
    setter("0", inputDots[3]);
}

function setInput() {
    if (timeline.progress() === 0) {
        if (textInput[0].textContent !== "0") {
            changeTo0(143, 393, 0, 0);
        }
        else{
            changeTo1(143, 393, 0, 0);
        }
        setter(textInput[0].textContent, inputDots[0]);
        setter(textInput[0].textContent, inputDots[2]);
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Simulation has finished. Press Reset to start again";
    }
    else {
        observ.innerHTML = "Simulation has started wait for it to end";
    }
}

function changeTo1(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 1;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);

    fillColor(objects[object], "#03b1fc");
    objectAppear(textInput[0]);
    clearObservation();
}

function changeTo0(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 0;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);

    fillColor(objects[object], "#eeeb22");
    objectAppear(textInput[0]);
    clearObservation();
}

function reboot() {
    for (const text of textInput) {
        text.textContent = 2;
    }
}
function display() {
    observ.innerHTML = "Simulation has finished. Press Reset to start again";
}
function setter(value, component) {
    //toggles the text content a of input/output component b
    if (value === "1") {
        unsetColor(component);
    }
    else {
        setColor(component);
    }
}

function setSpeed(speed) {
    if (circuitStarted) {
        timeline.timeScale(parseInt(speed));
        observ.innerHTML = `${speed}x speed`;
    }
}

function restartCircuit() {
    circuitStarted = false;
    timeline.seek(0);
    timeline.pause();
    allDisappear();
    reboot();
    clearObservation();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored";
    speed.selectedIndex = 0;

}

function simulationStatus() {
    if (!decide) {
        startCircuit();
    }
    else {
        stopCircuit();
    }
}
function stopCircuit() {
    if (timeline.progress() !== 1) {
        timeline.pause();
        observ.innerHTML = "Simulation has been Paused.";
        decide = false;
        status.innerHTML = "Start";
    }
    else {
        observ.innerHTML = "Please Restart the simulation";
    }
}
function startCircuit() {
    if (circuitStarted) {
        timeline.play();
        timeline.timeScale(parseInt(speed.value));
        observ.innerHTML = "Simulation has started";
        decide = true;
        status.innerHTML = "Pause";
    }
    else {
        if (textInput[0].textContent !== "2") {
            timeline.play();
            timeline.timeScale(parseInt(speed.value));
            circuitStarted = true;
            observ.innerHTML = "Simulation has started.";
            decide = true;
            status.innerHTML = "Pause";
        }
        else {
            observ.innerHTML = "Please set the value of input to 0 or 1";
        }
    }
}

function initInputDots() {
    //sets the coordinates of the input dots
    for (const inputDot of inputDots) {
        fillInputDots(inputDot, 200, 200, 15, "#FF0000");
        svg.append(inputDot);
    }
}
function initOutputDots() {
    //sets the coordinates of the input dots
    for (const outputDot of outputDots) {
        fillInputDots(outputDot, 200, 200, 15, "#FF0000");
        svg.append(outputDot);
    }
}

function simulator2() {
    if (textInput[0].textContent === "0") {
        setter("1", outputDots[0]);
        timeline.to(outputDots[0], {
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
    else {
        setter("0", outputDots[0]);
        timeline.to(outputDots[0], {
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
    timeline.to(inputDots[0], {
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
    timeline.to(inputDots[1], {
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
    timeline.to(inputDots[2], {
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
    timeline.to(inputDots[3], {
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
}

function outputHandler() {
    if (textInput[0].textContent === "0") {
        textOutput[0].textContent = "1";
    }
    else {
        textOutput[0].textContent = "0";
    }
    objectAppear(textOutput[0]);
    setter(textOutput[0].textContent, objects[1]);
}


//execution starts here
let timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
gsap.registerPlugin(MotionPathPlugin);
demoWidth();
textIOInit();
outputCoordinates();
inputDotsDisappear();
outputDotsDisappear();
initInputDots();
initOutputDots();
outputDisappear();

// calling all the functions that are going to initialise
timeline.add(setInputDots, 0);
timeline.add(inputDotsAppear, 0);
timeline.add(simulator1, 0);
timeline.add(outputDotsAppear, 5);
timeline.add(inputDotsDisappear, 6);
timeline.add(simulator2, 5);
timeline.add(outputDotsDisappear, 9);
timeline.add(outputHandler, 9);
timeline.add(display, 10);
timeline.eventCallback("onComplete", display);
timeline.pause();
inputDotsDisappear();
outputDotsDisappear();
