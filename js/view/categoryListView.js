window.CategoryListView = Backbone.View.extend({
    className: 'categoryListView',

    templateHead: _.template('<h2>Categories</h2>'),

    templateTableHead: _.template('<tr><th>name</th><th></th></tr>'),

    templateButton: _.template('<a class="addButton btn btn-large btn-primary" href="">Add Category</a>'),

    initialize: function() {
        this.collection.on('add remove', this.render, this);
    },

    render: function() {
        var self = this;

        this.$el.html(this.templateHead());

        var table = $('<table></table>');
        var count = 0;
        this.collection.forEach(function(category) {
            if (count % 5 == 0) {
                table.append(self.templateTableHead());
            }
            count++;

            var categoryView = new CategoryView({model: category});
            categoryView.render();
            table.append(categoryView.el);
        });
        this.$el.append(table);

        this.$el.append(this.templateButton());

        this.$el.find('.addButton').on('click', function(e) {
            e.preventDefault();
            self.collection.addEvent();
        });
    }
});