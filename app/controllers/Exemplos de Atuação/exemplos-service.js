angular.module("Servidor").factory('exemplosAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/SPExemplosdeAtuacao/todos");
    };

    var _getItem = function (valor, tipo) {
        if(tipo == "id")
            return $http.get(config.baseUrl + "/SPExemplosdeAtuacao/porid?id=" + valor);
        else if(tipo == "nome")
            return $http.get(config.baseUrl + "/SPExemplosdeAtuacao/pornome?nome=" + valor);
    };

    return {
        getItens: _getItens,
        getItem: _getItem
    };
});

