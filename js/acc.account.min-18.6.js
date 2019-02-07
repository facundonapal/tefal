ACC.account = {
    bindAll: function() {
        ACC.account.bindToShowConfirmChangeEmailInput(),
        ACC.account.bindChangeDateSelectInput()
    },
    bindToShowConfirmChangeEmailInput: function() {
        $(".control-hide").keydown(function() {
            $(".control-hideable").each(function(e) {
                $(this).parent().slideDown()
            })
        }),
        $(".control-hide-login").keydown(function() {
            $(".control-label-login").each(function(e) {
                $(this).parent().slideDown()
            })
        })
    },
    bindChangeDateSelectInput: function() {
        $("select#Year").change(ACC.account.changeDateSelectInput),
        $("select#Month").change(ACC.account.changeDateSelectInput)
    },
    changeDateSelectInput: function() {
        $("select#Year").val() && $("select#Month").val() && $.ajax({
            url: this.getAttribute("data-ajax"),
            cache: !1,
            data: {
                year: $("select#Year").val(),
                month: $("select#Month").val()
            },
            type: "GET",
            success: function(e) {
                var n = $("select#Day")[0].selectedIndex;
                $("select#Day").children().remove(":not(option:disabled)"),
                $.each(e, function(e, n) {
                    $("select#Day").append(new Option(n.code,n.name))
                }),
                $("select#Day").children().size() > n && ($("select#Day")[0].selectedIndex = n)
            }
        })
    }
},
$(document).ready(function() {
    ACC.account.bindAll()
});
