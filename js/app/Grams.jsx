define(
    [
        'lib/react'
    ],
    function(
        React
    ) {

        var cx = React.addons.classSet;

        var Grams = React.createClass({

            propTypes: {
                gramItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
                cartItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
                onSelect: React.PropTypes.func.isRequired
            },

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
                            <div className="row">
                                {this.props.gramItems.map(this.renderGram)}
                            </div>
                        </div>
                    </div>
                )
            },

            renderGram: function(gram) {
                var isSelected = this.isSelected(gram);
                var classes = cx({
                    'panel': true,
                    'panel-primary': isSelected,
                    'panel-info': !isSelected
                });
                return (
                    <div className="col-xs-12 col-sm-4" key={gram.link}>
                        <div className={classes} onClick={this._select.bind(this, gram)}>
                            <img className="gram" src={gram.media.m} />
                        </div>
                    </div>
                )
            },

            _select: function(gram) {
              this.props.onSelect(gram);
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
