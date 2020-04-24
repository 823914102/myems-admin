'use strict';
app.factory('HelpFileService', function($http) {  
    return {  
        getAllHelpFiles:function(callback){
            $http.get(getAPI()+'helpfiles')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e,status) {  
                    callback(e,status);  
                });
        },
        
        addHelpFile: function(helpfile, callback) {  
            $http.post(getAPI()+'helpfiles',{data:helpfile})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e,status) {  
                    callback(e,status);  
                });  
        },

        downloadReport: function(id, callback) {  
            var url="helpfiles/"+id+"/download";
            
            $http.get(getAPI()+url)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        
        deleteHelpFile: function(helpfile, callback) {  
            $http.delete(getAPI()+'helpfiles/'+helpfile.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e,status) {  
                    callback(e,status);  
                });  
        }
    };
});  