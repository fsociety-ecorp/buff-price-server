exports.sleep = (ms) => {
    console.log(`Waiting ${ms/1000} seconds to avoid overloading the server.`);
    return new Promise(resolve => setTimeout(resolve, ms));
}
