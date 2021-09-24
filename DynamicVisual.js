// ==UserScript==
// @name         动态视力
// @namespace    https://github.com/SiyaoHuang/DynamicVisual
// @version      0.12
// @description  bilibili逐帧播放
// @author       @SiyaoHuang
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function moveForward(video){
        var c = video.currentTime;
        var c0 = video.currentTime;
        var x = 0.017;
        while(c == c0){
            video.currentTime = c0 + x;
            c = video.currentTIme;
            x += 0.017;
        }
    }
    function moveBackward(video){
        var c = video.currentTime;
        var c0 = video.currentTime;
        var x = 0.017;
        while(c == c0){
            video.currentTime = c0 - x;
            c = video.currentTIme;
            x += 0.017;
        }
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

        var video = vids[0];
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
            moveBackward(video);
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
            moveForward(video);
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