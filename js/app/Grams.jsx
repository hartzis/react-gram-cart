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
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            {this.props.cartItems.map(function(item) {
                                return (
                                    <div className="panel" key={item.link}>
                                        <img src={item.media.m} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }
        });

        return Grams;
    }
);