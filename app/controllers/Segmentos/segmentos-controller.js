angular.module("Servidor").controller('SegmentosCtrl', function ($scope, $route, segmentosAPI) {

    $scope.loading = false;
    $scope.lista = [];
    $scope.item;

    var carregarItens = function () {
        $scope.loading = true;
        segmentosAPI.getItens().then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    var carregarItem = function (valor, tipo) {
        $scope.loading = true;
        segmentosAPI.getItem(valor, tipo).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    if ($route.current.params.id != null)
        carregarItem($route.current.params.id, "id");
    else
        carregarItem($route.current.params.nome, "nome");

    carregarItens();

});