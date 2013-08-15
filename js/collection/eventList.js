window.EventList = Backbone.Collection.extend({
    model: Event,

    initialize: function() {

    },

    addEvent: function() {
        var event = new Event();
        this.add(event);
    }

});
