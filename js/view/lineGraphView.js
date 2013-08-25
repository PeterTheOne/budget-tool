window.LineGraphView = Backbone.View.extend({
    plot: null,

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    render: function() {
        var values = this.model.get('values');

        this.plot = $.plot("#placeholder", [values], {
            series: {
                stack: true,
                lines: {
                    show: true,
                    fill: true,
                    steps: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                mode: "time",
                timezone: "browser",
                timeformat: "%d.%m.%Y",
                min: this.model.get('displayStartDate'),
                max: this.model.get('displayEndDate'),
                minTickSize: [1, "day"]
            }
        });

    }

});
