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
            Dispatcher.onDataChange('AppComponent.cartItems.add', this.addCartItem.bind(this));

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

            addCartItem: function(data) {

                var item = data.item;

                console.log('item selected-', data.item, 'this-', this);

                var state = this.view.state;

                var cartContainsArray = state.cartItems.map(function(cartItem) {
                    return cartItem.link === item.link;
                });

                var alreadyInCart = cartContainsArray.length !== 0 ? cartContainsArray.reduce(function(a,b) {return a || b;}) : false;

                if(alreadyInCart) {
                    // remove from cart
                    console.log('remove?!', item);
                    return false;      
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