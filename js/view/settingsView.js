window.SettingsView = Backbone.View.extend({
    className: 'settingsView clearfix',

    template: _.template(
        '<form>' +
            '<table>' +
                '<tr>' +
                    '<th>displayStartDate</th>' +
                    '<th>displayEndDate</th>' +
                '</tr>' +
                '<tr>' +
                    '<td><input class="displayStartDate typeDate" name="displayStartDate" type="text" value="<%=moment(displayStartDate).format(\'DD.MM.YYYY\')%>"></td>' +
                    '<td><input class="displayEndDate typeDate" name="displayEndDate" type="text" value="<%=moment(displayEndDate).format(\'DD.MM.YYYY\')%>"></td>' +
                '</tr>' +
            '</table>' +
        '</form>'
    ),

    initialize: function() {

    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        this.$el.find('input.typeDate').datepicker({dateFormat: 'dd.mm.yy'});

        var self = this;
        this.$el.find('.displayStartDate').on('keyup change', function() {
            var dateString = $(this).val();
            var date = moment(dateString, ['DD.MM.YYYY', '"YYYY-MM-DD"']);
            self.model.set('displayStartDate', date);
        });
        this.$el.find('.displayEndDate').on('keyup change', function() {
            var dateString = $(this).val();
            var date = moment(dateString, ['DD.MM.YYYY', '"YYYY-MM-DD"']);
            self.model.set('displayEndDate', date);
        });
    }
});