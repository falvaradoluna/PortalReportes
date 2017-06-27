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

ordenCompra.prototype.get_ordenCompra = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idusuariosolicitante', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idProceso', value: req.query.idProceso, type: self.model.types.INT },
        { name: 'idempresa', value: req.query.idempresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT },
        { name: 'iddepartamento', value: req.query.iddepartamento, type: self.model.types.INT },
        { name: 'iddivision', value: req.query.iddivision, type: self.model.types.INT },
        { name: 'fechaini', value: req.query.fechaini, type: self.model.types.STRING },
        { name: 'fechafin', value: req.query.fechafin, type: self.model.types.STRING }
    ];
    console.log(params);
    self.model.query('SEL_DASHBOARD_ENCABEZADO_ORDENES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

ordenCompra.prototype.get_detalleOrden = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idusuariosolicitante', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idProceso', value: req.query.idProceso, type: self.model.types.INT },
        { name: 'idempresa', value: req.query.idempresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT },
        { name: 'iddepartamento', value: req.query.iddepartamento, type: self.model.types.INT },
        { name: 'iddivision', value: req.query.iddivision, type: self.model.types.INT },
        { name: 'fechaini', value: req.query.fechaini, type: self.model.types.STRING },
        { name: 'fechafin', value: req.query.fechafin, type: self.model.types.STRING }
    ];
    console.log(params);
    self.model.query('SEL_DASHBOARD_ORDENES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}



module.exports = ordenCompra;
