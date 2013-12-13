define([
    'backbone',
    'model/budget'
], function(Backbone, Budget){
    var BudgetList = Backbone.Collection.extend({
        model: Budget,

        url: 'api/index.php/budget/'
    });
    return BudgetList;
});