// This function checks map when called

function checkandupdate() {
    // these variables are for pseudo nmos circuit
    nmos_nand = 0;
    pmos_nand = 0;
    list_ouput[0].voltage = 0;
    // if any vdd is connected to any pmos store voltage
    for (i = 0; i < list_vdd.length; i++) {
        for (j = 0; j < list_pmos.length; j++) {
            let r = list_vdd[i].id.concat("$", list_pmos[j].id);
            if (jsmap.has(r)) {
                list_pmos[j].voltage = 5;

            }
        }

    }
    // if any ground is connected to any pmos store voltage
    for (i = 0; i < list_ground.length; i++) {
        for (j = 0; j < list_pmos.length; j++) {
            let r = list_ground[i].id.concat("$", list_pmos[j].id);
            if (jsmap.has(r)) {
                list_pmos[j].voltage = -5;

            }
        }

    }
    // if amy vdd is connected to nmos store that voltage
    for (i = 0; i < list_vdd.length; i++) {
        for (j = 0; j < list_nmos.length; j++) {
            let r = list_vdd[i].id.concat("$", list_nmos[j].id);
            if (jsmap.has(r)) {
                list_nmos[j].voltage = 5;

            }
        }

    }
    for (i = 0; i < list_ground.length; i++) {
        for (j = 0; j < list_nmos.length; j++) {
            let r = list_ground[i].id.concat("$", list_nmos[j].id);
            if (jsmap.has(r)) {
                list_nmos[j].voltage = -5;

            }
        }

    }
    for (i = 0; i < list_input.length; i++) {
        for (j = 0; j < list_pmos.length; j++) {
            let r = list_input[i].id.concat("$", list_pmos[j].id);
            if (jsmap.has(r)) {
                if (list_input[i].input == 0) {

                    if (list_pmos[j].voltage == 5) {
                        list_pmos[j].outvoltage = 5;
                    }
                    else {
                        if (list_pmos[j].voltage == 0) {
                            list_pmos[j].outvoltage = 9;
                        }
                        else {
                            list_pmos[j].outvoltage = -5;
                        }

                        //list_pmos[j].outvoltage = 5;
                    }
                    console.log("Voltage stored in pmos");

                    list_pmos[j].outterminal = 1;
                    console.log(list_pmos[j].outterminal)
                }
                else {
                    list_pmos[j].outterminal = -1;
                    console.log(list_pmos[j].outterminal)
                    console.log("Pmos disabled");
                    list_pmos[j].outvoltage = 0;
                }


            }
        }

    }
    for (i = 0; i < list_input.length; i++) {
        for (j = 0; j < list_nmos.length; j++) {
            let r = list_input[i].id.concat("$", list_nmos[j].id);
            // check if jsmap have the given nmos input connection
            if (jsmap.has(r)) {
                list_nmos[j].midterminal = 1;
                // if input signal is one
                if (list_input[i].input == 1) {
                    if (list_nmos[j].voltage == -5) {
                        list_nmos[j].outvoltage = -5;
                    }
                    else {
                        if (list_nmos[j].voltage == 0) {
                            list_nmos[j].outvoltage = -9;
                        }
                        else {
                            list_nmos[j].outvoltage = 5;
                        }

                    }
                    list_nmos[j].outterminal = 1;

                    //console.log("Voltage stored in nmos");
                }
                else {
                    list_nmos[j].outterminal = 0;
                    list_nmos[j].midterminal = 1;
                    // list_nmos[j].outvoltage = 0;
                    // console.log("Nmos disabled");
                }

            }
            else {  // no carrying of voltage
                list_nmos[j].midterminal = 0;

            }
        }

    }

    for (i = 0; i < list_pmos.length; i++) {
        for (j = 0; j < list_ouput.length; j++) {
            let r = list_pmos[i].id.concat("$", list_ouput[j].id);

            if (jsmap.has(r)) {

                if (list_pmos[i].outterminal == 1) {
                    list_ouput[j].voltage = list_pmos[i].outvoltage;
                    pmos_nand++;
                    console.log("Pmos succesfully conducted");
                    console.log(list_ouput[j].voltage)
                }
                if (list_pmos[i].outterminal == -1) {
                    list_ouput[j].voltage = list_pmos[i].outvoltage;

                }

            }
        }

    }
    // if any nmos is connected to output then the voltages are propogated based on input signals
    for (i = 0; i < list_nmos.length; i++) {
        for (j = 0; j < list_ouput.length; j++) {
            let r = list_nmos[i].id.concat("$", list_ouput[j].id);
            if (jsmap.has(r)) {
                // if nmos 
                if (list_nmos[i].outterminal == 1) {
                    list_ouput[j].voltage = list_nmos[i].outvoltage;
                    nmos_nand++;
                    console.log("Nmos succesfully conducted");
                }



            }
        }

    }




}
// if any input is connected to volatge then based on the input signal we check if nmos conducts or not

// similar case for pmos

/*function check1() {

    
    console.log(list_ouput[0].voltage)
    circuitvalid()


}*/

function circuitvalid() {
    // check if correct nand gate is made using correct components
    if (jsmap.has("vdd0$pmos0") && jsmap.has("input0$pmos0") && jsmap.has("pmos0$output0") && jsmap.has("input0$nmos0") && jsmap.has("nmos0$output0") && jsmap.has("ground0$nmos0")) {
        document.getElementById("output-box").innerHTML = "  output is "
        document.getElementById("output-box").innerHTML += list_ouput[0].voltage
        document.getElementById("output-box").classList.remove('text-danger')
        document.getElementById("output-box").classList.add('text-success')
    }
    else {
        document.getElementById("output-box").innerHTML = " output is "
        document.getElementById("output-box").innerHTML += list_ouput[0].voltage
        document.getElementById("output-box").classList.remove('text-success')
        document.getElementById("output-box").classList.add('text-danger')
    }
}

function get_truth_value() {
    x = list_ouput[0].voltage
    if (x == 5)
    {
        return "1"
    }
    else if(x == -5)
    {
        return "0"
    }
    else
    {
        return "-"
    }
}

function changeoutput() {
    // change input signal 
    for (i = 0; i < list_input.length; i++) {
        if (list_input[i].input == 0) {
            list_input[i].input = 1;

        }
        else {
            list_input[i].input = 0;
        }
    }


    //console.log(jsmap);



}
function refresh() {
    // reload
    location.reload();

}
