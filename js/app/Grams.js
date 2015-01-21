define(
    [
        'lib/react',
        'js/Dispatcher'
    ],
    function(
        React,
        Dispatcher
    ) {
        var Grams = React.createClass({displayName: "Grams",
            componentWillMount: function() {
                // dispatcher listeners here
            },

            componentWillUnmount: function() {
                // stop listening for htings
            },

            render: function() {
                return (
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-12 text-center"}, 
                            this.props.cartItems.map(function(item) {
                                return (
                                    React.createElement("div", {className: "panel", key: item.link}, 
                                        React.createElement("img", {src: item.media.m})
                                    )
                                )
                            })
                        )
                    )
                )
            }
        });

        return Grams;
    }
);