define([
    'underscore',
    'backbone',
    'view/budget/single'
], function(_, Backbone, BudgetView){
    var BudgetSingleView = Backbone.View.extend({
        tagName: 'li',

        initialize: function() {

        },

        render: function() {
            this.$el.html('budget single view');


        }
    });
    return BudgetSingleView;
});