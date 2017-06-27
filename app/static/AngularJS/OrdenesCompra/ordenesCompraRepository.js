var layoutURL = global_settings.urlCORS + 'api/ordenCompra/';


registrationModule.factory('ordenCompraRepository', function($http) {
    return {
        buscaOrdenes: function(idUsuario, idProceso, idempresa, idSucursal, iddepartamento, iddivision, fechaini, fechafin) {
            return $http({
                url: layoutURL + 'ordenCompra/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idProceso: idProceso,
                    idempresa: idempresa,
                    idSucursal: idSucursal,
                    iddepartamento: iddepartamento,
                    iddivision: iddivision,
                    fechaini: fechaini,
                    fechafin: fechafin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        detalleOrden: function(idUsuario, idProceso, idempresa, idSucursal, iddepartamento, iddivision, fechaini, fechafin) {
            return $http({
                url: layoutURL + 'detalleOrden/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idProceso: idProceso,
                    idempresa: idempresa,
                    idSucursal: idSucursal,
                    iddepartamento: iddepartamento,
                    iddivision: iddivision,
                    fechaini: fechaini,
                    fechafin: fechafin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
