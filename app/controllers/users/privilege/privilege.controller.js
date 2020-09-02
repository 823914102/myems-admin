'use strict';

app.controller('PrivilegeController', function ($scope,
	$common,
	$uibModal,
	PrivilegeService,
	UserService,
	SpaceService,
	toaster,
	$translate,
	SweetAlert) {
	$scope.getAllPrivileges = function () {
		PrivilegeService.getAllPrivileges(function (error, data) {
			if (!error) {
				$scope.privileges = data;
			} else {
				$scope.privileges = [];
			}
		});

	};

	$scope.addPrivilege = function () {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/users/privilege/privilege.model.html',
			controller: 'ModalAddPrivilegeCtrl',
			windowClass: "animated fadeIn",
			resolve: {
				params: function () {
					return {
						spacetree: angular.copy($scope.spacetree),
					};
				}
			}
		});
		modalInstance.result.then(function (privilege) {
			PrivilegeService.addPrivilege(privilege, function (error, status) {
				if (angular.isDefined(status) && status == 201) {
					var templateName = "SETTING.PRIVILEGE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.SUCCESS';
					var popTitle = $common.toaster.success_title;
					var popBody = $common.toaster.success_add_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody, { template: templateName });

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});
					$scope.getAllPrivileges();
				} else {
					var templateName = "SETTING.PRIVILEGE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.ERROR';
					var popTitle = $common.toaster.error_title;
					var popBody = $common.toaster.error_add_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody, { template: templateName });

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});
				}
			});
		}, function () {

		});
	};

	$scope.editPrivilege = function (privilege) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/users/privilege/privilege.model.html',
			controller: 'ModalEditPrivilegeCtrl',
			resolve: {
				params: function () {
					return {
						spacetree: angular.copy($scope.spacetree),
						privilege: angular.copy(privilege)
					};
				}
			}
		});

		modalInstance.result.then(function (modifiedPrivilege) {
			PrivilegeService.editPrivilege(modifiedPrivilege, function (error, status) {
				if (angular.isDefined(status) && status == 200) {
					var templateName = "SETTING.PRIVILEGE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.SUCCESS';
					var popTitle = $common.toaster.success_title;
					var popBody = $common.toaster.success_update_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody, { template: templateName });

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});
					$scope.getAllPrivileges();
				} else {
					var templateName = "SETTING.PRIVILEGE";
					templateName = $translate.instant(templateName);

					var popType = 'TOASTER.ERROR';
					var popTitle = $common.toaster.error_title;
					var popBody = $common.toaster.error_update_body;

					popType = $translate.instant(popType);
					popTitle = $translate.instant(popTitle);
					popBody = $translate.instant(popBody, { template: templateName });

					toaster.pop({
						type: popType,
						title: popTitle,
						body: popBody,
						showCloseButton: true,
					});
				}
			});
		}, function () {
			//do nothing;
		});
	};

	$scope.deletePrivilege = function (privilege) {
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
					PrivilegeService.deletePrivilege(privilege, function (error, status) {
						if (angular.isDefined(status) && status == 204) {
							var templateName = "SETTING.PRIVILEGE";
							templateName = $translate.instant(templateName);

							var popType = 'TOASTER.SUCCESS';
							var popTitle = $common.toaster.success_title;
							var popBody = $common.toaster.success_delete_body;

							popType = $translate.instant(popType);
							popTitle = $translate.instant(popTitle);
							popBody = $translate.instant(popBody, { template: templateName });

							toaster.pop({
								type: popType,
								title: popTitle,
								body: popBody,
								showCloseButton: true,
							});
							$scope.getAllPrivileges();
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
							var templateName = "SETTING.PRIVILEGE";
							templateName = $translate.instant(templateName);

							var popType = 'TOASTER.ERROR';
							var popTitle = $common.toaster.error_title;
							var popBody = $common.toaster.error_delete_body;

							popType = $translate.instant(popType);
							popTitle = $translate.instant(popTitle);
							popBody = $translate.instant(popBody, { template: templateName });

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

	$scope.getAllPrivileges();

});

app.controller('ModalAddPrivilegeCtrl', function ($scope, $uibModalInstance, $timeout, params) {

	$scope.operation = "USER.ADD_PRIVILEGE";
	
	$scope.privilege = {};
	
	$scope.ok = function () {
		$scope.privilege.data = JSON.stringify({});
		$uibModalInstance.close($scope.privilege);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditPrivilegeCtrl', function ($scope, $uibModalInstance, $timeout, params) {
	$scope.operation = "USER.EDIT_PRIVILEGE";
	$scope.privilege = params.privilege;
	var privilege_data = JSON.parse(params.privilege.data);

	$scope.ok = function () {
		$scope.privilege.data = JSON.stringify({});
		$uibModalInstance.close($scope.privilege);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
