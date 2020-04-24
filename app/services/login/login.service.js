'use strict';
app.factory('LoginService', function($http) {  
    return {  
        
        login: function(user, callback) {  
            $http.put(getAPI()+'users/login',{data:user})  
                .success(function (response, status, headers, config) {  
                    callback(response,null,status,headers);  
                })  
                .error(function (e,status) {  
                    callback(e,status);  
                });  
        },
        logout: function(callback) {  
            $http.put(getAPI()+'users/logout')
            //$http.put(getAPI()+'users/logout',{},{headers:{'cookie': 'token=06b4849be0710487fa08561d0303699821b23e75; user_uuid=dfa793a3-1a1d-49be-ad46-99f4196079de;'}})
                .success(function (response, status, headers, config) {  
                    callback(null,status,headers);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        
    };
});  