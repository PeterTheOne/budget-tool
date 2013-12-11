define([
    'backbone',
    'underscore',
    'text!template/menuLogin.html',
    'model/session'
], function(Backbone, _, menuLoginTemplate, session) {
    var MenuLoginView = Backbone.View.extend({
        initialize: function() {
            session.on('change destroy reset', this.render, this);
        },

        render: function() {
            var menuLogin = this.$el.html(_.template(menuLoginTemplate, {
                session: session
            }));

            if (session.get('username') == null) {
                // logged out: login
                menuLogin.find('button.submit').on('click', function(event) {
                    event.preventDefault();

                    var username = menuLogin.find('#username').val();
                    var plainPassword = menuLogin.find('#password').val();
                    var remember = menuLogin.find('#remember:checked').length > 0;

                    // todo: validate, are all fields empty?


                    // this hash is not secure because of the lack of a salt value,
                    // but at least the password will never be readable in plaintext
                    var passwordBitArray = sjcl.hash.sha256.hash(plainPassword);
                    var password = sjcl.codec.hex.fromBits(passwordBitArray);

                    session.save({
                        username: username,
                        password: password,
                        remember: remember
                    }, {wait: true});
                });
            } else {
                // logged in: logout
                menuLogin.find('.logout').on('click', function(event) {
                    event.preventDefault();

                    session.destroy({
                        wait: true
                    });
                });
            }

        }
    });

    return MenuLoginView;
});