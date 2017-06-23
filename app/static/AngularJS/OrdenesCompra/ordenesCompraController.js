registrationModule.controller('ordenCompraController', function($scope, $rootScope, $location, alertFactory, ordenCompraRepository, filterFactory, userFactory) {
    $scope.init = function() {
        $scope.Usuario = userFactory.getUserData();
        $scope.getProcesos();
        $scope.getEmpresas();

    };
    $scope.getProcesos = function() {
        filterFactory.getProcesos().then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data)

                $scope.procesos = result.data;

            } else {
                alertFactory.success('No se encontraron procesos');
            };
        });
    };
    $scope.getEmpresas = function() {
        filterFactory.getEmpresas($scope.Usuario.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las empresas ')
                $scope.empresas = result.data;

            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.getSucursales = function(empresa) {
        filterFactory.getSucursales($scope.Usuario.idUsuario, empresa).then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las sucursales ')
                $scope.agencias = result.data;
                $('.selectpicker').selectpicker('destroy');
                setTimeout(function() {
                    $('.selectpicker').selectpicker({});
                }, 1000);

            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
});
