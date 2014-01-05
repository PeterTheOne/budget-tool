define([
    'backbone',
    'underscore',
    'model/session',
    'text!template/userHomeHeader.html',
    'collection/budget',
    'view/budget/create',
    'view/budget/list'
], function(Backbone, _, session, userHomeHeaderTemplate, BudgetList, BudgetCreateView, BudgetListView) {
    var UserHomeView = Backbone.View.extend({
        el: $('.content'),

        initialize: function() {

        },

        render: function() {
            /*var header = this.$el.html(_.template(userHomeHeaderTemplate, {
                username: session.get('username')
            }));*/

            // create budget view
            this.$el.append('<h2>Create New Budget</h2>');
            var budgetCreateView = new BudgetCreateView();
            budgetCreateView.render();
            this.$el.append(budgetCreateView.el);

            // budget list view
            this.$el.append('<h2>Your Budgets</h2>');
            var budgetList = new BudgetList();
            budgetList.fetch({
                data: {userId: session.get('userId')}
            });
            var budgetListView = new BudgetListView({collection: budgetList});
            budgetListView.render();
            this.$el.append(budgetListView.el);
        }
    });

    return UserHomeView;
});