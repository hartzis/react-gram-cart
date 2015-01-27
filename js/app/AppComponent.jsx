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
                        <CartComponent cartItems={this.state.cartItems} />
                        <Grams gramItems={this.state.gramItems} cartItems={this.state.cartItems} />
                    </div>
                );
            },

            getGrams: function(e) {

                var query = this.refs.gramQuery.getDOMNode().value;

                this.controller.getGramsByQuery(query);

                e.preventDefault();
            }

        });

        return AppComponent;
    }
);