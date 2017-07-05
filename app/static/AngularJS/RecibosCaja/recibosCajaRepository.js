

registrationModule.factory('recibosCajaRepository', function ($http) {
    return {
        pdfReciboCaja: function (tipo,folio,nodo) {
            return $http({
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
