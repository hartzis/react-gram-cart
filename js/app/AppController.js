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

                var state = this.view.state;

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

                        state.gramItems = items;

                        view.setState(state);

                    });


            },

            addCartItem: function(link) {
                console.log('item selected-', link);
                // var state = this.view.state;

                // var cartContainsArray = this.props.cartItems.map(function(cartItem) {
                //     return cartItem.link === item.link;
                // });

                // var alreadyInCart = cartContainsArray.length !== 0 ? cartContainsArray.reduce(function(a,b) {return a || b;}) : false;

                // if(alreadyInCart) {
                    
                // }

            }

        }

        return AppController;
    }
);