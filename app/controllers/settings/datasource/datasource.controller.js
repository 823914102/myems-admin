'use strict';

app.controller('DataSourceController', function($scope, $uibModal, $timeout, $common, $translate,
	DataSourceService,
	toaster, SweetAlert) {

	$scope.getAllDataSources = function() {
		DataSourceService.getAllDataSources(function(error, data) {
			if (!error) {
				$scope.datasources = data;
			} else {
				$scope.datasources = [];
			}
		});

	};


	$scope.addDataSource = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/datasource/datasource.model.html',
			controller: 'ModalAddDataSourceCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(datasource) {
			DataSourceService.addDataSource(datasource, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					var templateName = "SETTING.DATASOURCE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.SUCCESS';
					var popTitle = $common.toaster.success_title;
					var popBody = $common.toaster.success_add_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody,{template: templateName});

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});


					$scope.$emit("handleEmitDataSourceChanged");
				} else {
					var templateName = "SETTING.DATASOURCE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.ERROR';
					var popTitle = $common.toaster.error_title;
					var popBody = $common.toaster.error_add_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody,{template: templateName});

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editDataSource = function(datasource) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/datasource/datasource.model.html',
			controller: 'ModalEditDataSourceCtrl',
			resolve: {
				params: function() {
					return {
						datasource: angular.copy(datasource)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedDataSource) {
			DataSourceService.editDataSource(modifiedDataSource, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					var templateName = "SETTING.DATASOURCE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.SUCCESS';
					var popTitle = $common.toaster.success_title;
					var popBody = $common.toaster.success_update_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody,{template: templateName});

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});
					$scope.$emit("handleEmitDataSourceChanged");
				} else {
					var templateName = "SETTING.DATASOURCE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.ERROR';
					var popTitle = $common.toaster.error_title;
					var popBody = $common.toaster.error_update_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody,{template: templateName});

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteDataSource = function(datasource) {
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
			function(isConfirm) {
				if (isConfirm) {
					DataSourceService.deleteDataSource(datasource, function(error, status) {
						if (angular.isDefined(status) && status == 204) {
							var templateName = "SETTING.DATASOURCE";
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


							$scope.$emit("handleEmitDataSourceChanged");
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
							 var templateName = "SETTING.DATASOURCE";
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



	$scope.getAllDataSources();
	$scope.$on("handleBroadcastDataSourceChanged", function(event) {
		$scope.getAllDataSources();
	});

});


app.controller('ModalAddDataSourceCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "SETTING.ADD_DATASOURCE";
	$scope.disable = false;
	$scope.ok = function() {
		$uibModalInstance.close($scope.datasource);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditDataSourceCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "SETTING.EDIT_DATASOURCE";
	$scope.disable = false;
	$scope.datasource = params.datasource;

	$scope.ok = function() {
		$uibModalInstance.close($scope.datasource);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
