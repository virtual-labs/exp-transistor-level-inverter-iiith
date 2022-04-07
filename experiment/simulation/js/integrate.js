function jpmos() {
	comp_count1 -= 1
	if (comp_count1 < 0) {
		document.getElementById('error-container').style.display = 'flex'
		window.setTimeout("document.getElementById('error-container').style='display:none !important;';", 5000)
		return
	}

	//  keep tracking count
	const id = "pmos" + count1;
	count1 = count1 + 1;
	const container = document.getElementById("diagram");

	// render in workspace
	const d = document.createElement('div');
	d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 29.78 77 L 29.78 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 77 L 35.33 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 35.33 39.5 L 52 39.5 L 52 2" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 52 102 L 52 64.5 L 35.33 64.5" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 2 52 L 18.67 52" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><ellipse cx="24.02" cy="51.11" rx="5.357142857142858" ry="5.357142857142858" fill="none" stroke="green" stroke-width="2.5"/></g></svg> '
	d.id = id;
	d.className = 'component';
	d.midterminal = 1;
	d.outterminal = 1;
	d.voltage = 0;
	d.outvoltage = 0;
	d.number = count1;
	// Added javasript objects and their properties
	const d1 = new Object();
	d1.id = id;
	d1.voltage = 0;
	d1.midterminal = 1;
	d1.outterminal = 1;
	d1.outvoltage = 0;

	container.insertAdjacentElement("afterbegin", d);
	instance.draggable(id, { "containment": true });


	list_pmos.push(d1);
	addinstancepmos(id);

}

function jnmos() {
	comp_count2 -= 1
	if (comp_count2 < 0) {
		document.getElementById('error-container').style.display = 'flex'
		window.setTimeout("document.getElementById('error-container').style='display:none !important;';", 5000)
		return
	}

	const id = "nmos" + count2;


	const d = document.createElement('div');
	d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 27.71 77 L 27.71 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01" /><path d="M 36.29 77 L 36.29 27" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01" /><path d="M 36.29 39.5 L 62 39.5 L 62 2" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01" /><path d="M 62 102 L 62 64.5 L 36.29 64.5" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.011" /><path d="M 2 52 L 27.71 52" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"></g></svg>'
	d.id = id;
	d.className = 'component';
	d.voltage = 0;
	d.midterminal = 1;
	d.outterminal = 1;
	d.outvoltage = 0;
	count2 = count2 + 1;
	const container = document.getElementById("diagram");


	const d1 = new Object();
	d1.id = id;
	d1.voltage = 0;
	d1.midterminal = 1;
	d1.outterminal = 1;
	d1.outvoltage = 0;

	container.insertAdjacentElement("afterbegin", d);

	instance.draggable(id, { "containment": true });
	list_nmos.push(d1);

	addinstancenmos(id);


}
function jvdd() {
	comp_count3 -= 1
	if (comp_count3 < 0) {
		document.getElementById('error-container').style.display = 'flex'
		window.setTimeout("document.getElementById('error-container').style='display:none !important;';", 5000)
		return
	}

	const id = "vdd" + count3;

	const d = document.createElement('div');
	d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 21 41 L 21 1 L 1 1 L 41 1" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/></g></svg>'
	d.id = id;
	d.className = 'component';
	d.voltage = 1;
	count3 = count3 + 1;

	const d1 = new Object();
	d1.id = id;
	d1.voltage = 1;

	const container = document.getElementById("diagram");


	container.insertAdjacentElement("afterbegin", d);

	instance.draggable(id, { "containment": true });
	list_vdd.push(d1);

	addinstancevdd(id);


}

function jground() {

	comp_count4 -= 1
	if (comp_count4 < 0) {
		document.getElementById('error-container').style.display = 'flex'
		window.setTimeout("document.getElementById('error-container').style='display:none !important;';", 5000)
		return
	}

	const id = "ground" + count4;

	const container = document.getElementById("diagram");

	const d = document.createElement('div');
	d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-component" height="100" width="100" viewBox="0 0 100 100"><g><path d="M 31 1 L 31 31 L 1 31 L 61 31" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 11 41 L 51 41" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/><path d="M 21 51 L 41 51" fill="none" stroke="green" stroke-width="2.5" stroke-miterlimit="0.01"/></g></svg>'
	d.id = id;
	d.className = 'component';
	d.voltage = 0;
	count4 = count4 + 1;

	const d1 = new Object();
	d1.id = id;
	d1.voltage = 0;

	container.insertAdjacentElement("afterbegin", d);

	instance.draggable(id, { "containment": true });
	list_ground.push(d1);

	addinstanceground(id);

}

function jfinput0() {

	const id = "input0";

	const d = document.createElement('div');
	d.innerHTML = 'Input 1<br>1'
	d.id = id;
	d.className = 'input_component1';
	d.classList.add("HIGH");
	d.addEventListener("dblclick", () => {
		k = document.getElementById("input0")
		if (k.classList.contains("HIGH")) {
			k.classList.remove("HIGH")
			k.classList.add("LOW")
			k.innerHTML = 'Input 1<br>0'
			list_input[0].input = 0;
		}
		else {
			k.classList.remove("LOW")
			k.classList.add("HIGH")
			k.innerHTML = 'Input 1<br>1'
			list_input[0].input = 1;
		}
	})
	d.input = 0;
	d.voltage = 5;
	const container = document.getElementById("diagram");

	const d1 = new Object();
	d1.id = id;
	d1.input = 1;
	d1.voltage = 5;

	container.insertAdjacentElement("afterbegin", d);

	instance.draggable(id, { "containment": true });
	list_input.push(d1);

	addinstancefinalinput(id);

}

function jfoutput() {
	const id = "output0";
	const d = document.createElement('div');
	d.innerHTML = 'Output<br>-'
	d.id = id;
	d.className = 'output_component';
	d.outputsign = 1;
	d.voltage = 0;

	const d1 = new Object();
	d1.id = id;
	d1.voltage = 0;
	d1.outputsign = 1;

	count6 = count6 + 1;
	const container = document.getElementById("diagram");


	container.insertAdjacentElement("afterbegin", d);

	instance.draggable(id, { "containment": true });
	list_ouput.push(d1);

	addinstancefinaloutput(id);
}
