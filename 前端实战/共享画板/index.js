navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    // 参数表示需要同时获取到音频和视频
    .then(stream => {
        // 获取到优化后的媒体流
        let video = document.querySelector('#rtc');
        video.srcObject = stream;
    })
    .catch(err => {
        // 捕获错误
    });
