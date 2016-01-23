define(
    [
        'lib/react',
        'js/app/AppService',
        'js/app/CartComponent',
        'js/app/Grams'
    ],
    function(
        React,
        AppService,
        CartComponent,
        Grams
    ) {
        var AppComponent = React.createClass({

            getInitialState: function() {
                var state = {
                    cartItems:[],
                    gramItems:[]
                }

                return state;
            },

            _addOrRemoveCartItem: function(data) {

                var item = data;

                // console.log('item clicked-', data);

                var copyOfCurrentCart = this.state.cartItems.slice(0);

                var cartContainsArray = copyOfCurrentCart.filter(function(cartItem) {
                    return cartItem.link === item.link;
                });

                var alreadyInCart = cartContainsArray.length > 0;

                if(alreadyInCart) {
                    // remove from cart
                    copyOfCurrentCart.splice(copyOfCurrentCart.indexOf(cartContainsArray[0]), 1);
                    return this.setState( {cartItems: copyOfCurrentCart} );
                } else {
                    // add to cart
                    copyOfCurrentCart.push(item);
                    return this.setState( {cartItems: copyOfCurrentCart} );
                }

            },

            _getGrams: function(e) {
                e.preventDefault();

                var query = this.refs.gramQuery.getDOMNode().value;

                // sorry i have to do this, i would have used a Promise, but don't want to require the polyfill
                var self = this;

                AppService.getGramsByQuery(query, function (resultsObject) {
                    self.setState({gramItems: resultsObject.gramItems})
                });
            },

            render: function() {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <h1>React-A-Gram Cart</h1>
                                <h4>By:&nbsp;
                                    <a href="http://www.hartzis.me" target="_blank">@Hartzis</a>
                                </h4>
                                <h5>Search <del>instagram</del> Flickr for pictures by query</h5>
                                <form className="form-inline" onSubmit={this._getGrams}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="searchQuery" placeholder="cows" ref="gramQuery" />
                                    </div>
                                    <button type="submit" className="btn btn-default">Do the thing!</button>
                                </form>
                            </div>
                        </div>
                        <CartComponent cartItems={this.state.cartItems} onRemove={this._addOrRemoveCartItem} />
                        <Grams gramItems={this.state.gramItems}
                          cartItems={this.state.cartItems}
                          onSelect={this._addOrRemoveCartItem}/>
                    </div>
                );
            },



        });

        return AppComponent;
    }
);
