const homeController = {
    hello(req, res) {
        res.send({message: 'Hello from home controller!'});
    },
    about(req, res) {
        res.send({message: 'Hello from about!'});
    }
};

module.exports= homeController;