var mediator = function() {
    var r = function(r, t) {
        return mediator.trackers[r] || (mediator.trackers[r] = []),
        mediator.trackers[r].push({
            context: this,
            callback: t
        }),
        this
    };
    return {
        trackers: {},
        publish: function(r) {
            if (!mediator.trackers[r])
                return !1;
            for (var t = Array.prototype.slice.call(arguments, 1), a = 0, e = mediator.trackers[r].length; a < e; a++) {
                var i = mediator.trackers[r][a];
                i.callback.apply(i.context, t)
            }
            return this
        },
        publishAll: function() {
            if (0 === Object.keys(mediator.trackers).length)
                return !1;
            for (var r in mediator.trackers) {
                var t = [r].concat(Array.prototype.slice.call(arguments));
                mediator.publish.apply(this, t)
            }
            return this
        },
        subscribe: r
    }
}();
