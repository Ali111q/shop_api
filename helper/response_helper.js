function responseHelper(data, message,currentPage, nexturl,){
    var obj = {
        status: true,
        message:message,
        data : data,
    }
    if (currentPage) {
        obj.currentPage = currentPage;
        obj.nexturl = nexturl;
    }

    return obj;
}
function errorHelper(message){
    return{
        status: false,
        message:message,
    }
}

module.exports.responseHelper = responseHelper;
module.exports.errorHelper = errorHelper;