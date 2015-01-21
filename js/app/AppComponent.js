define(
    [
        'lib/react',
        'js/Dispatcher',
        'js/app/AppController',
        'js/app/CartComponent',
        'js/app/Grams'
    ],
    function(
        React,
        Dispatcher,
        AppController,
        CartComponent,
        Grams
    ) {
        var AppComponent = React.createClass({displayName: "AppComponent",

            getInitialState: function() {
                var state = {
                    cartItems:[]
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

            render: function() {
                return (
                    React.createElement("div", {className: "container"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-12 text-center"}, 
                                React.createElement("h1", null, "React-A-Gram Cart"), 
                                React.createElement("h5", null, "Search instagram for picutures by query"), 
                                React.createElement("form", {className: "form-inline"}, 
                                    React.createElement("div", {className: "form-group"}, 
                                        React.createElement("input", {type: "text", className: "form-control", id: "searchQuery", placeholder: "ugly cows", ref: "gramQuery"})
                                    ), 
                                    React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.getGrams}, "Do the thing!")
                                )
                            )
                        ), 
                        React.createElement(CartComponent, {cartItems: this.state.cartItems}), 
                        React.createElement(Grams, {cartItems: this.state.cartItems})
                    )
                );
            },

            getGrams: function() {

                var query = this.refs.gramQuery.getDOMNode().value;

                Dispatcher.dataChange('get.grams.with.query', {query:query});
            }

        });

        return AppComponent;
    }
);