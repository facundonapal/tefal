/* Utilities */
/**
 * Author: yharif
 * Date: 03/13/2018
 *
 * Making an event trigger before its peers.
 */

/* BRA-18190 */
var wannaChangeAddress = false;
var wannaChangePointRetrait = false;

$.fn.bindFirst = function (name, fn) {
    var elem, handlers, i, _len;
    this.bind(name, fn);
    for (i = 0, _len = this.length; i < _len; i++) {
        elem = this[i];
        handlers = jQuery._data(elem).events[name.split('.')[0]];
        handlers.unshift(handlers.pop());
    }
};

/**
 * Author: yharif
 * Date: 03/13/2018
 *
 * JavaScript StringBuilder
 */
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value)
{
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value)
{
    if (value)
    {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function ()
{
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function ()
{
    return this.strings.join("");
}

/**
 * Author: yharif
 * Date: 03/13/2018
 *
 * Checks for null or undefined
 */
function isUndefinedOrNull(value) {
    return value === null || value === undefined;
}

/* BRA-11384 Mise en place de la livraison en points relais */
function removeDeliveryAddresses(msg,adress) {
    if(confirm(msg)){
        jQuery.ajax({
            type: "GET",
            url: $(adress).data('href'),
            data:{"deliveryMode":$("input[name='deliveryMode']:checked").val()},
            success: function (data) {
                if (data != null) {
                    var addrBookContainer = $(data).find('.registrated-address.addrBookContainer');
                    var messages =$(data).find('#globalMessages');
                    $('.registrated-address.addrBookContainer').replaceWith(addrBookContainer);
                    $('#globalMessages').replaceWith(messages);
                }
                else {
                    console.log("error in removeDeliveryAddresses", data);
                }
            },
            error: function (data) {
                console.log("error in removeDeliveryAddresses", data);
            }
        });
    }
}

function setDefaultAddress(toUrl,addressId) {
    jQuery.ajax({
        type: "POST",
        url: toUrl,
        data: {"addressId":addressId},
        success: function (data) {
            if (data != null) {
                var messages =$(data).find('#globalMessages');
                var newForm=$(data).find("#formDeliveryMode");
                var oldPointRelaisDetails = $("#pointRelaisDetails");

            $('#formDeliveryMode').replaceWith(newForm);
            $('#globalMessages').replaceWith(messages);
            $('#pointRelaisDetails').replaceWith(oldPointRelaisDetails);
            jQuery("#pointRelaisDetails").show();
            try {
                showPagePoints();
            } catch (err) {
                console.log(err.message);
            }
            var addrEditAddressAnchor = $(data).find(".addEditAddressAnchor");
            var addrEditAddressFormContainer = $(data).find(".addEditAddressForm");
            $($(addrEditAddressFormContainer)).insertAfter($(newForm));
            $($(addrEditAddressAnchor)).insertAfter($(newForm));

                appendDeliveryAddress();
                wannaChangeAddress = false;
                $("#changeAddress").addClass("hide");
            }
            else {
                console.log("error in setDefaultAddress", data);
            }
        },
        error: function (data) {
            console.log("error in setDefaultAddress", data);
        }
    });
}


function initStandardDeliveryMode(thisObj) {
    appendDeliveryAddress();
    validateDeliveryMode($(thisObj));
}

function initPointsRelaisDeliveryMode(thisObj) {
    appendRelaisMap();
    validateDeliveryMode($(thisObj));
}

function appendRelaisMap() {
    var radioInput = $(".delivery-mode .form-horizontal").find("input[name='deliveryMode']:checked");
    var parent = $(radioInput).closest(".radiostyle");
    var relaisMap = $(".pRelaisDetails");
    $(parent).append($(relaisMap));
    $(relaisMap).show('slow');
    $(".customer-adress").hide();
    $(".registrated-address.addrBookContainer").hide();
    $("#AddressManager").hide();
    $("#hiddenDeliveryMode").val($(radioInput).val());
    initialiseRelaisMap(500);
}

function initialiseRelaisMap(timeOut) {
    setTimeout(function () {
        initMap();
        showPagePoints();//#BRA-15010
    }, timeOut);
};

function appendDeliveryAddress() {
    var radioInput = $(".delivery-mode .form-horizontal").find("input[name='deliveryMode']:checked");
    var parent = $(radioInput).closest(".radiostyle");
    if ($(parent).hasClass("pointsRelais")) {
        appendRelaisMap();
    } else {
        var divAdress = $(".customer-adress");
        $(parent).append($(divAdress));
        $(divAdress).show('slow');
        //append addEditAddressForm to selected standar delivery mode
        var addrEditAddressAnchor = $(".addEditAddressAnchor");
        var addrEditAddressFormContainer = $(".addEditAddressForm");
        $($(addrEditAddressFormContainer)).insertAfter($(parent));
        $($(addrEditAddressAnchor)).insertAfter($(parent));

        $(".registrated-address.addrBookContainer").hide();
        $(".pRelaisDetails").hide();
    }
    $("#hiddenDeliveryMode").val($(radioInput).val());
    wannaChangeAddress = false;
}

function appednAddrBookContainer() {
    var addrBookContainer = $(".registrated-address.addrBookContainer");
    var divAdress = $(".customer-adress");
    $($(addrBookContainer)).insertAfter($(divAdress));
    $(addrBookContainer).show('slow');
    if (tc_vars.page_type == "checkout.delivery") {
        wannaChangeAddress = true;
    }
}

function searchPointrelais(event) {
    event.preventDefault();
    var rue=$("input[name='rue']").val();
    var codePostale=$("input[name='cp']").val();
    var ville=$("input[name='ville']").val();
    var deliveryMode=$("input[name='deliveryMode']").val();
    var urldest=$("#SearchPointrelais").data("href");
    if(codePostale && ville){
        jQuery.ajax({
            data: {"rue":rue,"cp":codePostale,"ville":ville,"deliveryMode":deliveryMode},
            url: urldest,
            success: function (html) {
                jQuery('#pointRelaisDetails').html(html).slideDown('slow', 'linear');
                $("input[name='rue']").val(rue);
                $("input[name='cp']").val(codePostale);
                $("input[name='ville']").val(ville)
                localStorage.setItem("ville",ville);
                localStorage.setItem("cp",codePostale);
                localStorage.setItem("rue",rue);
                localStorage.setItem("searchByDefault","false");
                $(".point-item").hide();
                $(".page-1").show();// afficher la 1ere page
                localStorage.setItem("currentPage",1);
                appendPagination();
                setTimeout(function() {
                    $('#pointRelaisMessages').fadeOut('fast');
                }, 5000);
            },
            error: function (html) {
                console.log("error in SearchPointrelais",html);
            }
        });
    }else{
        if(!codePostale){
            $(".erreCp").show();
        }
        if (!ville) {
            $(".erreVille").show();
        }
        setTimeout(function () {
            $('.erreCp').fadeOut('fast');
            $('.erreVille').fadeOut('fast');
        }, 4000);
    }
};

function searchPointrelaisForFlatRateShipping(event) {
    event.preventDefault();
    var rue = $("input[name='rue']").val();
    var codePostale = $("input[name='cp']").val();
    var ville = $("input[name='ville']").val();
    var forfaitProductCode = $("input[name='forfaitProductCode']").val();
    var urldest = $("#SearchPointrelais").data("href");
    if (codePostale && ville) {
        var params = {
            "rue": rue,
            "cp": codePostale,
            "ville": ville,
            "code": forfaitProductCode
        }
        jQuery.ajax({
            data: params,
            url: urldest,
            success: function (html) {
                jQuery('#pointRelaisDetails').replaceWith($(html).find('#pointRelaisDetails')).slideDown('slow', 'linear');
                jQuery('#pointRelaisMessages').replaceWith($(html).find('#pointRelaisMessages')).slideDown('slow', 'linear');
                $("input[name='rue']").val(rue);
                $("input[name='cp']").val(codePostale);
                $("input[name='ville']").val(ville)
                localStorage.setItem("ville",ville);
                localStorage.setItem("cp",codePostale);
                localStorage.setItem("rue",rue);
                localStorage.setItem("searchByDefault","false");
                $(".point-item").hide();
                $(".page-1").show();// afficher la 1ere page
                localStorage.setItem("currentPage",1);
                appendPagination();
                if(!$('#pointRelaisMessages > *').length) $('#pointRelaisMessages').fadeIn('fast');
                setTimeout(function() {
                    $('#pointRelaisMessages').fadeOut('fast');
                }, 5000);
                $observables.mainObservable.next({
                    type: 'prc-scroll-to-maps'
                });
            },
            error: function (html) {
                console.log("error in SearchPointrelais",html);
            }
        });
    }else{
        if(!codePostale){
            $(".erreCp").show();
        }
        if(!ville){
            $(".erreVille").show();
        }
        setTimeout(function() {
            $('.erreCp').fadeOut('fast');
            $('.erreVille').fadeOut('fast');
        }, 4000);
    }
};

function selectePointRetrait(event,identifiant) {
    event.preventDefault();
    var deliveryMode=$("input[name='deliveryMode']:checked").val();
    var urldest=$("#selectePointRetraitUrl").data("href");
    jQuery.ajax({
        data: {"identifiant":identifiant,"deliveryMode":deliveryMode},
        url: urldest,
        success: function (html) {
            var oldSearchResults = $('#pointRelaisDetails');
            jQuery('.pRelaisDetails').html(html).slideDown('slow', 'linear');
            $('#pointRelaisDetails').html(oldSearchResults);
            jQuery("#pointRelaisDetails").hide();
            $("#pointAcheminementDetail").show('slow');
            scrollToPointsRelais(500);
            wannaChangePointRetrait = false;
            $("#changeAddress").addClass("hide");
        },
        error: function (html) {
            console.log("error in selectePointRetrait",html);
        }
    });
};

function selectPointRetraitForFlatRateOrder(event,identifiant, productCode) {
    event.preventDefault();
    var urldest=$("#selectePointRetraitUrl").data("href");
    jQuery.ajax({
        data: {"identifiant":identifiant, "code": productCode},
        url: urldest,
        success: function (html) {
            var oldSearchResults = $('#relayPointsZone');
            jQuery('.pRelaisDetails').replaceWith($(html).find(".pRelaisDetails")).slideDown('slow', 'linear');
            $('#relayPointsZone').replaceWith(oldSearchResults);
            jQuery("#relayPointsZone").hide();
            $("#pointAcheminementDetail").show('slow');
            wannaChangePointRetrait = false;
            $("#changeAddress").addClass("hide");
        },
        error: function (html) {
            console.log("error in selectPointRetrait",html);
        }
    });
};

function validateChooseRelayPoint(event){
    $.ajax({
        url: $("#validateRelayPoint").data("url"),
        success: function(data){
            if(!data){
                $("#add-service-messageError").show();
                return false;
            } else {
                $("#add-service-messageError").hide();
                return true;
            }
        }
    })
}

function changePointRetrait(){
    if(localStorage.getItem("searchByDefault") === "true")
        searchPointsRelaisByDefault(true);
    $("#pointRelaisDetails").show('fast');
    $("#pointAcheminementDetail").remove();
    initialiseRelaisMap(500);
    wannaChangePointRetrait = true;
}

function changeFlatRateRelayPoint(){
    if(localStorage.getItem("searchByDefault") === "true")
        searchPointsRelaisByDefault(true);
    $("#relayPointsZone").show('fast');
    $("#pointAcheminementDetail").remove();
    initialiseRelaisMap(500);
    wannaChangePointRetrait = true;
}

function scrollToPointsRelais(time){
    $('html, body').animate({
        scrollTop: $(".pointsRelais").offset().top-$("header").height()-10
    }, 500);
}

$(function(){
    appendDeliveryAddress();
})

/*BRA-11384  end */

/* BRA-15142 */
function checkDeliveryModeValidity(callback, args){
    if(wannaChangeAddressOrPointRetrait()) {
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    }else {
        $.ajax({
            type: "POST",
            url: validateDeliveryModeUrl,
            data: {
                "deliveryModeCode": !isUndefinedOrNull(callback) && !isUndefinedOrNull(args) ? $("#deliveryModeCode").val() : $("#formDeliveryMode").find("input:checked").val()
            },
            success: function(data){
                if(data.valid) {
                    if(!isUndefinedOrNull(callback) && !isUndefinedOrNull(args)){
                        callback.apply(this, args);
                    } else {
                        $("form#hiddenformDeliveryMode button").click();
                    }
                } else {
                    var modal = $("#ModalMessage");
                    var modalBody = modal.find(".modal-body");
                    var sb = new StringBuilder();
                    var deliveryName = typeof data.deliveryModeName != "undefined" ? data.deliveryModeName : "";
                    sb.append("<p style='margin-bottom: 20px;'>" + invalidDeliveryModeText.replace('{deliveryMode}', deliveryName) + "</p>");
                    sb.append("<button class='btn btn-action' data-dismiss='modal' style='margin:0 auto; display: block; width: auto; text-align: center'>"+ closePopup +"</button>");
                    modalBody.html(sb.toString());
                    modal.show();
                    modal.modal();
                    modal.one('hidden.bs.modal', function () {
                        window.location.href = deliveryPageUrl;
                    });
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    }
}

/* BRA-15305 */
function scrolltoElementForMobile($element, offset) {
  try {
    if (isMobile) {
      $('html,body').animate({
        scrollTop: $element.offset().top - (offset || 68)
      }, 'slow');
    }
  } catch (exeption) {
    console.log(exeption)
  }
}

/* BRA-15305 */
function validateLegalTax(offset) {
  var $legalTaxNumber = $("#legal-tax-number");
  if ($legalTaxNumber.length > 0) {
    $legalTaxNumber.removeClass('has-error');
    $("#legalTaxMessagePatternErrors").hide();
    $("#legalTaxMessageErrors").hide();

    if (!$legalTaxNumber.val()) {
      $("#legalTaxMessageErrors").show();
      $legalTaxNumber.addClass('has-error');
      scrolltoElementForMobile($legalTaxNumber.closest('.legal-tax-number'), offset);
      return false;
    }

    var legalTax = $legalTaxNumber.val();
    if (taxNumberRegEx) {
      var pattern = new RegExp(taxNumberRegEx);
      if (!pattern.test(legalTax)) {
        $("#legalTaxMessagePatternErrors").show();
        $legalTaxNumber.addClass('has-error');
        scrolltoElementForMobile($legalTaxNumber.closest('.legal-tax-number'), offset);
        return false;
      }
    }
  }
  return true;
}

/* BRA-21263 */
function validateMobilePhone() {
    var $mobilePhone = $("#mobilePhone");
    if ($mobilePhone.length > 0) {
        $mobilePhone.removeClass('has-error');
        $("#errorMobilePhoneMessagePattern").hide();
        $("#errorMobilePhoneMessage").hide();

        if (!$mobilePhone.val()) {
            $("#errorMobilePhoneMessage").show();
            $mobilePhone.addClass('has-error');
            scrolltoElementForMobile($mobilePhone.closest('.legal-tax-number'));
            return false;
        }

        var mobilePhone = $mobilePhone.val();
        if (mobilePhoneRegEx) {
            var pattern = new RegExp(mobilePhoneRegEx);
            if (!pattern.test(mobilePhone)) {
                $("#errorMobilePhoneMessagePattern").show();
                $mobilePhone.addClass('has-error');
                scrolltoElementForMobile($mobilePhone.closest('.legal-tax-number'));
                return false;
            }
        }
    }
    return true;
}

function placeSmapleOrder(){
	var legalTaxNumber=$("#legal-tax-number").val();
    var legalTaxNumberData=typeof legalTaxNumber !== 'undefined'?legalTaxNumber:'';
	$("#SmapleOrderLegalTaxNumber").val(legalTaxNumberData);
    var mobilePhone = $("#mobilePhone").val();
    var mobilePhoneData = typeof mobilePhone !== 'undefined' ? mobilePhone : '';
    $("#SampleOrderMobilePhone").val(mobilePhoneData);
	$("#placeSmapleOrder").submit();
}

function wannaChangeAddressOrPointRetrait(){
    var radioInput = $(".delivery-mode .form-horizontal").find("input[name='deliveryMode']:checked");
    var parent=$(radioInput).closest(".radiostyle");
    if($(parent).hasClass("pointsRelais")){
        if(wannaChangePointRetrait) {
            $("#globalMessages").html('<div id="changeAddress" class="information_message negative"><span class="single"></span><p>'+selectPointRelaisMessage+'</p></div>');
        }
        return wannaChangePointRetrait;
    }else{
        if(wannaChangeAddress) {
            $("#globalMessages").html('<div id="changeAddress" class="information_message negative"><span class="single"></span><p>'+changeYourAddressMessage+'</p></div>');
        }
        return wannaChangeAddress;
    }
}

function undoChangeAddress() {
    wannaChangeAddress = false;
    $("#globalMessages").html('');
}
