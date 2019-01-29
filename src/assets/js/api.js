export function timer() {
    let hour, minute, second,millisecond;
    hour = minute = second=millisecond = 0;
    setInterval(timerTime(),50);
    function timerTime() {
        millisecond = millisecond + 50;
        if (millisecond >= 1000) {
            millisecond = 0;
            second = second + 1;
        }
        if (second >= 60) {
            second = 0;
            minute = minute + 1;
        }
        if (minute >= 60) {
            minute = 0;
            hour = hour + 1;
        }
        let nowTime = hour + hour + '时' + minute + '分' + second + '秒';
        let id = document.getElementById("cumulativeLoginTime");
        id.innerHTML = nowTime
    }
}

