define([
    'backbone',
    'underscore',
    'text!template/menu.html',
    'view/menuLogin'
], function(Backbone, _, menuTemplate, MenuLogin) {
    var MenuView = Backbone.View.extend({
        el: $('header'),

        initialize: function() {

        },

        render: function() {
            var menu = this.$el.html(_.template(menuTemplate));

            var self = this;

            // todo: abstract this more to work with all menu links
            menu.find('a.navbar-brand').on('click', function(event) {
                event.preventDefault();

                self.navigate('/');
            });

            var menuLogin = new MenuLogin();
            menuLogin.render();
            menu.find('.navbar-collapse').append(menuLogin.el);
        }
    });

    return MenuView;
});