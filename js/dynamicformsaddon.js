$(function() {
    // bind change event to select
    $('#edit_address_form[name="countryIso"]').on('change', function() {
        console.log($(this).val());
        var url = window.location.origin + window.location.pathname + '?country' + '=' + $('#edit_address_form[name="countryIso"]').val();
        window.location = url;
        return false;
    });
});
