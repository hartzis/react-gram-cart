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
            componentWillMount: function() {
                // dispatcher listeners here
            },

            componentWillUnmount: function() {
                // stop listening for htings
            },

            render: function() {
                return (
                    <div>yup</div>
                )
            }
        });

        return CartComponent;
    }
);