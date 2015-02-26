define(
    [
        'lib/react',
        'js/app/AppController',
        'js/app/CartComponent',
        'js/app/Grams'
    ],
    function(
        React,
        AppController,
        CartComponent,
        Grams
    ) {
        var AppComponent = React.createClass({displayName: "AppComponent",

            getInitialState: function() {
                var state = {
                    cartItems:[],
                    gramItems:[]
                }

                return state;
            },

            componentWillMount: function() {
                // dispatcher listeners here

                // load the controller
                this.controller = new AppController(this);
            },

            componentWillUnmount: function() {
                // stop listening for htings
            },

            _addOrRemoveCartItem: function(data) {

                var item = data;

                // console.log('item clicked-', data);

                var copyOfCurrentCart = this.state.cartItems.slice(0);

                var cartContainsArray = copyOfCurrentCart.filter(function(cartItem) {
                    return cartItem.link === item.link;
                });

                var alreadyInCart = cartContainsArray.length > 0;

                if(alreadyInCart) {
                    // remove from cart
                    copyOfCurrentCart.splice(copyOfCurrentCart.indexOf(cartContainsArray[0]), 1);
                    return this.setState( {cartItems: copyOfCurrentCart} );
                } else {
                    // add to cart
                    copyOfCurrentCart.push(item);
                    return this.setState( {cartItems: copyOfCurrentCart} );
                }

            },

            render: function() {
                return (
                    React.createElement("div", {className: "container"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-12 text-center"}, 
                                React.createElement("h1", null, "React-A-Gram Cart"), 
                                React.createElement("h5", null, "Search ", React.createElement("del", null, "instagram"), " Flickr for picutures by query"), 
                                React.createElement("form", {className: "form-inline", onSubmit: this.getGrams}, 
                                    React.createElement("div", {className: "form-group"}, 
                                        React.createElement("input", {type: "text", className: "form-control", id: "searchQuery", placeholder: "cows", ref: "gramQuery"})
                                    ), 
                                    React.createElement("button", {type: "submit", className: "btn btn-default", onClick: this.getGrams}, "Do the thing!")
                                )
                            )
                        ), 
                        React.createElement(CartComponent, {cartItems: this.state.cartItems, onRemove: this._addOrRemoveCartItem}), 
                        React.createElement(Grams, {gramItems: this.state.gramItems, 
                          cartItems: this.state.cartItems, 
                          onSelect: this._addOrRemoveCartItem})
                    )
                );
            },

            getGrams: function(e) {
                e.preventDefault();

                var query = this.refs.gramQuery.getDOMNode().value;

                this.controller.getGramsByQuery(query);
            }

        });

        return AppComponent;
    }
);
