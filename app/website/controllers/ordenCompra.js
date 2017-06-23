var ordenCompraView = require('../views/reference'),
    ordenCompraModel = require('../models/dataAccess')

var ordenCompra = function(conf) {
    this.conf = conf || {};

    this.view = new ordenCompraView();
    this.model = new ordenCompraModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

ordenCompra.prototype.get_procesos = function(req, res, next) {
    var self = this;

    var params = [];
    self.model.query('SEL_PROCESOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}



module.exports = ordenCompra;
