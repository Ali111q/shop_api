function responseHelper(data, message){
    return{
        status: true,
        message:message,
        data : data
    }
}
function errorHelper(message){
    return{
        status: false,
        message:message,
    }
}

module.exports.responseHelper = responseHelper;
module.exports.errorHelper = errorHelper;