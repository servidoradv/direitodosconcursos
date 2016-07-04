/*global app*/
'use strict';

app.factory('ContactService', ['$http', '$q',
    function ($http, $q) {

        var service = {};

        service.save = function (objectModel) {

            var deferredSave = $q.defer();

            return $http({
                method: 'POST',
                url: "http://minhatupperware-api.azurewebsites.net/api/clientes/QuantidadeClientes?tipo=porConsultora&id_consultora=6",
                data: objectModel,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(
                function (response) {
                    deferredSave.resolve(response.data);
                    alert('Aeeee');
                    return deferredSave.promise;
                },
                function (error) {
                    deferredSave.reject(error.data);
                    alert(error.data);
                    return deferredSave.promise;
                });
        };

        return service;
    }
]);