
new Vue({
    el: '#app',

    // few filters available to change content in main area
    data: {
        platform: 'wordpress',
        hosting: '',
        control: 'max',
        // available options for above data
        options: {
            platform: {
                'wordpress': 'Wordpress',
                'joomla': 'Joomla',
                'drupal': 'Drupal',
                'wix': 'Wix',
                'magento': 'Magento',
                'shopify': 'Shopify',
                '': 'Other',
            },
            hosting: {
                'godaddy': 'GoDaddy',
                'dedicated-server': 'Dedicated Server',
                'cloudflare': 'Cloudflare',
                '': 'Other'
            },
            control: {
                'max': 'I have full code access &amp; can install plugins etc if needed',
                'med': 'I have access to page content only',
                'min': 'I have minimal access'
            }
        }
    },

    // watch data for changes and update URL
    watch: {
        '$data': {
            handler: function () {
                var url = '?platform=' + this.platform;
                url += '&hosting=' + this.hosting;
                url += '&control=' + this.control;
                history.replaceState({}, '', url);
            },
            deep: true
        }
    },

    mounted: function () {

        // parse any url params
        var urlParams = {};
        location.search.substring(1).split('&').forEach(function (chunk) {
            var bits = chunk.split('=', 2);
            urlParams[decodeURIComponent(bits[0])] = decodeURIComponent(bits[1]);
        });

        // for any url params set, if it's an available option then set it
        if (urlParams) {
            if (urlParams.platform !== undefined && this.options.platform[urlParams.platform]) {
                this.platform = urlParams.platform;
            }
            if (urlParams.hosting !== undefined && this.options.hosting[urlParams.hosting]) {
                this.hosting = urlParams.hosting;
            }
            if (urlParams.control !== undefined && this.options.control[urlParams.control]) {
                this.control = urlParams.control;
            }
        }
    }
});
