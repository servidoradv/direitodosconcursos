angular.module("Servidor").controller('CamposdeInteresseCtrl', function ($scope, $route, camposdeinteresseAPI) {

    $scope.loadingCamposdeInteresse = false;
    $scope.listaCamposdeInteresse = [];

    var carregarCamposdeInteresse = function () {
        $scope.loadingCamposdeInteresse = true;
        camposdeinteresseAPI.getItens().then(function (data) {            
            if (data.statusText == "OK") {
                $scope.listaCamposdeInteresse = data.data.resultado;                
                $scope.loadingCamposdeInteresse = false;
            }
        });
    };

    carregarCamposdeInteresse();
});