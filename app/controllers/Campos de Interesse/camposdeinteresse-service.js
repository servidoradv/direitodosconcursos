angular.module("Servidor").factory('camposdeinteresseAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/SPCamposdeInteresse/todos");
    };

    /*var _getItem = function (nome) {
        return $http.get(config.baseUrl + "/SPCamposdeInteresse/pornome?nome=" + nome);
    };*/

    return {
        getItens: _getItens,
        //getItem: _getItem
    };
});

