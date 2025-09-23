'use strict';
import { listPmos, listNmos, listInput, listOutput, listGround, listVdd, selectedTab, currentTab } from './main.js';
import { jsplumbInstance, addInstanceFinalInput, addInstanceFinalOutput } from './components.js';
import { addInstanceGround, addInstanceVdd, addInstancePmos, addInstanceNmos, addInstance} from './components.js';
import { checkAndUpdate } from './circuit.js';
import { modifyOutput, circuitValid, showTruthTable, showTruthTableBuffer } from './not.js';

let count = { PMOS: 0, NMOS: 0, VDD: 0, Ground: 0, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
let maxCount = { PMOS: 1, NMOS: 1, VDD: 1, Ground: 2, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };

window.compPmos = compPmos;
window.compNmos = compNmos;
window.compVdd = compVdd;
window.compGround = compGround;
window.notValid = notValid;

const contextMenu = document.getElementById("contextMenu");
const deleteOption = document.getElementById("deleteOption");
const cancelOption = document.getElementById("cancelOption");
document.addEventListener("click", function() {
    contextMenu.style.display = "none";
});

export function resetCounts() {
    count = { PMOS: 0, NMOS: 0, VDD: 0, Ground: 0, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
    if (selectedTab === currentTab.CMOS) {
        maxCount = { PMOS: 1, NMOS: 1, VDD: 1, Ground: 1, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
    } else if (selectedTab === currentTab.PNMOS) {
        maxCount = { PMOS: 1, NMOS: 1, VDD: 1, Ground: 2, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
    } else {
        maxCount = { PMOS: 2, NMOS: 2, VDD: 1, Ground: 1, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
    }
}

export function notValid() {
    checkAndUpdate();
    modifyOutput();
    circuitValid();
    if (selectedTab === currentTab.BUFFER)
        showTruthTableBuffer();
    else
        showTruthTable();
    document.getElementById('error-container').innerHTML = "";
}

function printExcessComponents() {
    const result = document.getElementById("error-container");
    result.innerHTML = "Required no. of components of this type are already present in the workspace";
    result.className = "text-danger";
}

function menu(id, event,type) {
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.display = "block";
    
    deleteOption.removeEventListener("click", deleteEventHandler);
    deleteOption.addEventListener("click", deleteEventHandler);
    
    function deleteEventHandler(event) {
        event.preventDefault();
        const connections = jsplumbInstance.getAllConnections();
        // console.log("+++++++++++");
        // console.log(connections);
    connections.forEach(connection => {
        if (connection.sourceId === id || connection.targetId === id) {
            jsplumbInstance.deleteConnection(connection);
        }
    });
        const element = document.getElementById(id);
        // console.log("type ",count[type]);
        if (element) {
            hideEndpoints(id); // Hide all endpoints
            element.style.display = 'none'; // Hide the element
            maxCount[type] += 1;
            count[type] -= 1;
        }
        // console.log("type ",count[type]);
        contextMenu.style.display = "none";
    }
}

function hideEndpoints(id) {
    const endpoints = jsplumbInstance.getEndpoints(id);
  
    if (endpoints) {
        endpoints.forEach(endpoint => {
        endpoint.canvas.style.visibility = 'hidden';
        });
    }
}
function showEndpoints(id) {
    const endpoints = jsplumbInstance.getEndpoints(id);
    if (endpoints) {
        endpoints.forEach(endpoint => {
            
            endpoint.canvas.style.visibility = 'visible';
        });
    }
}

export function compPmos() {
    console.log("after ",count.PMOS);
    console.log("after ",maxCount.PMOS);
    maxCount.PMOS -= 1;
    if (maxCount.PMOS < 0) {
        printExcessComponents();
        return;
    }
    const id = "pmos" + count.PMOS;
    count.PMOS += 1;
    const container = document.getElementById("diagram");

    let svgElement = document.getElementById(id);
    if (!svgElement) {
        svgElement = document.createElement('div');
        svgElement.innerHTML = `
            <svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -0.5 84 84">
                <g class="demo-transistor">
                    <path d="M 31 61 L 31 21"/>
                    <path d="M 41 61 L 41 21"/>
                    <path d="M 41 31 L 61 31 L 61 1"/>
                    <path d="M 61 81 L 61 51 L 41 51"/>
                    <path d="M 1 41 L 17.67 41"/>
                    <ellipse cx="23.02" cy="40.11" rx="5.357142857142858" ry="5.357142857142858"/>
                </g>
            </svg>`;
        svgElement.id = id;
        svgElement.className = 'component';
        svgElement.midTerminal = 1;
        svgElement.outTerminal = 1;
        svgElement.voltage = 0;
        svgElement.outVoltage = 0;
        
        container.insertAdjacentElement("afterbegin", svgElement);
        jsplumbInstance.draggable(id, { containment: true });

        svgElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            menu(id,event,'PMOS');
        });
        const divPushed = { id, voltage: 0, midTerminal: 1, outTerminal: 1, outVoltage: 0 };
        listPmos.push(divPushed);
    } else {
        svgElement.style.display = 'block'; // Show the element if it was previously hidden
        showEndpoints(id); // Show the endpoints
    }


    addInstancePmos(id);
}


export function compNmos() {
    console.log("after ",count.NMOS);
    console.log("after ",maxCount.NMOS);
    maxCount.NMOS -= 1;
    if (maxCount.NMOS < 0) {
        printExcessComponents();
        return;
    }

    const id = "nmos" + count.NMOS;
    count.NMOS += 1;
    const container = document.getElementById("diagram");
    let svgElement = document.getElementById(id);
    if (!svgElement) {
    svgElement = document.createElement('div');
    svgElement.innerHTML = `
        <svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -0.5 84 84">
            <g class="demo-transistor">
                <path d="M 31 61 L 31 21"/>
                <path d="M 41 61 L 41 21"/>
                <path d="M 41 31 L 61 31 L 61 1"/>
                <path d="M 61 81 L 61 51 L 41 51"/>
                <path d="M 1 41 L 31 41"/>
            </g>
        </svg>`;
    svgElement.id = id;
    svgElement.className = 'component';
    svgElement.voltage = 0;
    svgElement.midTerminal = 1;
    svgElement.outTerminal = 1;
    svgElement.outVoltage = 0;

    
    
    container.insertAdjacentElement("afterbegin", svgElement);
    jsplumbInstance.draggable(id, { "containment": true });
    svgElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        menu(id,event,'NMOS');
    });
    
    const divPushed = { id, voltage: 0, midTerminal: 1, outTerminal: 1, outVoltage: 0 };
    listNmos.push(divPushed);
} else {
    svgElement.style.display = 'block'; // Show the element if it was previously hidden
    showEndpoints(id); // Show the endpoints
}
addInstanceNmos(id);
}

export function compVdd() {
    maxCount.VDD -= 1;
    if (maxCount.VDD < 0) {
        printExcessComponents();
        return;
    }

    const id = "vdd" + count.VDD;
    count.VDD += 1;
    const container = document.getElementById("diagram");
    let svgElement = document.getElementById(id);
    if (!svgElement) {
    svgElement = document.createElement('div');
    svgElement.innerHTML = `
        <svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -6 44 34" >
            <g class="demo-transistor">
                <path d="M 21 31 L 21 1 L 1 1 L 41 1"/>
            </g>
        </svg>`;
    svgElement.id = id;
    svgElement.className = 'component';
    svgElement.voltage = 1;

    
    
    
    container.insertAdjacentElement("afterbegin", svgElement);
    jsplumbInstance.draggable(id, { "containment": true });
    svgElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        menu(id,event,'VDD');
    });
    
    const divPushed = { id, voltage: 1 };
        listVdd.push(divPushed);
    
} else {
    svgElement.style.display = 'block'; // Show the element if it was previously hidden
    showEndpoints(id); // Show the endpoints
}
    addInstanceVdd(id);
}

export function compGround() {
   
    maxCount.Ground -= 1;
    if (maxCount.Ground < 0) {
        printExcessComponents();
        return;
    }

    const id = "ground" + count.Ground;
    count.Ground += 1;
    const container = document.getElementById("diagram");

    let svgElement = document.getElementById(id);
    if (!svgElement) {
    svgElement = document.createElement('div');
    svgElement.innerHTML = `
        <svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 8 64 44" >
            <g class="demo-transistor">
                <path d="M 31 1 L 31 21 L 1 21 L 61 21"/>
                <path d="M 11 31 L 51 31"/>
                <path d="M 21 41 L 41 41"/>
            </g>
        </svg>`;
    svgElement.id = id;
    svgElement.className = 'component';
    svgElement.voltage = 0;

    container.insertAdjacentElement("afterbegin", svgElement);
    jsplumbInstance.draggable(id, { "containment": true });
    svgElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        menu(id,event,'Ground');
    });
    
    const divPushed = { id, voltage: 0 };
        listGround.push(divPushed);
} else {
    svgElement.style.display = 'block'; // Show the element if it was previously hidden
    showEndpoints(id); // Show the endpoints
}
    addInstanceGround(id);
}

export function compInput0() {
    const id = "input0";
    const container = document.getElementById("diagram");

    const svgElement = document.createElement('div');
    svgElement.innerHTML = 'Input 1<br>1';
    svgElement.id = id;
    svgElement.className = 'io-component';
    svgElement.style.top = "1.25rem";
    svgElement.style.left = "0.625rem";
    svgElement.classList.add("high");

    svgElement.addEventListener("dblclick", () => {
        const divInput0 = document.getElementById("input0");
        if (divInput0.classList.contains("high")) {
            divInput0.classList.remove("high");
            divInput0.classList.add("low");
            divInput0.innerHTML = 'Input 1<br>0';
            listInput[0].input = 0;
        } else {
            divInput0.classList.remove("low");
            divInput0.classList.add("high");
            divInput0.innerHTML = 'Input 1<br>1';
            listInput[0].input = 1;
        }
    });
    
    const divPushed = { id, input: 1, voltage: 5 };

    container.insertAdjacentElement("afterbegin", svgElement);
    jsplumbInstance.draggable(id, { "containment": true });

    listInput.push(divPushed);
    addInstanceFinalInput(id);
}

export function compOutput() {
    const id = "output0";
    const container = document.getElementById("diagram");

    const svgElement = document.createElement('div');
    svgElement.innerHTML = 'Output<br>-';
    svgElement.id = id;
    svgElement.className = 'io-component';
    svgElement.style.top = "1.25rem";
    svgElement.style.right = "0.625rem";
    svgElement.outputsign = 1;
    svgElement.voltage = 0;

    const divPushed = { id, voltage: 0, outputsign: 1 };   

    container.insertAdjacentElement("afterbegin", svgElement);
    jsplumbInstance.draggable(id, { "containment": true });

    listOutput.push(divPushed);
    addInstanceFinalOutput(id);
}
