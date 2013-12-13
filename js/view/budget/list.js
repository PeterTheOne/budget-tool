define([
    'underscore',
    'backbone',
    'view/budget/single'
], function(_, Backbone, BudgetSingleView){
    var BudgetListView = Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {

        },

        render: function() {
            var self = this;
            this.collection.forEach(function(budget) {
                var budgetSingleView = new BudgetSingleView({model: budget});
                budgetSingleView.render();
                self.$el.append(budgetSingleView.$el);
            });
        }
    });
    return BudgetListView;
});