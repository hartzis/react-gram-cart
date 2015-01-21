define(
    [
        'js/Dispatcher'
    ],
    function(
        Dispatcher
    ) {
        
        function AppController (view) {
            this.view = view;

            // setup listeners
            Dispatcher.onDataChange('get.grams.with.query', this.getGramsByQuery);
        }

        AppController.prototype = {

            getJSON: function(url, callback) {
                var request = new XMLHttpRequest();
                request.open('GET', url, true);

                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        var data = JSON.parse(request.responseText);

                        callback(data);

                    } else {
                        // We reached our target server, but it returned an error
                        console.log('it brokeded');
                    }
                };

                request.onerror = function() {
                    // There was a connection error of some sort
                    console.log('it brokeded');
                };

                request.send();
            },

            getGramsByQuery: function(data) {

                // i realize now that i thought i was going to use instagram but i am now using flickr

                // var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

                // tags: "mount rainier",
                // tagmode: "any",
                // format: "json"

                // flickrURL = flickrURL + "&tagmode=any&"

                console.log('ajax this query-', data.query)

                // this.getJSON()

            }

        }

        return AppController;
    }
);