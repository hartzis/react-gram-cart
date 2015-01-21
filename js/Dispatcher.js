/* global _ */
define([
    'js/ObjectUtils',
    'lib/eventemitter2'
], function( ObjectUtils, EventEmitter2 ) {

    /**
     * A central dispatcher to communicate data or state changes to views that are interested.
     * This is structured as a singleton, so each module that requires the dispatcher gets the
     * same instance.
     *
     * Usage:
     *
     *     require( [ 'craftsy/Dispatcher' ], function( Dispatcher ) {
     *
     *         // Listen for all changes on a model
     *         Dispatcher.onDataChange( 'LectureModel', function() {
     *             // Handle that event!
     *         });
     *
     *         // Listen for all changes on a specific model id
     *         Dispatcher.onDataChange( 'LectureModel', 123, function() {
     *             // Handle that event!
     *         });
     *
     *         // Listen for all changes on a specific model attribute
     *         Dispatcher.onDataChange( 'LectureModel', '*', 'title', function() {
     *             // Handle that event!
     *         });
     *
     *         // Listen for all data changes, no matter the model
     *         Dispatcher.onDataChange( function() {
     *             // Handle that event!
     *         });
     *
     *         // Broadcast a change for a model with some additional data
     *         Dispatcher.dataChange( 'LectureModel', { additional: 'data' } );
     *
     *         // Broadcast a change for an attribute on a model
     *         Dispatcher.dataChange( 'LectureModel', 'title' );
     *
     *     };
     */
    var Dispatcher = ObjectUtils.extend( EventEmitter2, {

        /**
         * Signal that data has changed. The model's class name is the required first argument,
         * along with an optional attribute name and optional additional data.
         *
         * @param {String} model - The class name of the model to watch for changes
         * @param {String|Number} [id] - The id of the model to watch for changes
         * @param {String} [attribute] - The attribute on the model to watch for changes
         * @param {Object} [data] - Additonal data to pass along with the event
         */
        dataChange: function( model, id, attribute, data ) {
            var eventKey = 'data.change.' + model;

            if ( _.isString( id ) || _.isNumber( id ) ) {
                // An ID was specified
                eventKey += '.' + ( _.isNumber( id ) ? id.toString() : id );

                if ( _.isString( attribute ) ) {
                    // An attribute was specified
                    eventKey += '.' + attribute;
                } else {
                    // No attribute was specified, so default to __all__
                    eventKey += '.__all__';

                    if ( _.isObject( attribute ) ) {
                        // This is actually the additional data to pass to the emit call
                        data = attribute;
                    }
                }
            } else {
                // No ID was specified, so default to __all__ for the id and attribute
                eventKey += '.__all__.__all__';

                if ( _.isObject( id ) ) {
                    // This is actually the additional data to pass to the emit call
                    data = id;
                }
            }

            return this.emit( eventKey, data );
        },

        /**
         * Listen for changes on a model. If the attribute is omitted, listen for any changes on
         * that model. If the model is omitted, listen for any data changes at all.
         *
         * @param {String} [model] - The class name of the model to listen for
         * @param {String} [attribute] - The attribute on the model to listen for
         * @param {Function} callback - The callback to handle the event
         */
        onDataChange: function( model, id, attribute, callback ) {
            var handler;
            var eventKey = 'data.change';

            if ( _.isString( model ) ) {
                // If the model arg is a string, add it to the key
                eventKey += '.' + model;

                if ( _.isString( id ) || _.isNumber( id ) ) {
                    // If the id is a string or number, add it to the key
                    eventKey += '.' + ( _.isNumber( id) ? id.toString() : id );

                    if ( _.isString( attribute ) ) {
                        // If the attribute arg is a string, add it to the key
                        eventKey += '.' + attribute;

                        if ( _.isFunction( callback ) ) {
                            handler = callback;
                        } else {
                            // Something's wrong, time to throw an error
                            throw new Error( 'A callback is required.' );
                        }
                    } else {
                        // Add the wildcard to listen to all events for this model instance
                        eventKey += '.*';

                        if ( _.isFunction( attribute ) ) {
                            // If the attribute arg is a function, it's actually supposed to be
                            // the event handler
                            handler = attribute;
                        }
                    }
                } else {
                    // Add the wildcard to listen for all events for this model class
                    eventKey += '.*.*';

                    if ( _.isFunction( id ) ) {
                        // If the id arg is a function, it's actually supposed to be the event
                        // handler
                        handler = id;
                    }
                }
            } else {
                // Add the wildcard to listen for all data events
                eventKey += '.*.*.*';

                if ( _.isFunction( model ) ) {
                    // If the model arg is a function, it's actually supposed to be the event
                    // handler
                    handler = model;
                }
            }

            return this.on( eventKey, handler );
        }

    });

    // The dispatcher should be a singleton, so return the initialized instance
    return new Dispatcher({wildcard: true});

});
