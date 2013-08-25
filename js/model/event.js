window.Event = Backbone.Model.extend({

    defaults: {
        amount: 0,
        date: moment().startOf('day').valueOf(),
        repeatDay: 0,
        repeatMonth: 0,
        repeatYear: 0,
        comment: '',
        categories: undefined
    },

    initialize: function() {

    }

});
