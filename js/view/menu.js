define([
    'backbone',
    'underscore',
    'text!template/menu.html',
    'view/menuLogin'
], function(Backbone, _, menuTemplate, MenuLogin) {
    var MenuView = Backbone.View.extend({
        initialize: function() {

        },

        render: function() {
            var menu = this.$el.html(_.template(menuTemplate));

            var menuLogin = new MenuLogin();
            menuLogin.render();
            menu.find('.navbar-collapse').append(menuLogin.el);
        }
    });

    return MenuView;
});