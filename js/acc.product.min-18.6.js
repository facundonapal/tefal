function fixBuyInStorePopIn() {
    var o, e, t, n, r;
    o = $("#MapStoreStok"),
    e = $(".page-productDetails #ModalMessage .row-fluid .span8"),
    n = e.height(),
    t = $(".page-productDetails #ModalMessage .row-fluid"),
    r = t.height(),
    o.css("position", "relative"),
    o.css("top", n - r + "px")
}
function getGglAPIKey() {
    var o = null;
    return jQuery.ajax({
        type: "GET",
        url: "/buyonline/gglApiKey/ajax",
        async: !1,
        success: function(e) {
            o = e
        },
        error: function(o, e, t) {
            console.log("Cannot get key api !")
        }
    }),
    o
}
function disableScroll() {
    $("html, body").css({
        overflow: "hidden"
    }),
    console.log("disableScroll")
}
function enableScroll() {
    $("html, body").css({
        overflow: "auto"
    }),
    console.log("enableScroll")
}
ACC.product = {
    bindAll: function() {
        ACC.product.bindToAddToCartForm(),
        ACC.product.bindToAddToCartStorePickUpForm(),
        ACC.product.bindToAddToCartButton(),
        ACC.product.bindBuyOnline(),
        ACC.product.bindBuyInStore(),
        ACC.product.isMobile()
    },
    bindToAddToCartButton: function() {
        $("#addToCartButton").removeAttr("disabled")
    },
    isMobile: function() {
        $(document).width() <= 1024 && ($(document).width() <= 900 && $(document).width() > 720,
        $(document).width() > 720,
        $(document).width())
    },
    countrySelector: function() {
        $("#CountrySeletorBC").click(function() {
            $("#country-selector-bc").toggle()
        }),
        $("#country-selector-bc").mouseleave(function() {
            $("#country-selector-bc").hide()
        })
    },
    bindToAddToCartForm: function() {
        $(".add_to_cart_form").ajaxForm({
            beforeSubmit: function(o, e, t) {
                $(".add-panier").attr("disabled", !0)
            },
            delegation: !0,
            success: ACC.product.displayAddToCartPopup,
            error: function(o, e, t, n) {
                console.error("Error with add to cart response :" + e),
                $(".add-panier").removeAttr("disabled")
            }
        }),
        $("button.add-to-cart").attr("type", "submit")
    },
    bindToAddToCartStorePickUpForm: function() {
        $(".add_to_cart_storepickup_form").ajaxForm({
            success: ACC.product.displayAddToCartPopup
        })
    },
    displayAddToCartPopup: function(o, e, t, n) {
        $(".add-panier").removeAttr("disabled"),
        "function" == typeof ACC.cartpopup.refreshMiniCart && ACC.cartpopup.refreshMiniCart();
        var r = "ModalProductBuy";
        0 == !o.cartError.msg.length ? (r = "ModalCartError",
        $("body").append($("<div />").html(o.cartError.msgModalHtml).text())) : $("body").append($("<div />").html(o.cartModalHtml).text());
        var a = "#" + r;
        $(a).show(),
        $(a).modal(),
        $(a).on("hidden.bs.modal", function() {
            $(a).remove()
        });
        var l = $("[name=productCodePost]", n).val()
          , i = $("[name=qty]", n).val()
          , c = 1;
        void 0 != i && (c = i),
        ACC.product.trackAddToCart(l, c, o)
    },
    trackAddToCart: function(o, e, t) {
        window.mediator.publish("trackAddToCart", {
            productCode: o,
            quantity: e,
            cartData: t
        })
    },
    showCCnotFoundMessages: function() {
        $(".distributor-not-found-msg").show(),
        $(document).on("click", ".return-buy-in-store", function(o) {
            o.preventDefault(),
            $(".product-detail .buyinstore").trigger("click")
        }),
        $("#myCarouselBC").hide()
    },
    bindBuyOnline: function() {
        $(".return-buyonline").on("click", function(o) {
            o.preventDefault(),
            $(".product-detail .buyonline").trigger("click")
        }),
        $(".buyonline").on("click", function(o) {
            ACC.product.checkBuyOnline(this),
            o.preventDefault()
        }),
        $(document).on("click", ".return-buy-in-store", function(o) {
            o.preventDefault(),
            $(".product-detail .buyinstore").trigger("click")
        })
    },
    bindBuyInStore: function() {
        $(document).on("click", ".buyinstore", function(o) {
            ACC.product.checkBuyInStore(this),
            o.preventDefault()
        })
    },
    bindBuyOnlineChangeCountry: function() {
        $(".buyonlineChangeCountry").on("click", function(o) {
            o.preventDefault(),
            ACC.product.checkBuyOnline(this)
        })
    },
    bindBuyInStoreChangeCountry: function() {
        $(".buyinstoreChangeCountry").on("click", function(o) {
            o.preventDefault(),
            ACC.product.checkBuyInStore(this)
        })
    },
    checkBuyOnline: function(o) {
        var e = null;
        e = 0 != $(o).parent().find(".buyonline[seo-data-url]").length ? $(o).attr("seo-data-url") : $(o).attr("href"),
        $.ajax({
            url: e + "/ajax",
            async: !1
        }).done(function(e) {
            console.log(e.message),
            "redirect" == e.reponseCode ? ACC.product.buyonlineRedirect(e.redirectUrl) : "open-popin" != e.reponseCode && "open-ccs-not-found-popin" != e.reponseCode || ACC.product.displayBuyOnline(o, e.reponseCode)
        })
    },
    checkBuyInStore: function(o) {
        var e = $(o).attr("seo-data-url");
        void 0 !== e && !1 !== e ? $.ajax({
            url: $(o).attr("seo-data-url") + "/ajax",
            async: !1
        }).done(function(e) {
            console.log(e.message),
            "redirect" == e.reponseCode ? ACC.product.buyinstoreRedirect(e.redirectUrl) : "open-popin" == e.reponseCode && ACC.product.displayBuyInStore(o)
        }) : window.location.href = $(o).attr("href")
    },
    displayBuyOnline: function(o, e) {
        $.ajax({
            url: $(o).attr("seo-data-url") + "/popin/ajax"
        }).done(function(o) {
            $("#ModalMessage").addClass("modal-business"),
            $("#ModalMessage .modal-body").html(o),
            $("#ModalMessage").show(),
            $("#ModalMessage").modal(),
            disableScroll(),
            ACC.product.countrySelector(),
            ACC.product.bindBuyOnlineChangeCountry(),
            $("#ModalMessage").on("hidden.bs.modal", function() {
                $("#ModalMessage .modal-body").html(""),
                $("#ModalMessage").removeClass("modal-business"),
                enableScroll()
            }),
            $("#myCarouselBC").carousel({
                interval: 1e4
            }),
            $("#myCarouselBC").carousel("cycle"),
            "open-ccs-not-found-popin" == e && ACC.product.showCCnotFoundMessages(),
            $("#SelectbusinessRange").change(function(o) {
                "" != $("#SelectbusinessRange").val() && $.ajax({
                    type: "GET",
                    url: $("#SelectbusinessRange").val()
                }).done(function(o) {
                    var e = !0;
                    try {
                        var t = $.parseJSON(o);
                        console.log(t.message),
                        "redirect" == t.reponseCode && "" == t.errorMessage ? ACC.product.buyonlineRedirect(t.redirectUrl) : ACC.product.showCCnotFoundMessages()
                    } catch (o) {
                        e = !1
                    }
                    e || ($(".distributor-not-found-msg").hide(),
                    $("#StoreConnectorAjax").html(o),
                    $("#myCarouselBC").carousel({
                        interval: 1e4
                    }),
                    $("#myCarouselBC").carousel("cycle"))
                }).error(function(o) {
                    $("#StoreConnectorAjax").html("Error")
                })
            })
        }).error(function(o) {
            $("#ModalMessage .modal-body").html(o.responseText),
            $("#ModalMessage").show(),
            $("#ModalMessage").modal(),
            $("#ModalMessage").on("hidden.bs.modal", function() {
                $("#ModalMessage .modal-body").html(""),
                enableScroll()
            })
        })
    },
    buyonlineRedirect: function(o) {
        var e = $("#buyonline-redirect-link");
        e.attr("href", o);
        new RegExp(location.host);
        new RegExp("^(?:[a-z]+:)?//","i").test(o) ? (e.attr("target", "_blank"),
        e[0].click()) : e[0].click()
    },
    buyinstoreRedirect: function(o) {
        var e = $("#buyinstore-redirect-link");
        e.attr("href", o);
        new RegExp(location.host);
        new RegExp("^(?:[a-z]+:)?//","i").test(o) ? (e.attr("target", "_blank"),
        e[0].click()) : e[0].click()
    },
    displayBuyInStore: function(o) {
        $.ajax({
            url: $(o).attr("seo-data-url") + "/popin/ajax"
        }).done(function(o) {
            $("#ModalMessage").addClass("modal-business"),
            $("#ModalMessage .modal-body").html(o),
            $("#ModalMessage").show(),
            $("#ModalMessage").modal(),
            disableScroll(),
            ACC.product.countrySelector(),
            ACC.product.bindBuyInStoreChangeCountry(),
            $("#ModalMessage").on("hidden.bs.modal", function() {
                $("#ModalMessage .modal-body").html(""),
                $("#ModalMessage").removeClass("modal-business"),
                enableScroll()
            }),
            $("#SelectbusinessRange").change(function(o) {
                "" != $("#SelectbusinessRange").val() && $("#StoreStockLocator").show()
            })
        }).error(function(o) {
            $("#ModalMessage .modal-body").html(o.responseText),
            $("#ModalMessage").show(),
            $("#ModalMessage").modal(),
            $("#ModalMessage").on("hidden.bs.modal", function() {
                $("#ModalMessage .modal-body").html(""),
                enableScroll()
            })
        })
    },
    getBuyInStoreShops: function(o) {
        var e, t;
        (new google.maps.Geocoder).geocode({
            address: $("#FieldLocalisation").val()
        }, function(o, n) {
            if (n == google.maps.GeocoderStatus.OK && (e = o[0].geometry.location.lat(),
            t = o[0].geometry.location.lng(),
            null != e && void 0 != e && null != t && void 0 != t)) {
                var r = $("#buyInStoreForm").attr("action");
                null != $("#SelectbusinessRange").val() && (r = $("#SelectbusinessRange").val()),
                jQuery.ajax({
                    type: "GET",
                    url: r,
                    data: "&lng=" + t + "&lat=" + e + "&" + $("#buyInStoreForm").serialize(),
                    success: function(o) {
                        initScrollingStoreList(),
                        $("#MapStoreStok").html(o),
                        $("#MapStoreStok").find(".sorry").length > 0 && fixBuyInStorePopIn(),
                        ACC.product.bindBuyOnline()
                    },
                    complete: function(o) {}
                })
            }
        })
    },
    getBuyInStoreShopsWithLocateMe: function(o) {
        jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + getGglAPIKey(), ACC.product.positionRetrySuccessNearMe).fail(function(o) {
            console.log("API Geolocation error! \n\n" + o)
        })
    },
    positionRetrySuccessNearMe: function(o) {
        var e = o.location.lat
          , t = o.location.lng;
        if (console.log("lat" + e + "; lng" + t),
        null != e && void 0 != e && null != t && void 0 != t) {
            var n = $("#buyInStoreForm").attr("action");
            null != $("#SelectbusinessRange").val() && (n = $("#SelectbusinessRange").val()),
            jQuery.ajax({
                type: "GET",
                url: n,
                data: "&lng=" + t + "&lat=" + e + "&" + $("#buyInStoreForm").serialize(),
                success: function(o) {
                    $("#MapStoreStok").html(o),
                    $("#MapStoreStok").find(".sorry").length > 0 && fixBuyInStorePopIn(),
                    ACC.product.bindBuyOnline()
                },
                complete: function(o) {}
            })
        }
    },
    bindAutoLocationDirectionButtonClick: function() {
        $(document).on("click", ".btn-direction", function(o) {
            var e = $(this).data("repairlongitude")
              , t = $(this).data("repairlatitude");
            jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + getGglAPIKey(), function(o) {
                ACC.userlocation.directionToRepairCenterGglApi(o, e, t)
            }).fail(function(o) {
                console.log("API Geolocation error! \n\n" + o)
            })
        })
    }
},
$(document).ready(function() {
    ACC.product.bindAll()
});
