define([
    'backbone'
], function(Backbone){
    var Budget = Backbone.Model.extend({
        urlRoot: function() {
            if (this.get('username')) {
                return 'api/index.php/budget/' + this.get('username') + '/' + this.get('name');
            }
            return 'api/index.php/budget/';
        }
    });
    return Budget;
});