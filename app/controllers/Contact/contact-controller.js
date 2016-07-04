/*global app*/
'use strict';

app.controller('Contact', ['$scope', 'ContactService',
    function ($scope, contactService) {
        $scope.mensagem_foco = "Mensagem de foco";
        

        $scope.save = function(teste){
            alert(teste);
            contactService.save();
        }
    }
]);