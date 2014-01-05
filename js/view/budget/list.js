define([
    'underscore',
    'backbone',
    'view/budget/single'
], function(_, Backbone, BudgetSingleView){
    var BudgetListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'media-list',

        initialize: function() {
            this.collection.on('add remove update', this.render, this);
        },

        render: function() {
            var self = this;

            this.$el.html('');
            if (this.collection.length == 0) {
                self.$el.append('loading...');
            }

            this.collection.forEach(function(budget) {
                var budgetSingleView = new BudgetSingleView({model: budget});
                budgetSingleView.render();
                self.$el.append(budgetSingleView.$el);
            });
        }
    });
    return BudgetListView;
});