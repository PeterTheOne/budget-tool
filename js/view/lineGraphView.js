window.LineGraphView = Backbone.View.extend({

    plot: null,

    initialize: function() {
        this.model.on('change', this.updateValues, this);
    },

    updateValues: function() {
        var values = this.model.get('values');

        this.plot.setData([values]);
        this.plot.setupGrid();
        this.plot.draw();
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
                }
            },
            xaxis: {
                mode: "time",
                minTickSize: [1, "day"]
            }
        });

    }

});
