'use strict';
import { connectionMap, listInput, selectedTab, currentTab } from './main.js';
import { checkAndUpdate, getTruthValue } from './circuit.js';


export function showTruthTable() {
    const output = [];
    const tableBody = document.getElementById("table-body");
    const divInput0 = document.getElementById("input0");
    if (divInput0.classList.contains("high") && !divInput0.classList.contains("low")) {
        output[1] = getTruthValue();
        listInput[0].input = 0;
        checkAndUpdate();
        output[0] = getTruthValue();
        listInput[0].input = 1;
        checkAndUpdate();
    }
    if (!divInput0.classList.contains("high") && divInput0.classList.contains("low")) {
        output[0] = getTruthValue();
        listInput[0].input = 1;
        checkAndUpdate();
        output[1] = getTruthValue();
        listInput[0].input = 0;
        checkAndUpdate();
    }
    let head =  `<tr>
    <th colspan="1">Inputs</th>
    <th colspan="1">Expected Output</th>
    <th colspan="1">Observed Output</th>
</tr>`;
    document.getElementById("table-head").innerHTML = head;
    tableBody.innerHTML = `<tr><td>0</td><td>1</td><td>${output[0]}</td></tr><tr><td>1</td><td>0</td><td>${output[1]} </td></tr>`;
}

export function modifyOutput() {
    const divOutput0 = document.getElementById("output0");
    divOutput0.innerHTML = 'Output<br>' + getTruthValue();
}

export function permutator(inputArr) {
    const results = [];

    function permute(arr, memo) {
        let currentCase;

        memo = memo || [];

        for (let i = 0; i < arr.length; i++) {
            currentCase = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(currentCase));
            }
            permute(arr.slice(), memo.concat(currentCase));
            arr.splice(i, 0, currentCase[0]);
        }
        return results;
    }

    return permute(inputArr);
}

export function checkConnectionNmos(perm) {
    return connectionMap.has("vdd0$pmos0")
    && connectionMap.has("ground" + perm[0] + "$pmos0")
    && connectionMap.has("pmos0$output0")
    && connectionMap.has("input0$nmos0")
    && connectionMap.has("nmos0$output0")
    && connectionMap.has("ground" + perm[1] + "$nmos0")
    && connectionMap.size === 6;
}

export function checkPseudoNmos() {
    const permutatorMap = permutator([0, 1]);
    let psNmosCircuitValid = 0;
    for (const perm of permutatorMap) {
        if (checkConnectionNmos(perm)) {
            psNmosCircuitValid = 1;
            break;
        }
    }
    return psNmosCircuitValid;
}

export function checkConnectionPmos() {
    return connectionMap.has("vdd0$pmos0") 
    && connectionMap.has("input0$pmos0") 
    && connectionMap.has("pmos0$output0") 
    && connectionMap.has("input0$nmos0") 
    && connectionMap.has("nmos0$output0") 
    && connectionMap.has("ground0$nmos0") 
    && connectionMap.size === 6;
}

export function circuitValid() {
    const psNmosCircuitValid = checkPseudoNmos();
    // check if correct nand gate is made using correct components
    if (selectedTab === currentTab.CMOS && checkConnectionPmos()) {
        changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success');
    } else if (selectedTab === currentTab.PNMOS && psNmosCircuitValid) {
        changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success');
    } else {
        changeObservation("&#10060; Circuit is incorrect", 'text-success', 'text-danger');
    }
}

export function changeObservation(htmlText, removedClass, addedClass) {
    const observationBoxElem = document.getElementById("output-box");
    observationBoxElem.innerHTML = htmlText;
    observationBoxElem.classList.remove(removedClass);
    observationBoxElem.classList.add(addedClass);
}
