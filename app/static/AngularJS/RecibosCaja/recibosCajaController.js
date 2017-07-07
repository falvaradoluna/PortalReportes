registrationModule.controller('recibosCajaController', function($scope, $rootScope, $location, $timeout, alertFactory, recibosCajaRepository, filterFactory, userFactory, globalFactory, utils) {

    $scope.init = function() {
        $scope.tipoBusqueda(0);
        $scope.Usuario = userFactory.getUserData();
        $scope.getEmpresas();
    };
    $scope.tipoBusqueda = function(tipo) {
        $scope.identificaBusqueda = tipo;
        switch (tipo) {
            case 0:
                $scope.nombreBusqueda = 'Búsqueda por...'
                break;
            case 1:
                $scope.nombreBusqueda = 'Número de Factura'
                break;
            case 2:
                $scope.nombreBusqueda = 'Número de Recibo'
                break;
        }
    };
    $scope.getEmpresas = function() {
        filterFactory.getEmpresas($scope.Usuario.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las empresas ')
                $scope.empresas = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.getSucursales = function() {
        filterFactory.getSucursales($scope.Usuario.idUsuario, $scope.empresa).then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las sucursales ')
                $scope.agencias = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.buscaRecibos = function() {
        $('#loading').modal('show');
        var folioEmpresaSucursal = ''
        var arregloBytes = [];
        $scope.pdf = [];
        $scope.contador = 1;
        if ($scope.identificaBusqueda == 1) {
            folioEmpresaSucursal = $scope.folio + '/' + $scope.empresa + '/' + $scope.sucursal;
            console.log('Entre a busqueda por numero de factura', $scope.folio + '/' + $scope.empresa + '/' + $scope.sucursal);
            recibosCajaRepository.pdfReciboCaja('REC', folioEmpresaSucursal, 0).then(function(result) {
                console.log(result);
                arregloBytes = result.data.arrayBits.base64Binary;
                console.log(arregloBytes, 'Solo los arreglos');



                angular.forEach(arregloBytes, function(value, key) {
                    var consecutivo = key + 1;
                    $scope.pdf.push({
                        urlPdf: URL.createObjectURL(utils.b64toBlob(value, "application/pdf")),
                        id: key + 1
                    });
                    //$scope.pdf[key] = URL.createObjectURL(utils.b64toBlob(value, "application/pdf"));
                    // $('#reciboCaja').modal('show');

                });
                setTimeout(function() {
                    angular.forEach($scope.pdf, function(value, key) {
                        var consecutivo = key + 1;
                        $("<object class='filesInvoce' data='" + $scope.pdf[key].urlPdf + "' width='100%' height='500px' >").appendTo('#pdfRecibo' + consecutivo);
                    });
                }, 100);
                $('#loading').modal('hide');


                console.log($scope.pdf, 'Soy el arreglo ')

            });
        } else if ($scope.identificaBusqueda == 2) {
            folioEmpresaSucursal = $scope.folio + '|' + $scope.empresa + '|' + $scope.sucursal;
            console.log('Entre a busqueda por numero de recibo', $scope.folio + '|' + $scope.empresa + '|' + $scope.sucursal);
            recibosCajaRepository.pdfReciboCaja('REC', folioEmpresaSucursal, 0).then(function(result) {
                console.log(result);
                arregloBytes = result.data.arrayBits.base64Binary;
                console.log(arregloBytes, 'Solo los arreglos');



                angular.forEach(arregloBytes, function(value, key) {
                    var consecutivo = key + 1;
                    $scope.pdf.push({
                        urlPdf: URL.createObjectURL(utils.b64toBlob(value, "application/pdf")),
                        id: key + 1
                    });
                    //$scope.pdf[key] = URL.createObjectURL(utils.b64toBlob(value, "application/pdf"));
                    // $('#reciboCaja').modal('show');

                });
                setTimeout(function() {
                    angular.forEach($scope.pdf, function(value, key) {
                        var consecutivo = key + 1;
                        $("<object class='filesInvoce' data='" + $scope.pdf[key].urlPdf + "' width='100%' height='500px' >").appendTo('#pdfRecibo' + consecutivo);
                    });
                }, 100);


                $('#loading').modal('hide');
                console.log($scope.pdf, 'Soy el arreglo ')

            });
        } else {
            $('#loading').modal('hide');
            alertFactory.error('Ocurrio un problema')
        }
    };
    $scope.muestraFactura = function(id) {

        $scope.muestraContenido = id;
    }
});
