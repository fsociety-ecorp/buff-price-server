exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.getCookieSession = (buff, req) => {
    const title = "";
    var condition = { $regex: new RegExp(title), $options: "i" }

    buff.find(condition).then(data => {
        return data[0].session.id;
    })
}

exports.getCurrentTimeStamp = () => {
    var date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ", " + date.toDateString();
}
