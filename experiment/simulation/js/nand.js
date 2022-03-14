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
function pseudonmos() {
    checkandupdate()
    if (nmos_nand && pmos_nand) {

        console.log(5)
    }
    else {

        console.log(-5)
    }
}
function cmosvalid() {
    checkandupdate()
    circuitvalid()
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