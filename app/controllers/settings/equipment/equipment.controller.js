'use strict';

app.controller('EquipmentController', function($scope,$common, $translate, $uibModal, EquipmentService,toaster,SweetAlert) {

	$scope.getAllEquipments = function() {
		EquipmentService.getAllEquipments(function(error, data) {
			if (!error) {
				$scope.equipments = data;
			} else {
				$scope.equipments = [];
			}
		});
	};

	$scope.addEquipment = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/equipment/equipment.model.html',
			controller: 'ModalAddEquipmentCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(equipment) {
			EquipmentService.addEquipment(equipment, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					var templateName = "COMMON.EQUIPMENT";
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
					$scope.getAllEquipments();
				} else {
					var templateName = "COMMON.EQUIPMENT";
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

	$scope.editEquipment = function(equipment) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/equipment/equipment.model.html',
			controller: 'ModalEditEquipmentCtrl',
			resolve: {
				params: function() {
					return {
						equipment: angular.copy(equipment)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedEquipment) {
			EquipmentService.editEquipment(modifiedEquipment, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					var templateName = "COMMON.EQUIPMENT";
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
					$scope.getAllEquipments();
				} else {
					var templateName = "COMMON.EQUIPMENT";
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

	$scope.deleteEquipment=function(equipment){
		SweetAlert.swal({
		        title: $translate.instant($common.sweet.title),
		        text: $translate.instant($common.sweet.text),
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: $translate.instant($common.sweet.confirmButtonText),
		        cancelButtonText: $translate.instant($common.sweet.cancelButtonText),
		        closeOnConfirm: true,
		        closeOnCancel: true },
		    function (isConfirm) {
		        if (isConfirm) {
		            EquipmentService.deleteEquipment(equipment, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		var templateName = "COMMON.EQUIPMENT";
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
							      $scope.getAllEquipments();
		            	} else {
		            		var templateName = "COMMON.EQUIPMENT";
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
	$scope.getAllEquipments();
});

app.controller("ModalAddEquipmentCtrl", function(  $scope,  $uibModalInstance) {
  $scope.operation = "EQUIPMENT.ADD_EQUIPMENT";
  $scope.disabled = false;
  $scope.equipment = {
    is_input_counted: false,
    is_output_counted: false,
  };
  $scope.ok = function() {
    $uibModalInstance.close($scope.equipment);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss("cancel");
  };
});

app.controller("ModalEditEquipmentCtrl", function($scope, $uibModalInstance,  params) {
  $scope.operation = "EQUIPMENT.EDIT_EQUIPMENT";
  $scope.disabled = true;
  $scope.equipment = params.equipment;

  $scope.ok = function() {
    $uibModalInstance.close($scope.equipment);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss("cancel");
  };
});
