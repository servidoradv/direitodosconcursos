angular.module("Servidor").factory('suportejuridicoAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/SuporteJuridico/todos");
    };

    return {
        getItens: _getItens,
    };
});

