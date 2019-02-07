Modal = {
    bindAll: function() {
        Modal.bindToModal(),
        Modal.bindToProductMedia()
    },
    element: null,
    init: function(e) {
        Modal.element = e,
        Modal.element.find(".modal-close").on("click", function() {
            Modal.close()
        })
    },
    show: function() {
        Modal.element.fadeIn(400),
        $("html, body").animate({
            scrollTop: 0
        }, 200)
    },
    close: function() {
        Modal.element.fadeOut(400, function() {
            Modal.element.find(".modal-content").empty()
        })
    },
    putContent: function(e) {
        Modal.element.find(".modal-content").html(e)
    },
    center: function() {
        $toCenter = $(".js-center-fixed"),
        $toCenter.css("margin-left", "-" + $toCenter.width() / 2 + "px")
    },
    bindToModal: function() {
        Modal.init($("#LayerOverAll")),
        $("a[data-toggle='modal']").on("click", function(e) {
            e.preventDefault(),
            null != $(this).attr("href") && "#" != $(this).attr("href") ? $.ajax({
                type: "get",
                url: $(this).attr("href"),
                success: function(e) {
                    Modal.putContent(e),
                    Modal.center(),
                    Modal.show()
                },
                error: function() {
                    Modal.putContent("Error Retrieving content from : " + $(this).attr("href")),
                    Modal.show()
                }
            }) : ($modal = $($(this).attr("data-target")),
            $modal.show())
        }),
        "true" == isSleepMember && $("a.asleepMember").trigger("click")
    },
    bindToProductMedia: function() {
        $(".product-media").on("click", function(e) {
            e.preventDefault(),
            $.ajax({
                type: "get",
                url: $(this).data("href"),
                success: Modal.displayModal,
                error: function() {
                    console.error("Error Retrieving content from" + $(this).data("href"))
                }
            })
        })
    },
    displayModal: function(e) {
        $("#ModalMedia .modal-body").html(e);
        $("#ModalMedia").show(),
        $("#ModalMedia").modal(),
        $("html.rtl .carousel").each(function() {
            $(this).find("a.left").html("&#8250;"),
            $(this).find("a.right").html("&#8249;")
        }),
        $("#ModalMedia").on("hidden.bs.modal", function() {
            $("#ModalMedia").hide()
        })
    },
    displayReparabilityModal: function(e) {
        var t = null != reparabilityRedirectMessage.match(/(?!={)\d+(?=})/g) ? reparabilityRedirectMessage.match(/(?!={)\d+(?=})/g)[0] : 2
          , a = 0;
        $("#ModalMedia").addClass("reparability-modal"),
        a = setInterval(function() {
            if ($("#ModalMedia").find(".modal-body").html(reparabilityRedirectMessage.replace(/{\d+}/g, t)),
            0 == t) {
                var o = e.redirectionURL.match(/^https?:\/\//i) ? e.redirectionURL : "http://" + e.redirectionURL;
                $("<a>").attr("href", o).attr("target", "_blank")[0].click(),
                clearInterval(a)
            }
            t--
        }, 1e3),
        $("#ModalMedia").show(),
        $("#ModalMedia").modal(),
        $("#ModalMedia").on("hidden.bs.modal", function() {
            $("#ModalMedia").hide()
        })
    }
},
$(document).ready(function() {
    Modal.bindAll()
});
