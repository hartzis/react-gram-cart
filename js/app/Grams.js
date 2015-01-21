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
                                this.props.gramItems.map(function(item) {
                                    var isSelected = this.isSelected(item);
                                    var classes = cx({
                                        'panel': true,
                                        'panel-primary': isSelected,
                                        'panel-info': !isSelected
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

                Dispatcher.dataChange('AppComponent.cartItems.addOrRemove', {item:item});

            },

            isSelected: function(item) {
                var selectedArray = this.props.cartItems.map(function(cartItem) {
                    return cartItem.link === item.link;
                })

                return selectedArray.length !== 0 ? selectedArray.reduce(function(a,b) {return a || b;}) : false;

            }
        });

        return Grams;
    }
);