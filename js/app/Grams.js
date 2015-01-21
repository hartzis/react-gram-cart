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
                    React.createElement("div", null, "yup2")
                )
            }
        });

        return Grams;
    }
);