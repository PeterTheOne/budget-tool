window.EventListView = Backbone.View.extend({
    className: 'eventListView',

    templateHead: _.template('<h2>Events</h2>'),

    templateTableHead: _.template('<tr><th>amount</th><th>date</th><th>repeat day</th><th>repeat month</th><th>repeat year</th><th>comment</th><th></th></tr>'),

    templateButton: _.template('<a class="addButton btn btn-large btn-primary" href="">Add Event</a>'),

    initialize: function() {
        this.collection.on('add remove', this.render, this);
    },

    render: function() {
        var self = this;

        this.$el.html(this.templateHead());

        var table = $('<table></table>');
        var count = 0;
        this.collection.forEach(function(event) {
            if (count % 5 == 0) {
                table.append(self.templateTableHead());
            }
            count++;

            var eventView = new EventView({model: event});
            eventView.render();
            table.append(eventView.el);
        });
        this.$el.append(table);

        this.$el.append(this.templateButton());

        this.$el.find('.addButton').on('click', function(e) {
            e.preventDefault();
            self.collection.addEvent();
        });
    }
});