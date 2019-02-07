ACC.paginationsort = {
    downUpKeysPressed: !1,
    bindAll: function() {
        this.bindPaginaSort()
    },
    bindPaginaSort: function() {
        with (ACC.paginationsort)
            bindSortForm($("#sort_form1")),
            bindSortForm($("#sort_form2"))
    },
    bindSortForm: function(n) {
        $.browser.msie && this.sortFormIEFix($(n).children("select"), $(n).children("select").val()),
        n.change(function() {
            $(this).hasClass("subCatPagination") || ($.browser.msie ? (ACC.paginationsort.downUpPressed || this.submit(),
            ACC.paginationsort.downUpPressed = !1) : this.submit())
        })
    },
    sortFormIEFix: function(n, o) {
        n.keydown(function(n) {
            38 === n.keyCode || 40 === n.keyCode ? ACC.paginationsort.downUpPressed = !0 : 13 === n.keyCode && o !== $(this).val() ? $(this).parent().submit() : ACC.paginationsort.downUpPressed = !1
        })
    }
},
$(document).ready(function() {
    ACC.paginationsort.bindAll()
});
