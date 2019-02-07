function initComparator() {
    jQuery("span.yes").click(function(t) {
        t.preventDefault();
        var e = 1
          , a = "/?";
        jQuery(".gocompare").each(function() {
            jQuery(this).find("input[type=checkbox]").is(":checked") && (a = a + "p" + e + "=" + jQuery(this).find("input[type=hidden][name='productCode']").attr("value") + "&",
            e++)
        });
        var r = jQuery(".gocompare span.yes").attr("data-href");
        document.location.href = r + a
    }),
    initMatchCompare(),
    jQuery(".product-comparator .close").bind("click", function() {
        initMatchCompare()
    })
}
function initMatchCompare() {
    var t = !1
      , e = "";
    jQuery("#ScrollabeTableCompare tbody tr").each(function() {
        jQuery(this).children(".datas").each(function(a) {
            "" == e && (e = jQuery(this).text()),
            e == jQuery(this).text() && 1 != t || (t = !0)
        }),
        1 != t && jQuery(this).addClass("ressemblant"),
        e = "",
        t = !1
    })
}
jQuery(document).ready(function() {
    initComparator()
});
