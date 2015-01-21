define(
    [
        'lib/jquery',
        'js/Dispatcher'
    ],
    function(
        JQuery,
        Dispatcher
    ) {
        
        function AppController (view) {
            this.view = view;

            // setup listeners
            Dispatcher.onDataChange('AppComponent.cartItems.add', this.addCartItem);

        }

        AppController.prototype = {

            // getJSON: function(url, callback) {
            //     var request = new XMLHttpRequest();
            //     request.open('GET', url, true);

            //     request.onload = function() {
            //         if (request.status >= 200 && request.status < 400) {
            //             // Success!
            //             var data = JSON.parse(request.responseText);

            //             callback(data);

            //         } else {
            //             // We reached our target server, but it returned an error
            //             console.log('it brokeded');
            //         }
            //     };

            //     request.onerror = function() {
            //         // There was a connection error of some sort
            //         console.log('it brokeded');
            //     };

            //     request.send();
            // },

            getGramsByQuery: function(query) {

                var view = this.view;

                // i realize now that i thought i was going to use instagram but i am now using flickr

                var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
                    $.getJSON( flickerAPI, {
                        tags: query,
                        tagmode: "any",
                        format: "json"
                    })
                    .done(function( data ) {
                        console.log('data-', data);

                        var items = data.items;

                        view.setState({cartItems:items});

                    });


            },

            addCartItem: function(link) {
                console.log('item selected-', link);
            }

        }

        return AppController;
    }
);