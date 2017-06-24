var filtrosURL = global_settings.urlCORS + 'api/filtros/';
registrationModule.factory('filterFactory', function ($http, $timeout) {
    return {
        getProcesos: function () {
            return $http({
                url: filtrosURL + 'procesos/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getEmpresas: function (idUsuario) {
            return $http({
                url: filtrosURL + 'empresas/',
                method: "GET",
                params: { idUsuario: idUsuario },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getSucursales: function (idUsuario, idEmpresa) {
            return $http({
                url: filtrosURL + 'sucursales/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDepartamento: function (idUsuario, idEmpresa, idSucursal) {
            return $http({
                url: filtrosURL + 'departamentos/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa,
                    idSucursal: idSucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDivisiones: function (idUsuario) {
            return $http({
                url: filtrosURL + 'divisiones/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        styleFiltros: function () {
            $timeout(function () {
                $('.selectpicker').selectpicker('refresh',);
            });
        }
    }
});
