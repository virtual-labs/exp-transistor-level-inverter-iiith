function checkandupdate() {
    for (i = 0; i < list_vdd.length; i++) {
        for (j = 0; j < list_pmos.length; j++) {
            if (jsmap.has(list_vdd[i].id) && jsmap.get(list_vdd[i].id) == list_pmos[j].id) {
                list_pmos[j].voltage = 34;

            }
        }

    }
    for (i = 0; i < list_ground.length; i++) {
        for (j = 0; j < list_pmos.length; j++) {
            if (jsmap.has(list_ground[i].id) && jsmap.get(list_ground[i].id) == list_pmos[j].id) {
                list_pmos[j].voltage = -34;

            }
        }

    }
    for (i = 0; i < list_vdd.length; i++) {
        for (j = 0; j < list_nmos.length; j++) {
            if (jsmap.has(list_vdd[i].id) && jsmap.get(list_vdd[i].id) == list_nmos[j].id) {
                list_nmos[j].voltage = 34;

            }
        }

    }
    for (i = 0; i < list_ground.length; i++) {
        for (j = 0; j < list_nmos.length; j++) {
            if (jsmap.has(list_ground[i].id) && jsmap.get(list_ground[i].id) == list_nmos[j].id) {
                list_nmos[j].voltage = -34;

            }
        }

    }
    for (i = 0; i < list_input.length; i++) {
        for (j = 0; j < list_nmos.length; j++) {
            if (jsmap.has(list_input[i].id) && jsmap.get(list_input[i].id) == list_nmos[j].id) {
                if (list_input[i].input == 1) {
                    if (list_nmos[j].voltage < 0) {
                        list_nmos[j].outvoltage = -5;
                    }
                    else {
                        list_nmos[j].outvoltage = 5;
                    }
                    list_nmos[j].outterminal = 1;
                    console.log("Voltage stored in nmos");
                }
                else {
                    list_nmos[j].outterminal = 0
                    console.log("Nmos disabled");
                }

            }
        }

    }
    for (i = 0; i < list_nmos.length; i++) {
        for (j = 0; j < list_ouput.length; j++) {
            if (jsmap.has(list_nmos[i].id) && jsmap.get(list_nmos[i].id) == list_ouput[j].id) {

                if (list_nmos[i].outterminal == 1) {
                    list_ouput[j].voltage = list_nmos[i].outvoltage;
                    console.log("Nmos succesfully conducted");
                }

            }
        }

    }
    for (i = 0; i < list_input.length; i++) {
        for (j = 0; j < list_pmos.length; j++) {
            if (jsmap.has(list_input[i].id) && jsmap.get(list_input[i].id) == list_pmos[j].id) {
                if (list_input[i].input == 0) {
                    if (list_pmos[j].voltage < 0) {
                        list_pmos[j].outvoltage = -5;
                    }
                    else {
                        list_pmos[j].outvoltage = 5;
                    }
                    console.log("Voltage stored in pmos");
                    list_pmos[j].outterminal = 1;
                }
                else {
                    list_pmos[j].outterminal = 0;
                    console.log("Pmos disabled");
                }


            }
        }

    }
    for (i = 0; i < list_pmos.length; i++) {
        for (j = 0; j < list_ouput.length; j++) {
            if (jsmap.has(list_pmos[i].id) && jsmap.get(list_pmos[i].id) == list_ouput[j].id) {

                if (list_pmos[i].outterminal == 1) {
                    list_ouput[j].voltage = list_pmos[i].outvoltage;
                    console.log("Pmos succesfully conducted");
                }

            }
        }

    }


}
function check1() {
    
        console.log(list_ouput[0].voltage);
    


}
function changeoutput() {
   
        list_input[0].input = 0;
    

}
function refresh() {
    instance.reset();
    const parent = document.getElementById("diagram")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    list_ground = [];
    list_input = [];
    list_nmos = [];
    list_vdd = [];
    list_output = [];
    list_pmos = [];
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var count5 = 0;
    var count6 = 0;
    var count7 = 0;
    var count8 = 0;

}