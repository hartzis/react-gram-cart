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
                    <div className="row">
                        <div className="col-xs-12 text-center well">
                            <h5>-klart-</h5>
                            {this.props.cartItems.map(function(item) {
                                    var classes = cx({
                                        'panel': true,
                                        'panel-primary': true
                                    });
                                    return (
                                        <div className="col-xs-12 col-sm-4" key={item.link}>
                                            <div className={classes} onClick={this.remove.bind(this, item)}>
                                                <img src={item.media.m} />
                                            </div>
                                        </div>
                                    )
                                }.bind(this))}
                        </div>
                    </div>
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