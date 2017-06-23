var filtrosURL = global_settings.urlCORS + 'api/filtros/';
registrationModule.factory('filterFactory', function($http) {
    return {
        getProcesos: function() {
            return $http({
                url: filtrosURL + 'procesos/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getEmpresas: function(idUsuario) {
            return $http({
                url: filtrosURL + 'empresas/',
                method: "GET",
                params: { idUsuario: idUsuario },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getSucursales: function(idUsuario, idEmpresa) {
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
        }
    }
});
