angular.module("Servidor").controller('TopDezCtrl', function ($scope, $route, topdezAPI) {

    $scope.loading = false;
    $scope.lista;

    var carregarLista = function () {
        $scope.loading = true;
        topdezAPI.getItens().then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    carregarLista();
});