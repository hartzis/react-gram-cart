define(
    [
        'lib/react',
        'js/Dispatcher'
    ],
    function(
        React,
        Dispatcher
    ) {

        var cx = React.addons.classSet;

        var CartComponent = React.createClass({displayName: "CartComponent",

            getIntialState: function() {

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
                        React.createElement("div", {className: "col-xs-12 text-center well"}, 
                            React.createElement("h5", null, "-klart-"), 
                            this.props.cartItems.map(function(item) {
                                    var classes = cx({
                                        'panel': true,
                                        'panel-primary': true
                                    });
                                    return (
                                        React.createElement("div", {className: "col-xs-12 col-sm-4", key: item.link}, 
                                            React.createElement("div", {className: classes, onClick: this.remove.bind(this, item)}, 
                                                React.createElement("img", {className: "gram", src: item.media.m})
                                            )
                                        )
                                    )
                                }.bind(this))
                        )
                    )
                )
            },

            remove: function(item) {
                // console.log('remove-', item);
                Dispatcher.dataChange('AppComponent.cartItems.addOrRemove', {item:item});
            }
        });

        return CartComponent;
    }
);