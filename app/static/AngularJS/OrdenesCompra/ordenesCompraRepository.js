var layoutURL = global_settings.urlCORS + 'api/ordenCompra/';


registrationModule.factory('ordenCompraRepository', function($http) {
    return {
        getEmpresas: function(idUsuario) {
            return $http({
                url: layoutURL + 'empresaByUser/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
