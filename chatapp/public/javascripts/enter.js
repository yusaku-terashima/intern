'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();
// 入力されたルーム名を取得する
const roomName = $('#roomName').val();
// 送信するデータ
const data = {
    userName: userName,
    roomName: roomName
}
// 入室メッセージイベントを送信する
socket.emit('sendEnterMessageEvent', data);

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterMessageEvent', function (data) {
    $('#thread').append(
        `<div class="card">
        <div class="card-body">
        <p class="card-title">入室通知</p>
        <p class="card-text">${data}さんが入室しました。</p>
        </div>
        </div>`
    );
});

socket.on('receiveEnterUserListEvent', function (userList) {
    $('#userList').children().remove();
    for (let i = 0; i < userList.length; i++) {
        $('#userList').append(
            `<p class="card-text">${userList[i]}</p>`
        );
    }
});
