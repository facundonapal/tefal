ACC.autocomplete = {
    bindAll: function() {
        GSEB.constants.autocompleteRich ? $("#global-search").addClass("rich-autocomplete") : bindSearchAutocomplete("search_form", "#global-search", "#search", ACC.autocompleteUrl),
        bindSearchAutocomplete("search_form_global", "#global-search", "#search-filter_global", ACC.autocompleteUrl)
    }
},
ACC.recipe.autocomplete = {
    bindAll: function() {
        bindSearchAutocomplete("search_form_recipe", "#recipe-search", "#search-filter", ACC.recipe.autocompleteUrl)
    }
},
ACC.faq.autocomplete = {
    bindAll: function() {
        bindSearchAutocomplete("search_form_faq", "#faq-search", "#search-filter_faq", ACC.faq.autocompleteUrl)
    }
},
ACC.ifu.autocomplete = {
    bindAll: function() {
        bindSearchAutocomplete("search_form_ifu", "#ifu-search", "#search-filter_ifu", ACC.ifu.autocompleteUrl)
    }
},
ACC.repairs.autocomplete = {
    bindAll: function() {
        bindSearchRepairersAutocomplete("search_form_repairs", "#repairs-search", "#search-filter_repairs", ACC.repairs.autocompleteUrl)
    }
},
ACC.store.autocomplete = {
    bindAll: function() {
        bindSearchAutocomplete("search_form_store", "#store-search", "#search-filter_store", ACC.store.autocompleteUrl)
    }
},
ACC.reparability.autocomplete = {
    bindAll: function() {
        bindSearchReparabilityAutocomplete("search_form_reparability", "#reparability-search", "#search-filter_reparability", ACC.reparability.autocompleteUrl)
    }
},
bindSearchAutocomplete = function(e, t, o, a) {
    $(o).autocomplete({
        source: function(e, t) {
            $.getJSON(a, {
                term: $(o).val()
            }, function(e) {
                t(e)
            })
        },
        minLength: 2,
        open: function(e, t) {
            $(".ui-menu").css("z-index", 1e4)
        },
        close: function(e, t) {
            $(".ui-menu").css("z-index", -1)
        },
        focus: function(e, t) {
            return !1
        },
        select: function(t, a) {
            a.item && $(o).val(a.item.value.trim()),
            document.forms[e].submit()
        },
        autoFocus: !1,
        delay: ACC.autocompleteDelay
    })
}
,
bindSearchRepairersAutocomplete = function(e, t, o, a) {
    $(o).autocomplete({
        source: function(t, c) {
            var n = $(o).val();
            $("form[name=" + e + "] input[name=country]:checked").val() ? n += "," + $("form[name=" + e + "] input[name=country]:checked").val() : $("form[name=" + e + "] input[name=country]:hidden").val() && (n += "," + $("form[name=" + e + "] input[name=country]:hidden").val()),
            $.getJSON(a, {
                term: n
            }, function(e) {
                c(e)
            })
        },
        minLength: 2,
        create: function() {
            $(this).data("ui-autocomplete")._renderItem = function(e, t) {
                return $("<li>").attr("data-value", t.address.town).append($("<a>").text(t.address.town)).appendTo(e)
            }
        },
        open: function(e, t) {
            $(".ui-menu").css("z-index", 1e4)
        },
        close: function(e, t) {
            $(".ui-menu").css("z-index", -1)
        },
        focus: function(e, t) {
            return !1
        },
        select: function(t, a) {
            a.item && $(o).val(a.item.address.town.trim()),
            document.forms[e].submit()
        },
        autoFocus: !1,
        delay: ACC.autocompleteDelay
    })
}
,
bindSearchReparabilityAutocomplete = function(e, t, o, a) {
    $(o).autocomplete({
        source: function(e, t) {
            $.getJSON(a, {
                term: $(o).val()
            }, function(e) {
                t(e)
            })
        },
        minLength: 2,
        open: function(e, t) {
            $(".ui-menu").css("z-index", 2)
        },
        close: function(e, t) {
            $(".ui-menu").css("z-index", -1)
        },
        select: function(e, t) {
            t.item && ($(o).val(t.item.value.trim().toUpperCase()),
            e.preventDefault())
        },
        autoFocus: !1,
        delay: ACC.autocompleteDelay
    })
}
,
renderPOSItem = function(e, t) {
    return $("<li>").attr("data-value", t.address.town).append($("<a>").append($("<div>").attr("class", "bloc-img")).append($("<h4>").text(t.displayName)).append($("<p>").text(t.address.formattedAddress))).appendTo(e)
}
,
$(document).ready(function() {
    ACC.autocomplete.bindAll(),
    ACC.recipe.autocomplete.bindAll(),
    ACC.faq.autocomplete.bindAll(),
    ACC.ifu.autocomplete.bindAll(),
    ACC.reparability.autocomplete.bindAll()
});
