const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const moment = require('moment-timezone');

app.get('/', async (req, res) => {
    console.log(`S1 TG1 - Received a get request at ${moment().tz('Asia/Kolkata').toDate()}. Path: /`);
    res.send('Hello World!');
});

app.get('/hello', async (req, res) => {
    console.log(`S1 TG1 - Received a get request at ${moment().tz('Asia/Kolkata').toDate()}. Path: /hello`);
    res.send('Hello World!');
});

let clients = new Map();

const users = [{
    id: 1,
    name: 'Prathap Chandra',
    email: 'prathap.chandra@aerchain.io',
}, {
    id: 2,
    name: 'Walter White',
    email: 'walter.white@aerchain.io',
}, {
    id: 3,
    name: 'Jesse Pinkman',
    email: 'jesse.pinkman@aerchain.io',
}, {
    id: 4,
    name: 'Hank Schrader',
    email: 'hank.schrader@aerchain.io',
}, {
    id: 5,
    name: 'Saul Goodman',
    email: 'saul.goodman@aerchain.io',
}, {
    id: 6,
    name: 'Gustavo Fring',
    email: 'gustavo.fring@aerchain.io',
}, {
    id: 7,
    name: 'Mike Erhmantraut',
    email: 'mike.erhmantraut@aerchain.io',
}];

// event fired every time a new client connects:
io.on("connection", (socket) => {
    console.log(`S1 TG1 - Client connected [id=${socket.id}] at ${moment().tz('Asia/Kolkata').toDate()}`);
    
    // initialize this client's sequence number
    if  (!clients.get(socket)) {
        clients.set(socket, 1);
    }

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        // sequenceNumberByClient.delete(socket);
        clients.delete(socket);
        console.log(`S1 TG1 - Client [id=${socket.id}] disconnected at ${moment().tz('Asia/Kolkata').toDate()}`);
    });

    console.log(`S1 TG1 - Outside getUserDetails Event - ${moment().tz('Asia/Kolkata').toDate()}`);
    /* When someone asks for their details send them */ 
    socket.on("getUserDetails", (params = {}) => {
        console.log(`S1 TG1 - Outside getUserDetails Event - ${moment().tz('Asia/Kolkata').toDate()}`);
        const id = Number(params.id);
        const reqNo = Number(params.reqNo);
        const requiredUser = users.find(user => user.id === id);
        console.log(`S1 TG1 - Inside getUserDetails Event - ${moment().tz('Asia/Kolkata').toDate()}`);
        let message;
        if (!requiredUser) {
            message = `Sorry Couldn't authenticate the user`;    
        } else {
            message = `Hi ${requiredUser.name}, Your email is ${requiredUser.email} and Your Request No is ${reqNo}`;
        }
        
        // let [client] = clients.get(socket);  
        console.log(`S1 TG1 - Just Before Emit Event - ${moment().tz('Asia/Kolkata').toDate()}`);
        socket.emit("seq-num", { message, reqNo: reqNo + 1});
    });
});

// sends each client its current sequence number
// setInterval(() => {
//     for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
//         client.emit("seq-num", sequenceNumber);
//         sequenceNumberByClient.set(client, sequenceNumber + 1);
//     }
// }, 1000);

http.listen(8642, function(){
  console.log('listening on *:8642');
});