const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', async (req, res) => {
    console.log('received a get request');
    res.send('Hello World!');
});

app.get('/hello', async (req, res) => {
    console.log('received a get request 2');
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
    console.info(`Client connected [id=${socket.id}]`);
    
    // initialize this client's sequence number
    if  (!clients.get(socket)) {
        clients.set(socket, 1);
    }

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        // sequenceNumberByClient.delete(socket);
        clients.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    console.log('outside sdjfhgkdg getUserDetails');
    /* When someone asks for their details send them */ 
    socket.on("getUserDetails", (params = {}) => {
        console.log('at the beginning');
        const id = Number(params.id);
        const reqNo = Number(params.reqNo);
        const requiredUser = users.find(user => user.id === id);
        console.log('at the beginning part 2');
        let message;
        if (!requiredUser) {
            message = `Sorry Couldn't authenticate the user`;    
        } else {
            message = `Hi ${requiredUser.name}, Your email is ${requiredUser.email} and Your Request No is ${reqNo}`;
        }
        
        // let [client] = clients.get(socket);  
        console.log('just before emit');
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