'use strict';

app.controller('EnergyFlowDiagramPreviewController', function($scope,$common, $translate,  EnergyFlowDiagramService, EnergyFlowDiagramLinkService, highchartsNG) {
      $scope.energyflowdiagrams = [];
      $scope.currentEnergyFlowDiagram = null;

      $scope.getAllEnergyFlowDiagrams = function() {
      EnergyFlowDiagramService.getAllEnergyFlowDiagrams(function(error, data) {
        if (!error) {
          $scope.energyflowdiagrams = data;
          } else {
          $scope.energyflowdiagrams = [];
         }
      });
    };

    $scope.getLinksByEnergyFlowDiagramID = function(id) {

  			EnergyFlowDiagramLinkService.getLinksByEnergyFlowDiagramID(id, function(error, data) {
  				if (!error) {
            console.log(data);
  				 return data;
  				} else {
            	return [];
          }
  			});
  	};

    $scope.changeEnergyFlowDiagram=function(item,model){
        $scope.currentEnergyFlowDiagram=item;
        $scope.currentEnergyFlowDiagram.selected=model;
        $scope.getEnergyFlowChart();
    };

    $scope.getEnergyFlowChart = function() {
      var data = {title: {text:null}, accessibility:{point:{valueDescriptionFormat:null}}, series:[{keys:null, data:null, type:null, name:null }]};
      data.title.text = ($scope.currentEnergyFlowDiagram != null) ? $scope.currentEnergyFlowDiagram.name: null;
      data.accessibility.point.valueDescriptionFormat = '{index}. {point.from} to {point.to}, {point.weight}.';
      data.series[0].keys = ['from', 'to', 'weight'];
      data.series[0].type = 'sankey';
      data.series[0].name =  ($scope.currentEnergyFlowDiagram != null) ? $scope.currentEnergyFlowDiagram.name: null;
      data.series[0].data = [];
      var  links = $scope.currentEnergyFlowDiagram.links;
      if (links != null) {
        for (var i=0;i < links.length; i++) {
          data.series[0].data.push([links[i].source_node.name, links[i].target_node.name, Math.floor(Math.random() * 100)]);
        }
      }
      $scope.energyFlowChart = data;
    };
    $scope.getAllEnergyFlowDiagrams();

    $scope.$on('handleBroadcastEnergyFlowDiagramChanged', function(event) {
      $scope.getAllEnergyFlowDiagrams();
    });

});
