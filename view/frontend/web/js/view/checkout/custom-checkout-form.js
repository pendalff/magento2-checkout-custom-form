/*global define*/
define([
    'knockout',
    'jquery',
    'mage/url',
    'Magento_Ui/js/form/form',
    'Magento_Customer/js/model/customer',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/url-builder',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Checkout/js/model/cart/cache',
    'Bodak_CheckoutCustomForm/js/model/checkout/custom-checkout-form'
], function(ko, $, urlFormatter, Component, customer, quote, urlBuilder, errorProcessor, cartCache, formData) {
    'use strict';

    return Component.extend({
        customFields: ko.observable(null),
        formData: formData.customFieldsData,

        /**
         * Initialize component
         *
         * @returns {exports}
         */
        initialize: function () {
            var self = this;
            this._super();
            formData = this.source.get('customCheckoutForm');
            var formDataCached = cartCache.get('custom-form');
            if (formDataCached) {
                formData = this.source.set('customCheckoutForm', formDataCached);
            }

            this.customFields.subscribe(function(change){
                self.formData(change);
            });

            this.setGAValue();
            return this;
        },

        setGAValue: function() {
            var GA;
            var getCookie = function (name){
                var matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : false;
            }
            var cid = 'unknown',
                cidLong = getCookie('_ga');
            if (cidLong) {
                var tmp = cidLong.split('.');
                cid = tmp[2] + '.' + tmp[3];
            }

            this.customFields({
                checkout_ga_track: cid
            });
            this.formData({
                checkout_ga_track: cid
            });
        },

        /**
         * Trigger save method if form is change
         */
        onFormChange: function () {
            this.saveCustomFields();
        },

        /**
         * Form submit handler
         */
        saveCustomFields: function() {
            this.source.set('params.invalid', false);
            this.source.trigger('customCheckoutForm.data.validate');

            if (!this.source.get('params.invalid')) {
                var formData = this.formData();
                var quoteId = quote.getQuoteId();
                var isCustomer = customer.isLoggedIn();
                var url;
                if (isCustomer) {
                    url = urlBuilder.createUrl('/carts/mine/set-order-custom-fields', {});
                } else {
                    url = urlBuilder.createUrl('/guest-carts/:cartId/set-order-custom-field', {cartId: quoteId});
                }

                var payload = {
                    cartId: quoteId,
                    customFields: formData
                };
                var result = true;
                $.ajax({
                    url: urlFormatter.build(url),
                    data: JSON.stringify(payload),
                    global: false,
                    contentType: 'application/json',
                    type: 'PUT',
                    async: true
                }).done(
                    function (response) {
                        cartCache.set('custom-form', formData);
                        result = true;
                    }
                ).fail(
                    function (response) {
                        result = false;
                        errorProcessor.process(response);
                    }
                );

                return result;
            }
        }
    });
});