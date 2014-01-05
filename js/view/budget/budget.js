define([
    'backbone',
    'underscore'
], function(Backbone, _) {
    var BudgetView = Backbone.View.extend({
        el: $('.content'),

        initialize: function() {

        },

        render: function() {
            /*var header = this.$el.html(_.template(userHomeHeaderTemplate, {
                username: session.get('username')
            }));*/

            this.$el.html('test');
        }
    });

    return BudgetView;
});