ACC.cartpopup = {
    bindAll: function() {
        this.bindCartPop()
    },
    bindCartPop: function() {
        $("#rollover_cart_popup").hide(),
        $("#cart_content").hover(function() {
            $.data(this, "hover", !0)
        }, function() {
            $.data(this, "hover", !1)
        }).data("hover", !1),
        $("#rollover_cart_popup").hover(function() {
            $.data(this, "hover", !0)
        }, function() {
            $.data(this, "hover", !1)
        }).data("hover", !1),
        $("#cart_content").mouseenter(function() {
            $("#cart_popup").hide(),
            $.ajax({
                url: rolloverPopupUrl,
                cache: !1,
                type: "GET",
                success: function(o) {
                    $("#rollover_cart_popup").html(o),
                    $("#rollover_cart_popup .scroll").slimScroll({
                        height: 180,
                        alwaysVisible: !0,
                        allowPageScroll: !1,
                        position: "right",
                        color: "#888",
                        distance: 0,
                        railVisible: !0,
                        wheelStep: 10
                    }),
                    $("#rollover_cart_popup").fadeIn()
                }
            })
        }),
        $(document).on("click", "#ajax_cart_close", function(o) {
            o.preventDefault(),
            $("#rollover_cart_popup").hide()
        }),
        $("#rollover_cart_popup").mouseenter(function() {
            $("#rollover_cart_popup").show()
        })
    },
    refreshMiniCart: function() {
        $.get(refreshMiniCartUrl + Math.floor(101 * Math.random()) * (new Date).getTime(), function(o) {
            $("#minicart_data").html(o),
            $("#minicart_data").removeAttr("hidden")
        })
    }
},
$(document).ready(function() {
    ACC.cartpopup.bindAll()
});
