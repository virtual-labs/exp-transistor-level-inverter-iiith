
const instance = jsPlumb.getInstance({

	container: diagram,
	maxConnections: -1,
	endpoint: {
		type: "Dot",
		options: { radius: 7 },
	},
	dragOptions: {
		containment: "parentEnclosed",
		containmentPadding: 5,
	},
	connector: "Flowchart",
	paintStyle: { strokeWidth: 3, stroke: "#456" },
	connectionsDetachable: true,
});
instance.bind("ready", function () {
	instance.registerConnectionTypes({
		"red-connection": {
			paintStyle: { stroke: "red", strokeWidth: 3 },
			hoverPaintStyle: { stroke: "red", strokeWidth: 8 },
			connector: "Flowchart"
		}
	});
});


instance.bind("connection", function (ci) {
	let con = instance.getAllConnections();
	jsmap.clear();
	for (i = 0; i < con.length; i++) {
		let s = con[i].sourceId, t = con[i].targetId;
		let r = s.concat("$", t);
		jsmap.set(r, t)

	}
});
instance.bind("dblclick", function (ci) {

	instance.deleteConnection(ci);
	let con = instance.getAllConnections();
	jsmap.clear();
	for (i = 0; i < con.length; i++) {
		let s = con[i].sourceId, t = con[i].targetId;
		let r = s.concat("$", t);
		jsmap.set(r, t)

	}
});
/*instance.bind("click", function (conn) {

	instance.remove(conn);
});*/

let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;
let count6 = 0;
let count7 = 0;
let count8 = 0;
let count9 = 0;
let count10 = 0;
let count11 = 0;
let count12 = 0;
let comp_count1 = 1
let comp_count2 = 1
let comp_count3 = 1
let comp_count4 = 2

function addinstancepmos(id) {
    addinstance(id, "Bottom", -1, true)
    addinstance(id, "Left", -1, false)
    addinstance(id, "Top", -1, false)
}

function addinstancenmos(id) {
    addinstance(id, "Bottom", -1, false)
    addinstance(id, "Left", -1, false)
    addinstance(id, "Top", -1, true)
}

function addinstancevdd(id) {
    addinstance(id, "Bottom", -1, true)
}

function addinstanceground(id) {
    addinstance(id, "Top", -1, true)
}

function addinstancefinalinput(id) {
    addinstance(id, "Right", -1, true)
}

function addinstancefinaloutput(id) {
    addinstance(id, "Left", -1, false)
}

function addinstance(id, position, num, src) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: [position],
        isTarget: !src,
        isSource: src,
        maxConnections: num,
        connectionType: "red-connection"
    });
}
