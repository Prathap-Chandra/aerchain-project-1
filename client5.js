// const
//     io = require("socket.io-client"),
//     ioClient = io.connect("http://localhost:8642");

// ioClient.on("seq-num", (msg) => console.info(msg));

const config = require('./config');
const
    io = require("socket.io-client"),
    ioClient = io.connect(config.elbURL);
console.log('hello');
// ioClient.on("seq-num", (msg) => console.info(msg));
ioClient.on("seq-num", (params = {}) => {
    const reqNo = Number(params.reqNo) + 1;
    console.log(params.message);
    // ioClient.emit("getUserDetails", { id: 5, reqNo });    
});

ioClient.emit("getUserDetails", { id: 5, reqNo: 1 });