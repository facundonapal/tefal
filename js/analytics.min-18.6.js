function analyticsComparator() {
    var t = []
      , a = "data-analytics-addToComparator-productID"
      , e = "data-analytics-addToComparator-productName";
    $("[data-analytics-addToComparator]:checked").each(function(n, i) {
        var c = getPropertyValue($(this), a)
          , o = getPropertyValue($(this), e);
        t.push({
            productID: c,
            productName: o
        })
    }),
    $("[data-analytics-addToComparator]").click(function() {
        var n = getPropertyValue($(this), a)
          , i = getPropertyValue($(this), e);
        if ($(this).is(":checked") && t.length < 4) {
            var c = {
                productID: n,
                productName: i
            };
            sendEvent("addToComparator", c),
            t.push({
                productID: n,
                productName: i
            })
        } else
            for (var o = 0; o < t.length; o++)
                if (t[o].productID == n) {
                    t.splice(o, 1);
                    break
                }
    }),
    $("[data-analytics-comparatorAccess]").on("click", function() {
        var a = t.length
          , e = {
            productCount: a
        };
        $.each(t, function(t, a) {
            t++;
            var n = "product" + t + "ID"
              , i = "product" + t + "Name";
            e[n] = a.productID,
            e[i] = a.productName
        }),
        sendEvent("ComparatorAccess", e)
    })
}
function socialShare(t) {
    var a = t.service
      , e = t.url
      , n = {
        socialNetwork: a,
        sharedURL: e
    };
    sendEvent("socialShare", n)
}
function isYTVideoFound() {
    for (var t = !1, a = document.getElementsByTagName("iframe"), e = a.length; e--; )
        /youtube.com\/embed/.test(a[e].src) && (-1 === a[e].src.indexOf("enablejsapi=") && (a[e].src += (-1 === a[e].src.indexOf("?") ? "?" : "&") + "enablejsapi=1"),
        t = !0);
    return t
}
function activateYTListenerForAnalytics() {
    if ($("#youtube_api").length <= 0) {
        var t = document.createElement("script")
          , a = document.getElementsByTagName("script")[0];
        t.src = "//www.youtube.com/iframe_api",
        t.async = !0,
        t.id = "youtube_api",
        a.parentNode.insertBefore(t, a)
    } else
        onYouTubeIframeAPIReady()
}
function onYouTubeIframeAPIReady() {
    for (var t = document.getElementsByTagName("iframe"), a = t.length; a--; )
        /youtube.com\/embed/.test(t[a].src) && (gtmYTListeners.push(new YT.Player(t[a],{
            events: {
                onStateChange: onPlayerStateChange
            }
        })),
        YT.gtmLastAction = "p")
}
function onPlayerStateChange(t) {
    t.data == YT.PlayerState.PLAYING && setTimeout(onPlayerPercent, 1e3, t);
    var a = t.target.getVideoData();
    t.data == YT.PlayerState.PLAYING && "p" == YT.gtmLastAction && (sendEvent("video", {
        videoName: a.title,
        videoAction: "Play",
        videoProgress: onPlayerPercent(t)
    }),
    YT.gtmLastAction = ""),
    t.data == YT.PlayerState.PAUSED && (sendEvent("video", {
        videoName: a.title,
        videoAction: "Pause",
        videoProgress: onPlayerPercent(t)
    }),
    YT.gtmLastAction = "p")
}
function onPlayerPercent(t) {
    var a = t.target.getDuration()
      , e = t.target.getCurrentTime()
      , n = a - e <= 1.5 ? 1 : (Math.floor(e / a * 4) / 4).toFixed(2);
    if (!t.lastP || n > t.lastP) {
        t.lastP = n;
        var i = 100 * n + "%"
    }
    return 1 != t.lastP && setTimeout(onPlayerPercent, 1e3, t),
    i
}
function fetchProductAndSendEvent(t) {
    var a = getPropertyValue(t, "data-analytics-buyOnlineRetailerLogo-productID")
      , e = getPropertyValue(t, "data-analytics-buyOnlineRetailerLogo-productPrice")
      , n = getPropertyValue(t, "data-analytics-buyOnlineRetailerLogo-productName")
      , i = getPropertyValue(t, "data-analytics-buyOnlineRetailerLogo-retailerName")
      , c = {
        productID: a,
        productName: n,
        productPrice: e,
        retailerName: i
    };
    sendEvent("buyOnlineRetailerLogo", c)
}
function validateContactFormSubmit(t) {
    t.validationEngine("validate") && sendEvent("contactFormSubmit", {})
}
function clickThumbnail() {
    $("[data-analytics-clickThumbnail]").click(function() {
        var t = getPropertyValue($(this), "data-analytics-clickThumbnail-productCode")
          , a = getPropertyValue($(this), "data-analytics-clickThumbnail-index")
          , e = getPropertyValue($(this), "data-analytics-clickThumbnail-ajaxURL")
          , n = {
            productCode: t
        };
        $.ajax({
            url: e,
            type: "POST",
            data: n,
            async: !1,
            success: function(t) {
                var e = null != t.type && "RANGE" == t.type.code ? t.code : "N/A"
                  , n = t.categoryPaths.length > 0 ? t.categoryPaths[0] : "N/A"
                  , i = t.categoryPaths.length > 1 ? t.categoryPaths[1] : "N/A"
                  , c = {
                    position: a,
                    productID: t.code,
                    productName: t.name,
                    marketingCategory: n,
                    marketingSubcategory: i,
                    sisCategory: t.sisCategory,
                    sisSubcategory: t.sisSubCategory,
                    marketingRange: e,
                    productType: t.isAccessory ? "Accessory" : "Product",
                    productPrice: null != t.price ? t.price.value : "N/A",
                    productCurrency: null != t.price ? t.price.currencyIso : "N/A"
                };
                sendEvent("clickThumbnail", c)
            }
        })
    })
}
$(function() {
    $("[data-analytics-clickNavigation] a").click(function() {
        var t = {}
          , a = "data-analytics-clickNavigation-navLevel1"
          , e = "data-analytics-clickNavigation-navLevel2"
          , n = "data-analytics-clickNavigation-navLevel3";
        "javascript:void(0)" != $(this).prop("href") && (clickNavigationSiblingExists($(this), n) ? (t.navLevel3 = getClickNavigationPropertyValue($(this), n),
        t.navLevel2 = getClickNavigationPropertyValue($(this), e),
        t.navLevel1 = getClickNavigationPropertyValue($(this), a),
        sendEvent("clickNavigation", t)) : clickNavigationSiblingExists($(this), e) ? (t.navLevel2 = getClickNavigationPropertyValue($(this), e),
        t.navLevel1 = getClickNavigationPropertyValue($(this), a),
        sendEvent("clickNavigation", t)) : (!$(this).prop("href").includes("#") && clickNavigationSiblingExists($(this), a) || $(this).parent(".accordion-group").parent("ul").hasClass("navigation")) && (t.navLevel1 = getClickNavigationPropertyValue($(this), a),
        sendEvent("clickNavigation", t)))
    })
}),
$(function() {
    $("a").click(function() {
        if (!$(this).hasClass("a2a_dd")) {
            var t = {}
              , a = ["facebook", "youtube", "instagram", "addtoany", "twitter"]
              , e = $(this).prop("href")
              , n = "others";
            for (i = 0; i < a.length; i++)
                if (e.includes(a[i])) {
                    n = "social";
                    break
                }
            window.location.href.includes(extractDomain(e)) || extractDomain(e).includes("javascript") || $(this).is("[data-analytics-whereToBuyRetailerLogo]") || (t.linkType = n,
            t.linkUrl = e,
            sendEvent("exitLink", t))
        }
    })
}),
$(function() {
    $("[data-analytics-facetedSearch]").click(function() {
        var t = {};
        ($(this).is(":checked") || !$(this).is("input[type='checkbox']") && !$(this).hasClass("active")) && (t.facetType = getPropertyValue($(this), "data-analytics-facetedSearch-facetType"),
        t.facetName = getPropertyValue($(this), "data-analytics-facetedSearch-facetName"),
        t.facetValue = getPropertyValue($(this), "data-analytics-facetedSearch-facetValue"),
        sendEvent("facetedSearch", t))
    })
}),
$(function() {
    $("[data-analytics-documentationDownload]").click(function() {
        var t = getPropertyValue($(this), "data-analytics-documentationDownload-documentationType")
          , a = getPropertyValue($(this), "data-analytics-documentationDownload-documentationProduct")
          , e = {
            documentationType: t,
            documentationProduct: a
        };
        sendEvent("documentationDownload", e)
    })
}),
$(function() {
    $("[data-analytics-FAQ]").click(function() {
        if (!$(this).hasClass("active")) {
            var t = getPropertyValue($(this), "data-analytics-FAQ-faqTopic")
              , a = getPropertyValue($(this), "data-analytics-FAQ-faqQuestion")
              , e = {
                faqTopic: t,
                faqQuestion: a
            };
            sendEvent("FAQ", e)
        }
    })
});
var gtmYTListeners = [];
$(function() {
    isYTVideoFound() && activateYTListenerForAnalytics()
}),
$(function() {
    $("[data-analytics-buyOnlineButton]").on("click", function(t) {
        var a = getPropertyValue($(this), "data-analytics-buyOnlineButton-productID")
          , e = getPropertyValue($(this), "data-analytics-buyOnlineButton-productName")
          , n = getPropertyValue($(this), "data-analytics-buyOnlineButton-productPrice")
          , i = {
            productID: a,
            productName: e,
            productPrice: n
        };
        sendEvent("buyOnlineButton", i)
    })
}),
$(function() {
    $("[data-analytics-whereToBuyButton]").on("click", function(t) {
        var a = getPropertyValue($(this), "data-analytics-whereToBuyButton-productID")
          , e = getPropertyValue($(this), "data-analytics-whereToBuyButton-productName")
          , n = getPropertyValue($(this), "data-analytics-whereToBuyButton-productPrice")
          , i = {
            productID: a,
            productName: e,
            productPrice: n
        };
        sendEvent("whereToBuyButton", i)
    })
}),
$(function() {
    $("[data-analytics-buyOfflineButton]").on("click", function(t) {
        var a = getPropertyValue($(this), "data-analytics-buyOfflineButton-productID")
          , e = getPropertyValue($(this), "data-analytics-buyOfflineButton-productName")
          , n = getPropertyValue($(this), "data-analytics-buyOfflineButton-productPrice")
          , i = {
            productID: a,
            productName: e,
            productPrice: n
        };
        sendEvent("buyOfflineButton", i)
    })
}),
$(function() {
    $("[data-analytics-buyOnlineRetailerLogo]").on("click", function() {
        fetchProductAndSendEvent($(this))
    })
}),
$(function() {
    $("[data-analytics-whereToBuyRetailerLogo]").click(function(t) {
        var a = extractDomain(getPropertyValue($(this), "data-analytics-whereTobuyRetailerLogo-retailerName")).replace("www.", "")
          , e = {
            retailerName: a
        };
        $("body").hasClass("template-pages-storeFinder-storeFinderOnLinePage") && sendEvent("whereToBuyRetailerLogo", e)
    })
}),
$(function() {
    $("[data-analytics-newsletterSubscription]").on("click", function(t) {
        var a = ""
          , e = ["#newsLetterSubscriptionForm", "#command", "#FormNewsLetter", "#FormNewsLetter-myspace"];
        for (i = 0; i < e.length; i++)
            if ($(e[i]).length > 0) {
                a = $(e[i]);
                break
            }
        var n = getPropertyValue($(this), "data-analytics-newsletterSubscription-email");
        a.is("#command") ? n.length > 0 && (a.is("#command") || "oui" == $("input.radio-newsletter:checked").val()) && sendEvent("newsletterSubscription", {
            email: n
        }) : (t.preventDefault(),
        a.length > 0 && $.ajax({
            url: getPropertyValue($(this), "data-analytics-newsletterSubscription-ajaxURL"),
            type: "POST",
            data: a.serialize(),
            async: !1,
            success: function(t) {
                t.length > 0 && sendEvent("newsletterSubscription", {
                    email: t
                })
            }
        }),
        a.submit())
    })
}),
$(function() {
    $("[data-analytics-burgerMenuClic]").click(function() {
        $(this).hasClass("active") && sendEvent("burgerMenuClic", {})
    })
}),
$(function() {
    $("[data-analytics-printPage]").click(function() {
        sendEvent("printPage", {})
    })
}),
$(function() {
    $("[data-analytics-faqFeedback]").click(function() {
        var t = getPropertyValue($(this), "data-analytics-faqFeedback-faqTopic")
          , a = getPropertyValue($(this), "data-analytics-faqFeedback-faqQuestion")
          , e = "true" == $(this).siblings("[data-analytics-faqFeedback-satisfaction]").find("input[name='notation']:checked").val() ? "yes" : "no"
          , n = {
            faqTopic: t,
            faqQuestion: a,
            faqFeedback: e
        };
        sendEvent("faqFeedback", n)
    })
}),
$(function() {
    $("[data-analytics-productListSorting]").change(function() {
        var t = $(this).find("option:selected").text().trim()
          , a = {
            sortBy: t
        };
        sendEvent("productListSorting", a)
    })
}),
$(function() {
    $("[data-analytics-accountCreation]").on("click", function(t) {
        var a = $("#FormCreateProfile").serialize()
          , e = getPropertyValue($(this), "data-analytics-accountCreation-ajaxURL");
        $.ajax({
            type: "POST",
            data: a,
            url: e,
            async: !1,
            success: function(t) {
                t.length > 0 && grecaptcha.getResponse().length > 0 && sendEvent("accountCreation", {
                    gender: "Mr" == t ? "Man" : "Woman"
                })
            },
            complete: function(t, a) {
                $(this).submit()
            }
        })
    })
}),
$(function() {
    $("[data-analytics-newPasswordRequest]").click(function() {
        var t = $("#ForgottenPassword input[name='email']").val();
        $.ajax({
            type: "POST",
            data: {
                email: t
            },
            url: getPropertyValue($(this), "data-analytics-newPasswordRequest-ajaxURL"),
            crossDomain: !0,
            success: function(t) {
                t && sendEvent("newPasswordRequest", {})
            }
        })
    })
}),
$(function() {
    $("[data-analytics-contactFormSubmit]").on("click", function() {
        validateContactFormSubmit($("[data-analytics-contactFormSubmit-form]"))
    })
}),
$(function() {
    $("[data-analytics-clickAddToCart]").click(function() {
        var t = getPropertyValue($(this), "data-analytics-clickAddToCart-productCode")
          , a = $("[data-analytics-clickAddToCart-productQuantity]").find("input[name='qty']").val()
          , e = getPropertyValue($(this), "data-analytics-clickAddToCart-ajaxURL")
          , n = {
            productCode: t
        };
        $.ajax({
            url: e,
            type: "POST",
            data: n,
            success: function(t) {
                var e = null != t.type && "RANGE" == t.type.code ? t.code : "N/A"
                  , n = t.categoryPaths.length > 0 ? t.categoryPaths[0] : "N/A"
                  , i = t.categoryPaths.length > 1 ? t.categoryPaths[1] : "N/A"
                  , c = {
                    productID: t.code,
                    productName: t.name,
                    marketingCategory: n,
                    marketingSubcategory: i,
                    sisCategory: t.sisCategory,
                    sisSubcategory: t.sisSubCategory,
                    marketingRange: e,
                    productType: "Accessory",
                    productPrice: null != t.price ? t.price.value : "N/A",
                    productQuantity: $("[data-analytics-clickAddToCart-productQuantity]").find("input[name='qty']").length > 0 ? a : 1,
                    productCurrency: null != t.price ? t.price.currencyIso : "N/A"
                };
                sendEvent("clickAddToCart", c)
            }
        })
    })
}),
$(function() {
    $(document).on("click", "[data-analytics-autosuggest]", function() {
        var t = $(".autocomplete-body")
          , a = getPropertyValue($(this), "data-analytics-autosuggest-action")
          , e = getPropertyValue(t, "data-analytics-autosuggest-label")
          , n = getPropertyValue(t, "data-analytics-autosuggest-nbrresults")
          , i = {
            autosuggest_category: "internal_search",
            autosuggest_label: e,
            autosuggest_value: n,
            autosuggest_action: a
        };
        sendEvent("autosuggest", i)
    })
}),
setTimeout(function() {
    clickThumbnail(),
    analyticsComparator()
}, 2e3);
