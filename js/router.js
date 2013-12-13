define([
    'jquery',
    'underscore',
    'backbone',
    'model/user',
    'model/session',
    'view/menu',
    'view/userHome'
], function($, _, Backbone, User, session, Menu, UserHomeView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'register(/)': 'register',
            'login(/)': 'login',
            'randomRequest(/)': 'randomRequest'
        },

        initialize: function() {
            var menu = new Menu();
            menu.render();
        },

        index: function() {
            // todo: switch on login/logout
            if (session.get('username') == null) {
                this.register();
            } else {
                this.userHome();
            }
        },

        register: function() {

        },

        userHome: function() {
            var userHomeView = new UserHomeView();
            userHomeView.render();
        }

        /*register: function() {
            var user = new User();
            var registerView = new RegisterView({model: user});
            registerView.render();
        },

        login: function() {
            var loginView = new LoginView({model: session});
            loginView.render();
        },

        randomRequest: function() {
            var random = new Random();
            random.fetch();
        }*/
    });

    var initialize = function() {
        var appRouter = new AppRouter();

        // Extend the View class to include a navigation method navigate
        Backbone.View.prototype.navigate = function (location) {
            appRouter.navigate(location, true);
        };

        Backbone.history.start({pushState: false});
    };

    return {
        initialize: initialize
    };
});