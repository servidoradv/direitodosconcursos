angular.module("Servidor").factory('postsDireitoConcursosAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getLista = function (limit,/*, ultimoid*/ page) {
        console.log(page);
        return $http.get(config.baseUrl + "/PostagensdeBlog/todosJSON?blogUrl=direitodosconcursos&limit=" + limit + "&page=" + page);
    };

    var _getItem = function (url) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/porurl?blogUrl=direitodosconcursos&url=" + url);
    };

    var _getPostsRelacionados = function (assuntos, id) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/porPostRelacionado?blogUrl=direitodosconcursos&assuntos=" + assuntos + "&id=" + id);
    };

    var _getItemPesquisa = function (nome, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/pornome?blogUrl=direitodosconcursos&nome=" + nome + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };

    var _getCampoInteresse = function (campo, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorCampodeInteresse?blogUrl=direitodosconcursos&campodeInteresse=" + campo + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };

    var _getTags = function (tags, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorTags?blogUrl=direitodosconcursos&tags=" + tags + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };

    var _getAutor = function (autor, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorAutor?blogUrl=direitodosconcursos&nomeautor=" + autor + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };

    var _getItemTag = function (id) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorTagPost?blogUrl=direitodosconcursos&id=" + id);
    };

    var _getItemCategoria = function (categoria, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorCategoria?blogUrl=direitodosconcursos&categoria=" + categoria + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };

    return {
        getLista: _getLista,
        getItemPesquisa: _getItemPesquisa,
        getItem: _getItem,
        getItemTag: _getItemTag,
        getTags: _getTags,
        getAutor: _getAutor,
        getPostsRelacionados: _getPostsRelacionados,
        getItemCampoInteresse: _getCampoInteresse,
        getItemCategoria: _getItemCategoria
    };
});

