'use strict';

module.exports = function (socket, io, userList) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterMessageEvent', function (data) {
        socket.join(data.roomName);
        userList[data.roomName].push(data.userName);
        socket.broadcast.to(data.roomName).emit('receiveEnterMessageEvent', data.userName);
        io.sockets.in(data.roomName).emit('receiveEnterUserListEvent', userList[data.roomName]);
    });
};
