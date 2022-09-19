'use strict';

module.exports = function (socket, io, userList) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitMessageEvent', function (data) {
        const index = userList[data.roomName].indexOf(data.userName);
        userList[data.roomName].splice(index, 1);
        socket.broadcast.to(data.roomName).emit('receiveExitMessageEvent', data.userName);
        io.sockets.in(data.roomName).emit('receiveExitUserListEvent', userList[data.roomName]);
    });
};
