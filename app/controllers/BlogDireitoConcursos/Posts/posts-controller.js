angular.module("Servidor").controller('PostsDireitoConcursosCtrl', function ($scope, $route, $rootScope, postsDireitoConcursosAPI) {

    $scope.loading = false;
    $scope.loadingPostRelacionado = false;
    $scope.PostRelacionado = [];
    $scope.Tags = [];
    $scope.Nenhumlocalizado = false;
    $scope.NenhumTaglocalizada = false;
    $scope.NenhumComentario = false;
    $scope.Comentarioencontrado = false;
    $scope.naoencontrado = false;
    $scope.postencontrado = false;
    $scope.previousview = false;
    $scope.nextview = false;
    $scope.lista = [];
    $scope.item;
    $scope.previouspage;
    $scope.nextpage;
    $scope.pagination;
    $scope.origempage;
    $scope.nameNext = "Próximo ›";
    $scope.namePrevious = "‹ Anterior";

    
    
    var carregarLista = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage = "index.html#";
        $scope.nextpage = "index.html#";
        $scope.origempage = "index.html#/posts/page/";
        if ($route.current.params.page == null) {
            postsDireitoConcursosAPI.getLista(10,/* 1,*/ 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }                    

                    if (data.data.mensagem == "#101 - Dados encontrados com sucesso. Restantes:False") {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;

                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsDireitoConcursosAPI.getLista(10,/* $route.current.params.ultimoitem,*/ $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }

                    if (data.data.mensagem == "#101 - Dados encontrados com sucesso. Restantes:False") {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;

                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItem = function () {
        $scope.loading = true;
        $scope.Nenhumlocalizado = true;
        $scope.NenhumTaglocalizada = true;
        $scope.postencontrado = false;
        $scope.naoencontrado = false;
        postsDireitoConcursosAPI.getItem($route.current.params.url).then(function (data) {
            if (data.statusText == "OK") {
                if (data.data.mensagem != "#102 - Dados não encontrados. Ocorreu um erro não esperado.") {
                    $scope.item = data.data.resultado;
                    $rootScope.tituloPaginaURL = $scope.item.title;
                    $rootScope.linkPaginaURL = $scope.item.url;
                    $rootScope.tituloPaginaDescription = $scope.item.breveDescricao;

                    $scope.loading = false;

                    if ($scope.item.comentarios.length > 0) {
                        $scope.Comentarioencontrado = true;
                    }
                    else {
                        $scope.NenhumComentario = true;
                    }

                    $scope.loadingPostRelacionado = true;


                    if ($scope.item.assuntos.length > 0) {

                        var assuntos = "";

                        for (var i = 0; i < $scope.item.assuntos.length; i++)
                        {
                            if (i > 0)
                                assuntos += ",";

                            assuntos += $scope.item.assuntos[i].id;
                        }

                        postsDireitoConcursosAPI.getPostsRelacionados(assuntos, $scope.item.id).then(function (dataAssunto) {
                            if (dataAssunto.statusText == "OK") {
                                $scope.PostRelacionado = dataAssunto.data.resultado;
                                $scope.loadingPostRelacionado = false;

                                if ($scope.PostRelacionado.length == 0) {
                                    $scope.Nenhumlocalizado = true;
                                }
                                else {
                                    $scope.Nenhumlocalizado = false;
                                }
                            }
                            else {
                                $scope.Nenhumlocalizado = true;
                            }
                        });
                    }
                    else {
                        $scope.Nenhumlocalizado = true;
                    }

                    if ($scope.item.tags.length > 0) {
                        postsDireitoConcursosAPI.getItemTag($scope.item.id).then(function (dataTag) {
                            if (dataTag.statusText == "OK") {
                                $scope.Tags = dataTag.data.resultado;

                                if ($scope.Tags.length == 0) {
                                    $scope.NenhumTaglocalizada = true;
                                }
                                else {
                                    $scope.NenhumTaglocalizada = false;
                                }
                            }
                            else {
                                $scope.NenhumTaglocalizada = true;
                            }
                        });
                    }
                    else {
                        $scope.NenhumTaglocalizada = true;
                    }

                    if ($scope.item.length == 0) {
                        $scope.naoencontrado = true;
                    }
                    else {
                        $scope.postencontrado = true;
                    }
                }
                else {
                    $scope.naoencontrado = true;
                    $scope.postencontrado = false;
                    $scope.loading = false;
                }
            }
        });
    };

    var carregarItemPesquisa = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/buscar/" + $route.current.params.nome + "/page/";
        if ($route.current.params.page == null) {
            postsDireitoConcursosAPI.getItemPesquisa($route.current.params.nome, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsDireitoConcursosAPI.getItemPesquisa($route.current.params.nome, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemTags = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/tags/" + $route.current.params.tags + "/page/";
        if ($route.current.params.page == null) {
            postsDireitoConcursosAPI.getTags($route.current.params.tags, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsDireitoConcursosAPI.getTags($route.current.params.tags, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemAutor = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/autor/" + $route.current.params.autor + "/page/";
        if ($route.current.params.page == null) {
            postsDireitoConcursosAPI.getAutor($route.current.params.autor, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsDireitoConcursosAPI.getAutor($route.current.params.autor, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemCampoInteresse = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/interesse/" + $route.current.params.campo + "/page/";
        if ($route.current.params.page == null) {
            postsDireitoConcursosAPI.getItemCampoInteresse($route.current.params.campo, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsDireitoConcursosAPI.getItemCampoInteresse($route.current.params.campo, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemCategoria = function () {
        
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/categoria/" + $route.current.params.categoria + "/page/";
        if ($route.current.params.page == null) {
            postsDireitoConcursosAPI.getItemCategoria($route.current.params.categoria, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsDireitoConcursosAPI.getItemCategoria($route.current.params.categoria, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.tituloPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    if ($route.current.params.url == null && $route.current.params.nome == null && $route.current.params.campo == null && $route.current.params.categoria == null && $route.current.params.tags == null && $route.current.params.autor == null)
        carregarLista();
    else if ($route.current.params.url != null)
        carregarItem();
    else if ($route.current.params.nome != null)
        carregarItemPesquisa();
    else if ($route.current.params.campo != null)
        carregarItemCampoInteresse();
    else if ($route.current.params.categoria != null)
        carregarItemCategoria();
    else if ($route.current.params.tags != null)
        carregarItemTags();
    else if ($route.current.params.autor != null)
        carregarItemAutor();
});