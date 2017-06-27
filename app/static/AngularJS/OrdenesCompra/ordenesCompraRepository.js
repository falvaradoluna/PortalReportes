var layoutURL = global_settings.urlCORS + 'api/ordenCompra/';


registrationModule.factory('ordenCompraRepository', function ($http) {
    return {
        buscaOrdenes: function (idUsuario, idProceso, idempresa, idSucursal, iddepartamento, iddivision, fechaini, fechafin) {
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
        detalleOrden: function (idUsuario, idProceso, idempresa, idSucursal, iddepartamento, iddivision, fechaini, fechafin) {
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
        },
        detalleOrdenes: function (idUsuario, idProceso, idempresa, idSucursal, iddepartamento, iddivision, fechaini, fechafin, idNodo) {
            return $http({
                url: layoutURL + 'detalleOrdenes/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idProceso: idProceso,
                    idempresa: idempresa,
                    idSucursal: idSucursal,
                    iddepartamento: iddepartamento,
                    iddivision: iddivision,
                    fechaini: fechaini,
                    fechafin: fechafin,
                    idNodo: idNodo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        detalleOrdenEstatus: function (idUsuario, idProceso, idempresa, idSucursal, iddepartamento, iddivision, fechaini, fechafin) {
            return $http({
                url: layoutURL + 'detalleOrdenEstatus/',
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
        detalleOrdenesEstatus: function (idUsuario, idProceso, idempresa, idSucursal, iddepartamento, iddivision, fechaini, fechafin, idEstatus) {
            return $http({
                url: layoutURL + 'detalleOrdenesEstatus/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idProceso: idProceso,
                    idempresa: idempresa,
                    idSucursal: idSucursal,
                    iddepartamento: iddepartamento,
                    iddivision: iddivision,
                    fechaini: fechaini,
                    fechafin: fechafin,
                    idEstatus: idEstatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
