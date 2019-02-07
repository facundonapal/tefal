$("#seoLinksDiv span").last().hide(),
$(function() {
    $("#styleVariantSelectOption").bind("change", function() {
        var n = $(this).val();
        return n && (window.location = n),
        !1
    })
}),
$(function() {
    $("#sizeVariantSelectOption").bind("change", function() {
        var n = $(this).val();
        return n && (window.location = n),
        !1
    })
});
