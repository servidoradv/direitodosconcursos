angular.module("Servidor").factory('topdezAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/Top10/todos");
    };

    return {
        getItens: _getItens,
    };
});