'use strict';
import { connectionMap, listPmos, listNmos,listInput, listOutput, listGround ,listVdd } from './main.js';
import{checkConnectionPmos, checkPseudoNmos, checkConnectionBuffer} from './not.js';

// This function checks map when called
export function checkAndUpdate() {
    // these variables are for pseudo nmos circuit
    
    listOutput[0].voltage = 0;
    // if any vdd is connected to any pmos store voltage
    
    for(const vdd of listVdd){
        for(const pmos of listPmos){
            const mapElement = vdd.id.concat("$", pmos.id);
            if(connectionMap.has(mapElement)){
                pmos.voltage = 5;
            }
        }
    }

    // if any ground is connected to any pmos store voltage
    
    for(const ground of listGround){
        for(const pmos of listPmos){
            const mapElement = ground.id.concat("$", pmos.id);
            if(connectionMap.has(mapElement)){
                pmos.voltage = -5;
            }
        }
    }

    // if amy vdd is connected to nmos store that voltage
    
    for(const vdd of listVdd){
        for(const nmos of listNmos){
            const mapElement = vdd.id.concat("$", nmos.id);
            if(connectionMap.has(mapElement)){
                nmos.voltage = 5;
            }
        }
    }

    
    for(const ground of listGround){
        for(const nmos of listNmos){
            const mapElement = ground.id.concat("$", nmos.id);
            if(connectionMap.has(mapElement)){
                nmos.voltage = -5;
            }
        }
    }
    
    for(const input of listInput){
        for(const pmos of listPmos){
            const mapElement = input.id.concat("$", pmos.id);
            if(connectionMap.has(mapElement)){
                if(input.input === 0){
                    if(pmos.voltage === 5){
                        pmos.outVoltage = 5;
                    }else{
                        if(pmos.voltage === 0){
                            pmos.outVoltage = 9;
                        }else{
                            pmos.outVoltage = -5;
                        }
                    }
                    pmos.outTerminal = 1;
                }else{
                    pmos.outTerminal = -1;
                    pmos.outVoltage = 0;
                }
            }
        }
    }

    
    for(const input of listInput){
        for(const nmos of listNmos){
            const mapElement = input.id.concat("$", nmos.id);
            if(connectionMap.has(mapElement)){
                if(input.input === 1){
                    if(nmos.voltage === -5){
                        nmos.outVoltage = -5;
                    }else{
                        if(nmos.voltage === 0){
                            nmos.outVoltage = -9;
                        }else{
                            nmos.outVoltage = 5;
                        }
                    }
                    nmos.outTerminal = 1;
                }else{
                    nmos.outTerminal = 0;
                    nmos.midTerminal = 1;
                }
            }else{
                nmos.midTerminal = 0;
            }
        }
    }

    
    for(const pmos of listPmos){
        for(const output of listOutput){
            const mapElement = pmos.id.concat("$", output.id);
            if(connectionMap.has(mapElement)){
                if(pmos.outTerminal === 1){
                    output.voltage = pmos.outVoltage;
                }
                if(pmos.outTerminal === -1){
                    output.voltage = pmos.outVoltage;
                }
            }
        }
    }


    // if any nmos is connected to output then the voltages are propogated based on input signals
    
    for(const nmos of listNmos){
        for(const output of listOutput){
            const mapElement = nmos.id.concat("$", output.id);
            if(connectionMap.has(mapElement)){
                if(nmos.outTerminal === 1){
                    output.voltage = nmos.outVoltage;
                }
                if(nmos.outTerminal === -1){
                    output.voltage = nmos.outVoltage;
                }
            }
        }
    }
}

export function getTruthValue() {
    const out = listOutput[0].voltage;
    const psNmosCircuitValid = checkPseudoNmos();
    if (listInput[0].input === 0 && psNmosCircuitValid === 1) {
        return "1";
    } else if (listInput[0].input === 1 && psNmosCircuitValid === 1) {
        return "0";
    }
    if (out === 5 || out === 9) {
        return "1";
    } else if (out === -5 || out === -9) {
        return "0";
    } else {
        return "-";
    }
}

export function getTruthValueBuffer() {
    const out = listOutput[0].voltage;
    console.log(out)
    console.log(listInput[0])
    let perm = [['0','1','0','1'], ['0','1','1','0'], ['1','0','0','1'], ['1','0','1','0']]
    const CircuitValid = (checkConnectionBuffer(perm[0]) || checkConnectionBuffer(perm[1]) || checkConnectionBuffer(perm[2]) || checkConnectionBuffer(perm[3]));
    console.log(CircuitValid)
    if (listInput[0].input === 0 && CircuitValid === true) {
        return "0";
    } else if (listInput[0].input === 1 && CircuitValid === true) {
        return "1";
    }
    if (out === 5 || out === 9) {
        return "1";
    } else if (out === -5 || out === -9) {
        return "0";
    } else {
        return "-";
    }
}