window.CategoryView = Backbone.View.extend({
    tagName: 'tr',
    className: 'categoryView',

    template: _.template(
        '<form>' +
            '<td><input class="name" name="name" type="text" value="<%=name%>"></td>' +
            '<td><a class="removeButton fui-cross btn btn-danger" href=""></a></td>' +
        '</form>'
    ),

    initialize: function() {

    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        var self = this;
        this.$el.find('.name').on('keyup change', function() {
            self.model.set('name', $(this).val());
        });
        this.$el.find('.removeButton').on('click', function(e) {
            e.preventDefault();
            self.model.destroy();
        });
    }
});