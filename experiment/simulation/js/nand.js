function cmosvalid() {
	checkandupdate()
	modify_output()
	circuitvalid()
	show_truth_table()
}

function selectedvalid() {
	if (selected_tab == 0) {
		cmosvalid()
	}
	else {
		pseudonmos()
	}
}

function show_truth_table() {
	const output = [];
	a = document.getElementById("table-body")
	k = document.getElementById("input0")
	if (k.classList.contains("HIGH")) {
		output[1] = get_truth_value()
		list_input[0].input = 0;
		checkandupdate()
		output[0] = get_truth_value()
		list_input[0].input = 1;
		checkandupdate()
	}
	if (!k.classList.contains("HIGH")) {
		output[0] = get_truth_value()
		list_input[0].input = 1;
		checkandupdate()
		output[1] = get_truth_value()
		list_input[0].input = 0;
		checkandupdate()
	}
	a.innerHTML = "<tr><td>0</td><td>1</td><td>" + output[0] + "</td></tr>" + "<tr><td>1</td><td>0</td><td>" + output[1] + "</td></tr>"
}

function modify_output() {
	a = document.getElementById("output0")
	a.innerHTML = 'Output<br>' + get_truth_value()
}
