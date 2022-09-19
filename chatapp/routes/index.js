'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    console.log('ユーザ名:' + request.body.userName);
    response.render('room', { userName: request.body.userName });
});

// 他のルームのチャット画面の表示
router.post('/:room', function(request, response, next) {
    console.log('ユーザ名:' + request.body.userName);
    console.log('ルーム名:' + request.body.roomName);
    response.render('room', {
        userName: request.body.userName,
        roomName: request.body.roomName
    });
});

module.exports = router;
