/**
 * Author: yharif
 * Date: 11/03/2017
 *
 * Write common utility JS functions here
 */

function calculateDistance(origin, destinations, distanceUnit) {
    var service = new google.maps.DistanceMatrixService;
    var d = $.Deferred();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: distanceUnit,
    }, function(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            d.reject(status);
        } else {
            d.resolve(response);
        }
    });
    return d.promise();
}

/**
 * Class: ClickHandler
 *
 */

function ClickHandler(platforms) {
    var _triggerClickEvent = function(event) {
        event.preventDefault();
        $(event.target).trigger('click');
    }

    var _platform = {
        iPad: _triggerClickEvent,
        iPhone: _triggerClickEvent,
        otherwise: function(event) {}
    };

    if (!!platforms) {
        if (platforms) {
            platforms.forEach(function(platform) {
                _platform[platform] = _triggerClickEvent;
            })
        } else {
            for (var platform in platforms) {
                if (platforms.hasOwnProperty(platform)) {
                    _platform[platform] = platforms[platform];
                }
            }
        }
    }

    return $.extend(this, {
        get platforms() {
            return _platform;
        },
        buid: function(selector, callback) {
            $(document).on('click', selector, callback);
            this.resolve(selector);
        },
        resolve: function(selector) {
            $(document).on('touchstart', selector, _platform[navigator.platform] || _platform.otherwise)
        }
    })
}

/**
 *  GSEB platform helpers
 *
 **/

(function(GSEB, $, window, document, undefined) {
    $.extend(GSEB, {
        platform: {
            $body: $('body'),
            setUserOS: function() {
                var OSName = "";
                if (navigator.appVersion.indexOf("Win") !== -1)
                    OSName = "windows";
                if (navigator.appVersion.indexOf("Mac") !== -1)
                    OSName = "mac";
                if (navigator.appVersion.indexOf("X11") !== -1)
                    OSName = "unix";
                if (navigator.appVersion.indexOf("Linux") !== -1)
                    OSName = "linux";
                this.$body.addClass(OSName);
            },
            setUserAgent: function() {
                if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                    this.$body.addClass('ismobile');
                } else {
                    this.$body.addClass('desktop');
                    if (navigator.userAgent.match(/MSIE 9.0/)) {
                        this.$body.addClass('ie9');
                    }
                }
            },
            getUserAgent: function() {
                return $('body').hasClass('ismobile') ? "ismobile" : "desktop";
            },
            isMobile: function() {
                return $('body').hasClass('ismobile');
            },
            isDesktop: function() {
                return !$('body').hasClass('ismobile');
            }
        }
    })

    GSEB.platform.setUserOS();
    GSEB.platform.setUserAgent();
}
)(window.GSEB, window.jQuery, window, document)

/**
 * Class: Prevent globalScroll
 *
 */

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};
//catch all events that lunch sroll

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableGlobalScroll() {
    if (window.addEventListener)
        // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault;
    // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault;
    // older browsers, IE
    window.ontouchmove = preventDefault;
    // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableGlobalScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
