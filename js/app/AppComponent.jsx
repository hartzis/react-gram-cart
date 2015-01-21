define(
    [
        'lib/react',
        'js/Dispatcher',
        'js/CartComponent',
        'js/Grams'
    ],
    function(
        React,
        Dispatcher
    ) {
        var AppComponent = React.createClass({
            componentWillMount: function() {
                // dispatcher listeners here
            },

            componentWillUnmount: function() {
                // stop listening for htings
            },

            render: function() {
                return (
                    <div>
                        <div>
                            <h1>React-A-Gram Cart</h1>
                            <h5>Search instagram for picutures by query</h5>
                        </div>
                        <CartComponent cartItems={this.state.cartItems} />
                        <Grams cartItems={this.state.cartItems} />
                    </div>
                );
            }
        });

        return AppComponent;
    }
);