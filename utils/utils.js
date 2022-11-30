exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.getCurrentTimeStamp = () => {
    var date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ", " + date.toDateString();
}
