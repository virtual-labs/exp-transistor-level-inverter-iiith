
const jsplumbInstance = jsPlumb.getInstance({

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
jsplumbInstance.bind("ready", function () {
    jsplumbInstance.registerConnectionTypes({
        "red-connection": {
            paintStyle: { stroke: "red", strokeWidth: 3 },
            hoverPaintStyle: { stroke: "red", strokeWidth: 8 },
            connector: "Flowchart"
        }
    });
});


jsplumbInstance.bind("connection", () => {
    const con = jsplumbInstance.getAllConnections();
    connectionMap.clear();
    for (i = 0; i < con.length; i++) {
        const s = con[i].sourceId, t = con[i].targetId;
        const r = s.concat("$", t);
        connectionMap.set(r, t)

    }
});
jsplumbInstance.bind("dblclick", function (ci) {

    jsplumbInstance.deleteConnection(ci);
    const con = jsplumbInstance.getAllConnections();
    connectionMap.clear();
    for (i = 0; i < con.length; i++) {
        const s = con[i].sourceId, t = con[i].targetId;
        const r = s.concat("$", t);
        connectionMap.set(r, t)

    }
    console.log(connectionMap)

});

const count = {PMOS: 0, NMOS: 0, VDD: 0, Ground: 0, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0}
const maxCount = {PMOS: 1, NMOS: 1, VDD: 1, Ground: 2, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0}

function addInstancePmos(id) {
    addInstance(id, [ 0.72, 1, 0, 1 ], -1, true)
    addInstance(id, [0, 0.5, -1, 0], -1, false)
    addInstance(id, [0.72, 0, 0, -1], -1, false)
    // console.log(jsplumbInstance);
}

function addInstanceNmos(id) {
    addInstance(id, [0.72, 1, 0, 1 ], -1, false)
    addInstance(id, [0, 0.5, -1, 0], -1, false)
    addInstance(id, [0.72, 0, 0, -1], -1, true)
}

function addInstanceVdd(id) {
    addInstance(id, [ 0.5, 1, 0, 1 ], -1, true)
}

function addInstanceGround(id) {
    addInstance(id, [0.5, 0, 0, -1], -1, true)
}

function addInstanceFinalInput(id) {
    addInstance(id, [1, 0.5, 1, 0], -1, true)
}

function addInstanceFinalOutput(id) {
    addInstance(id, [0, 0.5, -1, 0], -1, false)
}

function addInstance(id, position, num, src) {
    jsplumbInstance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: position,
        isTarget: !src,
        isSource: src,
        maxConnections: num,
        connectionType: "red-connection"
    });
}

// top -> [0.5, 0, 0, -1]
// bottom -> [ 0.5, 1, 0, 1 ]
// right -> [1, 0.5, 1, 0]
// left -> [0, 0.5, -1, 0]
