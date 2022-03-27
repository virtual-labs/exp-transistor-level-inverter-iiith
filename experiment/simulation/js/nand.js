function nandvalidate() {
    console.log(nmos_nand)
    console.log(pmos_nand)
    var x = document.getElementById("myForm").elements[0].checked;
    var y = document.getElementById("myForm").elements[2].checked;
    console.log(x, y)

    if (x == true) {
        list_input[0].input = 0
    }
    else {
        list_input[0].input = 1
    }
    if (y == true) {
        list_input[1].input = 0
    }
    else {
        list_input[1].input = 1
    }
    checkandupdate()
    circuitvalid()
    console.log(list_ouput[0].voltage)
   

}
function norvalidate() {
    console.log(nmos_nand)
    console.log(pmos_nand)
    var x = document.getElementById("myForm").elements[0].checked;
    var y = document.getElementById("myForm").elements[2].checked;
    console.log(x, y)

    if (x == true) {
        list_input[0].input = 0
    }
    else {
        list_input[0].input = 1
    }
    if (y == true) {
        list_input[1].input = 0
    }
    else {
        list_input[1].input = 1
    }
    checkandupdate()
    circuitvalid()
    console.log(list_ouput[0].voltage)
   

}
function pseudonmos() {
    checkandupdate()
    if (nmos_nand && pmos_nand)
    {
        document.getElementById("output-box").innerHTML = "  output is "
        document.getElementById("output-box").innerHTML += -1
        document.getElementById("output-box").classList.remove('text-danger')
        document.getElementById("output-box").classList.add('text-success')
        
    }
    else 
    {
        document.getElementById("output-box").innerHTML = "  output is "
        document.getElementById("output-box").innerHTML +=  1
        document.getElementById("output-box").classList.remove('text-danger')
        document.getElementById("output-box").classList.add('text-success')
       
    }
}
function cmosvalid() {
    checkandupdate()
    circuitvalid()
    show_truth_table()
}
function xorvalid() {
    var x = document.getElementById("myForm").elements[0].checked;
    var y = document.getElementById("myForm").elements[2].checked;
    console.log(x, y)

    if (x == true) {
        list_input[0].input = 0
    }
    else {
        list_input[0].input = 1
    }
    if (y == true) {
        list_input[1].input = 0
    }
    else {
        list_input[1].input = 1
    }
    checkandupdate()
    if(x == true && y == true)
    {
        list_ouput[0].voltage = -5
    }
    if(x == false && y == false)
    {
        list_ouput[0].voltage = -5
    }
    if(x == true && y == false)
    {
        list_ouput[0].voltage = 5
    }
    if(x == false && y == true)
    {
        list_ouput[0].voltage = 5
    }
    
    circuitvalid()
    console.log(list_ouput[0].voltage)
  

}
function selectedvalid()
{
  if(selected_tab == 0)
  {
     cmosvalid()
  }
  else
  {
     pseudonmos()
  }
}

function show_truth_table()
{
    const output = [];
    a = document.getElementById("table-body")
    k = document.getElementById("input0")
    if(k.classList.contains("HIGH") && !k.classList.contains("LOW"))
    {
        // console.log("In HIGH")
        output[1] = get_truth_value()
        list_input[0].input = 0;
        checkandupdate()
        output[0] = get_truth_value()
        list_input[0].input = 1;    
        checkandupdate()
    }
    if(!k.classList.contains("HIGH") && k.classList.contains("LOW"))
    {
        // console.log("In LOW")
        output[0] = get_truth_value()
        list_input[0].input = 1;
        checkandupdate()
        output[1] = get_truth_value()
        list_input[0].input = 0;
        checkandupdate()
    }
    a.innerHTML = "<tr><td>0</td><td>1</td><td>" + output[0] + "</td></tr>" + "<tr><td>1</td><td>0</td><td>" + output[1] + "</td></tr>"
}