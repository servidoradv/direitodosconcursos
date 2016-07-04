angular.module("Servidor").controller('NewsletterCtrl', function ($scope, $route, newsletterAPI) {

    $scope.loadingnewsletter = false;    

    var carregarNewsletter = function () {
        $scope.loadingnewsletter = true;
        newsletterAPI.getItens($route.current.params.newsletter).then(function (data) {
            if (data.statusText == "OK") {
                $scope.loadingnewsletter = false;
            }
        });
    };

    carregarNewsletter();
});