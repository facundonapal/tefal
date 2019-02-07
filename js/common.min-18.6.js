function gsebAddressManager(e) {
    jQuery("#AddressManager").slideUp("fast", function() {
        var o = jQuery(e).attr("data-ajax");
        jQuery.ajax({
            type: "GET",
            url: o,
            success: function(e) {
                try {
                    e = JSON.parse(e)
                } catch (o) {
                    e = e.replace(/\\'/g, "'");
                    try {
                        e = JSON.parse(e)
                    } catch (e) {
                        console.log("Parse JSON ERROR")
                    }
                }
                $("#AddressManager").html(e.validatedForm),
                bindForm(),
                bindCreateUpdateAddress()
            },
            complete: function(e) {
                $("#AddressManager").show(),
                scrollToParam("#AddressManager")
            }
        })
    })
}
function scrollToParam(e) {
    var o = parseInt($(e).offset().top);
    $("body").scrollTo(o, 600)
}
function closeGsebAddressManager() {
    scrollToParam("body"),
    jQuery("#AddressManager").html(""),
    appendDeliveryAddress(),
    appednAddrBookContainer()
}
function bindCreateUpdateAddress() {
    $(".create_update_address_form").each(function() {
        var e = $(this)
          , o = {
            type: "POST",
            success: function(o) {
                try {
                    o = JSON.parse(o)
                } catch (e) {
                    o = o.replace(/\\'/g, "'");
                    try {
                        o = JSON.parse(o)
                    } catch (e) {
                        console.log("Parss JSON ERROR")
                    }
                }
                if (e.closest(".addrFormContainer").html(o.validatedForm),
                $("#globalMessages").html(o.message),
                bindCreateUpdateAddress(),
                "true" == o.success) {
                    var r = $(".addressAddEditTxt").clone();
                    $(".addrBookContainer").html(o.addrBook),
                    $(".addrBookContainer").prepend($(r)),
                    closeGsebAddressManager()
                }
            },
            error: function(e, o, r) {
                console.log("Oops ! Une erreur s'est produite.")
            }
        };
        $(this).ajaxForm(o)
    })
}
function refresh_compare() {
    1 == $(".gocompare").length && $(".gocompare").hide()
}
function LoadMore(e) {
    jQuery(e).parents(".see-more").hide(),
    jQuery.ajax({
        url: jQuery(e).attr("href")
    }).done(function(o) {
        jQuery(e).parents(".list-content").find(".item").remove(),
        jQuery(e).parents(".list-content").html(o),
        initGoCompare(),
        refresh_compare(),
        initComparator()
    })
}
function LoadMoreAlt(e) {
    console.log("Alternative PLP Ajax loading: Ok"),
    jQuery(e).parents(".see-more").hide(),
    jQuery.ajax({
        url: jQuery(e).attr("seo-data-url")
    }).done(function(o) {
        jQuery(e).parents(".list-content").find(".item").remove(),
        jQuery(e).parents(".list-content").html(o),
        initGoCompare(),
        refresh_compare(),
        initComparator()
    })
}
function LoadMoreResults(e, o, r) {
    o = void 0 !== o && o,
    jQuery(e).parents(".see-more").remove();
    var t = "#" + r;
    1 == o ? jQuery.ajax({
        url: jQuery(e).attr("href")
    }).done(function(e) {
        $(t).html(e).slideDown("slow", "linear")
    }) : jQuery.ajax({
        url: jQuery(e).attr("href")
    }).done(function(e) {
        $(t).html($(t).html() + e).slideDown("slow", "linear")
    })
}
function ApplyRules(e) {
    $(".mandatory").remove();
    for (var o = new Array("first_name","last_name","business_group","business_function","email_confirm","email","genre","home_address","zip_code","city","country","home_phone","mobile_phone","work_phone","category","subcategory","subsubcategory","product_ref","date_purchase","proof_purchase","newsletter","contact_fast","request_message","contact_us_country","attached_media","street_name","street_number","read_policy"), r = 0; r < o.length; ++r) {
        $("#div_" + o[r]).show();
        var t = "";
        null != e && (t = e.val()),
        $("#FullFormContact,#RequestFormContact,#ContactFormPrivacy").find("input[name='input_" + o[r] + "']").each(function() {
            $(this).attr("class", function(e, o) {
                return void 0 != o ? o.replace(/validate\[[^\[\]]*\]/gi, "") : ""
            })
        }),
        $("#FullFormContact,#RequestFormContact,#ContactFormPrivacy").find("select[name='input_" + o[r] + "']").each(function() {
            $(this).attr("class", function(e, o) {
                return o.replace(/validate\[[^\[\]]*\]/gi, "")
            })
        });
        var a = formConfig.getField(o[r], t, formConfig.getProfile());
        a && "[]" != a.getRules() && ($("#FullFormContact,#RequestFormContact,#ContactFormPrivacy").find("input[name='input_" + o[r] + "']").addClass("validate" + a.getRules()),
        $("#FullFormContact,#RequestFormContact,#ContactFormPrivacy").find("select[name='input_" + o[r] + "']").addClass("validate" + a.getRules())),
        a && !a.isVisible() && $("#div_" + o[r]).hide(),
        a && a.isMandatory() && $("#div_" + o[r]).children("label").append('<span class="mandatory">*</span>')
    }
}
function hideStepOption(e) {
    var o = !1
      , r = ""
      , t = "";
    null != e && (r = e.val());
    for (var a = new Array("first_name","last_name","business_group","business_function","email_confirm","email","genre","home_address","zip_code","city","country","home_phone","mobile_phone","work_phone","category","subcategory","subsubcategory","product_ref","date_purchase","proof_purchase","newsletter","contact_fast","request_message","attached_media","street_name","street_number","read_policy"), i = 1; i < 20; ++i) {
        t = r + "-" + i,
        o = !1;
        for (var n = 0; n < a.length; ++n) {
            var s = formConfig.getField(a[n], t, formConfig.getProfile());
            if (s && s.isVisible()) {
                o = !0;
                break
            }
        }
        o || $("#Step" + r).find('option[value="' + t + '"]').hide()
    }
    $("#Step" + $(e).val() + " option").show()
}
function createReCaptcha(e, o) {
    Recaptcha.create(e, o, {
        theme: "clean",
        custom_translations: {
            instructions_visual: ACC.instructionsVisualReCaptcha
        }
    })
}
function getAjaxFormContact(e, o) {
    jQuery("#AjaxContact").empty(),
    e && "" != jQuery(e).val() && jQuery.ajax({
        url: jQuery(e).val() + "&contactUsCountry=" + o
    }).done(function(e) {
        jQuery("#AjaxContact").append(e).slideDown("slow", "linear"),
        bindContactUsForm(),
        ApplyRules(null)
    })
}
function SendThisData(e, o) {
    var r = e.find(":selected").val()
      , t = e.attr("data-base-url");
    if ("subcategory" == o && ($("#div_subcategory").val(""),
    $("#div_subcategory").hide()),
    "subcategory" != o && "subsubcategory" != o || ($("#div_subsubcategory").val(""),
    $("#div_subsubcategory").hide()),
    $("#input_product_ref_select").val(""),
    $("#input_product_ref_select").show(),
    $("#input_product_ref_user").val(""),
    $("#input_product_ref_user").hide(),
    $("#div_product_ref").hide(),
    "" != r && "value-user" != r) {
        var a;
        "subsubcategory" == o || "subcategory" == o ? a = t + "subcategory?code=" + r : "product_ref" == o && (a = t + "product?code=" + r),
        jQuery.ajax({
            url: a
        }).done(function(r) {
            "product_ref" == o ? ($("#input_product_ref_select").html(r),
            $("#div_" + o).show()) : "" != r ? ($("#input_" + o).html(r),
            $("#div_" + o).show()) : SendThisData(e, "product_ref")
        })
    }
}
function submitFormContact() {
    var e = !0;
    $("#input_contact_us_country_select").children("option").length > 2 && (e = jQuery("#CountryFormData").validationEngine("validate"));
    var o = jQuery("#FormContact").validationEngine("validate");
    if (1 == o && 1 == e && 1 == o) {
        var r = jQuery("#FormContact").find("input[type='hidden'], :input:not(:hidden, :file),.g-recaptcha-response").serializeArray()
          , t = new FormData
          , a = JSON.stringify(r)
          , i = new Blob([a],{
            type: "text/plain",
            endings: "native"
        });
        t.append("properties", i);
        var n = document.FormContact.input_attached_media.files[0];
        t.append("file", n),
        jQuery.ajax({
            type: "POST",
            data: t,
            url: jQuery("#AjaxContact").data("save-url"),
            processData: !1,
            contentType: !1,
            headers: {
                Accept: "multipart/form-data"
            },
            success: function(e) {
                "reCaptcha" != e ? (jQuery("#ModalFeedbackBody").html(e),
                contactUsFeedback(),
                sendEvent("contactFormSubmit", {})) : (grecaptcha.reset(),
                jQuery("#captchaerror").validationEngine("showPrompt", pleaseReCaptcha))
            },
            error: function(e) {
                jQuery("#ModalFeedbackBody").html("Sorry, an error has occured"),
                console.log("error data", e),
                contactUsFeedback()
            }
        })
    }
}
function contactUsFeedback() {
    jQuery("#ModalFeedback").modal("show").on("hide.bs.modal", function(e) {
        getAjaxFormContact(),
        jQuery("#SelectContactForm").val(""),
        jQuery("html, body").animate({
            scrollTop: 0
        }, "slow")
    })
}
function bindContactUsForm() {
    jQuery("#FormContact").validationEngine(),
    jQuery("#FormContact").submit(function(e) {
        e.preventDefault(),
        submitFormContact()
    })
}
function newUserValue(e) {
    "value-user" === jQuery(e).val() ? (jQuery(e).validationEngine("validate"),
    jQuery(e).hide(),
    jQuery("#input_product_ref_user").show().focus(),
    jQuery("#input_product_ref_user").blur(function() {
        0 == jQuery(this).val().length && (jQuery("#input_product_ref_select option").first().attr("selected", "selected"),
        jQuery("#input_product_ref_select").show(),
        jQuery("#input_product_ref_select").validationEngine("validate"),
        jQuery(this).hide())
    })) : (jQuery("#input_product_ref_user").val(""),
    jQuery("#input_product_ref_user").hide())
}
function incrementQuantity(e, o) {
    var r = jQuery(e).find("#quantity")
      , t = parseInt(r.val());
    r.val(t + 1),
    1 == o && jQuery(e).submit()
}
function decrementQuantity(e, o) {
    var r = jQuery(e).find("#quantity")
      , t = parseInt(r.val());
    t > 1 && (r.val(t - 1),
    1 == o && jQuery(e).submit())
}
function incrementQuantityForAcc(e, o, r) {
    var t = jQuery(e).find("#qty")
      , a = parseInt(t.val());
    a < o ? (t.val(a + 1),
    1 == r && jQuery(e).submit()) : jQuery(e).find("#msg_error").show()
}
function decrementQuantityForAcc(e, o) {
    var r = jQuery(e).find("#qty")
      , t = parseInt(r.val());
    jQuery(e).find("#msg_error").hide(),
    t > 1 && (r.val(t - 1),
    1 == o && jQuery(e).submit())
}
function confirmDeleteEntry(e) {
    return confirm(e)
}
function submitAlertEmailCreation(e) {
    1 == jQuery("#FormStockAlert").validationEngine("validate") && jQuery.ajax({
        type: "POST",
        data: jQuery("#FormStockAlert").find("input[type='hidden'], :input:not(:hidden)").serialize(),
        url: e,
        success: function(e) {
            jQuery("#globalMessages").html(e),
            jQuery("#globalMessages > .information_message").hasClass("positive") && (jQuery("#FormStockAlert").find(".first").remove(),
            jQuery("#FormStockAlert").find(".last").show())
        },
        error: function() {
            jQuery("#globalMessages").html("Sorry, an error has occured")
        }
    })
}
function setDCPToken(e) {
    console.log("success with data:", e),
    e.message && (document.cookie = "DCP_TOKEN=" + e.data.token + " ;path=/",
    document.cookie = "email=" + e.data.login + " ;path=/",
    document.cookie = "login=" + e.data.login + " ;path=/",
    localStorage.setItem("DCP_TOKEN", e.message),
    localStorage.setItem("login", e.data.login),
    localStorage.setItem("email", e.data.login))
}
function showNewsLetterModalIncheckoutPage() {
    $(".skip[id^=error]").hide();
    var e = !jQuery("#rules").is(":checked")
      , o = !jQuery("input[id^=payment-mode-]").is(":checked")
      , r = !1;
    e ? (jQuery("#errorTOS").show(),
    r = !0) : $("#errorTOS").hide(),
    !1 === isSampleOrder && o ? (jQuery("#errorPM").show(),
    r = !0) : jQuery("#errorPM").hide(),
    $("#detachedPieceCG").length > 0 && !$("#detachedPieceCG").is(":checked") ? ($("#errorCG-PD").show(),
    r = !0) : $("#errorCG-PD").hide(),
    $("#repareServiceCG").length > 0 && !$("#repareServiceCG").is(":checked") ? ($("#errorCG-RS").show(),
    r = !0) : $("#errorCG-RS").hide(),
    validateLegalTax() || (r = !0),
    validateMobilePhone() || (r = !0),
    r || ($("#ModalNewsLetter").modal(),
    Modal.show())
}
function submitNewsletter() {
    $.ajax({
        type: $("#FormNewsLetter").attr("method"),
        data: $("#FormNewsLetter").serialize(),
        url: $("#FormNewsLetter").attr("action"),
        success: function(e) {
            "ok" == e ? ($("#popinMessages").append("<div class='information_message positive'> <span class='single'></span> <span> " + newsLEtterSubscribeEmail + "</span> </div>"),
            $("#FormNewsLetter .item-form-news").remove(),
            $("#DoubleOptinButton").remove(),
            $("#DoubleOptinButtonClose").show("#DoubleOptinButton")) : $("#DoubleOptinButtonClose").click()
        },
        error: function() {
            $("#errorSubscription").show()
        }
    }),
    $("#FormNewsLetter").submit()
}
function validateTOSAjaxService(e) {
    if (!1 === orderAlreadyCreated) {
        orderAlreadyCreated = !0;
        var o = $("#legal-tax-number").val()
          , r = void 0 !== o ? "&legal-tax-number=" + o : ""
          , t = $("#mobilePhone").val()
          , a = void 0 !== t ? "&mobilePhone=" + t : "";
        jQuery.ajax({
            type: "GET",
            url: ACC.payment.verifyCurrency,
            success: function(o) {
                o ? jQuery.ajax({
                    type: "POST",
                    url: ACC.payment.verifyThreshold,
                    data: jQuery("#FormPaymentMode").serialize() + r + a,
                    success: function(o) {
                        o ? jQuery.ajax({
                            type: "POST",
                            data: jQuery("#FormPaymentMode").serialize() + r + a,
                            url: e,
                            success: function(e) {
                                if (jQuery("#errorPM").hide(),
                                jQuery("#errorPMThreshold").hide(),
                                "WINDOW" == e.target && (window.location.href = ACC.config.contextPath + e.url),
                                "POPUP" == e.target && e.modal) {
                                    if (modal = "." + e.code,
                                    "ideal" == e.modal) {
                                        jQuery(modal + " form select").html("");
                                        for (var o in e.issuers)
                                            jQuery(modal + " form select").append("<option value=" + o + ">" + e.issuers[o] + "</option>")
                                    }
                                    jQuery(modal).show(),
                                    jQuery(modal).modal(),
                                    jQuery(modal + " form").attr("action", ACC.config.contextPath + e.url),
                                    jQuery(modal).on("hidden.bs.modal", function() {
                                        jQuery(modal).hide()
                                    })
                                }
                                "DIRECT" == e.target ? $.ajax({
                                    type: "POST",
                                    url: e.url,
                                    data: {
                                        paymentMode: e.code
                                    },
                                    success: function(e) {
                                        $("body").append("<form id='sgaPaymentForm' style='display:none;' method='POST'></form>"),
                                        $("#sgaPaymentForm").attr("action", e.postUrl),
                                        $.each(e.parameters, function(e, o) {
                                            var r = $("<input type='hidden'/>");
                                            r.attr("name", e),
                                            r.attr("value", o),
                                            $("#sgaPaymentForm").append(r)
                                        }),
                                        $("#sgaPaymentForm").submit()
                                    }
                                }) : "ideal" != e.modal && (jQuery("#PaymentResult").html(e.html),
                                1 == $("#PaymentResult form input[type=IMAGE]").length && 1 == $("#PaymentResult form input[name=PAYLIB]").length && (jQuery("#PaymentResult form input").trigger("click"),
                                jQuery("#ModalPayment").remove()),
                                jQuery("#ModalPayment").show(),
                                "fr" != jQuery("input[name='baseStoreLanguage']").val() && "fr_fr" != jQuery("input[name='baseStoreLanguage']").val() && jQuery("input[name='CB']").hide(),
                                jQuery("#ModalPayment").modal(),
                                jQuery("#ModalPayment").on("hidden.bs.modal", function() {
                                    jQuery("#ModalPayment").hide()
                                }))
                            },
                            error: function() {
                                orderAlreadyCreated = !1,
                                jQuery("#errorSubscription").show()
                            }
                        }) : (orderAlreadyCreated = !1,
                        jQuery("#errorPMThreshold").show(),
                        jQuery("#errorPM").hide())
                    }
                }) : (orderAlreadyCreated = !1,
                jQuery("#PaymentCurrencyModal #currencyModal").show(),
                jQuery("#PaymentCurrencyModal #currencyModal").modal())
            }
        })
    }
}
function validateTOSForDoubleOptin(e) {
    $("#ModalNewsLetter").find(".close").trigger("click"),
    $(".skip[id^=error]").hide();
    var o = !jQuery("#rules").is(":checked")
      , r = !jQuery("input[id^=payment-mode-]").is(":checked")
      , t = !1;
    o && (jQuery("#errorTOS").show(),
    t = !0),
    r && !1 === isSampleOrder ? (jQuery("#errorPM").show(),
    t = !0) : jQuery("#errorPM").hide(),
    $("#detachedPieceCG").length > 0 && !$("#detachedPieceCG").is(":checked") ? ($("#errorCG-PD").show(),
    t = !0) : $("#errorCG-PD").hide(),
    validateLegalTax() || (t = !0),
    validateMobilePhone() || (t = !0),
    t || (!0 === isSampleOrder ? placeSmapleOrder() : validateTOSAjaxService(e))
}
function validateTOS(e) {
    $("#ModalNewsLetter").find(".close").trigger("click"),
    $(".skip[id^=error]").hide();
    var o = !jQuery("#rules").is(":checked")
      , r = !jQuery("input[id^=payment-mode-]").is(":checked")
      , t = !1;
    o ? (jQuery("#errorTOS").show(),
    t = !0) : jQuery("#errorTOS").hide(),
    r && !1 === isSampleOrder ? (jQuery("#errorPM").show(),
    t = !0) : $("#errorPM").hide(),
    $("#detachedPieceCG").length > 0 && !$("#detachedPieceCG").is(":checked") ? ($("#errorCG-PD").show(),
    t = !0) : $("#errorCG-PD").hide(),
    $("#repareServiceCG").length > 0 && !$("#repareServiceCG").is(":checked") ? ($("#errorCG-RS").show(),
    t = !0) : $("#errorCG-RS").hide(),
    validateLegalTax() || (t = !0),
    validateMobilePhone() || (t = !0),
    t || (jQuery.ajax({
        type: jQuery("#FormNewsLetter").attr("method"),
        data: jQuery("#FormNewsLetter").serialize(),
        url: jQuery("#FormNewsLetter").attr("action")
    }),
    $("#FormNewsLetter").submit(),
    !0 === isSampleOrder ? placeSmapleOrder() : validateTOSAjaxService(e))
}
function bindForm() {
    $("#new_address_form").on("change", function() {
        var e = $("#add-address-button").attr("data-ajax")
          , o = $("#new_address_form").val();
        jQuery.ajax({
            type: "GET",
            url: e,
            data: {
                country: o
            },
            success: function(e) {
                try {
                    e = JSON.parse(e)
                } catch (o) {
                    e = e.replace(/\\'/g, "'");
                    try {
                        e = JSON.parse(e)
                    } catch (e) {
                        console.log("Parse JSON ERROR")
                    }
                }
                $("#AddressManager").html(e.validatedForm),
                bindForm(),
                bindCreateUpdateAddress()
            },
            complete: function(e) {
                jQuery("#AddressManager").slideDown(),
                $("#AddressManager").show()
            }
        })
    })
}
function processCookiesUseMessage() {
    $(".cookie").length && ("closed" !== $.cookie("bannerCookie") ? setTimeout(function() {
        $(".cookie").removeClass("hide"),
        $(".cookie").addClass("show")
    }, 1500) : $(".cookie").remove(),
    $(".cookie .close").on("click", function() {
        $(".cookie").removeClass("show"),
        setTimeout(function() {
            $(".cookie").remove()
        }, 1500),
        $.cookie("bannerCookie", "closed", {
            expires: 365,
            domain: cookieDomain()
        })
    }))
}
function cookieDomain() {
    return domain = window.location.hostname,
    "localhost" != domain ? domain : null
}
function isValidEmailAddress() {
    var e = $("#email").val();
    new RegExp("[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,4}").test(e) ? ($("#companionEmailError").hide(),
    $("#companionClubForm").submit()) : $("#companionEmailError").show()
}
function showStatusInfosPrivacy() {
    hideStatusInfosPrivacy(),
    1 == $('input[name="radioPrivacy1"]:checked').val() && 1 == $('input[name="radioPrivacy2"]:checked').val() && $("#FormContact").submit(),
    null != $('input[name="radioPrivacy1"]:checked').val() && 0 != $('input[name="radioPrivacy1"]:checked').val() || ($("#customercare-contact-col_ValidationSummary0").show(),
    $("#customercare-contact-col_ValidationSummary1").show()),
    null != $('input[name="radioPrivacy2"]:checked').val() && 0 != $('input[name="radioPrivacy2"]:checked').val() || ($("#customercare-contact-col_ValidationSummary0").show(),
    $("#customercare-contact-col_ValidationSummary2").show())
}
function hideStatusInfosPrivacy() {
    $("#customercare-contact-col_ValidationSummary0").hide(),
    $("#customercare-contact-col_ValidationSummary1").hide(),
    $("#customercare-contact-col_ValidationSummary2").hide()
}
function processPushMobileMessage() {
    Modal.putContent($("#ModalChoixDevice")),
    "Mobile" == $.cookie("pushMobileCookie") || "Desktop" == $.cookie("pushMobileCookie") ? ($(".modal-device").remove(),
    $("#LayerOverAll").remove(),
    "Mobile" == $.cookie("pushMobileCookie") && $.cookie("pushMobileUrlCookie") && (document.location.href = $.cookie("pushMobileUrlCookie")),
    Modal.close(),
    $("#LayerOverAll").remove()) : setTimeout(function() {
        $("#ModalChoixDevice").modal(),
        Modal.show()
    }, 500),
    $(".modal-device .btn-action").on("click", function() {
        setTimeout(function() {
            Modal.close(),
            $(".modal-device").remove(),
            $("#LayerOverAll").remove()
        }, 1500),
        $.cookie("pushMobileCookie", "Mobile", {
            expires: 365,
            domain: cookieDomain()
        }),
        $.cookie("pushMobileUrlCookie", $(this).attr("href"), {
            expires: 365,
            domain: cookieDomain()
        })
    }),
    $(".modal-device .viewdesktop").on("click", function() {
        setTimeout(function() {
            Modal.close(),
            $(".modal-device").remove(),
            $("#LayerOverAll").remove()
        }, 1500),
        $.cookie("pushMobileCookie", "Desktop", {
            expires: 365,
            domain: cookieDomain()
        }),
        $.cookie("pushMobileUrlCookie", $(this).attr("href"), {
            expires: 365,
            domain: cookieDomain()
        }),
        document.location.search = "uiel=Desktop",
        document.location.replace(document.location.href)
    })
}
function seeMore() {
    $("#EssentialList.scrollable-lame .item").each(function() {
        $(this).find(".caption").css("width", $(this).find(".border").width()),
        $(this).find(".caption").readmore({
            speed: 75,
            collapsedHeight: 150,
            lessLink: "",
            afterToggle: function() {
                $("#EssentialList.scrollable-lame .caption").each(function() {
                    $(this).css("height", ""),
                    $(this).parent().find("a").remove(),
                    $(this).readmore("destroy")
                });
                var e = 0;
                $("#EssentialList.scrollable-lame .item").each(function() {
                    $(this).height() > e && (e = $(this).height())
                })
            }
        })
    })
}
function afficher() {
    $("#div_cache").show()
}
function cacher() {
    $("#div_cache").hide()
}
function sendSms() {
    $(".modal-header").find("#globalMessages").hide(),
    jQuery("#messageSmsErrors").html("");
    var e = $("#phone").val();
    if (new RegExp("^[0-9]+$").test(e)) {
        var o = $("#smsForm").serialize();
        jQuery.ajax({
            type: "POST",
            url: jQuery("#smsForm").attr("action"),
            data: o,
            success: function(e) {
                1 == e.success ? $(".modal-header").find("#globalMessages").show() : jQuery("#messageSmsErrors").html(e.message)
            },
            error: function(e) {
                jQuery("#messageSmsErrors").html(e.message)
            }
        })
    } else
        jQuery("#messageSmsErrors").html($("#invalidPhone").html())
}
function smsModelHide() {
    $(".modal-header").find("#globalMessages").hide(),
    $("#phone").val(""),
    $("#ModalSMS").modal("hide"),
    jQuery("#messageSmsErrors").html("")
}
function validateFormDetachedPiece() {
    "" != $("#accessoryCode").val() ? $.ajax({
        type: $("#detachedPieceForm").attr("method"),
        data: $("#detachedPieceForm").serialize(),
        url: $("#detachedPieceForm").attr("action"),
        success: function(e) {
            null != e && "" != e ? "S" != e.accessoryCategorisation ? window.location.href = ACC.config.contextPath + e.url : ($("#errorNofound").hide(),
            $("#errorNotForSale").show(),
            $("#modalErrorDetachedPiece").modal(),
            Modal.show()) : ($("#errorNotForSale").hide(),
            $("#errorNofound").show(),
            $("#modalErrorDetachedPiece").modal(),
            Modal.show())
        },
        error: function() {
            $("#errorNotForSale").hide(),
            $("#errorNofound").show(),
            $("#modalErrorDetachedPiece").modal(),
            Modal.show()
        }
    }) : ($("#errorNotForSale").hide(),
    $("#errorNofound").hide(),
    $("#errorRequired").show())
}
function validateFormExplodedView() {
    "" != $("#codeSav").val() ? document.getElementById("codeSav").validity.valid ? ($("#errorInvalid").hide(),
    $.ajax({
        type: $("#explodedViewsForm").attr("method"),
        data: $("#explodedViewsForm").serialize(),
        url: $("#explodedViewsForm").attr("action"),
        success: function(e) {
            null != e && "" != e ? window.location.href = ACC.config.contextPath + "/exploded-view/" + $("#productCodePost").val() + "/detail-exp-view/" + e : ($("#errorRequired").hide(),
            $("#errorNofound").show())
        },
        error: function() {
            $("#errorRequired").hide(),
            $("#errorNofound").show()
        }
    })) : ($("#errorRequired").hide(),
    $("#errorInvalid").show()) : ($("#errorNofound").hide(),
    $("#errorInvalid").hide(),
    $("#errorRequired").show())
}
function chooseAspForReparation(e, o) {
    $("input[id='accessory-pointOfServiceName']").val(o),
    $(".asp-choosed").removeClass("asp-choosed"),
    $("#ShopDetail-" + o).find(".inner").addClass("asp-choosed"),
    $("#add-service-messageError").hide()
}
function closeModalMessage(e) {
    $("#" + e).modal("hide"),
    $(".add-service-popup").remove()
}
jQuery.migrateTrace = !1,
jQuery.migrateMute = !0,
$.fn.scrollTo = function(e, o, r) {
    "function" == typeof o && 2 == arguments.length && (r = o,
    o = e);
    var t = $.extend({
        scrollTarget: e,
        offsetTop: 50,
        duration: 500,
        easing: "swing"
    }, o);
    return this.each(function() {
        var e = $(this)
          , o = "number" == typeof t.scrollTarget ? t.scrollTarget : $(t.scrollTarget)
          , a = "number" == typeof o ? o : o.offset().top + e.scrollTop() - parseInt(t.offsetTop);
        e.animate({
            scrollTop: a
        }, parseInt(t.duration), t.easing, function() {
            "function" == typeof r && r.call(this)
        })
    })
}
,
jQuery(document).ready(function() {
    function e(e, o) {
        var r = window.location.href
          , t = ""
          , a = r.split("?")
          , n = a[0]
          , s = a[1]
          , c = "";
        if (s)
            for (a = s.split("&"),
            i = 0; i < a.length; i++)
                a[i].split("=")[0] != e && (t += c + a[i],
                c = "&");
        var l = c + "" + e + "=" + o;
        window.location = n + "?" + t + l
    }
    $.browser.mobile ? processPushMobileMessage() : $("#LayerOverAll").remove(),
    bindCreateUpdateAddress(),
    refresh_compare(),
    $("#faq-sort").change(function() {
        e("sort", $(this).val())
    }),
    jQuery(".navbarallp .nav li a").hover(function(e) {
        e.stopPropagation();
        var o = jQuery(this).parent("li").index();
        jQuery('div[id^="SubNav_"]').hide(),
        jQuery("#SubNav_" + o).show()
    }),
    jQuery(".navbar, .row-fluid").mouseover(function(e) {
        jQuery(".navbarallp .nav li a").parent("li").removeClass("hover"),
        jQuery('div[id^="SubNav_"] .scroll .item').removeClass("hover"),
        jQuery('div[id^="SubNav_"]:not(.subnav-visible)').hide()
    }),
    $(".currency").click(function() {
        var e = jQuery(this).attr("data-id");
        $.ajax({
            url: ACC.config.contextPath + "/exclusion/currency/" + e,
            async: !1
        }).done(function(o) {
            1 == o.isExcluded ? ($("#selectedCurr").val(e),
            $("#isExludedCurr").val(!0),
            $("#ModalCurrency").show(),
            $("#ModalCurrency").modal({
                backdrop: "static"
            })) : ($("#selectedCurr").val(e),
            $("#isExludedCurr").val(!1),
            $("#currency-form").submit())
        })
    }),
    $("#ModalCurrency .close").click(function() {
        $("#currency-form").submit()
    }),
    $("#deliveryPage-currencySelect").on("change", function() {
        $(".btn-action").prop("disabled", !1)
    }),
    $(".btn-action.deliveryPage-currency").click(function() {
        var e = $("#deliveryPage-currencySelect option:selected").attr("data-id");
        $.ajax({
            url: ACC.config.contextPath + "/exclusion/currency/" + e,
            async: !1
        }).done(function(o) {
            1 == o.isExcluded ? ($("#selectedCurrDeliveryPage").val(e),
            $("#isExludedCurrDeliveryPage").val(!0)) : ($("#selectedCurrDeliveryPage").val(e),
            $("#isExludedCurrDeliveryPage").val(!1),
            $("#currency-form-deliveryPage").submit())
        })
    }),
    processCookiesUseMessage(),
    $(".product-cat.product-list .list-content .zone-showmore").length > 0 && $(".zone-showmore a").trigger("click"),
    $("header .search form[name='search_form']").submit(function(e) {
        var o = parseInt(ACC.searchTextMinLength);
        $("header .search #search").val().length < o && e.preventDefault()
    })
}),
jQuery.fn.clearForm = function() {
    return this.each(function() {
        var e = this.type
          , o = this.tagName.toLowerCase();
        if ("form" == o)
            return $(":input", this).clearForm();
        "text" == e || "password" == e || "textarea" == o ? this.value = "" : "checkbox" == e || "radio" == e ? this.checked = !1 : "select" == o && (this.selectedIndex = -1)
    })
}
;
var formConfig, Field = function() {
    var e = function(e, o, r, t, a) {
        this.name = e,
        this.order = o,
        this.type = r,
        this.rules = t,
        this.visible = a
    };
    return e.prototype = {
        getName: function() {
            return this.name
        },
        getOrder: function() {
            return this.order
        },
        getRules: function() {
            return this.rules
        },
        isVisible: function() {
            return this.visible
        },
        isMandatory: function() {
            return this.rules.indexOf("equired") >= 0
        }
    },
    e
}();
$("#ifuLanguage").change(function() {
    $(this).closest("form").trigger("submit")
}),
$("#ifuSelector").submit(function(e) {
    e.preventDefault(),
    jQuery.ajax({
        data: $("#ifuSelector").serialize(),
        url: $("#ifuSelector").attr("action")
    }).done(function(e) {
        $("#ScrollProductManual").html(e),
        scrollableLames()
    })
}),
jQuery(document).ready(function(e) {
    e("#addDocLanguage").closest("form").trigger("submit")
}),
$("#addDocLanguage").change(function() {
    $(this).closest("form").trigger("submit")
}),
$("#addDocSelector").submit(function(e) {
    e.preventDefault(),
    jQuery.ajax({
        data: $("#addDocSelector").serialize(),
        url: $("#addDocSelector").attr("action")
    }).done(function(e) {
        $("#ScrollProductDoc").html(e)
    })
});
var FormConfig = function() {
    var e = function(e) {
        this.profile = e,
        this.fields = new Object
    };
    return e.prototype = {
        getProfile: function() {
            return this.profile
        },
        addField: function(e, o, r, t, a) {
            this.fields[e + o + r] = new Field(e,o,r,t,a)
        },
        getField: function(e, o, r) {
            return this.fields[e + o + r] ? this.fields[e + o + r] : this.fields[e + "ALL" + r] ? this.fields[e + "ALL" + r] : this.fields[e + "ALLALL"] ? this.fields[e + "ALLALL"] : null
        }
    },
    e
}();
jQuery("#submitForgottenPassword").click(function(e) {
    e.preventDefault(),
    jQuery("#messageErrors").html(""),
    jQuery.ajax({
        type: "POST",
        data: jQuery("#ForgottenPassword").serialize(),
        url: jQuery("#ForgottenPassword").attr("action") + "/validate",
        success: function(e) {
            "OK" == e ? jQuery("#ForgottenPassword").submit() : jQuery("#messageErrors").html(e)
        },
        error: function() {
            jQuery("#messageErrors").html("Sorry, an error has occured")
        }
    })
}),
jQuery("#logoutButton").click(function(e) {
    document.cookie = "DCP_TOKEN=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",
    document.cookie = "login=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",
    document.cookie = "email=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",
    localStorage.removeItem("DCP_TOKEN"),
    localStorage.removeItem("login"),
    localStorage.removeItem("email"),
    localStorage.removeItem("token")
}),
jQuery("#submitFormLoginAjax").click(function(e) {
    var o = jQuery("#FormLogin").attr("action")
      , r = jQuery("#FormLogin").attr("secure-action");
    jQuery("#messageErrorsLogin").html(""),
    e.preventDefault(),
    jQuery.ajax({
        type: "post",
        data: jQuery("#FormLogin").serialize(),
        url: o + "/login/request/validate",
        success: function(e) {
            1 == e.success ? (jQuery("#FormLogin").attr("action", r + "/j_spring_security_check"),
            jQuery("#FormLogin").submit()) : jQuery("#messageErrorsLogin").html(e.message)
        },
        error: function() {
            jQuery("#messageErrorsLogin").html(errorLogin)
        }
    })
}),
$("#FormNewsLetter").submit(function(e) {
    e.preventDefault()
}),
$("#FormPaymentMode input[type=radio][id*=payment-mode-]").click(function() {
    $("#FormPaymentMode input[type=radio][id*=payment-mode-][value*=paylib]").is(":checked") ? $("#paylibMessage").show() : $("#paylibMessage").hide()
}),
jQuery("#companionClubForm").on("submit", function(e) {
    var o = jQuery("#companionClubForm").attr("action");
    jQuery("#messageErrors").html(""),
    jQuery("#messageSuccess").html(""),
    e.preventDefault(),
    jQuery.ajax({
        type: "POST",
        data: jQuery("#companionClubForm").serialize(),
        url: o,
        success: function(e) {
            1 == e.success ? ($("#newLetterSubsModal").modal("show"),
            $(".modal-body").html(e.message),
            $(".modal").on("hidden.bs.modal", function() {
                $.clearFormFields($("#companionClubForm"))
            })) : ($("#newLetterSubsModal").modal("show"),
            jQuery("#messageErrors").text(e.message),
            $(".modal-body").html(e.message),
            $(".modal").on("hidden.bs.modal", function() {
                $.clearFormFields($("#companionClubForm"))
            }))
        },
        error: function() {
            jQuery("#messageErrors").text(data.message),
            $("#newLetterSubsModal").modal("show"),
            $(".modal").on("hidden.bs.modal", function() {
                $.clearFormFields($("#companionClubForm"))
            })
        }
    })
}),
$.clearFormFields = function(e) {
    $(e).find('input[type="text"]').val("")
}
,
$(window).load(function() {
    seeMore()
}),
$(document).on("imagesLoaded", function() {
    seeMore()
}),
$.clearFormFields = function(e) {
    $(e).find('input[type="text"]').val("")
}
,
$("#ModalNewsLetter.my-space").length > 0 && ($("#ModalNewsLetter.my-space").modal(),
Modal.show()),
jQuery(document).ready(function(e) {
    e("#LayerOverAll").on("hidden", function() {
        e("#LayerOverAll").remove()
    }),
    jQuery("#control_get_companion input").click(function() {
        1 == jQuery(this).prop("value") ? jQuery("#control_get_companion_model").slideDown() : jQuery("#control_get_companion_model").slideUp()
    }),
    "true" == e('input[id="showProduct"]').val() && (e("#div_cache").show(),
    document.getElementById("oui").checked = !0),
    1 == e('input[id="control_get_companion_yes"]:checked').val() && jQuery("#control_get_companion_model").slideDown(),
    jQuery("#menuRol li").hover(function() {
        jQuery(this).toggleClass("sfHover")
    }),
    jQuery("#EssentialList .lame-control").on("click", function() {
        setTimeout(function() {
            seeMore()
        }, 400)
    })
}),
$(function() {
    var e = $(".container-companion #filter-menu ul")
      , o = e.width()
      , r = e.children("form")
      , t = r.length
      , a = e.children("li")
      , i = a.width()
      , n = o - i
      , s = n / t;
    r.each(function() {
        $(".container-companion #filter-menu form li p").attr("style", "max-width:" + s + "px !important;")
    })
}),
$(function() {
    $("#bloc-recettes .button-seemore").show(),
    $("#bloc-recettes .seo-button-seemore").attr("style", "display:none;"),
    $("#recipe-list-showmore .button-seemore").show(),
    $("#recipe-list-showmore .seo-button-seemore").attr("style", "display:none;")
}),
$("#detachedPieceForm").submit(function(e) {
    validateFormDetachedPiece(),
    e.preventDefault()
}),
$("#explodedViewsForm").submit(function(e) {
    validateFormExplodedView(),
    e.preventDefault()
}),
$(".how-to-choose-page div.how-to-use").click(function() {
    var e = $(this).find("a").first().attr("href");
    window.location.href = e
}),
$(document).ready(function() {
    var e = $("#detachedPieceForm #productCode").val();
    $(function() {
        $("#detachedPieceForm #accessoryCode").autocomplete({
            source: function(o, r) {
                $.ajax({
                    url: ACC.config.contextPath + "/exploded-view/" + e + "/detail-exp-view/auto-compelte",
                    type: "GET",
                    dataType: "json",
                    data: {
                        term: o.term
                    },
                    success: function(e) {
                        console.log(e),
                        r(e)
                    }
                })
            }
        })
    })
}),
$("#FormCreateProfile").on("submit", function(e) {
    $(this).find("button.btn-action").attr("disabled", "disabled")
}),
maxHeightAccessoiresBloc = 0,
$("#AccessoriesPush .item h4").each(function() {
    maxHeightAccessoiresBloc < $(this).height() && (maxHeightAccessoiresBloc = $(this).height(),
    $("#AccessoriesPush .item h4").height(maxHeightAccessoiresBloc))
}),
$(".pr-snippet-link").on("click", function() {
    $(".nav_lame li .powerReviewsAnchor").trigger("click")
}),
jQuery(document).ready(function() {
    $(".our-applications-share>div").length < 4 && $(".our-applications-share").hide()
}),
jQuery(document).ready(function() {
    if ($(".offer-popin").length > 0) {
        var e = 1e3 * $(".offer-popin").data("timeout");
        setTimeout(function() {
            $(".offer-popin").modal(),
            Modal.show()
        }, e)
    }
}),
$(window).on("load", function() {
    if ($(".page-MobileApplicationListPage").length > 0) {
        var e = $("body").width()
          , o = $(".wrap-header").height() + $(".our-application-banner").height() + $(".our-applications-description").height() + 35;
        $(".our-applications-banner-background").css({
            width: e,
            top: o,
            opacity: 1
        }),
        $("#MainBodyContent").append('<div class="our-applications-bottom-gradient"></div>'),
        $(".our-applications-bottom-gradient").css({
            width: $("body").width(),
            left: -($("body").width() - 940) / 2
        })
    }
}),
$(function() {
    $(".page-MobileApplicationListPage").length > 0 && $(".our-applications-item-desc-bottom div:nth-child(4) span").click(function(e) {
        e.preventDefault();
        var o = $(this).data("our-app-index");
        $("#mobileapp-compatibility-popin-" + o).length > 0 && ($("#mobileapp-compatibility-popin-" + o).modal(),
        Modal.show(),
        $(".modal-backdrop").addClass("offer-marketing"))
    })
}),
$(function() {
    var e = {
        infinite: !0,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: !1,
        prevArrow: "<span class='slick-prev'>‹</span>",
        nextArrow: "<span class='slick-next'>›</span>"
    };
    $(".our-applications-share").slick(e)
}),
jQuery(document).ready(function() {
    $(".our-applications-share div").length < 4 && $(".our-applications-share").hide()
}),
$(function() {
    window.addEventListener("load", function() {
        if ($(".cook-and-grain").length > 0) {
            $("#MainBodyContent").removeClass("container"),
            $("#breadcrumb.navigation").addClass("container");
            var e = {
                adaptiveHeight: !0,
                arrows: !0,
                dots: !1,
                easing: "linear",
                infinite: !0,
                swipe: !0,
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: "<span class='slick-prev'>‹</span>",
                nextArrow: "<span class='slick-next'>›</span>"
            };
            $(".cook-and-grain-zone3-carousel ul").slick(e)
        }
    })
}),
$(function() {
    $('[id*="ModalMedia"]').length >= 1 && $('[id*="ModalMedia"]').each(function() {
        var e = $(this);
        e.on("shown", function() {
            setTimeout(function() {
                1 === e.find("iframe").length && e.find("img:not(.BtnClose)").length <= 0 ? $(".transparent-modal-close").length <= 1 && e.find("button.close").appendTo(".center-modal-iframe").wrap('<div class="transparent-modal-close"></div>') : e.removeClass("transparent-modal")
            }, 500)
        })
    })
}),
$(function() {
    -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && $("body").addClass("safari")
}),
$(".add_service_form .add-to-cart").bind("click", function(e) {
    e.preventDefault(),
    $.ajax({
        url: "/cart/add/service/ajax",
        data: $(this).closest("form").serialize(),
        async: !1,
        success: function(e) {
            var o = "#ModalMessage";
            if (e.cartError && 0 == !e.cartError.msg.length)
                modalId = "ModalCartError",
                $("body").append($("<div />").html(e.cartError.msgModalHtml).text()),
                o = "#" + modalId,
                $(o).on("hidden.bs.modal", function() {
                    $(o).remove()
                });
            else {
                $(o).html(e);
                $(e).find("[data-forfaitShippingIncluded]").length > 0 || ACC.addressgeocode.geocodeAddress(),
                $(o).addClass("service-popup");
                $("#ModalMessage").find("#relayPointsContainer").prepend('<button aria-hidden="true" data-dismiss="modal" class="close btn-colse_prc" type="button">x</button>'),
                $("#ModalMessage").find("#repair-store-filter").on("hidden.bs.collapse", function(e) {
                    e || (e = window.event),
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }),
                $("#ModalMessage").on("hidden.bs.modal", function() {
                    $("#ModalMessage .modal-body").html("")
                })
            }
            $(o).show(),
            $(o).modal()
        },
        error: function(e) {
            console.error("Error trying to add service product: " + e);
            var o = $("#ModalMessage")
              , r = o.find(".modal-body")
              , t = new StringBuilder;
            t.append("<p style='margin-bottom: 20px;'>" + GSEB.properties.defaultCartErrorMessage + "</p>"),
            t.append("<button class='btn btn-action' data-dismiss='modal' style='margin:0 auto; display: block; width: auto; text-align: center'>" + closePopup + "</button>"),
            r.html(t.toString()),
            o.show(),
            o.modal()
        }
    })
});
