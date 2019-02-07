(function($, window, document, undefined) {

    $.widget("ui.advancedAutocomplete", $.ui.autocomplete, {

        _create: function() {
            // Some browsers only repeat keydown events, not keypress events,
            // so we use the suppressKeyPress flag to determine if we've already
            // handled the keydown event. #7269
            // Unfortunately the code for & in keypress is the same as the up arrow,
            // so we use the suppressKeyPressRepeat flag to avoid handling keypress
            // events when we know the keydown event was used to modify the
            // search term. #7799
            var suppressKeyPress, suppressKeyPressRepeat, suppressInput, nodeName = this.element[0].nodeName.toLowerCase(), isTextarea = nodeName === "textarea", isInput = nodeName === "input";

            this.isMultiLine = // Textareas are always multi-line
            isTextarea ? true : // Inputs are always single-line, even if inside a contentEditable element
            // IE also treats inputs as contentEditable
            isInput ? false : // All other element types are determined by whether or not they're contentEditable
            this.element.prop("isContentEditable");

            this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"];
            this.isNewMenu = true;

            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");

            this._on(this.element, {
                keydown: function(event) {
                    if (this.element.prop("readOnly")) {
                        suppressKeyPress = true;
                        suppressInput = true;
                        suppressKeyPressRepeat = true;
                        return;
                    }

                    suppressKeyPress = false;
                    suppressInput = false;
                    suppressKeyPressRepeat = false;
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                    case keyCode.PAGE_UP:
                        suppressKeyPress = true;
                        this._move("previousPage", event);
                        break;
                    case keyCode.PAGE_DOWN:
                        suppressKeyPress = true;
                        this._move("nextPage", event);
                        break;
                    case keyCode.UP:
                        suppressKeyPress = true;
                        this._keyEvent("previous", event);
                        break;
                    case keyCode.DOWN:
                        suppressKeyPress = true;
                        this._keyEvent("next", event);
                        break;
                    case keyCode.ENTER:
                        // when menu is open and has focus
                        if (this.menu.active) {
                            // #6055 - Opera still allows the keypress to occur
                            // which causes forms to submit
                            suppressKeyPress = true;
                            event.preventDefault();
                            this.menu.select(event);
                        }
                        break;
                    case keyCode.TAB:
                        if (this.menu.active) {
                            this.menu.select(event);
                        }
                        break;
                    case keyCode.ESCAPE:
                        if (this.menu.element.is(":visible")) {
                            if (!this.isMultiLine) {
                                this._value(this.term);
                            }
                            this.close(event);
                            // Different browsers have different default behavior for escape
                            // Single press can mean undo or clear
                            // Double press in IE means clear the whole form
                            event.preventDefault();
                        }
                        break;
                    default:
                        suppressKeyPressRepeat = true;
                        // search timeout should be triggered before the input value is changed
                        this._searchTimeout(event);
                        break;
                    }
                },
                keypress: function(event) {
                    if (suppressKeyPress) {
                        suppressKeyPress = false;
                        if (!this.isMultiLine || this.menu.element.is(":visible")) {
                            event.preventDefault();
                        }
                        return;
                    }
                    if (suppressKeyPressRepeat) {
                        return;
                    }

                    // replicate some key handlers to allow them to repeat in Firefox and Opera
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                    case keyCode.PAGE_UP:
                        this._move("previousPage", event);
                        break;
                    case keyCode.PAGE_DOWN:
                        this._move("nextPage", event);
                        break;
                    case keyCode.UP:
                        this._keyEvent("previous", event);
                        break;
                    case keyCode.DOWN:
                        this._keyEvent("next", event);
                        break;
                    }
                },
                input: function(event) {
                    if (suppressInput) {
                        suppressInput = false;
                        event.preventDefault();
                        return;
                    }
                    this._searchTimeout(event);
                },
                focus: function(event) {
                    // show OneClick-Suggest on focus
                    if (this.element.val().length < (this.options.minLength || 1)) {
                        this.options.oneClickSuggestHandler.call(this);
                    }
                    this.selectedItem = null;
                    this.previous = this._value();
                },
                blur: function(event) {
                    (this.options.onBeforeBlurHandler || function() {}
                    ).call(this, event);
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return;
                    }

                    clearTimeout(this.searching);
                }
            });

            this._initSource();
            this.menu = $("<div>").addClass("ui-autocomplete ui-front autocomplete-container").appendTo(this._appendTo()).menu({
                // disable ARIA support, the live region takes care of that
                role: null
            }).hide().data("ui-menu");
            //.menu( "instance" );

            this._on(this.menu.element, {
                mousedown: function(event) {
                    // prevent moving focus out of the text field
                    event.preventDefault();

                    // IE doesn't prevent moving focus even with event.preventDefault()
                    // so we set a flag to know when we should ignore the blur event
                    this.cancelBlur = true;
                    this._delay(function() {
                        delete this.cancelBlur;
                    });

                    // clicking on the scrollbar causes focus to shift to the body
                    // but we can't detect a mouseup or a click immediately afterward
                    // so we have to track the next mousedown and close the menu if
                    // the user clicks somewhere outside of the autocomplete
                    var menuElement = this.menu.element[0];
                    if (!$(event.target).closest(".ui-menu-item").length) {
                        this._delay(function() {
                            var that = this;
                            this.document.one("mousedown", function(event) {
                                if (event.target !== that.element[0] && event.target !== menuElement && !$.contains(menuElement, event.target) && !that.cancelBlur) {
                                    that.close();
                                }
                                that._delay(function() {
                                    delete that.cancelBlur;
                                });
                            });
                        });
                    }
                },
                menufocus: function(event, ui) {
                    var label, item;
                    // support: Firefox
                    // Prevent accidental activation of menu items in Firefox (#7024 #9118)
                    if (this.isNewMenu) {
                        this.isNewMenu = false;
                        if (event.originalEvent && /^mouse/.test(event.originalEvent.type)) {
                            this.menu.blur();

                            this.document.one("mousemove", function() {
                                $(event.target).trigger(event.originalEvent);
                            });

                            return;
                        }
                    }

                    item = ui.item.data("ui-autocomplete-item");
                    if (false !== this._trigger("focus", event, {
                        item: item
                    })) {
                        // use value to match what will end up in the input, if it was a key event
                        if (event.originalEvent && /^key/.test(event.originalEvent.type)) {
                            this._value(item.value);
                        }
                    }

                    // Announce the value in the liveRegion
                    label = ui.item.attr("aria-label") || (item ? item.value : '');
                    if (label && $.trim(label).length) {
                        this.liveRegion.children().hide();
                        $("<div>").text(label).appendTo(this.liveRegion);
                    }
                },
                menuselect: function(event, ui) {
                    var item = ui.item.data("ui-autocomplete-item")
                      , previous = this.previous;

                    // only trigger when focus was lost (click on menu)
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = previous;
                        // #6109 - IE triggers two focus events and the second
                        // is asynchronous, so we need to reset the previous
                        // term synchronously and asynchronously :-(
                        this._delay(function() {
                            this.previous = previous;
                            this.selectedItem = item;
                        });
                    }

                    if (false !== this._trigger("select", event, {
                        item: item
                    })) {
                        this._value(item.value);
                    }
                    // reset the term after the select event
                    // this allows custom select handling to work properly
                    this.term = this._value();

                    this.close(event);
                    this.selectedItem = item;
                }
            });

            this.liveRegion = $("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);

            // turning off autocomplete prevents the browser from remembering the
            // value when navigating through history, so we re-enable autocomplete
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },

        search: function(value, event) {
            value = value != null ? value : this._value();

            // always save the actual value, not the one passed as an argument
            this.term = this._value();

            if (!value.length) {
                // show OneClick-Suggest if term.length = 0
                this.options.oneClickSuggestHandler.call(this);
                return false;
            } else if (value.length < this.options.minLength) {
                // close if  1 <= term.length < minLength
                return this.close(event);
            }

            if (this._trigger("search", event) === false) {
                return;
            }

            return this._search(value);
        },

        __response: function(content) {
            if (content) {
                // get render function
                this.__renderMenu = content.render;
                content = this._normalize(content);
            }
            this._trigger("response", null, {
                content: content
            });
            // show suggest if we have a __renderMenu function
            // or we have a content Array
            if (!this.options.disabled && content && (content.length || !!this.__renderMenu) && !this.cancelSearch) {
                this._suggest(content);
                this._trigger("open");
            } else {
                // use ._close() instead of .close() so we don't cancel future searches
                this._close();
            }
        },

        _suggest: function(items) {
            var ul = this.menu.element.empty();
            // use render function stored in __renderMenu if exist
            // or use default function "_renderMenu"
            (this.__renderMenu || this._renderMenu)(ul, items);
            this.__renderMenu = undefined;
            this.isNewMenu = true;
            //this.menu.refresh();

            // size and position menu
            ul.show();
            //this._resizeMenu();
            ul.position($.extend({
                of: this.element
            }, this.options.position));

            if (this.options.autoFocus) {
                this.menu.next();
            }
        }
    });

    $.extend($.ui.advancedAutocomplete, {
        escapeRegex: function(value) {
            return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function(array, term) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term),"i");
            return $.grep(array, function(value) {
                return matcher.test(value.label || value.value || value);
            });
        }
    });

    // live region extension, adding a `messages` option
    // NOTE: This is an experimental API. We are still investigating
    // a full solution for string manipulation and internationalization.
    $.widget("ui.advancedAutocomplete", $.ui.advancedAutocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(amount) {
                    return amount + (amount > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                }
            }
        },

        __response: function(content) {
            var message;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) {
                return;
            }
            if (content && content.length) {
                message = this.options.messages.results(content.length);
            } else {
                message = this.options.messages.noResults;
            }
            this.liveRegion.children().hide();
            $("<div>").text(message).appendTo(this.liveRegion);
        }
    });

    var advancedAutocomplete = $.ui.advancedAutocomplete;
}
)(window.jQuery, window, document);

(function($) {
    try {
        // delete element and return innerHTML
        function getCMSBlock(selector) {
            var $elem = $(selector);
            var $temp = $elem.html();
            $elem.remove();
            return $temp;
        }

        // delete (noResult & oneClickSuggest) block from dom
        $.extend(GSEB.options.richAutocomplete, {
            noResult: getCMSBlock('#noResult-container'),
            oneClickSuggest: getCMSBlock('#oneClickSuggest-container')
        });

        GSEB.allBrands.richAutocomplete = (function() {
            var self = {
                getRichSuggestions: function(formname, globalId, id, url) {
                    $(id).advancedAutocomplete((function() {
                        var currentInstance;
                        var term;
                        var openingMode;
                        var allowSubmit = false;
                        var options = {
                            appendTo: "#autocomplete-container",
                            minLength: 2,
                            autoFocus: false,
                            renderOptions: {
                                autoSuggest: function(ul, items, innerHTML, noResult) {
                                    allowSubmit = true;
                                    ul.removeClass('one-click-suggest');
                                    ul.removeClass('no-result-found');
                                    return innerHTML;
                                },
                                noResult: function(ul, items, innerHTML, noResult) {
                                    allowSubmit = false;
                                    ul.removeClass('one-click-suggest');
                                    ul.addClass('no-result-found');
                                    var $result = $(GSEB.options.richAutocomplete.noResult);
                                    $result.find('#autosuggest-search-term').text(term);
                                    return $result[0].outerHTML;
                                },
                                oneClickSuggest: function(ul, items, innerHTML, noResult) {
                                    allowSubmit = false;
                                    ul.removeClass('no-result-found');
                                    ul.addClass('one-click-suggest');
                                    return GSEB.options.richAutocomplete.oneClickSuggest;
                                }
                            },
                            render: function(ul, items, innerHTML, noResult) {
                                $(options.appendTo || '.ui-menu').css('display', 'block');
                                self.toggleBodyScrolling(false);
                                openingMode = noResult ? 'noResult' : (innerHTML ? 'autoSuggest' : 'oneClickSuggest')
                                ul.html((options.renderOptions[openingMode])(ul, items, innerHTML, noResult))
                            },
                            source: function(request, response) {
                                currentInstance = this;
                                term = request.term;
                                var _options = this.options;
                                $.get(url, request, function(ajaxResponce) {
                                    var _innerHTMLResponce = $(ajaxResponce).html();
                                    var _response = [];
                                    _response.render = function(ul, items) {
                                        _options.render(ul, items, _innerHTMLResponce, _innerHTMLResponce && !_innerHTMLResponce.trim().length)
                                    }
                                    ;
                                    response(_response);
                                }).fail(function() {
                                    var _innerHTMLResponce = GSEB.options.richAutocomplete.autocompleteNotFound;
                                    var _response = [];
                                    _response.render = function(ul, items) {
                                        _options.render(ul, items, _innerHTMLResponce, _innerHTMLResponce && _innerHTMLResponce.trim().length)
                                    }
                                    ;
                                    response(_response);
                                });
                            },
                            response: function(event, ui) {
                            },
                            oneClickSuggestHandler: function() {
                                currentInstance = this;
                                if (!!$(GSEB.options.richAutocomplete.oneClickSuggest).find('.autocomplete-cat').length) {
                                    this.__renderMenu = this.options.render;
                                    this._suggest();
                                    this._trigger("open");
                                }
                            },
                            onCloseHandler: function(event, ui) {
                                if (event.target !== event.currentTarget && event.currentTarget.id !== 'close-search')
                                    return
                                options.onBeforeCloseHandler(event, ui);
                                options.close(event, ui)
                            },
                            onBeforeCloseHandler: function(event, ui) {
                                $(id).blur();
                                return true;
                            },
                            onBeforeBlurHandler: function(event, ui) {
                                return !allowSubmit && $(event.relatedTarget).attr('type') === 'submit' || $(event.relatedTarget).is('.dropmenu-toggle.homologation-iconSearchHeader') ? this.cancelBlur = true : false;
                            },
                            onSubmitHandler: function() {
                                $(id).closest('form').on('submit', function(event) {
                                    if (!allowSubmit) {
                                        event.preventDefault();
                                    }
                                    return allowSubmit;
                                })
                            },
                            open: function(event, ui) {
                                self.suggestionSlider();
                                self.debounce(options.onResizeHandler(event, ui), 500);
                            },
                            close: function(event, ui) {
                                $(options.appendTo || '.ui-menu').css('display', 'none');
                                self.toggleBodyScrolling(true);
                                $(window).off('resize');
                                if (!currentInstance)
                                    return;
                                currentInstance.close(event);
                                currentInstance._change(event);
                            },
                            focus: function(event, ui) {
                                return false;
                            },
                            onMouseDownHandler: function(event, ui) {
                                function focusInput() {
                                    return !!setTimeout(function() {
                                        currentInstance.element.focus()
                                    }, 1)
                                }

                                $(id).closest('form').find('[type="submit"]').on('mousedown', function() {
                                    return !allowSubmit ? (currentInstance.cancelBlur = true) && focusInput() : false;
                                });
                                $('#global-search.search.content-toggle.homologation-globalSearch, .wrap-search > form > .search-input-wrapper.dropdown-menu').on('mousedown', function(event) {
                                    if (event.target === this) {
                                        currentInstance.cancelBlur = true;
                                        focusInput();
                                    }
                                });
                            },
                            onResizeHandler: function(event, ui) {
                                var $autocompleteContainer = $('.autocomplete-container');
                                var innerHTML = $autocompleteContainer.html();
                                $(window).on('resize', function() {
                                    $autocompleteContainer.html(innerHTML);
                                    self.initSlimScroll();
                                });
                                self.initSlimScroll();
                            }
                        };

                        if (!!GSEB.options.richAutocomplete && !!GSEB.options.richAutocomplete.options) {
                            var specificOptions = GSEB.options.richAutocomplete.options;
                            for (var _option in specificOptions) {
                                if (specificOptions.hasOwnProperty(_option)) {
                                    options[_option] = specificOptions[_option];
                                }

                            }
                        }

                        (['onSubmitHandler', 'onMouseDownHandler']).forEach(function(handler) {
                            (!!options[handler]) && options[handler]();
                        });

                        $(document).on('click touchstart', '#close-search, .close-search, ' + (options.appendTo || '.ui-menu'), options.onCloseHandler);
                        self.onCloseHandler = options.onCloseHandler

                        return options;
                    }
                    )());
                    self.initBody()
                },

                suggestionSlider: function() {
                    if ($('.suggestion-slider > .item').length > 4) {
                        $('.suggestion-slider').addClass('owl-carousel').owlCarousel({
                            items: 4,
                            nav: true,
                            margin: 12,
                            dots: false,
                            pagination: false,
                            responsiveClass: true,
                            responsive: {
                                0: {
                                    mouseDrag: true,
                                    items: 2,
                                    center: false,
                                    autoHeight: false
                                },
                                720: {
                                    mouseDrag: true,
                                    items: 4,
                                    center: false,
                                    autoHeight: false
                                }
                            }
                        });
                    }
                },

                initSlimScroll: function() {
                    var $window = $(window);
                    var $autocompleteContainer = $('.autocomplete-container');
                    $autocompleteContainer.css('height', '');
                    var height = $window.height() - $autocompleteContainer.offset().top + (GSEB.platform.isMobile() ? 0 : $window.scrollTop());
                    var minHeight = height ? Math.min(height, $autocompleteContainer.height()) : height;
                    if (((minHeight + height) / (2 * minHeight)) <= 1.018 || GSEB.constants.site === GSEB.brands.Tefal && $window.width() <= 720) {
                        $autocompleteContainer.css({
                            height: minHeight + 'px'
                        });
                        $autocompleteContainer.niceScroll();
                    }
                },

                toggleBodyScrolling: function(scroll) {
                    if (scroll === false) {
                        $('body').addClass('no-overflow').css('cssText', 'overflow: hidden;');
                        document.ontouchmove = function() {}
                        document.ontouchmove = self.onFreezeVpHandler;
                    } else if (document.ontouchmove === self.onFreezeVpHandler) {
                        $('html, body').removeClass('no-overflow').css({
                            'overflow': ''
                        });
                        document.ontouchmove = function() {}
                    }
                },

                onFreezeVpHandler: function(event) {
                    if ($(event.target).is('#autocomplete-container')) {
                        self.onCloseHandler($.extend({}, event, {
                            target: event.target,
                            currentTarget: event.target
                        }));
                    }
                    event.preventDefault();
                    return false;
                },

                onCloseHandler: function(event) {//
                },

                initBody: function() {
                    $('html, body').addClass('platform-' + navigator.platform)
                },
                debounce: function(func, wait, immediate) {
                    var timeout;
                    return function() {
                        var context = this
                          , args = arguments;
                        var later = function() {
                            timeout = null;
                            if (!immediate)
                                func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow)
                            func.apply(context, args);
                    }
                    ;
                }
            };

            return self;
        }
        )();

        if (GSEB.constants.autocompleteRich) {
            GSEB.allBrands.richAutocomplete.getRichSuggestions("search_form", "#global-search", "#search", GSEB.options.richAutocomplete.url);

            $("body").mousedown(function(event) {
                var $target = $(event.target);
                if ($target.parents('#autocomplete-container').length === 0 && !$target.is('#global-search') && $target.parents('[name="search_form"]').length === 0 || !!$target.parents('#close-search').length || $target.is('#close-search')) {
                    GSEB.allBrands.richAutocomplete.onCloseHandler($.extend({}, event, {
                        target: event.target,
                        currentTarget: event.target
                    }))
                }
            });
        }
    } catch (exeption) {
        console.log(exeption)
    }
}
)(window.jQuery);
