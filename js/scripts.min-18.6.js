function displyClaimDisclaimer() {
    $(function() {
        $(".claim").tooltip({
            track: !0,
            items: "p",
            content: function() {
                return $(this).closest(".main-claim").find("div.claim-disclaimer").text()
            },
            show: {
                effect: "slideDown",
                delay: 250
            }
        })
    })
}
function openLink(e) {
    window.location = e
}
function addressManager(e) {
    jQuery("#AddressManager").slideUp("fast", function() {
        var t = jQuery(e).attr("data-ajax");
        jQuery.ajax({
            type: "GET",
            url: t,
            success: function(e) {
                $("#AddressManager").html(e)
            },
            complete: function(e) {
                jQuery("#AddressManager").slideDown()
            }
        })
    })
}
function closeAddressManager() {
    jQuery("#AddressManager").slideUp()
}
function confirmDelete(e, t) {
    confirm(t) && alert("you accept : reload the page.")
}
function gotoPoint(e, t) {
    for (google.maps.event.addListenerOnce(map, "center_changed", function(e) {
        this.getZoom() > 13 && this.setZoom(13)
    }),
    map.setCenter(new google.maps.LatLng(locations[e][2],locations[e][3])),
    setTimeout(function() {
        markerCollection[e].setAnimation(null)
    }, "5000"),
    j = 0; j < locations.length; j++)
        markerCollection[j].setAnimation(null);
    null != markerCollection[e].getAnimation() ? markerCollection[e].setAnimation(null) : markerCollection[e].setAnimation(google.maps.Animation.BOUNCE),
    showDetails(t, e)
}
function ShowPic(e) {
    jQuery(".carousel-modal-mini .thumbnails .active").removeClass("active"),
    jQuery(e).parent().addClass("active")
}
function careFilter() {
    distBottom = jQuery(document).height() - jQuery(window).scrollTop(),
    distBottom < 1200 ? jQuery(".sidebar-filters").addClass("affix-bottom") : jQuery(".sidebar-filters").removeClass("affix-bottom")
}
function haveBackdrop() {
    return jQuery(".modal-backdrop").length > 0 && (jQuery(".modal-backdrop").addClass("teaser-backdrop"),
    clearTimeout(mBackdrop),
    !0)
}
function swipeManager() {
    jQuery(document).width() > 1040 ? jQuery(".swipe-arrows").show() : jQuery(".swipe-arrows").hide()
}
function initProductViewer() {
    jQuery(".minishow .item a").click(function() {
        jQuery(".bigshow").carousel("pause")
    })
}
function initJsLinks() {
    jQuery(".item .thumbnail .caption .clearfix a.btn-action").click(function() {
        return window.location = jQuery(this).prop("href"),
        !1
    })
}
function initGoCompare() {
    $(".checkstyleComparator").each(function() {
        $(this).find("input[type=checkbox]").parent("label").find("input[type=checkbox]").each(function() {
            $(this).click(function() {
                var e = $(".gocompare input[type=checkbox]:checked").length;
                $(this).is(":checked") && e < 5 ? $(this).parent().removeClass("checkOff").addClass("checkOn") : $(this).parent().removeClass("checkOn").addClass("checkOff")
            }),
            $(this).is(":checked") ? $(this).parent().removeClass("checkOff").addClass("checkOn") : $(this).parent().removeClass("checkOn").addClass("checkOff")
        })
    }),
    jQuery(".gocompare").each(function() {
        jQuery(this).children("input").is(":checked") && jQuery(".gocompare input[type=checkbox]:checked").length > 1 ? jQuery(this).addClass("active") : jQuery(this).removeClass("active"),
        jQuery(this).children("a.yes").click(function() {
            return window.location = jQuery(this).attr("data-compare"),
            !1
        })
    }),
    jQuery(".gocompare input[type=checkbox]").click(function() {
        if (!(countGoCompare() < 5))
            return $("#ModalMessage .modal-body").html("<p>" + ACC.comparatorMaxProducts + "</p>"),
            $("#ModalMessage").show(),
            $("#ModalMessage").modal(),
            $("#ModalMessage").on("hidden.bs.modal", function() {
                $("#ModalMessage .modal-body").html(""),
                $("#ModalMessage").removeClass("modal-business")
            }),
            !1;
        playGoCompare(jQuery(this)),
        $(".gocompare input[type=checkbox]").trigger("check")
    })
}
function countGoCompare() {
    return jQuery(".gocompare input[type=checkbox]:checked").length
}
function playGoCompare(e) {
    e.is(":checked") ? jQuery(".gocompare input[type=checkbox]:checked").length > 1 ? (e.parent("label").addClass("active"),
    jQuery(".gocompare input[type=checkbox]:checked").parent("label").addClass("active")) : jQuery(".gocompare input[type=checkbox]:checked").parent("label").removeClass("active") : (jQuery(".gocompare input[type=checkbox]:checked").length > 1 ? jQuery(".gocompare input[type=checkbox]:checked").parent("label").addClass("active") : jQuery(".gocompare input[type=checkbox]:checked").parent("label").removeClass("active"),
    e.parent("label").removeClass("active"))
}
function initPushHome() {
    jQuery(".push-home").each(function() {
        jQuery(this).find(".span3").length < 4 && jQuery(this).find(".span3").removeClass("span3").addClass("span4")
    })
}
function initHelper() {
    jQuery(".help-bar").each(function() {
        jQuery(this).find(".span4").length < 3 && (2 == jQuery(this).find(".span4").length && jQuery(this).find(".span4").first().addClass("offset2"),
        1 == jQuery(this).find(".span4").length && jQuery(this).find(".span4").addClass("offset4"))
    })
}
function initSlider(e) {
    var t = e
      , a = parseInt(jQuery(t).attr("data-min"))
      , i = parseInt(jQuery(t).attr("data-max"))
      , o = parseInt(jQuery(t).attr("data-step"))
      , r = jQuery(t).attr("data-values").split(",");
    jQuery(t).slider({
        values: r,
        step: o,
        range: !0,
        min: a,
        max: i,
        create: function(e, a) {
            jQuery(t + "-values .min-value span").html(r[0]),
            jQuery(t + "-values .max-value span").html(r[1])
        },
        change: function(e, a) {
            jQuery(t + "-values .min-value span").html(jQuery(t).slider("values", 0)),
            jQuery(t + "-values .max-value span").html(jQuery(t).slider("values", 1))
        }
    })
}
function setValuesAdvise() {
    var e = parseInt(jQuery(".total-advises").html());
    jQuery(".globalnote .value").each(function() {
        var t = parseInt($(this).children(".total").html())
          , a = 100 / e * t;
        isNaN(t) || $(this).find(".fill").attr("style", "width:" + a + "%;")
    })
}
function scrollableTable() {
    var e = parseInt(jQuery(".scrollableTable").attr("data-visible"));
    jQuery(".scrollableTable").hide(),
    jQuery('.scrollable-control[data-slide="prev"]').addClass("disabled"),
    jQuery(".scrollableTable th:not(.info), .scrollableTable td:not(.info,.disclamer)").each(function() {
        jQuery(this).hide(),
        jQuery(this).hover(function() {
            jQuery(this).toggleClass("on");
            var e = jQuery(this).parent("tr").children(".on").index();
            e > 0 ? jQuery(".scrollableTable tr").each(function() {
                jQuery(this).children(":eq(" + e + ")").addClass("on")
            }) : jQuery(".on").removeClass("on")
        })
    }),
    jQuery(".scrollableTable .info").show();
    for (var t = 1; t <= e; t++)
        jQuery(".scrollableTable tr").each(function() {
            jQuery(this).children("th:eq(" + t + "), td:eq(" + t + ")").show().addClass("active")
        });
    jQuery(".scrollable-control").bind("click", function() {
        var e = this;
        jQuery(e).hide(),
        jQuery(".scrollableTable tr").each(function() {
            var t = this;
            if ("next" == jQuery(e).attr("data-slide"))
                if (jQuery(this).children("th.active:not(.info), td.active:not(.info)").last().next().length > 0) {
                    jQuery('.scrollable-control[data-slide="prev"]').removeClass("disabled");
                    var a = jQuery(this).children("th.active:not(.info), td.active:not(.info)").last().next();
                    jQuery(this).children("th.active:not(.info), td.active:not(.info)").first().hide("slide", {
                        direction: "left"
                    }, "fast", function() {
                        a.show("slide", {
                            direction: "right"
                        }, "fast").addClass("active"),
                        jQuery(e).show(function() {
                            0 == jQuery(t).children(".active:not(.info)").last().next().length && jQuery(e).addClass("disabled")
                        })
                    }).removeClass("active")
                } else
                    jQuery(e).addClass("disabled"),
                    jQuery(e).show();
            else if (jQuery(this).children("th.active:not(.info), td.active:not(.info)").first().prevUntil(".info").length > 0) {
                jQuery('.scrollable-control[data-slide="next"]').removeClass("disabled");
                var i = jQuery(this).children("th.active:not(.info), td.active:not(.info)").first().prev();
                jQuery(this).children("th.active:not(.info), td.active:not(.info)").last().hide("slide", {
                    direction: "right"
                }, "fast", function() {
                    i.show("slide", {
                        direction: "left"
                    }, "fast").addClass("active"),
                    jQuery(e).show(function() {
                        0 == jQuery(t).children(".active:not(.info)").first().prev(":not(.info)").length && jQuery(e).addClass("disabled")
                    })
                }).removeClass("active")
            } else
                jQuery(e).addClass("disabled"),
                jQuery(e).show()
        })
    }),
    jQuery(".scrollableTable table tbody tr:first-child td:not(.info,.reference)").length < e && jQuery(".scrollableTable .scrollable-control").hide(),
    jQuery(".scrollableTable").show()
}
function scrollableSubnav(e) {
    var t = parseInt(jQuery(e + " .scrollable").attr("data-visible"));
    if (jQuery(e + ' .subnav-control[data-slide="prev"]').addClass("disabled"),
    jQuery(e + " .scrollable .item").length > t) {
        jQuery(e + " .subnav-control").show(),
        jQuery(e + " .scrollable .item").hide(),
        jQuery(e + ' .scrollable-control[data-slide="prev"]').addClass("disabled");
        for (var a = 0; a < t; a++)
            jQuery(e + " .scrollable .item:eq(" + a + ")").show().addClass("visible");
        jQuery(e + " .subnav-control").bind("click", function() {
            var t = this;
            $(t).hide(),
            jQuery(e + " .scrollable .scroll").each(function() {
                if ("next" == jQuery(t).attr("data-slide"))
                    if (jQuery(this).children(".item.visible").last().next().length > 0) {
                        jQuery(e + ' .subnav-control[data-slide="prev"]').removeClass("disabled");
                        var a = jQuery(this).children(".item.visible").last().next();
                        jQuery(this).children(".item.visible").first().hide("fast", function() {
                            a.show("fast").addClass("visible"),
                            $(t).show(function() {
                                0 == jQuery(e + " .scrollable .item.visible").last().next().length && jQuery(t).addClass("disabled")
                            })
                        }).removeClass("visible")
                    } else
                        jQuery(t).addClass("disabled"),
                        $(t).show();
                else if (jQuery(this).children(".item.visible").first().prev().length > 0) {
                    jQuery(e + ' .subnav-control[data-slide="next"]').removeClass("disabled");
                    var i = jQuery(this).children(".item.visible").first().prev();
                    jQuery(this).children(".item.visible").last().hide("fast", function() {
                        i.show("fast").addClass("visible"),
                        $(t).show(function() {
                            0 == jQuery(e + " .scrollable .item.visible").first().prev().length && jQuery(t).addClass("disabled")
                        })
                    }).removeClass("visible")
                } else
                    jQuery(t).addClass("disabled"),
                    $(t).show()
            })
        }),
        jQuery(e + " .scrollable").show()
    } else
        jQuery(e + " .subnav-control").hide()
}
function scrollableAdvises() {
    var e = parseInt(jQuery(".advices-list").attr("data-visible"));
    if (jQuery(".advices-list .item").length > e) {
        jQuery(".advices-list .item").hide(),
        jQuery('.advices-list .advises-control[data-slide="prev"]').addClass("disabled");
        for (var t = 0; t < e; t++)
            jQuery(".advices-list .item:eq(" + t + ")").show().addClass("visible");
        jQuery(".advices-list .advises-control").bind("click", function(e) {
            e.preventDefault();
            var t = this;
            $(t).hide(),
            jQuery(".advices-list .row-fluid").each(function() {
                if ("next" == jQuery(t).attr("data-slide"))
                    if (jQuery(this).children(".item.visible").last().next().length > 0) {
                        jQuery('.advices-list .advises-control[data-slide="prev"]').removeClass("disabled");
                        var e = jQuery(this).children(".advices-list .item.visible").last().next();
                        jQuery(this).children(".item.visible").first().hide("fast", function() {
                            e.show("fast").addClass("visible"),
                            $(t).show(function() {
                                0 == jQuery(".advices-list .item.visible").last().next(".item").length && jQuery(t).addClass("disabled")
                            })
                        }).removeClass("visible")
                    } else
                        jQuery(t).addClass("disabled"),
                        $(t).show();
                else if (jQuery(this).children(".item.visible").first().prev().length > 0) {
                    jQuery('.advices-list .advises-control[data-slide="next"]').removeClass("disabled");
                    var a = jQuery(this).children(".item.visible").first().prev();
                    jQuery(this).children(".item.visible").last().hide("fast", function() {
                        a.show("fast").addClass("visible"),
                        $(t).show(function() {
                            0 == jQuery(".advices-list .item.visible").first().prev(".item").length && jQuery(t).addClass("disabled")
                        })
                    }).removeClass("visible")
                } else
                    jQuery(t).addClass("disabled"),
                    $(t).show()
            })
        }),
        jQuery(".advices-list").show()
    } else
        jQuery(".advices-list .advises-control").hide()
}
function scrollableLames() {
    jQuery(".scrollable-lame").each(function() {
        var e = this
          , t = parseInt(jQuery(e).attr("data-visible"));
        if (jQuery(e).find(".item").length > t) {
            jQuery(e).find(".item").hide(),
            jQuery(e).find('.lame-control[data-slide="prev"]').addClass("disabled");
            for (var a = 0; a < t; a++)
                jQuery(e).find(".item:eq(" + a + ")").show().addClass("visible");
            jQuery(e).find(".lame-control").bind("click", function() {
                var t = this;
                if (jQuery(t).hide(),
                "next" == jQuery(t).attr("data-slide"))
                    if (jQuery(e).find(".visible").last().next().length > 0) {
                        jQuery(e).find('.lame-control[data-slide="prev"]').removeClass("disabled");
                        var a = jQuery(e).find(".visible").last().next();
                        jQuery(e).find(".visible").first().hide(0, function() {
                            a.show(0).addClass("visible"),
                            $(t).show(function() {
                                0 == jQuery(e).find(".visible").last().next().length && jQuery(t).addClass("disabled")
                            })
                        }).removeClass("visible")
                    } else
                        jQuery(t).addClass("disabled"),
                        $(t).show();
                else if (jQuery(e).find(".visible").first().prev().length > 0) {
                    jQuery(e).find('.lame-control[data-slide="next"]').removeClass("disabled");
                    var i = jQuery(e).find(".visible").first().prev();
                    jQuery(e).find(".visible").last().hide(0, function() {
                        i.show(0).addClass("visible"),
                        jQuery(t).show(function() {
                            0 == jQuery(e).find(".visible").first().prev().length && jQuery(t).addClass("disabled")
                        })
                    }).removeClass("visible")
                } else
                    jQuery(t).addClass("disabled"),
                    jQuery(t).show();
                seeMore()
            }),
            jQuery(e).show()
        } else
            jQuery(e).find(".lame-control").hide()
    })
}
function ManageQty(e, t) {
    var a = parseInt(jQuery(e).parent().children("input").val())
      , i = parseInt(jQuery(e).parent().children("input").attr("data-limitmax"));
    t > 0 ? a < i ? jQuery(e).parent().children("input").val(a + 1) : $("#ModalMessage").modal({
        remote: "includes/limit-item.php",
        show: !0
    }) : a > 0 && jQuery(e).parent().children("input").val(a - 1)
}
function PromotionnalValidation(e) {
    return 1 == jQuery(e).validationEngine("validate") ? jQuery(e).submit() : jQuery(e).validationEngine(),
    !1
}
function userValue(e) {
    "value-user" === jQuery(e).val() && (jQuery(e).hide(),
    jQuery("#input_product_ref_user").show().focus(),
    jQuery("#input_product_ref_user").blur(function() {
        0 == jQuery(this).val().length && (jQuery("#input_product_ref_select option").first().attr("selected", "selected"),
        jQuery("#input_product_ref_select").show(),
        jQuery(this).hide())
    }))
}
function PaginationStore(e) {
    jQuery.ajax({
        url: jQuery(e).attr("href")
    }).done(function(e) {
        jQuery("#StoreLocator").html(e).slideDown("slow", "linear"),
        PaginationStoreNav(),
        initScrollingStoreList()
    })
}
function PaginationStoreNav() {
    if ($(".pagination").length) {
        var e = $(".pagination")
          , t = e.find("li").length
          , a = e.find("li.active").index();
        e.find("li").hide();
        for (var i = a - 4; i < a + 4; i++)
            i >= 0 && i <= t && e.find("li").eq(i).show();
        e.find("li:last-child").show(),
        e.find("li:first-child").show()
    }
}
function ajaxFormContact(e) {
    jQuery("#AjaxContact").empty(),
    "" != jQuery(e).val() && jQuery.ajax({
        url: jQuery(e).val()
    }).done(function(e) {
        jQuery("#AjaxContact").append(e).slideDown("slow", "linear")
    })
}
function ShowSubList(e, t) {
    "" != jQuery(e).val() && (jQuery(".substeps-" + (t + 1)).slideUp("fast"),
    jQuery("#Step" + jQuery(e).val()).slideDown("slow")),
    2 != t && jQuery(".substeps-3").slideUp("fast"),
    3 != t && jQuery("#FullFormContact, #FormContactActions, #ContactAddress, #RequestFormContact, #ContactFormCaptcha, #ContactFormPrivacy").slideUp("fast")
}
function ShowFromContact() {
    jQuery("#FullFormContact, #FormContactActions, #ContactAddress, #RequestFormContact, #ContactFormCaptcha, #ContactFormPrivacy").slideDown()
}
function submitFormCart(e) {
    return 1 == jQuery(e).validationEngine("validate") ? (alert("valid form cart"),
    jQuery(e).submit()) : jQuery(e).validationEngine(),
    !1
}
function submitFormUser(e) {
    return 1 == jQuery(e).validationEngine("validate") ? (alert("valid form user"),
    jQuery(e).submit()) : jQuery(e).validationEngine(),
    !1
}
function initScrollingStoreList() {
    jQuery(".scroll-store").slimScroll({
        height: 360,
        alwaysVisible: !0,
        allowPageScroll: !1,
        position: "right",
        color: "#888",
        distance: 0,
        railVisible: !1,
        wheelStep: 10
    })
}
function toggleniv2(e) {
    var t = e.parent().find(".niv2");
    if (e.hasClass("actif"))
        return $(".niv2").removeClass("open"),
        e.removeClass("actif"),
        !1;
    $(".niv2").removeClass("open"),
    $(".niv1 .actif").removeClass("actif"),
    e.addClass("actif"),
    $(".mobile-back").addClass("back"),
    $(t).toggleClass("open")
}
function openNav() {
    var e = $(".main-nav")
      , t = $(".toggle-nav")
      , a = $(".overlay");
    $(".mobile-back").hide(),
    e.hasClass("show-nav") ? (e.removeClass("show-nav"),
    t.removeClass("active"),
    $(".niv2").removeClass("open"),
    $(".niv1 .actif").removeClass("actif"),
    a.removeClass("open"),
    $(".wrap-main-content").removeClass("open-nav")) : (t.addClass("active"),
    e.addClass("show-nav"),
    a.addClass("open"),
    $(".wrap-main-content").addClass("open-nav"),
    $(".mobile-back").show())
}
function openFirstAccordion() {
    var e = $(".main-nav .navigation .accordion-group").first();
    e.find(".accordion-body").css("height", "auto").addClass("in"),
    e.find(".accordion-toggle").removeClass("collapsed").addClass("active")
}
function PageLoader(e) {
    "show" == e ? (jQuery(".LoaderWait").show(),
    setTimeout(function() {
        jQuery(".LoaderWait").fadeOut("slow")
    }, 5e3)) : jQuery(".LoaderWait").fadeOut("slow")
}
function closeDaumPostcode() {
    document.getElementById("layer").style.display = "none"
}
function showDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(e) {
            document.getElementById("input_zip_code").value = e.postcode1 + "-" + e.postcode2;
            var t = e.address.replace(/(\s|^)\(.+\)$|\S+~\S+/g, "");
            document.getElementById("input_street_name").value = t + " ",
            document.getElementById("layer").style.display = "none",
            $("#input_street_name").focus()
        },
        width: "100%",
        height: "100%"
    }).embed(document.getElementById("layer")),
    document.getElementById("layer").style.display = "block"
}
function showDaumAccountPostcode(e) {
    new daum.Postcode({
        oncomplete: function(t) {
            var a = e.closest("form");
            $("#" + a.id).find("#postcode").val(t.postcode1 + "-" + t.postcode2);
            var i = t.address.replace(/(\s|^)\(.+\)$|\S+~\S+/g, "");
            $("#" + a.id).find("#streetName").val(i + " "),
            document.getElementById("layer").style.display = "none",
            $("#" + a.id).find("#streetName").focus()
        },
        width: "100%",
        height: "100%"
    }).embed(document.getElementById("layer")),
    document.getElementById("layer").style.display = "block"
}
function redimensionner(e) {
    var t = 0
      , a = $(".product-comparison .picture img,.product-list .item .thumbnail img");
    $(".product-comparison .picture > a,.product-list .item .thumbnail > a").each(function() {
        $(this).height("auto"),
        $(this).height() > t && (t = $(this).height())
    }),
    $(".product-comparison .picture > a,.product-list .item .thumbnail > a").each(function() {
        $(this).height(t)
    }),
    a.css("position", "relative"),
    a.each(function() {
        $(this).css("top", ($(this).parent().height() - $(this).outerHeight(!0)) / 2)
    })
}
function getURLParameter(e) {
    for (var t = window.location.search.substring(1), a = t.split("&"), i = 0; i < a.length; i++) {
        var o = a[i].split("=");
        if (o[0] == e)
            return o[1]
    }
}
function searchAjax() {
    var e = $("#search-filter_reparability").val();
    $.ajax({
        type: "GET",
        url: "productRef/search?text=" + e,
        timeout: 1e5,
        success: function(e) {
            if ($(".AjaxaReparabilityResult").hide(),
            $(".notfound-reparable").hide(),
            "found" == e.flag)
                if ("YES" == e.product.reparabilityIncluded) {
                    $(".AjaxaReparabilityResult").hide();
                    var t = "";
                    t += "<div class='resultReparability' >",
                    null != e.product.images && (t += " <div class='mediaReparability'><img src=" + e.product.images[0].url + "></div> "),
                    t += " <div class='detailReparability'> ",
                    t += " <div class='product-detail '>",
                    t += " <h1>" + e.product.name + "</h1> ",
                    null != e.product.commercialCode && (t += " <span class='ref'> " + reparabilityProductRef + e.product.commercialCode.toUpperCase() + "</span> "),
                    t += " <div class='resultsReparability raparable'> ",
                    t += " <span class='title' >" + reparabilityFoundMessage + "</span>",
                    t += " <span class='repareMessage1' >" + reparabilityParagraph1 + "</span>",
                    t += " <span class='repareMessage2' >" + reparabilityParagraph2 + "</span>",
                    t += " <span class='repareNotice' >" + reparabilityNotice + "</span>",
                    t += " <a href='" + reparabilityUrlFinfRepairs + "' class='btn btn-action findStoresNearMe' >" + reparabilitybuttonFinfRepairs + "</a>",
                    t += " </div>",
                    t += " </div>",
                    t += " </div> ",
                    t += " <div style='display: block;clear: both;'>",
                    t += " </div>",
                    $(".AjaxaReparabilityResult").html(t),
                    $(".AjaxaReparabilityResult").slideDown("slow", function() {
                        var e = parseInt($(".search-area-reparability").css("height")) + 249;
                        $(".top-reparability").css("height", e + "px")
                    })
                } else if ("NO" == e.product.reparabilityIncluded) {
                    $(".AjaxaReparabilityResult").hide();
                    var t = "";
                    t += "<div class='resultReparability' >",
                    null != e.product.images && (t += " <div class='mediaReparability'><img src=" + e.product.images[0].url + "></div> "),
                    t += " <div class='detailReparability'> ",
                    t += " <div class='product-detail '>",
                    t += " <h1>" + e.product.name + "</h1> ",
                    null != e.product.commercialCode && (t += " <span class='ref'> " + reparabilityProductRef + e.product.commercialCode.toUpperCase() + "</span> "),
                    t += " <div class='resultsReparability non-reparable'> ",
                    t += " <span class='title' >" + reparabilityKOMessage + "</span>",
                    t += " <span class='repareMessage1 ' >" + reparabilityKOParagraph1 + "</span>",
                    t += " <span class='repareMessage2' >" + reparabilityKOParagraph2 + "</span>",
                    t += " <a href='" + reparabilityUrlFinfRepairs + "' class='btn btn-action findStoresNearMe' >" + reparabilitybuttonFinfRepairs + "</a>",
                    t += " </div>",
                    t += " </div>",
                    t += " </div> ",
                    t += " <div style='display: block;clear: both;'>",
                    t += " </div>",
                    $(".AjaxaReparabilityResult").html(t),
                    $(".AjaxaReparabilityResult").slideDown("slow", function() {
                        var e = parseInt($(".search-area-reparability").css("height")) + 249;
                        $(".top-reparability").css("height", e + "px")
                    })
                } else {
                    $(".AjaxaReparabilityResult").hide();
                    var t = "";
                    t += "<div class='resultReparability' >",
                    null != e.product.images && (t += " <div class='mediaReparability'><img src=" + e.product.images[0].url + "></div> "),
                    t += " <div class='detailReparability'> ",
                    t += " <div class='product-detail '>",
                    t += " <h1>" + e.product.name + "</h1> ",
                    null != e.product.commercialCode && (t += " <span class='ref'> " + reparabilityProductRef + e.product.commercialCode.toUpperCase() + "</span> "),
                    t += " <div class='resultsReparability reparablility-notdefined'> ",
                    t += " <span class='title' >" + reparabilityNotDefinedMessage + "</span>",
                    t += " <span class='repareMessage1 ' >" + reparabilityNotDefinedParagraph1 + "</span>",
                    t += " <span class='repareMessage2' >" + reparabilityNotDefinedParagraph2 + "</span>",
                    t += " <a href='" + reparabilityUrlFinfRepairs + "' class='btn btn-action findStoresNearMe' >" + reparabilitybuttonFinfRepairs + "</a>",
                    t += " </div>",
                    t += " </div>",
                    t += " </div> ",
                    t += " <div style='display: block;clear: both;'>",
                    t += " </div>",
                    $(".AjaxaReparabilityResult").html(t),
                    $(".AjaxaReparabilityResult").slideDown("slow", function() {
                        var e = parseInt($(".search-area-reparability").css("height")) + 249;
                        $(".top-reparability").css("height", e + "px")
                    })
                }
            else if ("foundAtComeSite" == e.flag)
                Modal.displayReparabilityModal(e);
            else {
                $(".notfound-reparable").hide();
                var t = "";
                t += " <span>",
                t += " <p>" + reparabilityNotFound + "</p>",
                t += " </span>",
                $(".notfound-reparable").html(t),
                $(".notfound-reparable").slideDown("slow")
            }
        },
        error: function(e) {
            console.log("ERROR: ", e),
            display(e)
        },
        done: function(e) {
            console.log("DONE")
        }
    })
}
function validateDeliveryMode(e) {
    if ($(e).is(":checked")) {
        var t = $(e).attr("value")
          , a = $("#isValidDeliveryAjaxUrl").attr("value")
          , i = {
            deliveryModeCode: t
        };
        $.ajax({
            url: a,
            type: "POST",
            data: i,
            success: function(e) {
                e || ($("#priceZone").addClass("hidden"),
                $("#deliveryErrorMessage").addClass("invalid-delivery"),
                $("#deliveryErrorMessage").removeClass("hidden"))
            }
        })
    }
}
function checkRightToDeletAccount(e, t, a) {
    var i = $($(e)).attr("data")
      , o = {
        checkCart: a
    };
    $.ajax({
        url: i,
        async: !1,
        data: o
    }).done(function(e) {
        "CART_IN" == e ? ($("#ModalRemoveCart").show(),
        $("#ModalRemoveCart").modal()) : "NOK" == e ? (t.preventDefault(),
        $("#ModalBlockDeleteAccount").show(),
        $("#ModalBlockDeleteAccount").modal()) : "OK" == e && (t.preventDefault(),
        $("#ModalDeleteAccount").show(),
        $("#ModalDeleteAccount").modal())
    }).error(function(e) {
        t.preventDefault(),
        console.log("Error in validing account deletion !")
    })
}
function removeDuplicates(e, t) {
    var a = []
      , i = {};
    for (var o in e)
        i[e[o][t]] = e[o];
    for (o in i)
        a.push(i[o]);
    return a
}
function setActiveLPRecipeAccordion() {
    $(".cook-and-grain-filters .accordion-body").each(function() {
        $(this).hasClass("in") && $(this).siblings(".accordion-heading").find(".accordion-toggle").addClass("active")
    })
}
function smoothScrollingTo(e, t) {
    var a = $(e);
    if ($(".add-service-popup").length > 0) {
        var i = $(".service-popup .modal-body");
        i.animate({
            scrollTop: a.offset().top - i.offset().top + i.scrollTop()
        }, 500)
    } else
        a.offset() && $("html,body").animate({
            scrollTop: a.offset().top - (t || 70)
        }, 500)
}
function emptyCoordinatesIfNoLocationQuery(e) {
    new URL(e).searchParams.get("q") || ($("#nearMeStorefinderForm #latitude").val(""),
    $("#nearMeStorefinderForm #longitude").val(""))
}
function appendStoreLocatorAjaxResultToHTML(e) {
    $("#repair-store-filter").html($(e).find("#repair-store-filter").html()),
    $("#search-filter_repairs").replaceWith($(e).find("#search-filter_repairs").first()),
    $(".page-my-repairers").length && $(".scroll-store").html($(e).find(".scroll-store").html()),
    $("#StoreLocator").html($(e).find("#StoreLocator").html()),
    $("#cssRepairersMapFilter #StoreLocator > .repairs-filter-distance").hide()
}
function pushStoreLocatorParamsToHistoryState(e) {
    var t = document.createElement("a");
    t.href = e,
    history.pushState({}, "storeLocatorQueryParams", t.search)
}
function submitStoreLocatorFormWithAjax(e, t) {
    $("#StoreLocator").addClass("ajax-overlay");
    var a = $("input[name='isAddServicePopup']").val()
      , i = void 0 !== a && a
      , o = i ? "/consumer-services/warranty-and-repairs/repairers-popup" : [location.protocol, "//", location.host, location.pathname].join("");
    $.ajax({
        type: t,
        url: o,
        data: e.serialize(),
        success: function(e, t, a) {
            $("#StoreLocator").removeClass("ajax-overlay"),
            pushStoreLocatorParamsToHistoryState(i ? this.url.substring(0, this.url.indexOf("?")) : this.url),
            appendStoreLocatorAjaxResultToHTML(e),
            initScrollingStoreList(),
            i && $("#accessory-pointOfServiceName").val("")
        },
        error: function(e) {
            $("#StoreLocator").removeClass("ajax-overlay"),
            console.log(e)
        }
    })
}
function getStoreLocatorFragment(e) {
    $.ajax({
        type: "GET",
        url: e,
        success: function(e, t, a) {
            pushStoreLocatorParamsToHistoryState(this.url),
            appendStoreLocatorAjaxResultToHTML(e),
            initScrollingStoreList()
        },
        error: function(e) {
            console.log(e)
        }
    })
}
function GetIEVersion() {
    var e = window.navigator.userAgent
      , t = e.indexOf("MSIE");
    return t > 0 ? parseInt(e.substring(t + 5, e.indexOf(".", t))) : navigator.userAgent.match(/Trident\/7\./) ? 11 : 0
}
!function(e) {
    function t(e, t) {
        if (8 == c) {
            var a = f.width()
              , i = s.debounce(function() {
                var e = f.width();
                a != e && (a = e,
                t())
            }, 1);
            f.on(e, i)
        } else
            f.on(e, s.debounce(t, 1))
    }
    function a(e) {
        window && window.console && window.console.error && window.console.error("jQuery.floatThead: " + e)
    }
    function i(e) {
        var t = e.getBoundingClientRect();
        return t.width || t.right - t.left
    }
    function o() {
        var t = e('<div style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%"></div>');
        e("body").append(t);
        var a = t.innerWidth()
          , i = e("div", t).innerWidth();
        return t.remove(),
        a - i
    }
    function r(e) {
        if (e.dataTableSettings)
            for (var t = 0; t < e.dataTableSettings.length; t++) {
                var a = e.dataTableSettings[t].nTable;
                if (e[0] == a)
                    return !0
            }
        return !1
    }
    function n(e, t, a) {
        var i = a ? "outerWidth" : "width";
        if (h && e.css("max-width")) {
            var o = 0;
            a && (o += parseInt(e.css("borderLeft"), 10),
            o += parseInt(e.css("borderRight"), 10));
            for (var r = 0; r < t.length; r++)
                o += t.get(r).offsetWidth;
            return o
        }
        return e[i]()
    }
    e.floatThead = e.floatThead || {},
    e.floatThead.defaults = {
        headerCellSelector: "tr:visible:first>*:visible",
        zIndex: 1001,
        position: "auto",
        top: 0,
        bottom: 0,
        scrollContainer: function() {
            return e([])
        },
        getSizingRow: function(e) {
            return e.find("tbody tr:visible:first>*:visible")
        },
        floatTableClass: "floatThead-table",
        floatWrapperClass: "floatThead-wrapper",
        floatContainerClass: "floatThead-container",
        copyTableClass: !0,
        enableAria: !1,
        autoReflow: !1,
        debug: !1
    };
    var s = window._
      , l = "undefined" != typeof MutationObserver
      , c = function() {
        for (var e = 3, t = document.createElement("b"), a = t.all || []; e = 1 + e,
        t.innerHTML = "\x3c!--[if gt IE " + e + "]><i><![endif]--\x3e",
        a[0]; )
            ;
        return e > 4 ? e : document.documentMode
    }()
      , d = /Gecko\//.test(navigator.userAgent)
      , u = /WebKit\//.test(navigator.userAgent)
      , h = function() {
        if (u) {
            var t = e('<div style="width:0px"><table style="max-width:100%"><tr><th><div style="min-width:100px;">X</div></th></tr></table></div>');
            e("body").append(t);
            var a = 0 == t.find("table").width();
            return t.remove(),
            a
        }
        return !1
    }
      , p = !d && !c
      , f = e(window);
    e.fn.floatThead = function(d) {
        if (d = d || {},
        !s && !(s = window._ || e.floatThead._))
            throw new Error("jquery.floatThead-slim.js requires underscore. You should use the non-lite version since you do not have underscore.");
        if (8 > c)
            return this;
        var v = null;
        if (s.isFunction(h) && (h = h()),
        s.isString(d)) {
            var m = d
              , g = this;
            return this.filter("table").each(function() {
                var t = e(this)
                  , a = t.data("floatThead-lazy");
                a && t.floatThead(a);
                var i = t.data("floatThead-attached");
                if (i && s.isFunction(i[m])) {
                    var o = i[m]();
                    void 0 !== o && (g = o)
                }
            }),
            g
        }
        var y = e.extend({}, e.floatThead.defaults || {}, d);
        if (e.each(d, function(t) {
            t in e.floatThead.defaults || !y.debug || a("Used [" + t + "] key to init plugin, but that param is not an option for the plugin. Valid options are: " + s.keys(e.floatThead.defaults).join(", "))
        }),
        y.debug) {
            var b = e.fn.jquery.split(".");
            1 == parseInt(b[0], 10) && parseInt(b[1], 10) <= 7 && a("jQuery version " + e.fn.jquery + " detected! This plugin supports 1.8 or better, or 1.7.x with jQuery UI 1.8.24 -> http://jqueryui.com/resources/download/jquery-ui-1.8.24.zip")
        }
        return this.filter(":not(." + y.floatTableClass + ")").each(function() {
            function d(e) {
                return e + ".fth-" + D + ".floatTHead"
            }
            function h() {
                var t = 0;
                if (R.children("tr:visible").each(function() {
                    t += e(this).outerHeight(!0)
                }),
                "collapse" == M.css("border-collapse")) {
                    var a = parseInt(M.css("border-top-width"), 10);
                    a > parseInt(M.find("thead tr:first").find(">*:first").css("border-top-width"), 10) && (t -= a / 2)
                }
                re.outerHeight(t),
                ne.outerHeight(t)
            }
            function m() {
                var e = n(M, ce, !0)
                  , t = O.width() || e
                  , a = "hidden" != O.css("overflow-y") ? t - z.vertical : t;
                if (ae.width(a),
                q) {
                    var i = 100 * e / a;
                    Z.css("width", i + "%")
                } else
                    Z.outerWidth(e)
            }
            function g() {
                I = (s.isFunction(y.top) ? y.top(M) : y.top) || 0,
                P = (s.isFunction(y.bottom) ? y.bottom(M) : y.bottom) || 0
            }
            function b() {
                var t, a = R.find(y.headerCellSelector);
                if (ee ? t = X.find("col").length : (t = 0,
                a.each(function() {
                    t += parseInt(e(this).attr("colspan") || 1, 10)
                })),
                t != N) {
                    N = t;
                    for (var i, o = [], r = [], n = [], s = 0; t > s; s++)
                        o.push(y.enableAria && (i = a.eq(s).text()) ? '<th scope="col" class="floatThead-col">' + i + "</th>" : '<th class="floatThead-col"/>'),
                        r.push("<col/>"),
                        n.push("<fthtd style='display:table-cell;height:0;width:auto;'/>");
                    r = r.join(""),
                    o = o.join(""),
                    p && (n = n.join(""),
                    te.html(n),
                    ce = te.find("fthtd")),
                    re.html(o),
                    ne = re.find("th"),
                    ee || X.html(r),
                    se = X.find("col"),
                    J.html(r),
                    le = J.find("col")
                }
                return t
            }
            function $() {
                if (!E) {
                    if (E = !0,
                    B) {
                        var e = n(M, ce, !0);
                        e > K.width() && M.css("minWidth", e)
                    }
                    M.css(he),
                    Z.css(he),
                    Z.append(R),
                    A.before(oe),
                    h()
                }
            }
            function j() {
                E && (E = !1,
                B && M.width(fe),
                oe.detach(),
                M.prepend(R),
                M.css(pe),
                Z.css(pe),
                M.css("minWidth", ve),
                M.css("minWidth", n(M, ce)))
            }
            function w(e) {
                me != e && (me = e,
                M.triggerHandler("floatThead", [e, ae]))
            }
            function Q(e) {
                B != e && (B = e,
                ae.css({
                    position: B ? "absolute" : "fixed"
                }))
            }
            function C(e, t, a, i) {
                return p ? a : i ? y.getSizingRow(e, t, a) : t
            }
            function k() {
                var e, t = b();
                return function() {
                    se = X.find("col");
                    var a = C(M, se, ce, c);
                    if (a.length == t && t > 0) {
                        if (!ee)
                            for (e = 0; t > e; e++)
                                se.eq(e).css("width", "");
                        j();
                        var o = [];
                        for (e = 0; t > e; e++)
                            o[e] = i(a.get(e));
                        for (e = 0; t > e; e++)
                            le.eq(e).width(o[e]),
                            se.eq(e).width(o[e]);
                        $()
                    } else
                        Z.append(R),
                        M.css(pe),
                        Z.css(pe),
                        h()
                }
            }
            function x(e) {
                var t = O.css("border-" + e + "-width")
                  , a = 0;
                return t && ~t.indexOf("px") && (a = parseInt(t, 10)),
                a
            }
            function T() {
                var e, t = O.scrollTop(), a = 0, i = U ? H.outerHeight(!0) : 0, o = W ? i : -i, r = ae.height(), n = M.offset(), s = 0, l = 0;
                if (q) {
                    var c = O.offset();
                    a = n.top - c.top + t,
                    U && W && (a += i),
                    s = x("left"),
                    l = x("top"),
                    a -= l
                } else
                    e = n.top - I - r + P + z.horizontal;
                var d = f.scrollTop()
                  , h = f.scrollLeft()
                  , p = O.scrollLeft();
                return function(c) {
                    var v = M[0].offsetWidth <= 0 && M[0].offsetHeight <= 0;
                    if (!v && ie)
                        return ie = !1,
                        setTimeout(function() {
                            M.triggerHandler("reflow")
                        }, 1),
                        null;
                    if (v && (ie = !0,
                    !B))
                        return null;
                    if ("windowScroll" == c ? (d = f.scrollTop(),
                    h = f.scrollLeft()) : "containerScroll" == c ? (t = O.scrollTop(),
                    p = O.scrollLeft()) : "init" != c && (d = f.scrollTop(),
                    h = f.scrollLeft(),
                    t = O.scrollTop(),
                    p = O.scrollLeft()),
                    !u || !(0 > d || 0 > h)) {
                        if (Y)
                            Q("windowScrollDone" == c);
                        else if ("windowScrollDone" == c)
                            return null;
                        n = M.offset(),
                        U && W && (n.top += i);
                        var m, g, y = M.outerHeight();
                        if (q && B) {
                            if (a >= t) {
                                var b = a - t + l;
                                m = b > 0 ? b : 0,
                                w(!1)
                            } else
                                m = G ? l : t,
                                w(!0);
                            g = s
                        } else
                            !q && B ? (d > e + y + o ? m = y - r + o : n.top >= d + I ? (m = 0,
                            j(),
                            w(!1)) : (m = I + d - n.top + a + (W ? i : 0),
                            $(),
                            w(!0)),
                            g = 0) : q && !B ? (a > t || t - a > y ? (m = n.top - d,
                            j(),
                            w(!1)) : (m = n.top + t - d - a,
                            $(),
                            w(!0)),
                            g = n.left + p - h) : q || B || (d > e + y + o ? m = y + I - d + e + o : n.top > d + I ? (m = n.top - d,
                            $(),
                            w(!1)) : (m = I,
                            w(!0)),
                            g = n.left - h);
                        return {
                            top: m,
                            left: g
                        }
                    }
                }
            }
            function S() {
                var e = null
                  , t = null
                  , a = null;
                return function(i, o, r) {
                    null == i || e == i.top && t == i.left || (ae.css({
                        top: i.top,
                        left: i.left
                    }),
                    e = i.top,
                    t = i.left),
                    o && m(),
                    r && h();
                    var n = O.scrollLeft();
                    B && a == n || (ae.scrollLeft(n),
                    a = n)
                }
            }
            function L() {
                if (O.length)
                    if (O.data().perfectScrollbar)
                        z = {
                            horizontal: 0,
                            vertical: 0
                        };
                    else {
                        var e = O.width()
                          , t = O.height()
                          , a = M.height()
                          , i = n(M, ce)
                          , o = i > e ? F : 0
                          , r = a > t ? F : 0;
                        z.horizontal = i > e - r ? F : 0,
                        z.vertical = a > t - o ? F : 0
                    }
            }
            var D = s.uniqueId()
              , M = e(this);
            if (M.data("floatThead-attached"))
                return !0;
            if (!M.is("table"))
                throw new Error('jQuery.floatThead must be run on a table element. ex: $("table").floatThead();');
            l = y.autoReflow && l;
            var R = M.children("thead:first")
              , A = M.children("tbody:first");
            if (0 == R.length || 0 == A.length)
                return M.data("floatThead-lazy", y),
                void M.unbind("reflow").one("reflow", function() {
                    M.floatThead(y)
                });
            M.data("floatThead-lazy") && M.unbind("reflow"),
            M.data("floatThead-lazy", !1);
            var I, P, E = !1, z = {
                vertical: 0,
                horizontal: 0
            }, F = o(), N = 0, O = y.scrollContainer(M) || e([]), q = O.length > 0, B = null;
            void 0 !== y.useAbsolutePositioning && (y.position = "auto",
            y.useAbsolutePositioning && (y.position = y.useAbsolutePositioning ? "absolute" : "fixed"),
            a("option 'useAbsolutePositioning' has been removed in v1.3.0, use `position:'" + y.position + "'` instead. See docs for more info: http://mkoryak.github.io/floatThead/#options")),
            void 0 !== y.scrollingTop && (y.top = y.scrollingTop,
            a("option 'scrollingTop' has been renamed to 'top' in v1.3.0. See docs for more info: http://mkoryak.github.io/floatThead/#options")),
            void 0 !== y.scrollingBottom && (y.bottom = y.scrollingBottom,
            a("option 'scrollingBottom' has been renamed to 'bottom' in v1.3.0. See docs for more info: http://mkoryak.github.io/floatThead/#options")),
            "auto" == y.position ? B = null : "fixed" == y.position ? B = !1 : "absolute" == y.position ? B = !0 : y.debug && a('Invalid value given to "position" option, valid is "fixed", "absolute" and "auto". You passed: ', y.position),
            null == B && (B = q),
            B || (E = !0);
            var H = M.find("caption")
              , U = 1 == H.length;
            if (U)
                var W = "top" === (H.css("caption-side") || H.attr("align") || "top");
            var V = e('<fthfoot style="display:table-footer-group;border-spacing:0;height:0;border-collapse:collapse;"/>')
              , G = !1
              , K = e([])
              , Y = 9 >= c && !q && B
              , Z = e("<table/>")
              , J = e("<colgroup/>")
              , X = M.children("colgroup:first")
              , ee = !0;
            0 == X.length && (X = e("<colgroup/>"),
            ee = !1);
            var te = e('<fthtr style="display:table-row;border-spacing:0;height:0;border-collapse:collapse"/>')
              , ae = e('<div style="overflow: hidden;" aria-hidden="true"></div>')
              , ie = !1
              , oe = e("<thead/>")
              , re = e('<tr class="size-row"/>')
              , ne = e([])
              , se = e([])
              , le = e([])
              , ce = e([]);
            oe.append(re),
            M.prepend(X),
            p && (V.append(te),
            M.append(V)),
            Z.append(J),
            ae.append(Z),
            y.copyTableClass && Z.attr("class", M.attr("class")),
            Z.attr({
                cellpadding: M.attr("cellpadding"),
                cellspacing: M.attr("cellspacing"),
                border: M.attr("border")
            });
            var de = M.css("display");
            if (Z.css({
                borderCollapse: M.css("borderCollapse"),
                border: M.css("border"),
                display: de
            }),
            "none" == de && (ie = !0),
            Z.addClass(y.floatTableClass).css({
                margin: 0,
                "border-bottom-width": 0
            }),
            B) {
                var ue = function(e, t) {
                    var a = e.css("position")
                      , i = "relative" == a || "absolute" == a
                      , o = e;
                    if (!i || t) {
                        var r = {
                            paddingLeft: e.css("paddingLeft"),
                            paddingRight: e.css("paddingRight")
                        };
                        ae.css(r),
                        o = e.data("floatThead-containerWrap") || e.wrap("<div class='" + y.floatWrapperClass + "' style='position: relative; clear:both;'></div>").parent(),
                        e.data("floatThead-containerWrap", o),
                        G = !0
                    }
                    return o
                };
                q ? (K = ue(O, !0),
                K.prepend(ae)) : (K = ue(M),
                M.before(ae))
            } else
                M.before(ae);
            ae.css({
                position: B ? "absolute" : "fixed",
                marginTop: 0,
                top: B ? 0 : "auto",
                zIndex: y.zIndex
            }),
            ae.addClass(y.floatContainerClass),
            g();
            var he = {
                "table-layout": "fixed"
            }
              , pe = {
                "table-layout": M.css("tableLayout") || "auto"
            }
              , fe = M[0].style.width || ""
              , ve = M.css("minWidth") || ""
              , me = !1;
            L();
            var ge, ye = function() {
                (ge = k())()
            };
            ye();
            var be = T()
              , $e = S();
            $e(be("init"), !0);
            var je = s.debounce(function() {
                $e(be("windowScrollDone"), !1)
            }, 1)
              , we = function() {
                $e(be("windowScroll"), !1),
                Y && je()
            }
              , Qe = function() {
                $e(be("containerScroll"), !1)
            }
              , Ce = function() {
                M.is(":hidden") || (g(),
                L(),
                ye(),
                be = T(),
                ($e = S())(be("resize"), !0, !0))
            }
              , ke = s.debounce(function() {
                M.is(":hidden") || (L(),
                g(),
                ye(),
                be = T(),
                $e(be("reflow"), !0))
            }, 1);
            if (q ? B ? O.on(d("scroll"), Qe) : (O.on(d("scroll"), Qe),
            f.on(d("scroll"), we)) : f.on(d("scroll"), we),
            f.on(d("load"), ke),
            t(d("resize"), Ce),
            M.on("reflow", ke),
            r(M) && M.on("filter", ke).on("sort", ke).on("page", ke),
            f.on(d("shown.bs.tab"), ke),
            f.on(d("tabsactivate"), ke),
            l) {
                var xe = null;
                _.isFunction(y.autoReflow) && (xe = y.autoReflow(M, O)),
                xe || (xe = O.length ? O[0] : M[0]),
                v = new MutationObserver(function(e) {
                    for (var t = function(e) {
                        return e && e[0] && ("THEAD" == e[0].nodeName || "TD" == e[0].nodeName || "TH" == e[0].nodeName)
                    }, a = 0; a < e.length; a++)
                        if (!t(e[a].addedNodes) && !t(e[a].removedNodes)) {
                            ke();
                            break
                        }
                }
                ),
                v.observe(xe, {
                    childList: !0,
                    subtree: !0
                })
            }
            M.data("floatThead-attached", {
                destroy: function() {
                    var e = ".fth-" + D;
                    j(),
                    M.css(pe),
                    X.remove(),
                    p && V.remove(),
                    oe.parent().length && oe.replaceWith(R),
                    l && (v.disconnect(),
                    v = null),
                    M.off("reflow"),
                    O.off(e),
                    G && (O.length ? O.unwrap() : M.unwrap()),
                    q ? O.data("floatThead-containerWrap", !1) : M.data("floatThead-containerWrap", !1),
                    M.css("minWidth", ve),
                    ae.remove(),
                    M.data("floatThead-attached", !1),
                    f.off(e)
                },
                reflow: function() {
                    ke()
                },
                setHeaderHeight: function() {
                    h()
                },
                getFloatContainer: function() {
                    return ae
                },
                getRowGroups: function() {
                    return E ? ae.find(">table>thead").add(M.children("tbody,tfoot")) : M.children("thead,tbody,tfoot")
                }
            })
        }),
        this
    }
}(jQuery),
function(e) {
    e.floatThead = e.floatThead || {},
    e.floatThead._ = window._ || function() {
        var t = {}
          , a = Object.prototype.hasOwnProperty
          , i = ["Arguments", "Function", "String", "Number", "Date", "RegExp"];
        t.has = function(e, t) {
            return a.call(e, t)
        }
        ,
        t.keys = function(e) {
            if (e !== Object(e))
                throw new TypeError("Invalid object");
            var a = [];
            for (var i in e)
                t.has(e, i) && a.push(i);
            return a
        }
        ;
        var o = 0;
        return t.uniqueId = function(e) {
            var t = ++o + "";
            return e ? e + t : t
        }
        ,
        e.each(i, function() {
            var e = this;
            t["is" + e] = function(t) {
                return Object.prototype.toString.call(t) == "[object " + e + "]"
            }
        }),
        t.debounce = function(e, t, a) {
            var i, o, r, n, s;
            return function() {
                r = this,
                o = arguments,
                n = new Date;
                var l = function() {
                    var c = new Date - n;
                    t > c ? i = setTimeout(l, t - c) : (i = null,
                    a || (s = e.apply(r, o)))
                }
                  , c = a && !i;
                return i || (i = setTimeout(l, t)),
                c && (s = e.apply(r, o)),
                s
            }
        }
        ,
        t
    }()
}(jQuery);
var carouselLoader = "<div align='center' class='carouselLoader'><img src='" + ACC.config.commonResourcePath + "/img/img-defer-spinner.svg' width='48'/></div>";
$(carouselLoader).insertAfter(".scrollable-lame"),
$(document).ready(function() {
    $(".carouselLoader").remove(),
    $(".scrollable-lame").css("display", "inherit")
}),
jQuery(document).ready(function() {
    function e(e) {
        $(e).find(".overlay-inner").fadeIn(200)
    }
    function t(e) {
        $(e).find(".overlay-inner").fadeOut(200)
    }
    var a, i = $(".toggle-nav"), o = $(".overlay");
    $(".search"),
    $(".mini-banner-slider .item");
    if ($(document).width() <= 1024 && ($(document).width() <= 900 && $(document).width() > 720,
    $(document).width() > 720,
    a = $(document).width() < 720),
    1 == a && ($(".collapse").removeClass("in"),
    $('[data-toggle="collapse"]').addClass("collapsed"),
    $(".accordion-toggle.active").removeClass("active").addClass("collapsed"),
    $(".targeter").on("click", function() {
        $(this).next(".collapse").collapse("toggle"),
        $(this).toggleClass("targeter-active")
    })),
    1 != a) {
        var r = $("#ScrollabeTableCompare");
        r.length && setTimeout(function() {
            var e, t = $(".nav_lame"), a = $(".nav_lame li").first();
            t.height(a.outerHeight()),
            e = 50 + t.height(),
            r.floatThead({
                top: e,
                zIndex: 10
            })
        }, 300)
    }
    if (bindCreateUpdateAddress(),
    1 == a) {
        $(".page-ifu-categories-list #ifu-search + .item > .filter-list").hide();
        var n = $(".sidebar-filters .filters > .item:first-child:not(#rp-search, #faq-search, #accessoryProduct-search, #ifu-search)");
        n.addClass("toggle"),
        n.siblings().hide(),
        n.siblings().is(":visible") && $(".sidebar-filters .filters").addClass("open"),
        $("body").hasClass("page-SubCategoryPage") || $(document).on("touchstart", ".toggle", function() {
            n.siblings().stop(!0, !0).slideToggle(300),
            $(this).parent().toggleClass("open")
        });
        var s = $(".item:visible #accordionFiltersFaq .accordion-heading:first");
        s.addClass("toggle2"),
        s.siblings().hide(),
        $(".page-faq-categories-list .sidebar-filters .accordion-body, .page-ifu-categories-list .sidebar-filters .accordion-body, .page-AccessoryListPage .sidebar-filters .toggle2 + .accordion-body, .page-AccessoryFinishedProductDetailPage .sidebar-filters .accordion-body").removeClass("collapse"),
        $(document).on("touchstart", ".toggle2", function(e) {
            e.preventDefault(),
            $(this).next(".accordion-body").stop(!0, !0).slideToggle(300),
            $(this).parent().toggleClass("open")
        });
        var l = $("#accessoryProduct-search .filter-list .name, #ifu-search .filter-list .name");
        l.addClass("toggle3"),
        l.siblings().hide(),
        $(document).on("touchstart", ".toggle3", function(e) {
            e.preventDefault(),
            $(".sidebar-filters .search").stop(!0, !0).slideToggle(300),
            $(this).parent().toggleClass("open")
        }),
        $(".page-ifu-categories-list #ifu-search > div > div.name.toggle3").show()
    }
    $("html").hasClass("lt-ie9") && IE(),
    i.on("click touchstart", function(e) {
        openNav(),
        openFirstAccordion(),
        e.preventDefault()
    }),
    $('.main-nav .accordion-inner > ul > li:not(".direct-link") > a').on("click touchend", function(e) {
        e.preventDefault(),
        $(this).parent().hasClass("direct-link") || $(this).parents(".niv2").length || toggleniv2($(this))
    }),
    $(".mobile-back").on("touchstart", function(e) {
        e.preventDefault(),
        $(this).hasClass("back") ? ($(".niv2").removeClass("open"),
        $(".niv1 .actif").removeClass("actif"),
        $(this).removeClass("back")) : openNav()
    }),
    $(".navtop-bar .search form #search").on("change paste keyup", function() {
        $(this).val().length > 0 ? $("#NoResult").hide() : $("#NoResult").show()
    }),
    o.on("click", function(e) {
        $(".mobile-back").removeClass("back"),
        openNav()
    }),
    $(".accordion-group").on("shown", function(e) {
        $(e.target).prev(".accordion-heading").find(".accordion-toggle").addClass("active")
    }),
    $(".accordion-group").on("hidden", function(e) {
        $(this).find(".accordion-toggle").not($(e.target)).removeClass("active")
    }),
    $(".main-nav .navigation .accordion-group").on("hidden", function(e) {
        $(this).find(".our-products a").removeClass("actif").end().find(".niv2").removeClass("open")
    }),
    $(window).scroll(function() {
        !0 !== a && ($(this).scrollTop() > 100 ? $("body").is(".moulinex-portal") || $("body").addClass("mini-header") : $("body").removeClass("mini-header"))
    }),
    $(".search-area-reparability .search form #search-filter_reparability").autocomplete().autocomplete("widget").appendTo(".search-area-reparability .search"),
    $("input[type=radio][name=notation]").change(function() {
        var e = $(this).parents(".notation");
        e.find("input[type=submit]").prop("disabled", !1),
        "false" == $("input[name=notation]:checked", e).val() ? e.find(".amelioration").removeClass("hidden") : e.find(".amelioration").addClass("hidden")
    }),
    $(".notationForm").each(function() {
        $(this).on("submit", function(e) {
            e.preventDefault();
            var t = $(this);
            "" === t.find(".faqUtile:checked").val() || (t.addClass("hidden"),
            t.parents(".notation").find(".thanks").removeClass("hidden"),
            $.ajax({
                url: t.attr("action"),
                type: t.attr("method"),
                data: t.serialize(),
                success: function(e) {}
            }))
        })
    }),
    jQuery(".pfinder .reponses label").click(function() {
        jQuery(".pfinder .reponses img").removeClass("active"),
        jQuery(this).children("img").addClass("active")
    });
    var c = jQuery(".pfinder-steps li").length
      , d = 580 / c;
    jQuery(".pfinder-steps li").not(":last").css("width", d + "px"),
    jQuery(".star-rating").click(function() {
        jQuery(this).parents(".notation").children(".locknote").show()
    }),
    jQuery(".noctrlcv").bind("cut copy paste", function(e) {
        e.preventDefault()
    }),
    jQuery(".noctrlcv").keydown(function(e) {
        1 != e.ctrlKey || "118" != e.which && "86" != e.which || e.preventDefault()
    }),
    jQuery(".modal .modal-header .close").click(function() {
        jQuery(".colorbox").removeAttr("style")
    }),
    jQuery(".cart-steps ul li:last-child").addClass("last-child"),
    jQuery("div[id^=SubNav]").each(function(e) {
        scrollableSubnav("#" + jQuery(this).attr("id"))
    }),
    jQuery(".subsubnav").each(function(e) {
        scrollableSubnav("#" + jQuery(this).attr("id"))
    }),
    scrollableTable(),
    jQuery("#DeviseSeletor").click(function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(this).toggleClass("open"),
        jQuery("#devise-selector").slideToggle("fast")
    }),
    jQuery(document).on("click", function(e) {
        $(this).toggleClass("open"),
        jQuery("#devise-selector").slideUp("fast"),
        $("#DeviseSeletor").removeClass("open")
    }),
    jQuery(".modal").on("hidden", function() {
        jQuery(this).children("div.modal-body").find("iframe").attr("src", ""),
        jQuery(this).removeData()
    }),
    setValuesAdvise(),
    scrollableAdvises(),
    scrollableLames(),
    initScrollingStoreList(),
    jQuery(".navbar, .row-fluid").mouseover(function(e) {
        jQuery(".navbarallp .nav li a").parent("li").removeClass("hover"),
        jQuery("#SubNav .scroll .item").removeClass("hover"),
        jQuery("#SubNav:not(.subnav-visible)").slideUp()
    }),
    jQuery(".scrollable-lame").swipe({
        swipeLeft: function(e, t, a, i, o) {
            jQuery(this).find(".lame-control.right").click()
        },
        swipeRight: function(e, t, a, i, o) {
            jQuery(this).find(".lame-control.left").click()
        },
        excludedElements: "label, button, input, select, textarea, .noSwipe"
    }),
    jQuery(".oldBrowsers .close").click(function() {
        jQuery(".oldBrowsers").slideUp("slow")
    });
    var u = jQuery(".js-carousel")
      , h = u.data("interval")
      , p = h ? {
        interval: h
    } : null;
    u.carousel(p),
    jQuery(".nav").addClass("nav-" + jQuery(".nav").find("li").length + "-items"),
    jQuery(".product-faq .accordion .accordion-toggle,.culinary-lexicon .accordion .accordion-toggle").click(function() {
        itemToggle = this,
        jQuery(itemToggle).parent().parent().parent(".accordion").children().children().children(".accordion-toggle").not(jQuery(itemToggle)).addClass("collapsed")
    }),
    $(document).on("click", ".list-store li", function() {
        infowindow.close(),
        jQuery(".shopdetails").slideUp("fast"),
        gotoPoint(jQuery(this).index(), jQuery(this).attr("id"))
    }),
    jQuery(".cart_popup .scroll").slimScroll({
        height: 165,
        alwaysVisible: !0,
        allowPageScroll: !1,
        position: "right",
        color: "#888",
        distance: 0,
        railVisible: !0,
        wheelStep: 10
    }),
    jQuery("#sliderPrice").length > 0 && initSlider("#sliderPrice"),
    initPushHome(),
    initHelper(),
    initGoCompare(),
    swipeManager(),
    jQuery("#ModalProduct").on("show", function() {
        mBackdrop = setTimeout("haveBackdrop()", 10)
    }),
    initJsLinks(),
    PaginationStoreNav(),
    displyClaimDisclaimer(),
    $(".breadcrumb li:last-child a").on("click", function() {
        return !1
    }),
    $(".item-lifestyle-alt").hover(function() {
        e(this)
    }, function() {
        t(this)
    }),
    $("#search-list-page--filters-container .accordion-group").on("hidden.bs.collapse", function(e) {
        e.stopPropagation()
    })
}),
$(document).ready(function() {
    var e = $(".wrap-header .sticky-header .head-entry .dropmenu-toggle");
    e.click(function(t) {
        console.log("target: ", t.target),
        $(".wrap-header .sticky-header .head-entry .content-toggle").removeClass("open"),
        e.children().removeClass("hover"),
        e.removeClass("hover"),
        t.stopPropagation(),
        $(this).parent().find(".content-toggle").toggleClass("open"),
        $(this).children().length > 0 ? ($(this).children().toggleClass("hover"),
        t.preventDefault()) : $(this).siblings("div").length > 0 && $(this).toggleClass("hover"),
        setTimeout(function() {
            $("#search").focus()
        }, 155)
    }),
    $("body").click(function(t) {
        $(".spanauto").is(t.target) || 0 !== $(".spanauto").has(t.target).length || 0 !== $(t.target).parents("#autocomplete-container").length && !$(t.target).parents("#close-search").length && !$(t.target).is("#close-search") || ($(".wrap-header .sticky-header .head-entry .content-toggle").removeClass("open"),
        e.children().removeClass("hover"),
        e.removeClass("hover"))
    })
}),
jQuery(window).resize(function() {
    swipeManager()
}),
jQuery(window).scroll(function() {}),
jQuery(window).resize(function() {
    swipeManager()
}),
jQuery(window).load(function() {
    setTimeout(function() {
        redimensionner()
    }, 1e3)
});
var mBackdrop;
jQuery(function() {
    jQuery(".cookies .btn, .cookies .close").click(function() {
        $(".cookies").animate({
            height: "0px"
        }, {
            queue: !1,
            duration: 500
        }),
        $(".cookies .close").hide()
    }),
    jQuery("a.utilisation-complete").bind("click", function() {
        jQuery(".cookies-settings a").removeClass("active"),
        jQuery(this).addClass("active"),
        jQuery(".liste-parametres li").each(function() {
            jQuery(this).addClass("active")
        })
    }),
    jQuery("a.utilisation-complete").bind("hover", function() {
        jQuery(".liste-parametres li").each(function() {
            jQuery(this).css("background-position", "0 9px")
        })
    }),
    jQuery("a.utiliser-le-necessaire").bind("click", function() {
        jQuery(".cookies-settings a").removeClass("active"),
        jQuery(this).addClass("active"),
        jQuery(".liste-parametres li").each(function() {
            jQuery(this).removeClass("active"),
            jQuery(".parametre1, .parametre2").addClass("active")
        })
    }),
    jQuery("a.utiliser-le-necessaire").bind("hover", function() {
        jQuery(".liste-parametres li").each(function() {
            jQuery(this).css("background-position", "0 -38px"),
            jQuery(".parametre1, .parametre2").css("background-position", "0 9px")
        })
    }),
    jQuery(".cookies-settings, .modal-body, .liste-parametres").bind("hover", function() {
        jQuery(".liste-parametres li").each(function() {
            jQuery(this).hasClass("active") ? jQuery(this).css("background-position", "0 9px") : jQuery(this).css("background-position", "0 -38px")
        })
    }),
    jQuery(".product-comparator .facet_block-label input").bind("change", function() {
        0 == jQuery(".product-comparator .facet_block-label input:checked").length ? jQuery(".product-comparator #ScrollabeTableCompare tr").show() : jQuery(".product-comparator #ScrollabeTableCompare tr.ressemblant").hide()
    }),
    jQuery(".product-comparator .close").bind("click", function() {
        var i = 0;
        if (jQuery(".scrollableTable tr th").each(function() {
            i++
        }),
        i > 3) {
            var colnum = jQuery(this).parent().parent().index();
            if (colnum > 0) {
                jQuery(".scrollableTable tr").each(function() {
                    jQuery(this).children(":eq(" + colnum + ")").remove()
                });
                var w_table = jQuery("#ScrollabeTableCompare").width();
                w_table = eval(w_table) - 165,
                w_table = jQuery("#ScrollabeTableCompare").css("width", w_table)
            }
        }
    })
}),
$(function() {
    function e(e) {
        for (var t = [], a = e + o - 1, i = e; i <= a; i++)
            t.push($(r[i]).height());
        for (var n = Math.max.apply(Math, t), i = e; i <= a; i++)
            $(r[i]).height(n)
    }
    var t, a, i, o, r = $(".product-cat .scrollable-lame .thumbnail .name");
    !function() {
        t = 4,
        a = r.length,
        i = Math.floor(a / t),
        o = a % t == 0 ? 0 : a - i * t
    }(),
    function() {
        for (var a, n, s = 0, l = [], c = 0; c <= i; c++) {
            a = s + t - 1;
            for (var d = s; d <= a; d++)
                l.push($(r[d]).height());
            for (var n = Math.max.apply(Math, l), d = s; d <= a; d++)
                $(r[d]).height(n);
            s += t,
            l = []
        }
        0 != o && e(s)
    }()
});
var positionToFixeIn = $(".bloc-product").outerHeight(!0) + 150 + $(".subsubnav ").outerHeight(!1) + $("#block-prod-product-gamme").outerHeight(!0);
if ($(window).scroll(function() {
    var e = $(window).scrollTop();
    $(".nav_lame a").each(function() {
        var t = $(this)
          , a = $(t.attr("href"));
        a.position().top < e + 245 && a.position().top + a.height() > e + 230 ? ($(".nav_lame  li a").removeClass("active"),
        t.addClass("active")) : t.removeClass("active")
    }),
    $(".nav_lame a:first").each(function() {
        var t = $(this)
          , a = $(t.attr("href"));
        a.position().top + a.height() > e + 230 && ($(".nav_lame  li a").removeClass("active"),
        t.addClass("active"))
    }),
    e >= positionToFixeIn ? ($(".nav_lame").addClass("fixed"),
    $(".sticky-productDetail").addClass("fixed"),
    $(".sticky-productDetail").show(),
    $(".lame div:first").addClass("padding-desc")) : ($(".nav_lame").removeClass("fixed"),
    $(".sticky-productDetail").removeClass("fixed"),
    $(".sticky-productDetail").hide(),
    $(".lame div:first").removeClass("padding-desc"))
}),
$(".nav_lame li a").each(function(e, t) {
    $(this).click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = $(this.hash)
              , a = $("header").height() + $(".sticky-productDetail").height() + $(".nav_lame").height();
            if (0 == e) {
                $(window).scrollTop() > positionToFixeIn ? a -= 110 : a += 10
            }
            if (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]"),
            t.length)
                return $("html,body").animate({
                    scrollTop: t.offset().top - a
                }, 900),
                !1
        }
    })
}),
jQuery(document).ready(function() {
    var e = getURLParameter("ref");
    null != e && $("#search-filter_reparability").val(e),
    $("#search_form_reparability").submit(function(e) {
        searchAjax(),
        $(".AjaxaReparabilityResult").hide(),
        $(".notfound-reparable").hide(),
        e.preventDefault()
    })
}),
$(window).load(function() {
    null != getURLParameter("ref") && $("#search-filter_reparability").submit()
}),
document.addEventListener("DOMContentLoaded", function() {
    var e = document.getElementById("search-filter_reparability");
    null != e && (e.oninvalid = function(e) {
        e.target.setCustomValidity(""),
        e.target.validity.valid || e.target.setCustomValidity(reparabilityValideMessage)
    }
    ,
    e.oninput = function(e) {
        e.target.setCustomValidity("")
    }
    )
}),
$(function() {
    var e = $(".faq-topics-home .item h3");
    e.each(function() {
        var e = $(this)
          , t = e.height()
          , a = e.css("line-height").slice(0, e.css("line-height").length - 2)
          , i = Math.round(t / a);
        if (e.text().length > 53) {
            var o = e.text().trim().substring(0, 53).split(" ").slice(0, -1).join(" ") + "…";
            e.text(o)
        }
        if (i >= 3)
            for (var o, r = e.text().length, n = 0; n < r; n++) {
                var t = e.height()
                  , a = e.css("line-height").slice(0, e.css("line-height").length - 2)
                  , i = Math.round(t / a);
                if (!(i >= 3))
                    return void e.text(o);
                o = e.text().trim().substring(0, 52).split(" ").slice(0, -1).join(" ") + "…",
                e.text(o)
            }
    })
}),
$(function() {
    var e = []
      , t = 0
      , a = $(".product-accessories .item .name");
    a.each(function() {
        e.push($(this).height())
    }),
    t = Math.max.apply(Math, e),
    a.each(function() {
        $(this).css("height", t)
    })
}),
$(function() {
    var e, t = $(".product-details-scroll-spy ul li"), a = 100 / t.length;
    t.each(function() {
        e = $(this),
        e.width(a + "%")
    }),
    console.log("done")
}),
$(function() {
    var e, t, a = [];
    e = $(".product-details-scroll-spy .nav_lame li a"),
    e.length && (e.each(function() {
        a.push($(this).height())
    }),
    t = Math.max.apply(Math, a),
    e.each(function() {
        $(this).height(t)
    }))
}),
$(function() {
    $(".firstWord h2").each(function() {
        var e = $(this).text().trim().split(" ")
          , t = e.shift();
        t.length > 0 && $(this).html("<span class='firstWord'>" + t + "</span> " + e.join(" "))
    })
}),
jQuery(document).ready(function() {
    if (window.location.href.indexOf("#how-to-use") >= 0) {
        var e = $("#how-to-use")
          , t = $("header").height();
        $("html,body").animate({
            scrollTop: e.offset().top - t
        }, 900)
    }
}),
$(function() {
    validateDeliveryMode($("input[name=deliveryMode]:checked"))
}),
$(".a2a_dd")) {
    var a2a_config = a2a_config || {};
    a2a_config.onclick = 1,
    a2a_config.prioritize = ["facebook", "twitter", "linkedin", "google_plus", "pinterest", "tumblr", "myspace", "email", "google_bookmarks", "yahoo_bookmarks"],
    a2a_config.num_services = 10,
    a2a_config.color_main = "D7E5ED",
    a2a_config.color_border = "D7E5ED",
    a2a_config.color_link_text = "373332",
    a2a_config.color_link_text_hover = "373332",
    function(e, t) {
        var a = e.createElement(t)
          , i = e.getElementsByTagName(t)[0];
        a.src = "//static.addtoany.com/menu/page.js",
        i.parentNode.insertBefore(a, i)
    }(document, "script")
}
Isotope.Item.prototype._create = function() {
    this.id = this.layout.itemGUID++,
    this._transn = {
        ingProperties: {},
        clean: {},
        onEnd: {}
    },
    this.sortData = {}
}
,
Isotope.Item.prototype.layoutPosition = function() {
    this.emitEvent("layout", [this])
}
,
Isotope.prototype.arrange = function(e) {
    this.option(e),
    this._getIsInstant(),
    this.filteredItems = this._filter(this.items),
    this._isLayoutInited = !0
}
,
Isotope.LayoutMode.create("none"),
$(function() {
    var e = $(".special-offers-v2-main").find("[data-category]")
      , t = [];
    e.each(function() {
        var e = $(this).attr("data-picto")
          , a = $(this).attr("data-category")
          , i = $(this).attr("data-pictohover")
          , o = {
            picto: e,
            name: a,
            pictoHover: i
        };
        t.push(o)
    });
    var a = removeDuplicates(t, "name");
    $.each(a, function(e, t) {
        var a = t.name.replace(/\s/g, "");
        $(".special-offers-v2-filters").append("<div data-filter='" + a + "' class='filter'><div class='picto'><span class='helper'></span><img src='" + t.picto + "'/></div><div class='caption'>" + t.name + "</div></div>")
    });
    var i = $(".special-offers-v2-container").isotope({
        itemSelector: ".special-offers-v2-component",
        layoutMode: "none"
    });
    $(".special-offers-v2-filters .filter").click(function() {
        $(".sp-offer-detailed-info").slideUp(),
        $(".lessInfo").hide(),
        $(".moreInfo").show();
        var e = $(this).attr("data-filter");
        "*" == e ? i.isotope({
            filter: "*",
            hiddenStyle: {
                opacity: 0,
                transform: "scaleY(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scaleY(1)"
            }
        }) : i.isotope({
            filter: "." + e,
            hiddenStyle: {
                opacity: 0,
                transform: "scaleY(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scaleY(1)"
            }
        })
    }),
    $(".special-offers-v2-main .moreInfo").click(function() {
        $(".sp-offer-detailed-info").slideUp(),
        $(".lessInfo").hide(),
        $(".moreInfo").show(),
        $(this).hide(),
        $(this).siblings(".lessInfo").show(),
        $(this).closest(".sp-offer-basic-info").siblings(".sp-offer-detailed-info").slideDown()
    }),
    $(".special-offers-v2-main .lessInfo").click(function() {
        $(this).hide(),
        $(this).siblings(".moreInfo").show(),
        $(this).closest(".sp-offer-basic-info").siblings(".sp-offer-detailed-info").slideUp()
    }),
    $(".special-offers-v2-filters .filter").click(function() {
        $(".special-offers-v2-filters .filter").removeClass("active"),
        $(this).addClass("active")
    }),
    $(".special-offers-v2-main .moreInfo").click(function() {
        var e = $(this).closest(".sp-offer-basic-info").siblings(".special-offers-v2-details").find(".productsDetail");
        e.attr("data-visible") < e.find("li").length && (e.slick({
            infinite: !0,
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: !0,
            prevArrow: "<span class='slick-prev'>‹</span>",
            nextArrow: "<span class='slick-next'>›</span>",
            appendArrows: ".special-offers-v2-details .controlArrows",
            appendDots: e.siblings(".sliderDots"),
            customPaging: function(e, t) {
                return '<div class="dot"></div>'
            }
        }),
        $(".special-offers-v2-details .slick-prev").click(function() {
            $(this).closest(".special-offers-v2-details").find(".productsDetail").slick("slickPrev")
        }),
        $(".special-offers-v2-details .slick-next").click(function() {
            $(this).closest(".special-offers-v2-details").find(".productsDetail").slick("slickNext")
        }))
    })
}),
$(function() {
    switch ($(".promo-mea .span3").length) {
    case 1:
        $(".promo-mea .span12").addClass("push-count-eq-1");
        break;
    case 2:
        $(".promo-mea .span12").addClass("push-count-eq-2");
        break;
    case 3:
        $(".promo-mea .span12").addClass("push-count-eq-3");
        break;
    case 4:
        $(".promo-mea .span12").addClass("push-count-eq-4");
        break;
    default:
        if (0 != $(".promo-mea .span3").length) {
            $(".promo-mea .span12").addClass("push-count-gt-4");
            break
        }
        $(".promo-mea .span12").addClass("Nopush")
    }
}),
$(document).ready(function() {
    var e = (window.innerWidth - $(".offer-popin").width()) / 2;
    $(".offer-popin").css("margin-left", e)
}),
$(document).ready(function() {
    $(".showPopinForDeliveryPage #currencyModal").show(),
    $(".showPopinForDeliveryPage #currencyModal").modal(),
    $("#block-prod-product-gamme").is(":visible") && $(".promo-mea .span12").removeClass("span12"),
    $(document).on("click", "#search-list-page--filters .show-all .reload", function() {
        window.location.reload()
    })
}),
$(window).resize(function() {
    var e = (window.innerWidth - $(".offer-popin").width()) / 2;
    $(".offer-popin").css("margin-left", e)
}),
$(function() {
    $(".cook-and-grain-zone2-filter-banner").length >= 1 && $(".cook-and-grain-zone2-filter-banner h5").length <= 0 && $(".cook-and-grain-zone2-filter-banner h4").addClass("no-subtitle")
}),
$(function() {
    var e = $(":not(.language-ja) .subnav .container-subCat .item")
      , t = e.length;
    t && t > 1 && $(".subnav .container-subCat .item.separator").length > 0 && ($(".subnav .container-subCat .item:first").addClass("first"),
    $(".subnav .container-subCat .item:last").addClass("last"),
    $(".subnav .container-subCat .item.separator").each(function() {
        $(this).height($(this).next(".subnav .container-subCat .item").find("a").height())
    }));
    var a = $('body:not(.language-ja) .subnav .container-subCat .item:not(".separator")').length;
    if (a && a > 0) {
        var i = 85 / a;
        $('.subnav .container-subCat .item:not(".separator")').css("max-width", i + "%")
    }
    $("html.rtl .carousel").each(function() {
        $(this).find("a.left").html("&#8250;"),
        $(this).find("a.right").html("&#8249;")
    })
}),
$(".richtext").text().trim().length || $(".richtext").closest(".lame-triman").hide(),
$(window).load(function() {
    setTimeout(function() {
        $('#MediaList img.picture[src=""]').closest(".border").hide()
    }, 100)
}),
$(document).ready(function() {
    $("#recipes-zone").wrap("<div id='recipes-zone-wrapper'></div>"),
    $(document).on("click", ".cook-and-grain-zone2-filter-banner", function(e) {
        $("#recipes-zone-wrapper").css("min-height", ""),
        $(e.target).closest(".cook-and-grain-zone2-filter-banner").find(".cook-and-grain-more-icon").toggleClass("less more"),
        $(".lp-recipe-component").slideToggle(400, "swing").toggleClass("open")
    }),
    $(document).on("click", "#recipes-zone .accordion-heading", function(e) {
        $(e.target).promise().done(function() {
            $(e.target).closest(".accordion-heading").siblings(".accordion-body").hasClass("in") ? $(e.target).closest(".accordion-heading").find(".accordion-toggle").addClass("active") : $(e.target).closest(".accordion-heading").find(".accordion-toggle").removeClass("active")
        })
    }),
    $(document).on("change", ".lp-recipes-facets input[type='checkbox']", function(e) {
        var t = $(e.target).closest("form");
        $.ajax({
            type: "POST",
            url: $("#recipes-zone").data("url"),
            data: t.serialize(),
            success: function(e) {
                $("#recipes-zone-wrapper").css("min-height", ""),
                $("#recipes-zone-wrapper").html(e),
                setActiveLPRecipeAccordion()
            }
        })
    }),
    $(document).on("submit", "#lp-recipes-seemore, #lp-recipes-search", function(e) {
        e.preventDefault();
        var t = $(e.target);
        $.ajax({
            type: "POST",
            url: $("#recipes-zone").data("url"),
            data: t.serialize(),
            success: function(t) {
                if ("lp-recipes-seemore" == $(e.target).attr("id")) {
                    var a = $("#recipes-zone-wrapper").outerHeight() + "px";
                    $("#recipes-zone-wrapper").css("min-height", a),
                    $("#recipes-zone-wrapper").html(t)
                } else
                    $("#recipes-zone-wrapper").css("min-height", ""),
                    $("#recipes-zone-wrapper").html(t);
                setActiveLPRecipeAccordion()
            }
        })
    }),
    $(document).on("click", ".cook-and-grain-filter-clear", function() {
        event.preventDefault(),
        $.ajax({
            type: "POST",
            url: $("#recipes-zone").data("url"),
            success: function(e) {
                $("#recipes-zone-wrapper").css("min-height", ""),
                $("#recipes-zone-wrapper").html(e),
                setActiveLPRecipeAccordion()
            }
        })
    })
}),
$(document).ready(function() {
    function e() {
        initGoCompare(),
        refresh_compare(),
        initComparator(),
        $(".product-cat.product-list .list-content .zone-showmore").length > 0 && $(".zone-showmore a").trigger("click")
    }
    function t(e) {
        var t = document.createElement("a");
        t.href = e,
        history.pushState({}, "queryParams", t.search)
    }
    function a(e) {
        $("#plp-facets-section").html($(e).find("#plp-facets-section").html()),
        $("#plp-pagination-section").html($(e).find("#plp-pagination-section").html()),
        $("#plp-results-section").html($(e).find("#plp-results-section").html())
    }
    function i(e) {
        var t = $(e).find("#plpRedirectForm").first();
        $(document.body).append(t),
        t.submit()
    }
    $(document).on("change", ".subCatFacet, .subCatPagination", function(o) {
        o.stopImmediatePropagation();
        var r = $(o.target)
          , n = r.closest("form");
        $("#plp-results-section").addClass("ajax-overlay"),
        $.ajax({
            type: "GET",
            url: r.data("current-cat-url") + "/async",
            data: n.serialize(),
            success: function(o, r, n) {
                $(o).find("#plp-data [name='redirect']").val() ? i(o) : (t(this.url),
                a(o),
                e(),
                $("#plp-results-section").removeClass("ajax-overlay"))
            },
            error: function() {
                $("#plp-results-section").removeClass("ajax-overlay")
            }
        })
    }),
    window.onpopstate = function(t) {
        $("#plp-results-section").length && ($("#plp-results-section").addClass("ajax-overlay"),
        $.ajax({
            type: "GET",
            url: [location.protocol, "//", location.host, "/", location.pathname, "/async", location.search].join(""),
            success: function(t, o, r) {
                $(t).find("#plp-data [name='redirect']").val() ? i(t) : (a(t),
                e(),
                $("#plp-results-section").removeClass("ajax-overlay"))
            },
            error: function() {
                $("#plp-results-section").removeClass("ajax-overlay")
            }
        }))
    }
}),
$(document).on("click", "a.pos-feature-link[href^=\\#]", function(e) {
    e.preventDefault(),
    smoothScrollingTo(this.hash.replace("#", "#pos-"));
    var t = this.hash.replace("#", "pos-");
    $("[id^='ShopDetail-'] .store-details .inner").removeClass("pos-info-block-glow"),
    $("[id^='ShopDetail-'] [id='" + t + "'] .inner").addClass("pos-info-block-glow activate").delay(1e3).queue(function() {
        $(this).removeClass("activate").dequeue()
    })
}),
window.addEventListener("popstate", function(e) {
    if ($("#StoreLocator").length && !window.location.hash) {
        var t = [location.protocol, "//", location.host, location.pathname, location.search].join("");
        $("#StoreLocator").addClass("ajax-overlay"),
        $.ajax({
            type: "GET",
            url: t,
            success: function(e, a, i) {
                $("#StoreLocator").removeClass("ajax-overlay"),
                emptyCoordinatesIfNoLocationQuery(t),
                appendStoreLocatorAjaxResultToHTML(e),
                initScrollingStoreList()
            },
            error: function(e) {
                $("#StoreLocator").removeClass("ajax-overlay"),
                console.log(e)
            }
        })
    }
}),
function(e) {
    e.fn.bmdIframe = function(t) {
        var a = e.extend({
            classBtn: ".bmd-modalButton"
        }, t);
        return e(a.classBtn).on("click", function(t) {
            if (GetIEVersion() > 0 && GetIEVersion() <= 11) {
                var a = e(this).attr("data-bmdSrc");
                window.location.href = a
            }
            var i = e(".bmd-modalButton").attr("data-bmdVideoFullscreen") || !1
              , o = {
                src: e(".bmd-modalButton").attr("data-bmdSrc")
            };
            i && (o.allowfullscreen = ""),
            e('.bmd-modalContent [name="login-iframe-item"]').attr(o),
            e('.bmd-modalContent [name="login-iframe-item"]').iFrameResize({
                autoResize: !0
            }),
            e(this).attr("data-force-modal") && jQuery("#rcuLoginModal").modal()
        }),
        this.on("hidden.bs.modal", function() {
            e(this).find("iframe").html("").attr("src", "")
        }),
        this
    }
}(jQuery),
jQuery(document).ready(function() {
    jQuery("#rcuLoginModal").bmdIframe(),
    $('.bmd-modalContent [name="login-iframe-item"]').css("min-height", "450px"),
    $('[name="iframe-item"]').iFrameResize({
        autoResize: !0,
        heightCalculationMethod: "lowestElement"
    }),
    $('[name="iframe-item"]').css("margin-bottom", "50px"),
    GetIEVersion() > 0 && GetIEVersion() <= 11 && ($("[data-target=#rcuLoginModal]").removeAttr("data-force-modal"),
    $("[data-target=#rcuLoginModal]").removeAttr("data-target")),
    $(".bmd-modalButton-auto") && $(".bmd-modalButton-auto").trigger("click")
}),
function(e) {
    if (isRcuActivated) {
        var t = navigator.userAgent.toLowerCase();
        -1 != t.indexOf("safari") && (t.indexOf("chrome") > -1 ? console.log("Do nothing") : (console.log("Handle the ITP"),
        "true" != e.cookie("rcuFirstVisit") && (e.cookie("rcuFirstVisit", "true"),
        window.location.replace(sfRedirectTLPUrl))))
    }
}(jQuery),
function(e) {
    var t = function(e) {
        var t = window.location.href
          , a = t.split("/")
          , i = a[0] + "//" + a[2];
        switch (e.data) {
        case "salesforce_accountDeleted":
            var o = 5e3;
            "undefined" != typeof rcuAccountDeletionDelay && (o = rcuAccountDeletionDelay),
            window.setTimeout(function() {
                window.location.replace(i + "/logout")
            }, o)
        }
    };
    window.addEventListener("message", t, !1)
}(jQuery),
function(e) {
    var t = function(t) {
        switch (t.data) {
        case "salesforce_actionbutton":
        case "salesforce_newpageload":
            e("#rcuLoginModal").hasClass("in") ? e("#rcuLoginModal").animate({
                scrollTop: 0
            }, 250) : e("html, body").animate({
                scrollTop: 0
            }, 250)
        }
    };
    window.addEventListener("message", t, !1)
}(jQuery),
function(e) {
    var t = function(e) {
        var t = window.location.href
          , a = t.split("/")
          , i = a[0] + "//" + a[2];
        if (t.indexOf("my-account") >= 0)
            switch (e.data) {
            case "salesforce_login":
                console.log("Logout the current user"),
                window.location.replace(i + "/logout")
            }
    };
    window.addEventListener("message", t, !1)
}(jQuery),
$(".extern-cookies-popup").click(function(e) {
    e.preventDefault(),
    tC.privacyCenter.showPrivacyCenter()
}),
$('#register-rules[type="checkbox"][name="conditionRegister"]').prop("checked", !1).change(),
$("#register-rules, .newsletter-label").on("change", function(e) {
    $("#register-rules").toggleClass("checked")
}),
$(".infobulle-gauche").on("click", function(e) {
    e.preventDefault(),
    $(".infobulle-gauche").toggleClass("isOpen")
});
