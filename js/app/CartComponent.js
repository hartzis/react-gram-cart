define(
    [
        'lib/react'
    ],
    function(
        React
    ) {

        var cx = React.addons.classSet;

        var CartComponent = React.createClass({displayName: "CartComponent",

            propTypes: {
                cartItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
                onRemove: React.PropTypes.func.isRequired
            },

            getInitialState: function() {
                return {
                    show: false
                }
            },

            _showCart: function() {
                this.setState({show: !this.state.show});
            },

            _remove: function(item) {
                // console.log('remove-', item);
                this.props.onRemove(item);
            },

            render: function() {

                var $renderedCartItems = this.props.cartItems.map(function(item) {
                    var classes = cx({
                        'panel': true,
                        'panel-primary': true
                    });
                    return (
                        React.createElement("div", {className: "col-xs-12 col-sm-4", key: item.link}, 
                            React.createElement("div", {className: classes, onClick: this._remove.bind(this, item)}, 
                                React.createElement("img", {className: "gram", src: item.media.m})
                            )
                        )
                    )
                }, this)

                return (
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-12"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: cx({'col-xs-12': true, 'text-center': true, 'well': true, 'hidden': !this.state.show})}, 
                                    React.createElement("h5", null, "-klart-"), 
                                    $renderedCartItems
                                )
                            ), 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col-xs-12 text-center"}, 
                                    React.createElement("hr", null), 
                                    React.createElement("button", {className: "btn btn-primary", onClick: this._showCart}, 
                                        this.state.show ? 'Hide' : 'Show', " klart (", this.props.cartItems.length, ")"
                                    )
                                )
                            )
                        )
                    )
                )
            }
        });

        return CartComponent;
    }
);
