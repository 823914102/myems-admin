'use strict';

app.controller('HelpFileController', function ($scope, $common, $cookies,  $translate, $uibModal, $interval, HelpFileService, toaster, SweetAlert) {

    $scope.getAllHelpFiles = function () {
        HelpFileService.getAllHelpFiles(function (error, data) {
            if (!error) {
                $scope.helpfiles = data;
            } else {
                $scope.helpfiles = [];
            }
        });

    };

    $scope.dzOptions = {
        url: getAPI() + 'helpfiles',
        acceptedFiles: '.xlsx,.xls,.pdf,.docx,.doc,.dwg,.jpg,.png,.csv',
        dictDefaultMessage: 'Click(or Drop) to add files',
        maxFilesize: '100',
        headers: {"Set-Cookie": "user_uuid=" + $cookies.get("user_uuid") + "=token=" + $cookies.get("token")}
    };

    $scope.dzCallbacks = {
        'addedfile': function (file) {
            console.info('File added.', file);
        },
        'success': function (file, xhr) {
            //console.log('File success to upload from dropzone', file, xhr);

            var popType = 'TOASTER.SUCCESS';
            var popTitle = $common.toaster.success_title;
            var popBody = $common.toaster.success_add_body.format(file.name);

            popType = $translate.instant(popType);
            popTitle = $translate.instant(popTitle);
            popBody = $translate.instant(popBody);

            toaster.pop({
                type: popType,
                title: popTitle,
                body: popBody,
                showCloseButton: true,
            });

            $scope.getAllHelpFiles();
        },
        'error': function (file, xhr) {
            //console.warn('File failed to upload from dropzone', file, xhr);

            var popType = 'TOASTER.ERROR';
            var popTitle = $common.toaster.error_title;
            var popBody = $common.toaster.error_add_body.format(file.name);

            popType = $translate.instant(popType);
            popTitle = $translate.instant(popTitle);
            popBody = $translate.instant(popBody);

            toaster.pop({
                type: popType,
                title: popTitle,
                body: popBody,
                showCloseButton: true,
            });
        }
    };

    $scope.downloadHelpfile = function (helpfile) {
        var name = helpfile.file_name+'.'+helpfile.file_type;
        var url = "helpfiles/" + helpfile.id + "/download";
        saveAs(getAPI() + url, name);

    };


    $scope.deleteHelpFile = function (helpfile) {
        SweetAlert.swal({
                title: $translate.instant($common.sweet.title),
                text: $translate.instant($common.sweet.text),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: $translate.instant($common.sweet.confirmButtonText),
                cancelButtonText: $translate.instant($common.sweet.cancelButtonText),
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    HelpFileService.deleteHelpFile(helpfile, function (error, status) {
                        if (angular.isDefined(status) && status == 204) {
                            var templateName = "SETTING.HELPFILE";
                            templateName = $translate.instant(templateName);

                            var popType = 'TOASTER.SUCCESS';
                            var popTitle = $common.toaster.success_title;
                            var popBody = $common.toaster.success_delete_body;

                            popType = $translate.instant(popType);
                            popTitle = $translate.instant(popTitle);
                            popBody = $translate.instant(popBody, {template: templateName});

                            toaster.pop({
                                type: popType,
                                title: popTitle,
                                body: popBody,
                                showCloseButton: true,
                            });
                            $scope.getAllHelpFiles();
                        } else if (angular.isDefined(status) && status == 400) {
                            var popType = 'TOASTER.ERROR';
                            var popTitle = error.title;
                            var popBody = error.description;

                            popType = $translate.instant(popType);
                            popTitle = $translate.instant(popTitle);
                            popBody = $translate.instant(popBody);


                            toaster.pop({
                                type: popType,
                                title: popTitle,
                                body: popBody,
                                showCloseButton: true,
                            });
                        } else {
                            var templateName = "SETTING.HELPFILE";
                            templateName = $translate.instant(templateName);

                            var popType = 'TOASTER.ERROR';
                            var popTitle = $common.toaster.error_title;
                            var popBody = $common.toaster.error_delete_body;

                            popType = $translate.instant(popType);
                            popTitle = $translate.instant(popTitle);
                            popBody = $translate.instant(popBody, {template: templateName});

                            toaster.pop({
                                type: popType,
                                title: popTitle,
                                body: popBody,
                                showCloseButton: true,
                            });
                        }
                    });
                }
            });
    };

    $scope.getAllHelpFiles();
    $interval.cancel();

    $scope.$on('$destroy', function () {
        // Make sure that the interval is destroyed too
        if (angular.isDefined($scope.refeshhelpfiles)) {
            $interval.cancel($scope.refeshhelpfiles);
            $scope.refeshhelpfiles = undefined;
        }
    });
    $scope.refeshhelpfiles = $interval($scope.getAllHelpFiles, 1000 * 8);

});
