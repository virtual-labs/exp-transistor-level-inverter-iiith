function notValid() {
    checkAndUpdate()
    modifyOutput()
    circuitValid()
    showTruthTable()
    document.getElementById('error-container').style='display:none;';
    // document.getElementById('error-container').style.display='flex'
    // window.setTimeout("document.getElementById('error-container').style='display:none !important;';", 5000)
}

function showTruthTable()
{
    const output = [];
    a = document.getElementById("table-body")
    k = document.getElementById("input0")
    if(k.classList.contains("high") && !k.classList.contains("low"))
    {
        // console.log("In high")
        output[1] = getTruthValue()
        listInput[0].input = 0;
        checkAndUpdate()
        output[0] = getTruthValue()
        listInput[0].input = 1;    
        checkAndUpdate()
    }
    if(!k.classList.contains("high") && k.classList.contains("low"))
    {
        console.log("In low")
        output[0] = getTruthValue()
        listInput[0].input = 1;
        checkAndUpdate()
        output[1] = getTruthValue()
        listInput[0].input = 0;
        checkAndUpdate()
    }
    a.innerHTML = "<tr><td>0</td><td>1</td><td>" + output[0] + "</td></tr>" + "<tr><td>1</td><td>0</td><td>" + output[1] + "</td></tr>"
}

function modifyOutput()
{
    a = document.getElementById("output0")
    a.innerHTML = 'Output<br>' + getTruthValue()
}

function permutator(inputArr) {
    const results = [];

    function permute(arr, memo) {
        let cur

        memo = memo || [];

        for (let i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}

function checkPseudoNmos() {
    x = permutator([0, 1])
    console.log("x", x)
    let psNmosCircuitValid = 0
    for (let i = 0; i < x.length; i++) {
        if (connectionMap.has("vdd0$pmos0") && connectionMap.has("ground" + x[i][0] + "$pmos0") && connectionMap.has("pmos0$output0") && connectionMap.has("input0$nmos0") && connectionMap.has("nmos0$output0") && connectionMap.has("ground" + x[i][1] + "$nmos0")) {
            psNmosCircuitValid = 1
            break
        }
    }
    return psNmosCircuitValid
}

function circuitValid() {
    psNmosCircuitValid = checkPseudoNmos()
    // check if correct nand gate is made using correct components
    if (selectedTab === currentTab.CMOS && connectionMap.has("vdd0$pmos0") && connectionMap.has("input0$pmos0") && connectionMap.has("pmos0$output0") && connectionMap.has("input0$nmos0") && connectionMap.has("nmos0$output0") && connectionMap.has("ground0$nmos0")) {
        changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success')
    }
    else if (selectedTab === currentTab.PNMOS && psNmosCircuitValid) {
        changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success')
    }
    else {
        changeObservation("&#10060; Circuit is incorrect", 'text-success', 'text-danger')
    }
}

function changeObservation(htmlText, removedClass, addedClass) {
    document.getElementById("output-box").innerHTML = htmlText
    document.getElementById("output-box").classList.remove(removedClass)
    document.getElementById("output-box").classList.add(addedClass)
}
