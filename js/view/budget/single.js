define([
    'underscore',
    'backbone',
    'text!template/budgetListSingle.html',
], function(_, Backbone, budgetListSingleTemplate){
    var BudgetSingleView = Backbone.View.extend({
        tagName: 'li',
        className: 'media',

        initialize: function() {

        },

        render: function() {
            var single = this.$el.html(_.template(budgetListSingleTemplate, this.model.toJSON()));


        }
    });
    return BudgetSingleView;
});