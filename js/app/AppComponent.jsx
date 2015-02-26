define(
    [
        'lib/react',
        'js/app/AppController',
        'js/app/CartComponent',
        'js/app/Grams'
    ],
    function(
        React,
        AppController,
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

            componentWillMount: function() {
                // dispatcher listeners here

                // load the controller
                this.controller = new AppController(this);
            },

            componentWillUnmount: function() {
                // stop listening for htings
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

            render: function() {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <h1>React-A-Gram Cart</h1>
                                <h5>Search <del>instagram</del> Flickr for picutures by query</h5>
                                <form className="form-inline" onSubmit={this.getGrams}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="searchQuery" placeholder="cows" ref="gramQuery" />
                                    </div>
                                    <button type="submit" className="btn btn-default" onClick={this.getGrams}>Do the thing!</button>
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

            getGrams: function(e) {
                e.preventDefault();

                var query = this.refs.gramQuery.getDOMNode().value;

                this.controller.getGramsByQuery(query);
            }

        });

        return AppComponent;
    }
);
