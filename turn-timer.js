// GitHub:    https://github.com/JamesMowery/turn-timer
// By:        James Mowery
// Modified by: Josiah Baldwin
// Contact:   https://app.roll20.net/users/1001679/james-mowery

var count_from = 0;
var seconds = 0;
var last_percentage = 100;
var interval = null;
var bar_chars = {
    "open": "(",
    "empty": "-",
    "full": "|",
    "close": ")"
}

var TurnTimer = TurnTimer || (function() {
    'use strict';

    var version = "0.0.1";
});

function countDown() {
    'use strict';

    seconds = seconds - 1;

    var bar = new Array(12);
    bar[0] = bar_chars.open;
    bar[11] = bar_chars.close;

    var percentage = (seconds/count_from)*100;

    if (seconds <= 0) {
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
        font-weight: bold;'><img src=\
        'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
        width='32px' height='32px' style='float: left;'> \
        <div style='float: left; height: 16px; \
        vertical-align:middle; margin: 8px 0 0 10px;'>\
        Time\'s Up!</div></div>");

        clearInterval(interval);
    }
    else if ((Math.round(percentage/10) >= percentage/10) && Math.round(percentage/10) < (last_percentage/10)) {
        last_percentage = percentage;
        bar.fill(bar_chars.full, 1, 1+(last_percentage/10));
        bar.fill(bar_chars.empty, (last_percentage/10)+1, 11);
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
        font-weight: bold;'><img src=\
        'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
        width='32px' height='32px' style='float: left;'> \
        <div style='float: left; height: 16px; \
        vertical-align:middle; margin: 8px 0 0 10px;'>" +
        bar.join("") + "</div></div>");
    }


}

on("chat:message", function(msg) {
    'use strict'

    // When the GM types !t <number>, start a timer for <number> seconds
    if(msg.type == "api" && msg.content.indexOf("!t ") !== -1) {
        // Clear the previous timer if running.
        clearInterval(interval);

        log("Detected Typing");
        // Extracts the number of seconds in the command
        seconds = Number(msg.content.replace("!t ", ""));
        log(seconds);

        // Begin the countdown
        interval = setInterval(countDown, 1000, seconds);

        // Inform the players that the timer has started
               sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
            font-weight: bold;'><img src=\
            'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
            width='32px' height='32px' style='float: left;'> \
            <div style='float: left; height: 16px; \
            vertical-align:middle; margin: 8px 0 0 10px;'>\
            Timer Started</div></div>");
        count_from = seconds;
        last_percentage = 100;
    }
    // When the GM types !t, start a timer for a default number of seconds
    else if(msg.type == "api" && msg.content.indexOf("!t") !== -1) {
        clearInterval(interval);    // Clear the previous timer if running.
        seconds = 60;               // Sets the default number of seconds

        // Begins the countdown
        interval = setInterval(countDown, 1000, seconds);
        sendChat("GM", "<div style='height:32px; border:1px solid #CCC; \
            font-weight: bold;'><img src=\
            'https://cdn0.iconfinder.com/data/icons/feather/96/clock-512.png' \
            width='32px' height='32px' style='float: left;'> \
            <div style='float: left; height: 16px; \
            vertical-align:middle; margin: 8px 0 0 10px;'>\
            Timer Started - 1 Minute</div></div>");
        count_from = seconds;
        last_percentage = 100;
    }
});

on("ready", function() {
    'use strict';
});