define(
    [
        'lib/react'
    ],
    function(
        React
    ) {

        var cx = React.addons.classSet;

        var Grams = React.createClass({displayName: "Grams",

            propTypes: {
                gramItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
                cartItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
                onSelect: React.PropTypes.func.isRequired
            },

            _select: function(gram) {
              this.props.onSelect(gram);
            },

            _isSelected: function(item) {
                var selectedArray = this.props.cartItems.map(function(cartItem) {
                    return cartItem.link === item.link;
                })

                return selectedArray.length !== 0 ? selectedArray.reduce(function(a,b) {return a || b;}) : false;

            },

            _renderGram: function(gram) {
                var isSelected = this._isSelected(gram);
                var classes = cx({
                    'panel': true,
                    'panel-primary': isSelected,
                    'panel-info': !isSelected
                });
                return (
                    React.createElement("div", {className: "col-xs-12 col-sm-4", key: gram.link}, 
                        React.createElement("div", {className: classes, onClick: this._select.bind(this, gram)}, 
                            React.createElement("img", {className: "gram", src: gram.media.m})
                        )
                    )
                )
            },

            render: function() {

                var $renderedGrams = this.props.gramItems.map(this.renderGram);

                return (
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-12 text-center"}, 
                            React.createElement("div", {className: "row"}, 
                                $renderedGrams
                            )
                        )
                    )
                )
            }

        });

        return Grams;
    }
);
