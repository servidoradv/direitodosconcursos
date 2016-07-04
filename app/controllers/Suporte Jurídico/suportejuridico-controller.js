angular.module("Servidor").controller('SuporteJuridicoCtrl', function ($scope, $route, suportejuridicoAPI) {

    $scope.loadingSuporteJuridico = false;
    $scope.listaSuporteJuridico;

    var carregarSuporteJuridico = function () {
        $scope.loadingSuporteJuridico = true;
        suportejuridicoAPI.getItens().then(function (data) {
            if (data.statusText == "OK") {
                $scope.listaSuporteJuridico = data.data.resultado;
                $scope.loadingSuporteJuridico = false;
            }
        });
    };

    carregarSuporteJuridico();
});