define([
    'jquery',
    'underscore',
    'backbone',
    'model/user',
    'model/session',
    'model/budget',
    'view/menu',
    'view/userHome',
    'view/budget/budget'
], function($, _, Backbone, User, session, Budget, Menu, UserHomeView, BudgetView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'register(/)': 'register',
            'login(/)': 'login',
            'randomRequest(/)': 'randomRequest',
            ':username/:budgetName(/)': 'budget'
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
        },

        budget: function(username, budgetName) {
            var budget = new Budget({username: username, name: budgetName});
            budget.fetch();

            var budgetView = new BudgetView({model: budget});
            budgetView.render();
        }
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