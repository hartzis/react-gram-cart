define(
    [
        'js/Dispatcher',
        'lib/jquery'
    ],
    function(
        Dispatcher
    ) {
        
        function AppController (view) {
            this.view = view;

            // setup listeners
            Dispatcher.onDataChange('AppComponent.cartItems.addOrRemove', this.addOrRemoveCartItem.bind(this));

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

                        return view.setState(state);

                    });


            },

            addOrRemoveCartItem: function(data) {

                var item = data.item;

                // console.log('item clicked-', data.item);

                var state = this.view.state;

                var cartContainsArray = state.cartItems.filter(function(cartItem) {
                    return cartItem.link === item.link;
                });

                var alreadyInCart = cartContainsArray.length > 0;

                if(alreadyInCart) {
                    // remove from cart
                    state.cartItems.splice(state.cartItems.indexOf(cartContainsArray[0]), 1);
                    return this.view.setState(state);
                } else {
                    // add to cart
                    state.cartItems.push(item);
                    return this.view.setState(state);
                }

            }

        }

        return AppController;
    }
);