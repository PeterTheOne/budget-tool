window.CategoryList = Backbone.Collection.extend({
    model: Category,

    initialize: function() {

    },

    addEvent: function() {
        var category = new Category();
        this.add(category);
    }

});
