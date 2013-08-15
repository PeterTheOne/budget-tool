window.Settings = Backbone.Model.extend({

    defaults: function() {
        return {
            displayStartDate: moment().startOf('day').valueOf(),
            displayEndDate: moment().startOf('day').add('days', 10).valueOf()
        };
    },

    initialize: function() {

    }
});