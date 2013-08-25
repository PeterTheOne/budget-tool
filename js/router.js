window.budgetTool = new (Backbone.Router.extend({

    routes: {
        '': 'index'
    },

    start: function() {
        Backbone.history.start();
    },

    index: function() {
        var $el = $('.container');

        var settings = new Settings();

        var categories = new CategoryList();
        var category = new Category({name: 'defaultCategory'});
        categories.add(category);

        var events = new EventList();
        var event = new Event();
        events.add(event);

        var lineGraph = new LineGraph();

        lineGraph.calculateValues(settings, events);

        settings.on('change', function() {
            lineGraph.calculateValues(settings, events);
        });
        events.on('change add remove', function() {
            lineGraph.calculateValues(settings, events);
        });

        var lineGraphView = new LineGraphView({model: lineGraph});
        lineGraphView.render();
        $el.append(lineGraphView.el);

        var settingsView = new SettingsView({model: settings});
        settingsView.render();
        $el.append(settingsView.el);

        var categoryListView = new CategoryListView({collection: categories});
        categoryListView.render();
        $el.append(categoryListView.el);

        var eventListView = new EventListView({collection: events});
        eventListView.render();
        $el.append(eventListView.el);
    }
}));
