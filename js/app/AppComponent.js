define(
    [
        'lib/react',
        'js/Dispatcher',
        'js/app/CartComponent',
        'js/app/Grams'
    ],
    function(
        React,
        Dispatcher,
        CartComponent,
        Grams
    ) {
        var AppComponent = React.createClass({displayName: "AppComponent",

            getInitialState: function() {
                return {cartItems:[]};
            },

            componentWillMount: function() {
                // dispatcher listeners here
            },

            componentWillUnmount: function() {
                // stop listening for htings
            },

            render: function() {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", null, 
                            React.createElement("h1", null, "React-A-Gram Cart"), 
                            React.createElement("h5", null, "Search instagram for picutures by query")
                        ), 
                        React.createElement(CartComponent, {cartItems: this.state.cartItems}), 
                        React.createElement(Grams, {cartItems: this.state.cartItems})
                    )
                );
            }
        });

        return AppComponent;
    }
);