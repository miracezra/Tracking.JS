

var userBrowser;
document.addEventListener("DOMContentLoaded", async function () {
    var referrer = document.referrer;
    var fullurl = window.location.href;
    var pathName = window.location.pathname;
    var href = pathName.slice(1, fullurl.length);
    var category = "";
    var subCategory = "";
    var newsTitle = "";
    if (href.includes("video") || href.includes("galeri")) {
        category = href.split("/")[0];
        if (category != null || category != undefined) {
            subCategory = href.split("/")[1];
            newsTitle = href.split("/")[2];
        }
        else if (category == null || category == undefined) {
            category = href;
        }
    }
    else if (href !== null || href !== "") {
        category = undefined;
        newsTitle = href.split("/")[1];
        subCategory = href.split("/")[0];
    }
    //var ONE_SECOND = 1000;
    //var totalTime = 0;
    //var lastTime = 0;
    //setInterval(function () {
    //    if (!document.hidden) {
    //        lastTime = totalTime + ONE_SECOND;
    //    }
    //}, ONE_SECOND);
    //function formatTime(ms) {
    //    return Math.floor(ms / 1000);
    //}
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        userBrowser = "Opera"
    }
    else if (navigator.userAgent.indexOf("Edg") != -1) {
        userBrowser = "Edge"
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
        userBrowser = "Chrome"
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
        userBrowser = "Safari"
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        userBrowser = "Firefox"
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        userBrowser = "IE"
    }
    else {
        userBrowser = "unknow"
    }
    // Data Post
    $.ajax({
        method: 'POST',
        type: 'json',
        data: {
            browser: userBrowser,
            userKey: localStorage.getItem("userKey") ? localStorage.getItem("userKey") : "",
            referrer: referrer,
            url: fullurl,
            title: newsTitle,
            category: category,
            subCategory: subCategory,
            // key: localStorage.getItem("userKey") ? localStorage.getItem("userKey") : null,
        },
        url: 'http://localhost:3434/',
        success: function (response) {
            localStorage.setItem("userKey", response.key);
        },
        error: function (error) {
            console.log(error);
        }
    });
})

var userBrowser;
document.addEventListener("DOMContentLoaded", async function () {
    var referrer = document.referrer;
    var fullurl = window.location.href;
    var pathName = window.location.pathname;
    var href = pathName.slice(1, fullurl.length);
    var category = "";
    var subCategory = "";
    var newsTitle = "";
    if (href.includes("video") || href.includes("galeri")) {
        category = href.split("/")[0];
        if (category != null || category != undefined) {
            subCategory = href.split("/")[1];
            newsTitle = href.split("/")[2];
        }
        else if (category == null || category == undefined) {
            category = href;
        }
    }
    else if (href !== null || href !== "") {
        category = undefined;
        newsTitle = href.split("/")[1];
        subCategory = href.split("/")[0];
    }
    //var ONE_SECOND = 1000;
    //var totalTime = 0;
    //var lastTime = 0;
    //setInterval(function () {
    //    if (!document.hidden) {
    //        lastTime = totalTime + ONE_SECOND;
    //    }
    //}, ONE_SECOND);
    //function formatTime(ms) {
    //    return Math.floor(ms / 1000);
    //}
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        userBrowser = "Opera"
    }
    else if (navigator.userAgent.indexOf("Edg") != -1) {
        userBrowser = "Edge"
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
        userBrowser = "Chrome"
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
        userBrowser = "Safari"
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        userBrowser = "Firefox"
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        userBrowser = "IE"
    }
    else {
        userBrowser = "unknow"
    }
    // Data Post
    $.ajax({
        method: 'POST',
        type: 'json',
        data: {
            browser: userBrowser,
            userKey: localStorage.getItem("userKey") ? localStorage.getItem("userKey") : "",
            referrer: referrer,
            url: fullurl,
            title: newsTitle,
            category: category,
            subCategory: subCategory,
            // key: localStorage.getItem("userKey") ? localStorage.getItem("userKey") : null,
        },
        url: 'http://localhost:3434/',
        success: function (response) {
            localStorage.setItem("userKey", response.key);
        },
        error: function (error) {
            console.log(error);
        }
    });
})