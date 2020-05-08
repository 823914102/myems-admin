'use strict';

app.controller('EquipmentMeterController', function($scope,$common ,$timeout,$uibModal, $translate,	MeterService, VirtualMeterService, OfflineMeterService,	EquipmentMeterService, EquipmentService, toaster,SweetAlert) {
    $scope.currentEquipment = {selected:undefined};

	  $scope.getAllEquipments = function(id) {
		EquipmentService.getAllEquipments(function(error, data) {
			if (!error) {
				$scope.equipments = data;
				} else {
				$scope.equipments = [];
			 }
		});
	};

	$scope.changeEquipment=function(item,model){
		$scope.currentEquipment=item;
		$scope.currentEquipment.selected=model;
		$scope.getMetersByEquipmentID($scope.currentEquipment.id);
	};

	$scope.getMetersByEquipmentID = function(id) {
		var metertypes=['meters','virtualmeters','offlinemeters'];
		$scope.equipmentmeters=[];
		angular.forEach(metertypes,function(value,index){
			EquipmentMeterService.getMetersByEquipmentID(id, value,function(error, data) {
				if (!error) {
					angular.forEach(data,function(item,indx){
						data[indx].metertype=value;
					});
					$scope.equipmentmeters=$scope.equipmentmeters.concat(data);
				}
			});
		});
	};

	$scope.colorMeterType=function(type){
		if(type=='meters'){
			return 'btn-primary'
		}else if(type=='virtualmeters'){
			return 'btn-info'
		}else{
			return 'btn-success'
		}
	};

	$scope.changeMeterType=function(){
		switch($scope.currentMeterType){
			case 'meters':
				$scope.currentmeters=$scope.meters;
				break;
			case 'virtualmeters':
				$scope.currentmeters=$scope.virtualmeters;
				break;
			case  'offlinemeters':
				$scope.currentmeters=$scope.offlinemeters;
				break;
		}
	};


	$scope.getAllMeters = function() {
		MeterService.getAllMeters(function(error, data) {
			if (!error) {
				$scope.meters = data;
				$scope.currentMeterType="meters";
				$timeout(function(){
					$scope.changeMeterType();
				},1000);
			} else {
				$scope.meters = [];
			}
		});

	};


	$scope.getAllOfflineMeters = function() {
		OfflineMeterService.getAllOfflineMeters(function(error, data) {
			if (!error) {
				$scope.offlinemeters = data;
			} else {
				$scope.offlinemeters = [];
			}
		});

	};

	$scope.getAllVirtualMeters = function() {
		VirtualMeterService.getAllVirtualMeters(function(error, data) {
			if (!error) {
				$scope.virtualmeters = data;
			} else {
				$scope.virtualmeters = [];
			}
		});

	};

	$scope.pairMeter=function(dragEl,dropEl){
        var tem_uuid = angular.element('#' + dragEl);
        if (angular.isDefined(tem_uuid.scope().equipmentmeter)) {
            console.log("this is a spacemeter");
            return;
        }
        var modalInstance = $uibModal.open({
            templateUrl: 'views/settings/equipment/equipmentmeter.model.html',
            controller: 'ModalEditEquipmentMeterCtrl',
            backdrop: 'static',
            size: 'sm'
        });
        modalInstance.result.then(function (is_output) {
		        var meterid=angular.element('#'+dragEl).scope().meter.id;
		        var equipmentid=$scope.currentEquipment.id;
            EquipmentMeterService.addPair(equipmentid, meterid, $scope.currentMeterType, is_output, function (error, status) {
            if (angular.isDefined(status) && status == 201) {

                var popType = 'TOASTER.SUCCESS';
                var popTitle = $common.toaster.success_title;
                var popBody = 'TOASTER.BIND_METER_SUCCESS';

                popType = $translate.instant(popType);
                popTitle = $translate.instant(popTitle);
                popBody = $translate.instant(popBody);

                toaster.pop({
                    type: popType,
                    title: popTitle,
                    body: popBody,
                    showCloseButton: true,
                });

                $scope.getMetersByEquipmentID($scope.currentEquipment.id);
            } else {

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
            }
        });
        },function() {
        });
    };

    $scope.deleteMeterPair = function (dragEl, dropEl) {
        if (angular.element('#' + dragEl).hasClass('source')) {
            return;
        }
        var equipmentmeterid = angular.element('#' + dragEl).scope().equipmentmeter.id;
        var equipmentid = $scope.currentEquipment.id;
        var metertype = angular.element('#' + dragEl).scope().equipmentmeter.metertype;
        EquipmentMeterService.deletePair(equipmentid, equipmentmeterid, metertype, function (error, status) {
            if (angular.isDefined(status) && status == 204) {

                var popType = 'TOASTER.SUCCESS';
                var popTitle = $common.toaster.success_title;
                var popBody = 'TOASTER.UNBIND_METER_SUCCESS';

                popType = $translate.instant(popType);
                popTitle = $translate.instant(popTitle);
                popBody = $translate.instant(popBody);

                toaster.pop({
                    type: popType,
                    title: popTitle,
                    body: popBody,
                    showCloseButton: true,
                });

                $scope.getMetersByEquipmentID($scope.currentEquipment.id);
            } else {
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
            }
        });
    };

	$scope.getAllEquipments();
	$scope.getAllMeters();
	$scope.getAllVirtualMeters();
	$scope.getAllOfflineMeters();

  $scope.$on('handleBroadcastEquipmentChanged', function(event) {
    $scope.getAllEquipments();
  });
});

app.controller('ModalEditEquipmentMeterCtrl', function ($scope, $uibModalInstance) {
    $scope.is_output = "false";

    $scope.ok = function () {
        $uibModalInstance.close(angular.fromJson($scope.is_output));
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
