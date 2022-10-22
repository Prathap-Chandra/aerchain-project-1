// const
//     io = require("socket.io-client"),
//     ioClient = io.connect("http://localhost:8642");
// console.log('hello');
// // ioClient.on("seq-num", (msg) => console.info(msg));
// ioClient.on("seq-num", (params = {}) => {
//     const reqNo = Number(params.reqNo) + 1;
//     console.log(params.message);
//     ioClient.emit("getUserDetails", { id: 1, reqNo });    
// });

// ioClient.emit("getUserDetails", { id: 1, reqNo: 1 });

// http://13.126.136.232:8642
// http://localhost:8642
try {
    const config = require('./config');
    const
        io = require("socket.io-client"),
        ioClient = io.connect(config.elbURL);
    console.log('hello');
    // ioClient.on("seq-num", (msg) => console.info(msg));
    ioClient.on("seq-num", (params = {}) => {
        const reqNo = Number(params.reqNo) + 1;
        console.log(params.message);
        ioClient.emit("getUserDetails", { id: 1, reqNo });
    });

    ioClient.emit("getUserDetails", { id: 1, reqNo: 1 });
} catch (error) {

}