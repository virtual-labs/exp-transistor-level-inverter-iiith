'use strict'
import {compOutput, compInput0} from './integrate.js'
import { jsplumbInstance } from './components.js';
//Creating js map to store connections
export const connectionMap = new Map();
// these arrays are used to store various components
export const listPmos = [];
export const listNmos = [];
export const listInput = [];
export const listOutput = [];
export const listGround = [];
export const listVdd = [];
export const listInverter = [];

// Disable right click 
const container = document.getElementById("diagram");
container.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Tab selection
export const currentTab = { CMOS: 0, PNMOS: 1 }
export let selectedTab = currentTab.CMOS
const tabs = document.querySelectorAll('.v-tabs li');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'));
        tab.classList.add('is-active');
        let parent = tab.parentNode;
        selectedTab = Array.prototype.indexOf.call(parent.children, tab);
        refreshWorkingArea();
    })
})

window.refreshWorkingArea = refreshWorkingArea;

export function refreshWorkingArea() {
    console.log("selectedTab: " + selectedTab);
    jsplumbInstance.reset();
    connectionMap.clear();
    for(const pmosElem of listPmos) {
        let elem = document.getElementById(pmosElem.id);
        elem.parentNode.removeChild(elem);
    }
    for(const nmosElem of listNmos) {
        let elem = document.getElementById(nmosElem.id);
        elem.parentNode.removeChild(elem);
    }
    for(const groundElem of listGround) {
        let elem = document.getElementById(groundElem.id);
        elem.parentNode.removeChild(elem);
    }
    for(const vddElem of listVdd) {
        let elem = document.getElementById(vddElem.id);
        elem.parentNode.removeChild(elem);
    }
    for(const inputElem of listInput) {
        let elem = document.getElementById(inputElem.id);
        elem.parentNode.removeChild(elem);
    }
    for(const outputElem of listOutput) {
        let elem = document.getElementById(outputElem.id);
        elem.parentNode.removeChild(elem);
    }
    window.count = { PMOS: 0, NMOS: 0, VDD: 0, Ground: 0, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
    window.maxCount = { PMOS: 1, NMOS: 1, VDD: 1, Ground: 2, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
    listPmos.length = 0;
    listNmos.length = 0;
    listGround.length = 0;
    listVdd.length = 0;
    listInput.length = 0;
    listOutput.length = 0;
    compInput0();
    compOutput();
    document.getElementById("error-container").innerHTML = "";
}

// refreshWorkingArea();
compInput0();
compOutput();