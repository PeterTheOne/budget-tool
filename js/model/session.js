define([
    'backbone'
], function(Backbone) {
    var Session = Backbone.Model.extend({
        idAttribute: 'sessionToken',
        url: 'api/index.php/session/',

        localStorageSupport: false,
        sessionStorageSupport: false,

        initialize : function(){
            try {
                this.localStorageSupport = ('localStorage' in window && window['localStorage'] !== null);
            } catch (e) {
                this.localStorageSupport = false;
            }
            try {
                this.sessionStorageSupport = ('sessionStorage' in window && window['sessionStorage'] !== null);
            } catch (e) {
                this.sessionStorageSupport = false;
            }

            var self = this;

            // clear on destroy
            this.on('destroy', function() {
                this.clear();
            });

            // clear storage if session is cleared
            this.on('reset', function() {
                if (this.sessionStorageSupport) {
                    sessionStorage.clear();
                }
                if (this.localStorageSupport) {
                    localStorage.clear();
                }
                self.setHeader();
            });

            // update header on change.
            this.on('change sync', function() {
                if (this.sessionStorageSupport) {
                    sessionStorage.clear();
                }
                if (this.localStorageSupport) {
                    localStorage.clear();
                }

                var key;
                for(key in self.attributes) {
                    if (this.sessionStorageSupport) {
                        sessionStorage.setItem(key, self.attributes[key]);
                    }
                    if (this.localStorageSupport) {
                        if (self.get('remember')) {
                            localStorage.setItem(key, self.attributes[key]);
                        }
                    }
                }
                self.setHeader();
            });

            // init attributes from session- or localStorage.
            if (this.sessionStorageSupport && sessionStorage.length > 0 &&
                    sessionStorage.getItem('sessionToken') != null) {

                this.set({
                    username: sessionStorage.getItem('username'),
                    password: '',
                    sessionToken: sessionStorage.getItem('sessionToken'),
                    remember: sessionStorage.getItem('remember')
                }, {silent: true});
                self.setHeader();

            } else if (this.localStorageSupport && localStorage.length > 0 &&
                    localStorage.getItem('sessionToken') != null) {

                this.set({
                    username: localStorage.getItem('username'),
                    password: '',
                    sessionToken: localStorage.getItem('sessionToken'),
                    remember: localStorage.getItem('remember')
                }, {silent: true});
                self.setHeader();

                // todo: get new key.

            }

        },

        setHeader: function() {
            if(typeof this.get('sessionToken') !== 'undefined' &&
                    this.get('sessionToken') != null) {
                $.ajaxSetup({
                    headers : {
                        'X-Session-Token' : this.get('sessionToken')
                    }
                });
            }
        }

    });

    return new Session();
});