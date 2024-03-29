'use strict';
import { compOutput, compInput0,resetCounts } from './integrate.js';
import { jsplumbInstance, editConnectionMap } from './components.js';
//Creating js map to store connections
export const connectionMap = new Map();
// these arrays are used to store various components
export let listPmos = [];
export let listNmos = [];
export let listInput = [];
export let listOutput = [];
export let listGround = [];
export let listVdd = [];
export let listInverter = [];

const EMPTY = "";

// Disable right click 
const container = document.getElementById("diagram");
container.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Tab selection
export const currentTab = { CMOS: 0, PNMOS: 1 };
export let selectedTab = currentTab.CMOS;
const tabs = document.querySelectorAll('.v-tabs li');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'));
        tab.classList.add('is-active');
        let parent = tab.parentNode;
        selectedTab = Array.prototype.indexOf.call(parent.children, tab);
        refreshWorkingArea();
    });
});

window.refreshWorkingArea = refreshWorkingArea;

function emptyList() {
    for (const pmosElem of listPmos) {
        let elem = document.getElementById(pmosElem.id);
        elem.parentNode.removeChild(elem);
    }
    for (const nmosElem of listNmos) {
        let elem = document.getElementById(nmosElem.id);
        elem.parentNode.removeChild(elem);
    }
    for (const groundElem of listGround) {
        let elem = document.getElementById(groundElem.id);
        elem.parentNode.removeChild(elem);
    }
    for (const vddElem of listVdd) {
        let elem = document.getElementById(vddElem.id);
        elem.parentNode.removeChild(elem);
    }
    for (const inputElem of listInput) {
        let elem = document.getElementById(inputElem.id);
        elem.parentNode.removeChild(elem);
    }
    for (const outputElem of listOutput) {
        let elem = document.getElementById(outputElem.id);
        elem.parentNode.removeChild(elem);
    }
    listPmos = [];
    listNmos = [];
    listInput = [];
    listOutput = [];
    listGround = [];
    listVdd = [];
}

function refreshObservations() {
    // refresh the errors
    document.getElementById("error-container").innerHTML = EMPTY;
    // refresh the output table
    document.getElementById("table-body").innerHTML = EMPTY;
    document.getElementById("table-head").innerHTML = EMPTY;
    // refresh result
    document.getElementById("output-box").innerHTML = EMPTY;
}

export function refreshWorkingArea() {
    // to reset the working area
    jsplumbInstance.deleteEveryEndpoint();
    editConnectionMap();

    // to remove all the svgs called in the working area
    emptyList();

    resetCounts();

    compInput0();
    compOutput();

    refreshObservations();
}

refreshWorkingArea();