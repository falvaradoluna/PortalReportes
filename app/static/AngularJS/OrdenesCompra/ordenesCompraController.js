registrationModule.controller('ordenCompraController', function($scope, $rootScope, $location, $timeout, $window, alertFactory, ordenCompraRepository, filterFactory, userFactory, globalFactory) {
    $scope.proceso = null;
    $scope.fechaInicio = null;
    $scope.fechaFin = null;
    $scope.nodo = true;
    $scope.muestraMensaje = 0;
    $scope.mostrarDetalleGeneral = false;
    $scope.sucursalGeneral = 0;
    $scope.mostrarFitroSucursal = false;
    $scope.init = function() {
        $scope.Usuario = userFactory.getUserData();
        $scope.getProcesos();
        $scope.getEmpresas();
        $scope.getDivisiones();
    };
    $scope.getProcesos = function() {
        filterFactory.getProcesos().then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data)
                $scope.procesos = result.data;
                filterFactory.styleFiltros();
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
    $scope.getDepartamento = function() {
        filterFactory.getDepartamento($scope.Usuario.idUsuario, $scope.empresa, $scope.sucursal).then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy los departamentos ')
                $scope.departamentos = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.getDivisiones = function() {
        filterFactory.getDivisiones($scope.Usuario.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data, 'Soy las divisiones ')
                $scope.divisiones = result.data;
                filterFactory.styleFiltros();
            } else {
                alertFactory.success('No se encontraron empresas');
            }

        });
    };
    $scope.buscaOrdenes = function() {
        $scope.todoDetalle = [];
        $scope.mostrarDetalleGeneral = false;
        $('#loading').modal('show');
        ($scope.empresa == undefined || $scope.empresa == '') ? $scope.empresa = 0: $scope.empresa = $scope.empresa;
        ($scope.sucursal == undefined || $scope.sucursal == '') ? $scope.sucursal = 0: $scope.sucursal = $scope.sucursal;
        ($scope.departamento == undefined || $scope.departamento == '') ? $scope.departamento = 0: $scope.departamento = $scope.departamento;
        ($scope.division == undefined || $scope.division == '') ? $scope.division = 0: $scope.division = $scope.division;
        ordenCompraRepository.buscaOrdenes($scope.Usuario.idUsuario, $scope.proceso, $scope.empresa, $scope.sucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin).then(function(result) {
            $scope.encabezadoOrdenes = result.data;
            angular.forEach($scope.encabezadoOrdenes, function(value, key) {
                if ($scope.nodo == true) {
                    ordenCompraRepository.detalleOrden($scope.Usuario.idUsuario, $scope.proceso, value.idEmpresa, value.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin).then(function(result) {
                        $scope.detalle = result.data;
                        $scope.todoDetalle.push($scope.detalle);
                        console.log($scope.detalle, 'Soy el detalle jejeje')
                        //BEGIN GRAFICA PASTEL
                        var doughnutData = result.data;
                        var doughnutOptions = {
                            segmentShowStroke: true,
                            segmentStrokeColor: "#fff",
                            segmentStrokeWidth: 2,
                            percentageInnerCutout: 0, // This is 0 for Pie charts
                            animationSteps: 100,
                            animationEasing: "easeOutBounce",
                            animateRotate: true,
                            animateScale: false,
                            responsive: true
                        };
                        var canvas = document.getElementById(value.nomSucursal);
                        var ctx = canvas.getContext("2d");
                        var myNewChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);
                        document.getElementById(value.nomSucursal).onclick = function(evt) {
                            $scope.mostrarFitroSucursal = false;
                            var sucursalnombre = $(this).attr("id");
                            var activePoints = myNewChart.getSegmentsAtEvent(evt);
                            angular.forEach($scope.todoDetalle, function(value, key) {
                                $scope.detalleSucursal = value;
                                angular.forEach($scope.detalleSucursal, function(value, key) {
                                    if (value.label == activePoints[0].label && value.sucNombre == sucursalnombre) {
                                        $('#loading').modal('show');
                                        ordenCompraRepository.detalleOrdenes($scope.Usuario.idUsuario, $scope.proceso, value.idEmpresa, value.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin, value.idNodo).then(function(result) {
                                            console.log(result.data, 'Soy lo que ira a la modal :P')
                                            $scope.ordenes = result.data;
                                            $('#loading').modal('hide');
                                            $('#ordenes').modal('show');
                                            globalFactory.filtrosTablaSelect("ordenesCompra", "Ordenes de Compra", 5);
                                        });
                                    }
                                });
                            });
                        };
                        //END GRAFICA PASTEL
                        // var donut = new Morris.Donut({
                        //     element: value.nomSucursal + '-morris-donut',
                        //     data: $scope.detalle,
                        //     resize: true
                        // }).on('click', function(i, row) {
                        //     $('#loading').modal('show');
                        //     ordenCompraRepository.detalleOrdenes($scope.Usuario.idUsuario, $scope.proceso, row.idEmpresa, row.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin, row.idNodo).then(function(result) {
                        //         console.log(result.data, 'Soy lo que ira a la modal :P')
                        //         $scope.ordenes = result.data;
                        //         $('#loading').modal('hide');
                        //         $('#ordenes').modal('show');
                        //         globalFactory.filtrosTablaSelect("ordenesCompra", "Ordenes de Compra", 5);
                        //     });
                        // });
                        // for (i = 0; i < donut.segments.length; i++) {
                        //     donut.segments[i].handlers['hover'].push(function(i) {
                        //         $scope.muestraMensaje = donut.data[i].idSucursal;
                        //         $('#morrisdetails-item .morris-hover-row-label').text(donut.data[i].nombreNodo);
                        //         $('#morrisdetails-item .morris-hover-point').text(donut.data[i].value);
                        //         $scope.$apply();
                        //     });
                        // }
                        $('#loading').modal('hide');
                    });
                } else if ($scope.nodo == false) {
                    $scope.todoDetalle = [];
                    ordenCompraRepository.detalleOrdenEstatus($scope.Usuario.idUsuario, $scope.proceso, value.idEmpresa, value.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin).then(function(result) {
                        $scope.detalleEstatus = result.data;
                        $scope.todoDetalle.push($scope.detalleEstatus);
                        console.log($scope.detalleEstatus, 'Soy el detalle con el estatus jejeje')
                        //BEGIN GRAFICA PASTEL
                        var doughnutData = result.data;
                        var doughnutOptions = {
                            segmentShowStroke: true,
                            segmentStrokeColor: "#fff",
                            segmentStrokeWidth: 2,
                            percentageInnerCutout: 0, // This is 0 for Pie charts
                            animationSteps: 100,
                            animationEasing: "easeOutBounce",
                            animateRotate: true,
                            animateScale: false,
                            responsive: true
                        };
                        var canvas = document.getElementById(value.nomSucursal + '1');
                        var ctx = canvas.getContext("2d");
                        var myNewChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);
                        document.getElementById(value.nomSucursal + '1').onclick = function(evt) {
                            $scope.mostrarFitroSucursal = false;
                            var nombreid = $(this).attr("id");
                            var sucursalnombreArray = nombreid.split('1');
                            var sucursalnombre = sucursalnombreArray[0];
                            var activePoints = myNewChart.getSegmentsAtEvent(evt);
                            angular.forEach($scope.todoDetalle, function(value, key) {
                                $scope.detalleSucursal = value;
                                angular.forEach($scope.detalleSucursal, function(value, key) {
                                    if (value.label == activePoints[0].label && value.sucNombre == sucursalnombre) {
                                        $('#loading').modal('show');
                                        ordenCompraRepository.detalleOrdenesEstatus($scope.Usuario.idUsuario, $scope.proceso, value.idEmpresa, value.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin, value.idEstatus).then(function(result) {
                                            console.log(result.data, 'Soy lo que ira a la modal :P')
                                            $scope.ordenes = result.data;
                                            $('#loading').modal('hide');
                                            $('#ordenes').modal('show');
                                            globalFactory.filtrosTablaSelect("ordenesCompra", "Ordenes de Compra", 5);
                                        });
                                    }
                                });
                            });
                        };
                        //END GRAFICA PASTEL
                        // Morris.Donut({
                        //     element: value.nomSucursal + '2-morris-donut',
                        //     data: $scope.detalleEstatus,
                        //     resize: true
                        // }).on('click', function(i, row) {
                        //     $('#loading').modal('show');
                        //     ordenCompraRepository.detalleOrdenesEstatus($scope.Usuario.idUsuario, $scope.proceso, row.idEmpresa, row.idSucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin, row.idEstatus).then(function(result) {
                        //         console.log(result.data, 'Soy lo que ira a la modal :P')
                        //         $scope.ordenes = result.data;
                        //         $('#loading').modal('hide');
                        //         $('#ordenes').modal('show');
                        //         globalFactory.filtrosTablaSelect("ordenesCompra", "Ordenes de Compra", 5);
                        //     });
                        // });
                        $('#loading').modal('hide');
                    });
                }
            });
            console.log($scope.encabezadoOrdenes, 'Soy lo que ira en el dashboard');

        });
        //
        if ($scope.sucursal == 0) {
            $scope.buscarOrdenesGenerales();
        }


    };
    //Obtiene la información para el dashboard General 
    $scope.buscarOrdenesGenerales = function() {
        $('#doughnutChart').remove();
        $('#idDetalleGeneral').append('<canvas id="doughnutChart" height="70"><canvas>');
        $scope.mostrarDetalleGeneral = true;
        ordenCompraRepository.buscarOrdenesGenerales($scope.Usuario.idUsuario, $scope.proceso, $scope.empresa, $scope.sucursal, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin).then(function(result) {
            console.log(result.data, 'Soy la info del general ')
            $scope.OrdenesGenerales = result.data;
            //BEGIN GRAFICA PASTEL
            var doughnutData = result.data;
            var doughnutOptions = {
                segmentShowStroke: true,
                segmentStrokeColor: "#fff",
                segmentStrokeWidth: 2,
                percentageInnerCutout: 0, // This is 0 for Pie charts
                animationSteps: 100,
                animationEasing: "easeOutBounce",
                animateRotate: true,
                animateScale: false,
                responsive: true
            };
            var canvas = document.getElementById("doughnutChart");
            var ctx = canvas.getContext("2d");
            var myNewChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);
            document.getElementById("doughnutChart").onclick = function(evt) {
                $scope.mostrarFitroSucursal = false;
                var activePoints = myNewChart.getSegmentsAtEvent(evt);
                angular.forEach($scope.OrdenesGenerales, function(value, key) {
                    if (value.label == activePoints[0].label) {
                        $scope.sucursalGeneral = value.idSucursal;
                        $scope.detalleGeneral();
                    }
                });
            };
            //END GRAFICA PASTEL
        });
    };
    $scope.detalleGeneral = function() {
        if ($scope.sucursalGeneral == 0) { $scope.mostrarFitroSucursal = true; }
        $('#loading').modal('show');
        ordenCompraRepository.detalleGeneral($scope.Usuario.idUsuario, $scope.proceso, $scope.empresa, $scope.sucursalGeneral, $scope.departamento, $scope.division, $scope.fechaInicio, $scope.fechaFin).then(function(result) {
            console.log(result, 'Soy el super detalle general')
            $scope.ordenes = result.data;
            $('#loading').modal('hide');
            $('#ordenes').modal('show');
            globalFactory.filtrosTablaSelect("ordenesCompra", "Ordenes de Compra", 5);
        });
    };
    $scope.irDigitalizacion = function() {
        //
        $window.open('http://192.168.20.9:3200/?id=' + $scope.ordenCompra.Folio_Operacion + '&employee=' + $scope.Usuario.idUsuario + '&perfil=1&proceso=' + $scope.proceso);
        //location.href = 'http://192.168.20.9:3200/?id=' + $scope.ordenCompra.Folio_Operacion + '&employee=' + $scope.Usuario.idUsuario + '&perfil=1&proceso=' + $scope.proceso;
    };
    $scope.getDetalleOrden = function(orden) {
        if ($scope.proceso == 1) {
            $scope.ordenCompra = orden;
            console.log($scope.ordenCompra,'Soy el detalle de la orden de compra')
            $('#loading').modal('show');
            $('#ordenes').modal('hide');
            ordenCompraRepository.getDetalleOrden(orden).then(function(result) {
                console.log(result.data, 'Soy los documentos');
                $scope.documentos = result.data;
                $('#loading').modal('hide');
                $('#documentos').modal('show');
            });
        }
    };
    $scope.regresarOrdenes = function() {
        $('#documentos').modal('hide');
        $('#ordenes').modal('show');
    };
});