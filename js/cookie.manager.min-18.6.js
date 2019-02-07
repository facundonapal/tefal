function getCookie(e) {
    var o = document.cookie
      , n = o.indexOf(" " + e + "=");
    if (-1 == n && (n = o.indexOf(e + "=")),
    -1 == n)
        o = null;
    else {
        n = o.indexOf("=", n) + 1;
        var t = o.indexOf(";", n);
        -1 == t && (t = o.length),
        o = unescape(o.substring(n, t))
    }
    return o
}
function setCookie(e, o, n, t) {
    var i = new Date;
    i.setDate(i.getDate() + n);
    var c = escape(o) + (null == n ? "" : "; expires=" + i.toUTCString()) + "; path=/" + t;
    return document.cookie = e + "=" + c,
    !0
}
function saveSelectInCookie(e, o, n) {
    document.getElementById("remember-my-choice").checked ? setCookie(e, o, 365, n) : setCookie(e, "", null, n),
    document.location.replace(o)
}
function readStoredUrlInCookie(e) {
    var o = getCookie(e);
    null != o && "" != o && document.location.replace(o)
}
