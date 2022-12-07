exports.sleep = (ms) => {
    console.log(`Waiting ${ms/1000} seconds to avoid overloading the server.`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.getCurrentTimeStamp = () => {
    var date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ", " + date.toDateString();
}
