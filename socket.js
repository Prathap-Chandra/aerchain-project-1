const socketIo = require("socket.io");
const { server } = require('./server.js')

import pubsub from './pubsub';
const users = new Map();
const clients = new Map();

/* constants */
const CAPP_NOTIFICATIONS = 'setNotifications';
const SAPP_NOTIFICATIONS = 'setSupplierNotifications';

/*
pubsub.on(CAPP_NOTIFICATIONS, (data = {}) => {
    const socketIds = users.get(data.userId);
    if (!(Array.isArray(socketIds) && socketIds.length)) {
        return;
    }
    for (const id of socketIds) {
        io.to(id).emit(CAPP_NOTIFICATIONS, data);
    }
})

pubsub.on(SAPP_NOTIFICATIONS, (notifications) => {
    const socketIds = users.get(notifications.userId);
    if (!(Array.isArray(socketIds) && socketIds.length)) {
        return;
    }
    for (const id of socketIds) {
        io.to(id).emit(SAPP_NOTIFICATIONS, notifications);
    }
})
*/

const io = socketIo(server, {
    pingTimeout: 30000,
    pingInterval: 5000,
    upgradeTimeout: 30000,
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    
    socket.on("disconnect", () => {
        const userId = clients.get(socket.id);
        clients.delete(socket.id);
        if (Array.isArray(users.get(userId)) && users.get(userId).length) {
            users.get(userId).splice(users.get(userId).indexOf(socket.id), 1)
            if (users.get(userId) && !users.get(userId).length) {
                users.delete(userId);
            }
        }
    });

    socket.on('messageFromClientOne', async (params = {}) => {
        const id = Number(params.id);
        console.log(`Message from client 1: `, id);
        socket.emit('messageFromServer', { id: id + 1 });
    });

    socket.on('messageFromClientTwo', async (params = {}) => {
        const id = Number(params.id);
        console.log(`Message from client 2: `, id);
        socket.emit('messageFromServer', { id: id + 1 });
    });
   
    /*
    socket.on('getNotifications', async (params = {}) => {
        const { userId, page = 1 } = params;
        if (!users.get(userId)) {
            users.set(userId, []);
        }
        if (!users.get(userId).includes(socket.id)) {
            users.get(userId).push(socket.id);
            clients.set(socket.id, userId);
        }
        const socketIds = users.get(userId);
        const notifications = await notificationService.findAllByUserIdForListing(params, userId);
        const { data, meta = {} } = notifications;
        const { count, totalCount } = meta;
        for (const socketId of socketIds) {
            io.to(socketId).emit('setNotifications', {
                page,
                count,
                totalCount,
                notifications: data
            });
        }
    })
    
    socket.on('getSupplierNotifications', async (params = {}) => {
        const { userId, page = 1 } = params;
        if (!users.get(userId)) {
            users.set(userId, []);
        }
        if (!users.get(userId).includes(socket.id)) {
            users.get(userId).push(socket.id);
            clients.set(socket.id, userId);
        }
        const socketIds = users.get(userId);
        const notifications = await notificationService.findAllByXUserIdForListing(params, userId);
        const { data, meta = {} } = notifications || {};
        const { count, totalCount } = meta;
        for (const socketId of socketIds) {
            io.to(socketId).emit('setSupplierNotifications', {
                page,
                data,
                count,
                totalCount,
            });
        }
    })
    */

});

module.exports = { io, users, clients };