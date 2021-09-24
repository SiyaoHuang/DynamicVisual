// ==UserScript==
// @name         Dynamic Visual
// @namespace    https://github.com/SiyaoHuang/DynamicVisual
// @homepage     https://github.com/SiyaoHuang/DynamicVisual
// @version      0.12
// @description  bilibili逐帧播放
// @author       SiyaoHuang
// @include      *://www.bilibili.com/video/av*
// @include      *://www.bilibili.com/video/BV*
// @include      *://www.bilibili.com/bangumi/play/ep*
// @include      *://www.bilibili.com/bangumi/play/ss*
// @include      *://m.bilibili.com/bangumi/play/ep*
// @include      *://m.bilibili.com/bangumi/play/ss*
// @include      *://bangumi.bilibili.com/anime/*
// @include      *://bangumi.bilibili.com/movie/*
// @include      *://www.bilibili.com/bangumi/media/md*
// @include      *://www.bilibili.com/blackboard/html5player.html*
// @include      *://www.bilibili.com/watchroom/*
// @include      *://space.bilibili.com/11783021*
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var video = undefined;
    var slow = false;
    function moveForward(t, x){
        if(slow){
            video.currentTime = video.currentTime + 0.1;
        }
        //console.log(t, video.currentTime, x)
        if(t === undefined){
            t = video.currentTime;
        }
        if(t < video.currentTime){
            return;
        }
        if(x == undefined){
            x = 0.017;
        }
        video.currentTime = t + x;
        x += 0.017;
        setTimeout(function(){
            moveForward(t, x);
        }, 500);
    }
    function moveBackward(t, x){
        if(slow){
            video.currentTime = video.currentTime - 0.1;
        }
        if(t === undefined){
            t = video.currentTime;
        }
        if(t > video.currentTime){
            return;
        }
        if(x == undefined){
            x = 0.017;
        }
        video.currentTime = t - x;
        x += 0.017;
        setTimeout(function(){
            moveBackward(t, x);
        }, 500);
    }

    function setStyle(button, color, i){
        button.style.backgroundColor = color;
        button.style.position = 'absolute';
        button.style.top = '-40px';
        button.style.left = `${i * 30 }px`;
        button.style.width = '20px';
        button.style.height = '20px';
    }
    function MiaoMiaoMiao() {
        var slow = true;
        var frameTime = 0.1;
        var vids = document.getElementsByTagName('bwp-video');
        console.log("get vido");
        if(vids.length == 0){
            vids = document.getElementsByTagName('video');
            console.log("get vido");
            if(vids.length == 0){
                return null;
            }
        }
        console.log("get vido 0");

        video = vids[0];
        console.log(video);
        var plays = document.getElementsByClassName('bilibili-player-video-btn');
        if(plays.length == 0) {
            return null;
        }
        console.log("get plays");
        var play = plays[0];
        document.v = video;
        var nextButton = document.createElement('span');
        setStyle(nextButton, 'rgb(249 120 120 / 38%)', 0);
        nextButton.onclick = function(e) {
            //video.pause();
            moveBackward();
            /*
            console.log(video.currentTime );
            var target = video.currentTime - frameTime;

            video.currentTime = target;
            console.log(video.currentTime );
            */
            e.stopPropagation();
        };
        play.appendChild(nextButton);
        var nextButton2 = document.createElement('span');
        nextButton2.setAttribute("id", "just-test");

        setStyle(nextButton2, 'rgb(249 120 120 / 38%)', 1);
        nextButton2.onclick = function(e) {
            //video.pause();
            moveForward();
            e.stopPropagation();

            /*
            console.log(video.currentTime );
            var target = video.currentTime + frameTime;
            video.currentTime = target;
            console.log(video.currentTime );
            e.stopPropagation();
            */
        };
        play.appendChild(nextButton2);
    }
    setTimeout(function(){
      console.log("start miaomiao");
      MiaoMiaoMiao();
      console.log("miao miao end");
    }, 2000);

    // Your code here...
})();