'use strict';

module.exports = function (socket) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        socket.broadcast.to(data.roomName).emit('receiveMessageEvent', data);
    });
};