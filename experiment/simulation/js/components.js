
var instance = jsPlumb.getInstance({

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
        var s = con[i].sourceId, t = con[i].targetId;
        let r = s.concat("$",t);
        jsmap.set(r, t)
        
    }
});
instance.bind("dblclick", function (ci) {
   
    instance.deleteConnection(ci);
    let con = instance.getAllConnections();
    jsmap.clear();
    for (i = 0; i < con.length; i++) {
        var s = con[i].sourceId, t = con[i].targetId;
        let r = s.concat("$",t);
        jsmap.set(r, t)
        
    }
    console.log(jsmap)

});
/*instance.bind("click", function (conn) {

    instance.remove(conn);
});*/




var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
var count5 = 0;
var count6 = 0;
var count7 = 0;
var count8 = 0;

function addinstancepmos(id) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Bottom"],
        isSource: true,
        // isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Left"],
        isTarget: true,
        // isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Top"],
        isTarget: true,
        //isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
    console.log(instance);
}

function addinstancenmos(id) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Bottom"],
        isTarget: true,
        //isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Left"],
        isTarget: true,
        //isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Top"],
        // isTarget: true,
        isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });

}

function addinstancevdd(id) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Bottom"],
        isSource: true,
        // isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
}

function addinstanceground(id) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Top"],
        isSource: true,
        //isTarget: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
}



function addinstanceinput(id) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Right"],
        isSource: true,
        // isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
}
function addinstanceinverter(id) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Right"],
        isSource: true,
        // isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Left"],
        isTarget: true ,
        // isSource: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
}
function addinstanceoutput(id) {
    instance.addEndpoint(id, {
        endpoint: ["Dot", { radius: 5 }],
        anchor: ["Left"],
        // isSource: true,
        isTarget: true,
        maxConnections: -1,
        connectionType: "red-connection"
    });
}

