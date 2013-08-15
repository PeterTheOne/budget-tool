window.SettingsView = Backbone.View.extend({
    className: 'settingsView clearfix',

    template: _.template(
        '<h2>Settings</h2>' +
        '<form>' +
            '<table>' +
                '<tr>' +
                    '<th>displayStartDate</th>' +
                    '<th>displayEndDate</th>' +
                '</tr>' +
                '<tr>' +
                    '<td><input class="displayStartDate" name="displayStartDate" type="date" value="<%=moment(displayStartDate).format(\'DD.MM.YYYY\')%>"></td>' +
                    '<td><input class="displayEndDate" name="displayEndDate" type="date" value="<%=moment(displayEndDate).format(\'DD.MM.YYYY\')%>"></td>' +
                '</tr>' +
            '</table>' +
        '</form>'
    ),

    initialize: function() {

    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        this.$el.find('input[type=date]').datepicker({dateFormat: 'dd.mm.yy'});

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