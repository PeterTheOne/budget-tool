define([
    'backbone',
    'underscore',
    'text!template/userHomeHeader.html',
    'collection/budget',
    'view/budget/create',
    'view/budget/list'
], function(Backbone, _, userHomeHeaderTemplate, BudgetList, BudgetCreateView, BudgetListView) {
    var UserHomeView = Backbone.View.extend({
        el: $('.content'),

        initialize: function() {

        },

        render: function() {
            var header = this.$el.html(_.template(userHomeHeaderTemplate));

            // create budget view
            this.$el.append('<h2>budget create view</h2>');
            var budgetCreateView = new BudgetCreateView();
            budgetCreateView.render();
            this.$el.append(budgetCreateView.el);

            // budget list view
            this.$el.append('<h2>budget list view</h2>');
            var budgetList = new BudgetList();
            budgetList.fetch();
            var budgetListView = new BudgetListView({collection: budgetList});
            budgetListView.render();
            this.$el.append(budgetListView.el);
        }
    });

    return UserHomeView;
});