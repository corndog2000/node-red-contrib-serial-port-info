module.exports = function(RED) {
    function SerialPortInfoNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        
        node.on('input', function(msg) {
            const SerialPort = require('serialport');
            
            SerialPort.list().then(
                ports => {
                    msg.payload = ports;
                    node.send(msg);
                    node.status({fill:"green", shape:"dot", text:"success"});
                },
                err => {
                    node.error("Error listing serial ports: " + err.message);
                    node.status({fill:"red", shape:"ring", text:"error"});
                }
            );
        });
    }
    
    RED.nodes.registerType("serial-port-info", SerialPortInfoNode);
}
