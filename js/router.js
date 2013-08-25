window.budgetTool = new (Backbone.Router.extend({

    routes: {
        '': 'index'
    },

    start: function() {
        Backbone.history.start();
    },

    index: function() {
        var $el = $('.container');

        // init models and collections
        var settings = new Settings();

        var categories = new CategoryList();
        var events = new EventList();
        events.categories = categories;

        var lineGraph = new LineGraph();
        lineGraph.set({
            settings: settings,
            events: events
        });

        // add models to collections
        var category = new Category({name: 'defaultCategory'});
        categories.add(category);
        var event = new Event();
        event.set({
            categories: categories
        });
        events.add(event);

        // render views
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
