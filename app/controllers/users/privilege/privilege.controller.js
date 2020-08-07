'use strict';

app.controller('PrivilegeController', function ($scope,
	$common,
	$uibModal,
	PrivilegeService,
	UserService,
	toaster,
	$translate,
	SweetAlert) {

	$scope.getSpaceTree = function () {
		PrivilegeService.getSpaceTree(function (error, data) {
			if (!error) {
				$scope.spacetree = $scope.formatSpaceTree(data);
				// console.log($scope.spacetree);
			} else {
				$scope.spacetree = [];
			}
		});
	};

	$scope.formatSpaceTree = function (data) {
		data.forEach(function (item) {
			item.expanded = true;
		});
		return $scope.loopItems(data, undefined);
	};

	$scope.loopItems = function (data, pid) {
		data.forEach(function (item) {
			if (pid !== undefined) {
				item.pid = pid;
			}
			item.text = item.name;
			item.spaceid = item.id;
			item.id = Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
			delete item.name;
			if (item.hasOwnProperty('items')) {
				$scope.loopItems(item.items, item.id);
			}
		});
		return data;
	};

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
	$scope.getSpaceTree();


});

app.controller('ModalAddPrivilegeCtrl', function ($scope, $uibModalInstance, $timeout, IntegralUITreeViewService, params) {

	$scope.operation = "USER.ADD_PRIVILEGE";
	$scope.treeName = "treeSample";
	$scope.itemIcon = "icons-medium empty-doc";
	$scope.checkStates = ['checked', 'indeterminate', 'unchecked'];
	$scope.currentState = 'checked';
	$scope.checkList = [];
	$scope.privilege = {};
	$scope.checkBoxSettings = {
		autoCheck: true,
		threeState: true
	}
	$scope.items = params.spacetree;

	$scope.showCheckList = function () {
		$scope.checkList = IntegralUITreeViewService.getCheckList($scope.treeName, $scope.currentState);
		var privilege_data = {
			"spaces": [],
			"tenants": [],
		}
		$scope.checkList.forEach(function (item) {
			switch (item.space) {
				case "space":
					privilege_data.spaces.push(item.spaceid);
					break;
				case "tenant":
					privilege_data.tenants.push(item.spaceid);
					break;
			}
		});
		return privilege_data;
	}

	$scope.itemCheckStateChanging = function (e) {
		if (e.value == 'unchecked') {
			e.item.checkState = 'checked';
		}
	}

	$scope.ok = function () {
		$scope.privilege.data = JSON.stringify($scope.showCheckList());
		$uibModalInstance.close($scope.privilege);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditPrivilegeCtrl', function ($scope, $uibModalInstance, $timeout, IntegralUITreeViewService, params) {
	$scope.operation = "SETTING.EDIT_PRIVILEGE";
	$scope.privilege = params.privilege;
	var privilege_data = JSON.parse(params.privilege.data);

	$scope.checkNode = function (data) {
		data.forEach(function (item) {
			switch (item.space) {
				case "space":
					if (privilege_data.factories.indexOf(item.spaceid) > -1) {
						item.checkState = "checked";
					}
					break;
				case "tenant":
					if (privilege_data.tenants.indexOf(item.spaceid) > -1) {
						item.checkState = "checked";
					}
					break;
			}
			if (item.hasOwnProperty("items")) {
				$scope.checkNode(item.items);
			}
		});
		return data;
	}

	$scope.expandFirstNode = function (data) {
		data.forEach(function (item) {
			item.expanded = true;
		});
		return $scope.checkNode(data);
	}

	$scope.items = $scope.expandFirstNode(params.spacetree);
	$scope.treeName = "treeSample1";
	$scope.itemIcon = "icons-medium empty-doc";
	$scope.checkStates = ['checked', 'indeterminate', 'unchecked'];
	$scope.currentState = 'checked';
	$scope.checkList = [];

	$scope.checkBoxSettings = {
		autoCheck: true,
		threeState: true
	}
	$scope.showCheckList = function () {
		$scope.checkList = IntegralUITreeViewService.getCheckList($scope.treeName, $scope.currentState);
		var privilege_data_edit = {
			"spaces": [],
			"tenants": [],
		}
		$scope.checkList.forEach(function (item) {
			switch (item.space) {
				case "space":
					privilege_data_edit.spaces.push(item.spaceid);
					break;
				case "tenant":
					privilege_data_edit.tenants.push(item.spaceid);
					break;
			}
		});
		return privilege_data_edit;
	}

	$scope.itemCheckStateChanging = function (e) {
		if (e.value == 'unchecked') {
			e.item.checkState = 'checked';
		}
	}

	$scope.ok = function () {
		$scope.privilege.data = JSON.stringify($scope.showCheckList());
		$uibModalInstance.close($scope.privilege);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
