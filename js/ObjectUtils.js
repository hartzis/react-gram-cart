/* global _ */
define( [], function() {

    /**
     * Utilities for working with JavaScript's object model
     */
    var ObjectUtils = {

        /**
         * An easy way to create subclasses in JavaScript. The subclass will inherit methods
         * from the superclass, and you can override any methods you need to. Inside overridden
         * methods, you can access the superclass's method using `MySubclass.__super__`.
         *
         * @param {Object} parent - The class that you want your subclass to inherit from
         * @param {Object} protoProps - Instance properties that should extend the prototype
         * @param {Object} [staticProps] - Static properties that are only present on the class
         *
         * Usage:
         *
         *    var MySubclass = ObjectUtils.extend( MyClass, {
         *         myMethod: function() {
         *             // Call a property on the superclass
         *             MySubclass.__super__.myMethod.call( this );
         *         }
         *     };
         */
        extend: function( parent, protoProps, staticProps ) {
            var child;

            // The constructor function for the new subclass is either defined by you
            // (the "constructor" property in your `extend` definition), or defaulted
            // by us to simply call the parent's constructor.
            if ( protoProps && _.has( protoProps, 'constructor' ) ) {
                child = protoProps.constructor;
            } else {
                child = function() {
                    return parent.apply( this, arguments );
                };
            }

            // Add static properties to the constructor function, if supplied.
            _.extend( child, parent, staticProps );

            // Set the prototype chain to inherit from `parent`, without calling
            // `parent`'s constructor function.
            var Surrogate = function() {
                this.constructor = child;
            };
            Surrogate.prototype = parent.prototype;
            child.prototype = new Surrogate();

            // Add prototype properties (instance properties) to the subclass,
            // if supplied.
            if ( protoProps ) {
                _.extend( child.prototype, protoProps );
            }

            // Set a convenience property in case the parent's prototype is needed
            // later.
            child.__super__ = parent.prototype;

            return child;
        }

    };

    return ObjectUtils;

});
