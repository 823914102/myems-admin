'use strict';

app.controller('RuleController', function($scope, $common, $uibModal, $translate,
	RuleService,
	toaster, SweetAlert) {

	$scope.initExpression = [{
		"spaceid": 1,
		"spacename": "name",
		"recipients": [{
			"name": "albert",
			"recipient": "13888888888",
			"level": 0
		}, {
			"name": "johnson",
			"recipient": "13666666666",
			"level": 0
		}, {
			"name": "mike",
			"recipient": "13777777777",
			"level": 0
		}]
	}];

	$scope.getAllRules = function() {
		RuleService.getAllRules(function(error, data) {
			if (!error) {
				$scope.rules = data;
			} else {
				$scope.rules = [];
			}
		});

	};

	$scope.addRule = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/alarm/rule.model.html',
			controller: 'ModalAddRuleCtrl',
			windowClass: "animated fadeIn",
			size: 'lg',
			resolve: {
				params: function() {
					return {
						rules: angular.copy($scope.rules),
						expression:angular.copy($scope.initExpression)
					};
				}
			}
		});
		modalInstance.result.then(function(rule) {
			RuleService.addRule(rule, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					var templateName = "FDD.RULE";
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
					$scope.getAllRules();
				} else {
					var templateName = "FDD.RULE";
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

	$scope.editRule = function(rule) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/alarm/rule.model.html',
			controller: 'ModalEditRuleCtrl',
			size: 'lg',
			resolve: {
				params: function() {
					return {
						rule: angular.copy(rule)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedRule) {
			RuleService.editRule(modifiedRule, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					var templateName = "FDD.RULE";
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

					$scope.getAllRules();
				} else {
					var templateName = "FDD.RULE";
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

	$scope.deleteRule = function(rule) {
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
                    RuleService.deleteRule(rule, function (error, status) {
                        if (angular.isDefined(status) && status == 204) {
                            var templateName = "FDD.RULE";
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

                            $scope.getAllRules();
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
                            var templateName = "FDD.RULE";
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

	$scope.getAllRules();

});

app.controller('ModalAddRuleCtrl', function($scope, $uibModalInstance, params) {

	$scope.operation = "FDD.ADD_RULE";
	$scope.rule={};
	$scope.rule.is_enabled=true;
	$scope.rule.channel='email';
	$scope.rule.expression=JSON.stringify(params.expression);
	$scope.dtOptions = {
		locale:{
			format: 'YYYY-MM-DD HH:mm:ss',
			applyLabel: "确定",
			cancelLabel: "取消",
			customRangeLabel: "自定义",
		},
		timePicker: true,
		timePicker24Hour: true,
		timePickerIncrement: 15,
		singleDatePicker: true,
	};
	$scope.ok = function() {
		$uibModalInstance.close($scope.rule);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditRuleCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "FDD.EDIT_RULE";
	$scope.rule = params.rule;
	$scope.rule.is_enabled = params.rule.is_enabled;
	$scope.dtOptions = {
		locale:{
			format: 'YYYY-MM-DD HH:mm:ss',
			applyLabel: "确定",
			cancelLabel: "取消",
			customRangeLabel: "自定义",
		},
		timePicker: true,
		timePicker24Hour: true,
		timePickerIncrement: 15,
		singleDatePicker: true,
	};
	$scope.ok = function() {
		$scope.rule.mute_start_datetime = moment($scope.rule.mute_start_datetime).format().slice(0,19);
		$scope.rule.mute_end_datetime = moment($scope.rule.mute_end_datetime).format().slice(0,19);
		$uibModalInstance.close($scope.rule);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
