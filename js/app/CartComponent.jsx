define(
    [
        'lib/react'
    ],
    function(
        React,
        Dispatcher
    ) {

        var cx = React.addons.classSet;

        var CartComponent = React.createClass({

            propTypes: {
                cartItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
                onRemove: React.PropTypes.func.isRequired
            },

            getInitialState: function() {
                return {
                    show: false
                }
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
                        <div className="col-xs-12">
                            <div className="row">
                                <div className={cx({'col-xs-12': true, 'text-center': true, 'well': true, 'hidden': !this.state.show})}>
                                    <h5>-klart-</h5>
                                    {this.props.cartItems.map(function(item) {
                                            var classes = cx({
                                                'panel': true,
                                                'panel-primary': true
                                            });
                                            return (
                                                <div className="col-xs-12 col-sm-4" key={item.link}>
                                                    <div className={classes} onClick={this.remove.bind(this, item)}>
                                                        <img className="gram" src={item.media.m} />
                                                    </div>
                                                </div>
                                            )
                                        }.bind(this))}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 text-center">
                                    <hr></hr>
                                    <button className="btn btn-primary" onClick={this.showCart}>
                                        {this.state.show ? 'Hide' : 'Show'} klart ({this.props.cartItems.length})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },

            showCart: function() {
                this.setState({show: !this.state.show});
            },

            remove: function(item) {
                // console.log('remove-', item);
                this.props.onRemove(item);
            }
        });

        return CartComponent;
    }
);
