//Switch Classes Function
function getAPI(){
    //return "http://127.0.0.1:8080/";
    //return "http://"+window.location.hostname+":8080/api/";
    // to avoid CORS issue, use Nginx to proxy myems-api to path /api with the same ip and port as myems-web
    return "http://"+window.location.hostname+"/api/";
}
