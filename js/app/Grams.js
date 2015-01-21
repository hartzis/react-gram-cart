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
                            React.createElement("div", {className: "row"}, 
                                this.props.cartItems.map(function(item) {
                                    var classes = cx({
                                        'panel': true,
                                        'panel-primary': item.isSelected,
                                        'panel-info': !this.isSelected
                                    });
                                    return (
                                        React.createElement("div", {className: "col-xs-12 col-sm-4", key: item.link}, 
                                            React.createElement("div", {className: classes, onClick: this.select.bind(this, item)}, 
                                                React.createElement("img", {src: item.media.m})
                                            )
                                        )
                                    )
                                }.bind(this))
                            )
                        )
                    )
                )
            },

            select: function(item, event) {
                // debugger;

                Dispatcher.dataChange('AppComponent.cartItems.add', {link: item.link});

            }
        });

        return Grams;
    }
);