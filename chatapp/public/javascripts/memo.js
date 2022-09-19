'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 現在時刻を取得
    const time = new Date();
    // メモとして出力するデータ
    const data = {
        userName: userName,
        message: message,
        time: time.toLocaleString()
    };

    // メッセージが空白または改行のみであるか判定する
    if (isBlank(message)) {
        // 入力エリアを空にする
        $('#message').val('');
        return false;
    }

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

    // メモの内容を表示
    $('#thread').append(
        `<div class="card">
        <div class="card-body">
        <p class="card-text text-danger">${data.userName}さんのメモ : ${data.time}</p>
        <p class="card-text text-danger">${data.message}</p>
        </div>
        </div>`
    );

    // 入力エリアを空にする
    $('#message').val('');

    // スクロール位置を設定する
    $(window).scrollTop($('#thread')[0].scrollHeight);
    
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