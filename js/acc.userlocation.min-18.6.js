function getGglAPIKey() {
    var e = null;
    return jQuery.ajax({
        type: "GET",
        url: ACC.config.contextPath + "/buyonline/gglApiKey/ajax",
        async: !1,
        success: function(o) {
            e = o
        },
        error: function(e, o, t) {
            console.log("Cannot get key api !")
        }
    }),
    e
}
function getInputValuesAsJoinedArray(e) {
    return e.map(function(e, o) {
        return $(o).val()
    }).get().join(",")
}
ACC.userlocation = {
    bindAll: function() {
        ACC.userlocation.bindUserLocationSearchButtonClick(),
        ACC.userlocation.bindUserLocationEnterPress(),
        ACC.userlocation.bindAutoLocationSearchButtonClick(),
        ACC.userlocation.bindAutoLocationDirectionButtonClick()
    },
    bindUserLocationEnterPress: function() {
        $("#user_location_query").keypress(function(e) {
            if (13 == (e.keyCode ? e.keyCode : e.which))
                return $.ajax({
                    url: searchUserLocationUrl,
                    type: "GET",
                    data: {
                        q: $("#user_location_query").attr("value")
                    },
                    success: function(e) {
                        location.reload()
                    }
                }),
                !1
        })
    },
    bindUserLocationSearchButtonClick: function() {
        $("#user_location_query_button").click(function(e) {
            return $.ajax({
                url: searchUserLocationUrl,
                type: "GET",
                data: {
                    q: $("#user_location_query").attr("value")
                },
                success: function(e) {
                    location.reload()
                }
            }),
            !1
        })
    },
    bindAutoLocationSearchButtonClick: function() {
        $(document).on("click", "#findStoresNearMeAjax", function(e) {
            e.preventDefault(),
            jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + getGglAPIKey(), ACC.userlocation.positionSuccessStoresNearMeAjaxGglApi).fail(function(e) {
                console.log("API Geolocation error! \n\n" + e)
            })
        }),
        $(document).on("click", "#findStoresNearMe", function(e) {
            e.preventDefault(),
            jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + getGglAPIKey(), ACC.userlocation.positionSuccessStoresNearMeGglApi).fail(function(e) {
                console.log("API Geolocation error! \n\n" + e)
            })
        })
    },
    positionSuccessStoresNearMeAjaxGglApi: function(e) {
        return "undefined" != typeof autoUserLocationUrl && $.ajax({
            url: autoUserLocationUrl,
            type: "POST",
            data: {
                latitude: e.lacation.lat,
                longitude: e.lacation.lng
            },
            success: function(e) {
                location.reload()
            }
        }),
        !1
    },
    bindAutoLocationDirectionButtonClick: function() {
        $(document).on("click", "#btn-direction", function(e) {
            e.preventDefault();
            var o = $(this).data("repairlongitude")
              , t = $(this).data("repairlatitude")
              , r = $("#repairs-search")
              , n = r.find("#search-filter_street_repairs").val()
              , a = r.find("#search-filter_postalCode_repairs").val()
              , i = r.find("#search-filter_city_repairs").val()
              , c = n + " " + a + " " + i;
            jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + getGglAPIKey(), function() {
                ACC.userlocation.directionToRepairCenterGglApi(o, t, c)
            }).fail(function(e) {
                console.log("API Geolocation error! \n\n" + e)
            })
        })
    },
    directionToRepairCenterGglApi: function(e, o, t) {
        if (t) {
            var r = "https://www.google.fr/maps/dir/" + t + "/" + o + "," + e;
            window.open(r, "_blank")
        } else {
            var r = "https://www.google.fr/maps?q=" + o + "," + e + "&amp;t=h&amp;z=16";
            window.open(r, "_blank")
        }
        return !1
    },
    calculateAndDisplayRoute: function(e, o, t, r) {
        e.route({
            origin: t,
            destination: r,
            travelMode: google.maps.TravelMode.DRIVING
        }, function(e, t) {
            t === google.maps.DirectionsStatus.OK ? o.setDirections(e) : window.alert("Directions request failed due to " + t)
        })
    },
    positionSuccessStoresNearMeGglApi: function(e) {
        return $("#latitude").val(e.location.lat),
        $("#longitude").val(e.location.lng),
        submitStoreLocatorFormWithAjax($("#nearMeStorefinderForm"), "GET"),
        !1
    }
},
ACC.addressgeocode = {
    bindAll: function() {
        ACC.addressgeocode.bindAddressGeocodeSubmit()
    },
    bindAddressGeocodeSubmit: function() {
        $("#search-filter_city_repairs").keypress(function(e) {
            13 == e.which && $('#repairs-search form[name^="search_form"] button[type="submit"],#store-search form[name^="search_form"] button[type="submit"]').click()
        }),
        $(document).on("click", '#repairs-search form[name^="search_form"] button[type="submit"],#store-search form[name^="search_form"] button[type="submit"]', function(e) {
            e.preventDefault(),
            e.stopImmediatePropagation(),
            "" == $("#search-filter_city_repairs, #search-filter_city_store").val() ? $("#cityError").show() : ($("#cityError").hide(),
            ACC.addressgeocode.geocodeAddress(!0))
        }),
        $(document).on("click", ".crumbs a", function(e) {
            e.preventDefault();
            var o = $(e.currentTarget)
              , t = o.data("facet-code");
            e.stopImmediatePropagation();
            var r, n = o.closest("#repair-store-filter");
            n.length ? n.find('.filters-container input[type=checkbox][data-facet-code="' + t + '"]:not([readonly])').prop("checked", !1).change() : (r = o.closest("#search-list-page--filters")).length && (o.is(".filter-init.reset") ? window.location.href = o.attr("href") : r.find('.accordion-group input[type=checkbox][data-facet-code="' + t + '"]:not([readonly])').prop("checked", !1).change())
        }),
        $(document).on("click", ".crumbs .filter-init", function(e) {
            e.preventDefault(),
            e.stopImmediatePropagation(),
            $(".filters-container input[type=checkbox][data-facet-code]:not([readonly])").prop("checked", !1),
            $("input[name=features]").val($(e.target).val()),
            ACC.addressgeocode.geocodeAddress()
        }),
        $(document).on("change", ".filters-container input:not([readonly])", function(e) {
            e.stopImmediatePropagation(),
            $("input[name=features]").val($(e.target).val()),
            ACC.addressgeocode.geocodeAddress()
        }),
        $('#repairs-search form[name^="search_form"] input[name="q"],#store-search form[name^="search_form"] input[name="q"]').keypress(function(e) {
            var o = null;
            13 == (o = e.keyCode ? e.keyCode : e.which) && (e.preventDefault(),
            ACC.addressgeocode.geocodeAddress(!0))
        })
    },
    geocodeAddress: function(e) {
        var o = ACC.addressgeocode.getFeaturesFilter()
          , t = ACC.addressgeocode.getLocationSearch();
        if (void 0 !== t && t.trim()) {
            var r = "https://maps.googleapis.com/maps/api/geocode/json?address=" + t + "+" + ACC.addressgeocode.getCountryIsoCode() + "&components=country:" + ACC.addressgeocode.getCountryIsoCode() + "&key=" + getGglAPIKey();
            console.log(r + "\n\n"),
            jQuery.post(r, ACC.addressgeocode.positionSuccessStoresNearLocationGglApi).fail(function(e) {
                console.log("API Geocoding error! \n\n" + e)
            })
        } else if (o.trim())
            if ($("#longitude").val() && $("#latitude").val() && !e)
                submitStoreLocatorFormWithAjax($("#nearMeStorefinderForm"), "GET");
            else {
                var n = ACC.addressgeocode.createRepairStoreForm(o.trim());
                n.appendTo(".repairs-filter"),
                submitStoreLocatorFormWithAjax(n, "GET")
            }
        else if ($("#repair-store-filter").length)
            if ($("#longitude").val() && $("#latitude").val() && !e)
                submitStoreLocatorFormWithAjax($("#nearMeStorefinderForm"), "GET");
            else {
                var n = ACC.addressgeocode.createRepairStoreForm("");
                n.appendTo(".repairs-filter"),
                submitStoreLocatorFormWithAjax(n, "GET")
            }
        else
            window.location = window.location.pathname
    },
    getCountryIsoCode: function() {
        return $('form[name^="search_form"] input[name="country"],form[name^="search_form"] select[name="country"]').val()
    },
    getLocationSearch: function() {
        return $('form[name^="search_form"] input[name="q"]').val()
    },
    getFeaturesFilter: function() {
        return $('#repairs-search input#features[name="features"]').val()
    },
    setFeaturesFilter: function() {
        $("#features").length > 0 && $("[name='features']").val(getInputValuesAsJoinedArray($('[name="feature"]:checked')))
    },
    createRepairStoreForm: function(e) {
        return $("<form>", {
            id: "repairs_search_with_features_only",
            action: ""
        }).append($("<input>", {
            name: "features",
            value: e,
            type: "hidden"
        }))
    },
    positionSuccessStoresNearLocationGglApi: function(e) {
        return e.status == google.maps.GeocoderStatus.OK ? ($("#geocodedlatitude").val(e.results[0].geometry.location.lat),
        $("#geocodedlongitude").val(e.results[0].geometry.location.lng),
        $("#repairs-search form[name^='search_form']").length ? submitStoreLocatorFormWithAjax($("#repairs-search form[name^='search_form']"), "GET") : $("#store-search form[name^='search_form']").submit()) : console.log("Geocoding error status: " + e.status),
        !1
    }
},
$(document).ready(function() {
    ACC.userlocation.bindAll(),
    ACC.addressgeocode.bindAll()
});
