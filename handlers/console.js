module.exports = (client) => {
let prompt = process.openStdin()
prompt.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
        client.channels.cache.get("745731631230222377").send(x.join(" "));
    });
}