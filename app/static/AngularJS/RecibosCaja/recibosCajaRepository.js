var reciboCajaURL = global_settings.urlCORS + 'api/recibosCaja/';


registrationModule.factory('recibosCajaRepository', function ($http) {
    return {
        pdfReciboCaja: function (tipo,folio,nodo) {
            return $http({
                url: reciboCajaURL + 'pdfReciboCaja/',
                method: "GET",
                params: {
                    tipo: tipo,
                    folio: folio,
                    nodo: nodo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
