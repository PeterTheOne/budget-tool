window.EventView = Backbone.View.extend({
    tagName: 'tr',
    className: 'eventView',

    template: _.template(
        '<form>' +
            '<td><input class="amount" name="amount" type="number" value="<%=amount%>"></td>' +
            '<td><input class="date typeDate" name="date" type="text" value="<%=moment(date).format(\'DD.MM.YYYY\')%>"></td>' +
            '<td><input class="repeatDay" name="repeatDay" type="number" value="<%=repeatDay%>"></td>' +
            '<td><input class="repeatMonth" name="repeatMonth" type="number" value="<%=repeatMonth%>"></td>' +
            '<td><input class="repeatYear" name="repeatYear" type="number" value="<%=repeatYear%>"></td>' +
            '<td><input class="comment" name="comment" type="text" value="<%=comment%>"></td>' +
            '<td><a class="removeButton fui-cross btn btn-danger" href=""></a></td>' +
        '</form>'
    ),

    initialize: function() {

    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        this.$el.find('input.typeDate').datepicker({dateFormat: 'dd.mm.yy'});

        var self = this;
        this.$el.find('.amount').on('keyup change', function() {
            self.model.set('amount', parseFloat($(this).val()) || 0);
        });
        this.$el.find('.date').on('keyup change', function() {
            var dateString = $(this).val();
            var date = moment(dateString, ['DD.MM.YYYY', '"YYYY-MM-DD"']);
            self.model.set('date', date);
        });
        this.$el.find('.repeatDay').on('keyup change', function() {
            var value = parseInt($(this).val()) || 0;
            value = value < 0 ? 0 : value;
            self.model.set('repeatDay', value);
        });
        this.$el.find('.repeatMonth').on('keyup change', function() {
            var value = parseInt($(this).val()) || 0;
            value = value < 0 ? 0 : value;
            self.model.set('repeatMonth', value);
        });
        this.$el.find('.repeatYear').on('keyup change', function() {
            var value = parseInt($(this).val()) || 0;
            value = value < 0 ? 0 : value;
            self.model.set('repeatYear', value);
        });
        this.$el.find('.comment').on('keyup change', function() {
            self.model.set('comment', $(this).val());
        });
        this.$el.find('.removeButton').on('click', function(e) {
            e.preventDefault();
            self.model.destroy();
        });
    }
});