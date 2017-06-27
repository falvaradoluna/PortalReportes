registrationModule.controller('ordenCompraController', function ($scope, $rootScope, $location, $timeout, alertFactory, ordenCompraRepository, filterFactory, userFactory) {
    $scope.proceso = null;
    $scope.empresa = 0;
    $scope.sucursal = 0;
    $scope.departamento = 0;
    $scope.division = 0;
    $scope.fechaInicio = null;
    $scope.fechaFin = null;
    $scope.init = function () {
        $scope.Usuario = userFactory.getUserData();
        $scope.getProcesos();
        $scope.getEmpresas();
        $scope.getDivisiones();
    };
    $scope.getProcesos = function () {
        filterFactory.getProcesos().then(function (result) {
            if (result.data.length > 0) {
                console.log(result.data)
                $scope.procesos = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron procesos');
            };
        });
    };
    $scope.getEmpresas = function () {
        filterFactory.getEmpresas($scope.Usuario.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las empresas ')
                $scope.empresas = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.getSucursales = function () {
        filterFactory.getSucursales($scope.Usuario.idUsuario, $scope.empresa).then(function (result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las sucursales ')
                $scope.agencias = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.getDepartamento = function () {
        filterFactory.getDepartamento($scope.Usuario.idUsuario, $scope.empresa, $scope.sucursal).then(function (result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy los departamentos ')
                $scope.departamentos = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.getDivisiones = function () {
        filterFactory.getDivisiones($scope.Usuario.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las divisiones ')
                $scope.divisiones = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.buscaOrdenes = function () {
        ordenCompraRepository.buscaOrdenes($scope.Usuario.idUsuario, $scope.proceso, $scope.empresa, $scope.sucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin).then(function (result) {
            $scope.encabezadoOrdenes = result.data;
            angular.forEach($scope.encabezadoOrdenes, function (value, key) {
                ordenCompraRepository.detalleOrden($scope.Usuario.idUsuario, $scope.proceso, value.idEmpresa, value.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin).then(function (result) {
                    $scope.detalle = result.data;
                    console.log($scope.detalle, 'Soy el detalle jejeje')
                    Morris.Donut({
                        element: value.nomSucursal + '-morris-donut',
                        data: $scope.detalle,
                        resize: true
                    }).on('click', function (i, row) {
                        ordenCompraRepository.detalleOrdenes($scope.Usuario.idUsuario, $scope.proceso, row.idEmpresa, row.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin, row.idNodo).then(function (result) {
                            console.log(result.data, 'Soy lo que ira a la modal :P')
                            $scope.ordenes = result.data;
                            $('#punteoDetalle').modal('show');
                        });

                    });
                });
            });

            console.log($scope.encabezadoOrdenes, 'Soy lo que ira en el dashboard');

            //$('#demo-morris-donut').empty();

        });
    };
});
