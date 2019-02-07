seemore = {
    bindAll: function() {
        seemore.bindToSeeMore()
    },
    bindToSeeMore: function() {
        $(document).on("click", ".seemore", function(e) {
            var o = $(this).data("href");
            window.location.href = o
        })
    }
},
$(document).ready(function() {
    seemore.bindAll()
});
