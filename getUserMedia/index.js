navigator.mediaDevices.enumerateDevices().then(function (data) {
    data.forEach(function (item) {
        if (item.kind == "audioinput") { //麦克风
            document.getElementById("audioDevice").innerHTML += "<option value='" + item.deviceId + "'>" + item.label + " </option> "
        } else if (item.kind == "videoinput") { //摄像头
            document.getElementById("videoDevice").innerHTML += "<option value='" + item.deviceId + "'>" + item.label + " </option> "
        }
    })
}, function (error) {
    console.log(error);
})