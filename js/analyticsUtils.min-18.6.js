function isEmail(t) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(t)
}
function extractDomain(t) {
    var n;
    return n = t.indexOf("://") > -1 ? t.split("/")[2] : t.split("/")[0],
    n = n.split(":")[0]
}
function isExternalLink(t) {
    return t.host !== window.location.host
}
function sendEvent(t, n) {
    "undefined" != typeof tc_event && $.isFunction(tc_event) ? tc_event(t, n) : console.info("Unable to call TagCommander's event forwarder. Check whether TagCommander is properly loaded.")
}
function getClickNavigationPropertyValue(t, n) {
    return t.siblings("[" + n + "]").attr(n)
}
function getPropertyValue(t, n) {
    return t.attr(n)
}
function clickNavigationSiblingExists(t, n) {
    return t.siblings("[" + n + "]").size() > 0
}
function propertyExists(t, n) {
    var e = $(this).attr("name");
    return void 0 !== e && !1 !== e
}
function isNotPage(t) {
    return !$("body").attr("class").includes("page-" + t)
}
String.prototype.includes || (String.prototype.includes = function() {
    "use strict";
    return -1 !== String.prototype.indexOf.apply(this, arguments)
}
);
