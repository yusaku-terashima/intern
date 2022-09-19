'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // ルーム名を取得
    const roomName = $('#roomName').val();
    // 現在時刻を取得
    const time = new Date();
    // クライアントからサーバーへ送信するデータ
    const data = {
        userName: userName,
        message: message,
        roomName: roomName,
        time: time.toLocaleString()
    };

    // メッセージが空白または改行のみであるか判定する
    if (isBlank(message)) {
        // 入力エリアを空にする
        $('#message').val('');
        return false;
    }

    // 連続投稿を禁止するために投稿ボタンを無効
    $('#sendButton').prop('disabled', true);

    // 改行コードを<br>タグに置換
    data.message = data.message.replaceAll('\n', '<br>');

    // let c = 0;
    // // 文字数が40文字を超えたら自動的に改行
    // for(let i = 0; i < data.message.length; i++){
    //     if(data.message[i] === '\n'){
    //         c = -1;
    //     }
    //     if(c / 40 >= 1)
    //     {
    //         const a = data.message.slice(0, i);
    //         const b = data.message.slice(i);
    //         data.message = a + '\n' + b;
    //         c = -1;
    //     }
    //     c++;
    // }

    // 内容を表示(自分のみ)
    $('#thread').append(
        `<div class="card">
        <div class="card-body">
        <p class="card-text text-success">${data.userName}さん : ${data.time}</p>
        <p class="card-text text-success">${data.message}</p>
        </div>
        </div>`
    );

    // クライアントからサーバーへデータを送信
    socket.emit('sendMessageEvent', data);

    // 入力エリアを空にする
    $('#message').val('');

    // スクロール位置を設定する
    $(window).scrollTop($('#thread')[0].scrollHeight);

    // 1分後に投稿ボタンを有効
    setTimeout(function() {
        $('#sendButton').prop('disabled', false);
    }, 5000);

    return false;
}

// メッセージが空白または改行のみであるか判定する
function isBlank(message) {
    const tmp = message.replaceAll(/\s/g, '');
    if (tmp === '') {
        return true;
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    // 内容を表示
    $('#thread').append(
        `<div class="card">
        <div class="card-body">
        <p class="card-text">${data.userName}さん : ${data.time}</p>
        <p class="card-text">${data.message}</p>
        </div>
        </div>`
    );
    // スクロール位置を設定する
    $(window).scrollTop($('#thread')[0].scrollHeight);
});