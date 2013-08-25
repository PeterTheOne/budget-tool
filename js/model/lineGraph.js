window.LineGraph = Backbone.Model.extend({

    defaults: {
        displayStartDate: 0,
        displayEndDate: 0,
        settings: undefined,
        events: undefined
    },

    initialize: function() {
        var self = this;
        this.on('change:settings', function() {
            var settings = this.get('settings');

            settings.on('change', function() {
                self.calculateValues();
            });
        }, this);
        this.on('change:events', function() {
            var events = this.get('events');

            events.on('change add remove', function() {
                self.calculateValues();
            });
        }, this);
    },

    calculateValues: function() {
        var settings = this.get('settings');
        var events = this.get('events');

        var displayStartDate = moment(settings.get('displayStartDate'));
        var displayEndDate = moment(settings.get('displayEndDate'));

        this.set('displayStartDate', displayStartDate.valueOf());
        this.set('displayEndDate', displayEndDate.valueOf());

        var eventValues = {};
        var earliestEventData = displayEndDate;
        events.forEach(function(event) {
            var currentEventDate = moment(event.get('date'));
            if (earliestEventData.diff(currentEventDate) > 0) {
                earliestEventData = currentEventDate;
            }
            do {
                if (eventValues.hasOwnProperty(currentEventDate.valueOf())) {
                    eventValues[currentEventDate.valueOf()] += event.get('amount');
                } else {
                    eventValues[currentEventDate.valueOf()] = event.get('amount');
                }

                var repeatDay = event.get('repeatDay');
                var repeatMonth = event.get('repeatMonth');
                var repeatYear = event.get('repeatYear');
                if (repeatDay == 0 && repeatMonth == 0 && repeatYear == 0) {
                    break;
                }
                currentEventDate.add('days', repeatDay).add('months', repeatMonth).add('years', repeatYear);
            } while (currentEventDate.diff(displayEndDate) <= 0);
        });

        var values = [];

        for (var currentDate = earliestEventData, currentValue = 0; currentDate.diff(displayEndDate) <= 0; currentDate.add('days', 1)) {
            if (eventValues.hasOwnProperty(currentDate.valueOf())) {
                currentValue += eventValues[currentDate.valueOf()];
            }
            values.push([currentDate.valueOf(), currentValue]);
        }

        this.set('values', values);

        this.trigger('change');
    }


});