function jpmos() {
    var person;

    var id = "pmos" + count1;



    count1 = count1 + 1;
    var container = document.getElementById("diagram");


    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 29.78 77 L 29.78 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 77 L 35.33 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 39.5 L 52 39.5 L 52 2" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 52 102 L 52 64.5 L 35.33 64.5" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 2 52 L 18.67 52" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><ellipse cx="24.02" cy="51.11" rx="5.357142857142858" ry="5.357142857142858" fill="none" stroke="green" stroke-width="2.5"/></g></svg> '
    d.id = id;
    d.className = 'component';
    d.midterminal = 1;
    d.outterminal = 1;
    d.voltage = 0;
    d.outvoltage = 0;
    d.number = count1;
    container.insertAdjacentElement("afterbegin", d);
    instance.draggable(id, { "containment": true });


    list_pmos.push(d);
    addinstancepmos(id);



}
function jnmos() {
    var person;

    var id = "nmos" + count2;


    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 29.78 77 L 29.78 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 77 L 35.33 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 39.5 L 52 39.5 L 52 2" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 52 102 L 52 64.5 L 35.33 64.5" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 2 52 L 18.67 52" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><ellipse cx="24.02" cy="51.11" rx="5.357142857142858" ry="5.357142857142858" fill="none" stroke="green" stroke-width="2.5"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.voltage = 0;
    d.midterminal = 1;
    d.outterminal = 1;
    d.outvoltage = 0;
    count2 = count2 + 1;
    var container = document.getElementById("diagram");



    container.insertAdjacentElement("afterbegin", d);

    instance.draggable(id, { "containment": true });
    list_nmos.push(d);

    addinstancenmos(id);


}
function jvdd() {
    var person;

    var id = "vdd" + count3;

    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 29.78 77 L 29.78 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 77 L 35.33 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 39.5 L 52 39.5 L 52 2" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 52 102 L 52 64.5 L 35.33 64.5" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 2 52 L 18.67 52" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><ellipse cx="24.02" cy="51.11" rx="5.357142857142858" ry="5.357142857142858" fill="none" stroke="green" stroke-width="2.5"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.voltage = 34;
    count3 = count3 + 1;
    var container = document.getElementById("diagram");


    container.insertAdjacentElement("afterbegin", d);

    instance.draggable(id, { "containment": true });
    list_vdd.push(d);

    addinstancevdd(id);


}

function jground() {
    var person;

    var id = "ground" + count4;




    var container = document.getElementById("diagram");

    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 31 1 L 31 31 L 1 31 L 61 31" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 11 41 L 51 41" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 21 51 L 41 51" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.voltage = -34;
    count4 = count4 + 1;




    container.insertAdjacentElement("afterbegin", d);

    instance.draggable(id, { "containment": true });
    list_ground.push(d);

    addinstanceground(id);
    console.log(id)


}

function jinput() {
    var person;

    var id = "input" + count5;


    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 1 31 L 1 1 L 61 1 L 41 31" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 1 31 L 41 31" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.input = 1;
    d.voltage = 5;
    count5 = count5 + 1;
    var container = document.getElementById("diagram");


    container.insertAdjacentElement("afterbegin", d);

    instance.draggable(id, { "containment": true });
    list_input.push(d);

    addinstanceinput(id);

}

function joutput() {
    var person;

    var id = "output" + count6;
    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 61 31 L 61 1 L 1 1 L 21 31" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 61 31 L 21 31" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.outputsign = 1;
    d.voltage = 0;


    count6 = count6 + 1;
    var container = document.getElementById("diagram");


    container.insertAdjacentElement("afterbegin", d);

    instance.draggable(id, { "containment": true });
    list_ouput.push(d);

    addinstanceoutput(id);


}