window.EventList = Backbone.Collection.extend({
    model: Event,

    categories: undefined,

    addEvent: function() {
        var event = new Event();
        event.set({
            categories: this.categories
        });
        this.add(event);
    }

});
