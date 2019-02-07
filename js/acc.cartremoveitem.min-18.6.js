ACC.cartremoveitem = {
    bindAll: function() {
        this.bindCartRemoveProduct()
    },
    bindCartRemoveProduct: function(t) {
        $(".submitRemoveProduct").on("click", function(t) {
            t.preventDefault();
            var a = $(this).attr("id").split("_")[1];
            $(".ConfDelModal .modal-footer .ConfDelbtn").attr("entry-id", a),
            jQuery(".ConfDelModal").modal()
        }),
        $(".ConfDelbtn").on("click", function(t) {
            t.preventDefault();
            var a = $(this).attr("entry-id")
              , e = $("#updateCartForm" + a).get(0).productCode.value
              , r = $("#updateCartForm" + a).get(0).initialQuantity.value;
            ACC.cartremoveitem.trackRemoveFromCart(e, r),
            $("#updateCartForm" + a).get(0).quantity.value = 0,
            $("#updateCartForm" + a).get(0).initialQuantity.value = 0,
            $("#updateCartForm" + a).get(0).submit()
        }),
        $(".updateQuantityProduct").on("click", function() {
            var t = $(this).attr("id").split("_");
            t = t[1];
            var a = $("#updateCartForm" + t).get(0).productCode.value
              , e = $("#updateCartForm" + t).get(0).initialQuantity.value
              , r = $("#updateCartForm" + t).get(0).quantity.value;
            ACC.cartremoveitem.trackUpdateCart(a, e, r),
            $("#updateCartForm" + t).get(0).submit()
        })
    },
    trackRemoveFromCart: function(t, a) {
        window.mediator.publish("trackRemoveFromCart", {
            productCode: t,
            initialCartQuantity: a
        })
    },
    trackUpdateCart: function(t, a, e) {
        window.mediator.publish("trackUpdateCart", {
            productCode: t,
            initialCartQuantity: a,
            newCartQuantity: e
        })
    }
},
$(document).ready(function() {
    ACC.cartremoveitem.bindAll()
});
