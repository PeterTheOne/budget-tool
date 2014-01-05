define([
    'jquery',
    'underscore',
    'backbone',
    'collection/budget',
    'model/session',
    'text!template/createBudget.html',
], function($, _, Backbone, BudgetList, session, createBudgetTemplate) {
    var BudgetCreateView = Backbone.View.extend({

        initialize: function() {

        },

        render: function() {
            var form = this.$el.html(_.template(createBudgetTemplate, {
                username: session.get('username')
            }));

            var view = this;
            form.find('button').on('click', function(event) {
                event.preventDefault();

                var name = form.find('#name').val();
                var description = form.find('#description').val();
                var privateCheck = form.find('#private:checked').length > 0;

                var budgetList = new BudgetList();
                budgetList.create({
                    'userId': session.get('userId'),
                    'name': name,
                    'description': description,
                    'private': privateCheck
                }, {
                    success: function() {
                        view.navigate('#/' + session.get('username') + '/' + name);
                    }
                });
            });
        }
    });
    return BudgetCreateView;
});