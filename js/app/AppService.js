define(
    [ ],
    function( ) {
        var AppService = {}

        AppService.getGramsByQuery = function(query, passedInCallback) {

            var view = this.view;

            // i realize now that i thought i was going to use instagram but i am now using flickr

            // setup query
            var tags = query;
            var tagmode = "any";
            var format = "json";

            var query = "tags=" + tags + "&tagmode=" + tagmode + "&format=" + format;

            var callback = function ( data ) {
                console.log('data-', data);

                var gramItems = data.items;

                // remove from global scope
                delete window.jsonFlickrFeed;

                return passedInCallback({gramItems: gramItems});

            };

            // Vanilla
            var jsonFlickrFeed = function ( data ) {
              callback( data );
            }
            // put on global scope temporaralllyyyy
            window.jsonFlickrFeed = jsonFlickrFeed;
            var scr = document.createElement('script');

            scr.src = 'http://api.flickr.com/services/feeds/photos_public.gne?callback=jsonFlickrFeed&' + query;
            document.body.appendChild(scr);

        }

        return AppService;
    }
);
