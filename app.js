var app = angular
    .module('Servidor', ['ngRoute', 'ngSanitize']);


app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/namidia', {
            templateUrl: 'app/views/Site/NaMidia/namidia-lista.html',
            controller: 'NaMidiaCtrl'
        })
        .when('/imprensa', {
            templateUrl: 'app/views/Site/Paginas/imprensa.html',
        })
        .when('/posts', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/page/:page', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/post/:url', {
            templateUrl: 'app/views/BlogDireitoConcursos/post.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/buscar/:nome', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/buscar/:nome/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/interesse/:campo', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/interesse/:campo/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/autor/:autor', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/autor/:autor/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/categoria/:categoria', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/categoria/:categoria/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/tags/:tags', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/posts/tags/:tags/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogDireitoConcursos/posts.html',
            controller: 'PostsDireitoConcursosCtrl'
        })
        .when('/interesses', {
            templateUrl: 'app/views/Site/CamposdeInteresse/interesses.html',
            controller: 'CamposdeInteresseCtrl'
        })
        .when('/interesses/:nome', {
            templateUrl: 'app/views/Site/CamposdeInteresse/interesses.html',
            controller: 'CamposdeInteresseCtrl'
        })
        .when('/contato', {
            templateUrl: 'app/views/Contact/contato-novo.html',
        })
        .when('/sobre-nos', {
            templateUrl: 'app/views/Sobre/sobre-nos.html',
        })
        .when('/top-dez', {
            templateUrl: 'app/views/Top 10/topdez.html',
            controller: 'TopDezCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(false).hashPrefix('');
});

app.handleSuccess =
    function (response) {
        return (response.data);
    };

app.handleError =
    function (response) {
        return response.data.message;
    };