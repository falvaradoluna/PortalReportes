var layoutURL = global_settings.urlCORS + 'api/ordenCompra/';


registrationModule.factory('ordenCompraRepository', function($http) {
    return {
        getProcesos: function() {
            return $http({
                url: layoutURL + 'procesos/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
