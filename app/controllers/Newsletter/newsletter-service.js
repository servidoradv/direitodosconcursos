angular.module("Servidor").factory('newsletterAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function (email) {
        return $http.get(config.baseUrl + "/SPNewsletter/criar?blogUrl=direitodosconcursos&email=" + email);
    };

    return {
        getItens: _getItens,
    };
});

