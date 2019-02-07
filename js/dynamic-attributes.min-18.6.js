function getAddressFormDefinition(t) {
    addressform.bindAddressForm(t)
}
registerform = {
    bindRegiterForm: function(t) {
        $.ajax({
            url: t,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(t) {
                $.each(t.formAttributeSections, function(t, e) {
                    alert(e.code),
                    $.each(e.formAttributes, function(t, e) {
                        alert(e.code)
                    })
                })
            }
        })
    }
},
addressform = {
    bindAddressForm: function(t) {
        $.ajax({
            url: t,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(t) {
                $.each(t.formAttributeSections, function(t, e) {
                    alert(e.code),
                    $.each(e.formAttributes, function(t, e) {
                        alert(e.code)
                    })
                })
            }
        })
    }
};
