'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();
    // 選択されたルーム名を取得する
    const roomName = $('#roomName').val();
    
    // ユーザ名が未入力でないかチェックする
    if (isBlank(userName)) {
        window.alert('ユーザ名を入力してください');
        $('#userName').val('');
        return false;
    }

    $('form').attr('action', roomName);
    $('form').submit();
}

// ユーザ名が未入力でないかチェックする
function isBlank(userName) {
    const tmp = userName.replaceAll(/\s/g, '');
    if (tmp === '') {
        return true;
    }
    return false;
}