registrationModule.directive("repeatEnd", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});
registrationModule.directive('calendar', function () {
    return {
        link: function (scope, el, attr, ngModel) {
            $.fn.datepicker.dates['es'] = {
                days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                daysShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
                daysMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                today: "Hoy",
                clear: "Clear",
                format: "mm/dd/yyyy",
                titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
                weekStart: 0
            };
            $(el).datepicker({
                language: "es",
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: false,
                autoclose: true,
                todayHighlight: true,
                format: 'yyyy/mm/dd'
            });
        }
    };
});
registrationModule.directive("loading", function () {
    return {
        restrict: "E",
        templateUrl:'AngularJS/Modals/Template/spinner.html'
    };
});