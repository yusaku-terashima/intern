'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();
    // ルーム名取得
    const roomName = $('#roomName').val();
    // 送信するデータ
    const data = {
        userName: userName,
        roomName: roomName
    }
    // 退室メッセージイベントを送信する
    socket.emit('sendExitMessageEvent', data);
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitMessageEvent', function (data) {
    $('#thread').append(
        `<div class="card">
        <div class="card-body">
        <p class="card-title">退室通知</p>
        <p class="card-text">${data}さんが退室しました。</p>
        </div>
        </div>`
    );
});

socket.on('receiveExitUserListEvent', function (userList) {
    $('#userList').children().remove();
    for (let i = 0; i < userList.length; i++) {
        $('#userList').append(
            `<p class="card-text">${userList[i]}</p>`
        );
    }
});
