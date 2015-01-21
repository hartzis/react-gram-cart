define(
    [
        'lib/react',
        'js/Dispatcher'
    ],
    function(
        React,
        Dispatcher
    ) {
        var CartComponent = React.createClass({displayName: "CartComponent",

            getIntialState: function() {
                var state = {
                    cartItems: this.props.cartItems
                }
                return state;
            },

            componentWillMount: function() {
                // dispatcher listeners here
            },

            componentWillUnmount: function() {
                // stop listening for htings
            },

            render: function() {
                return (
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-12 text-center"}

                        )
                    )
                )
            }
        });

        return CartComponent;
    }
);