registrationModule.controller('ordenCompraController', function ($scope, $rootScope, $location, $timeout, alertFactory, ordenCompraRepository, filterFactory, userFactory) {
    $scope.init = function () {
        $scope.Usuario = userFactory.getUserData();
        $scope.getProcesos();
        $scope.getEmpresas();
        $scope.getDivisiones();
        //$('#datepicker').datepicker();
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
});
