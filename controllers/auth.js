module.exports.login = (req, resp) => {
    resp.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password,
        },
    });
}

module.exports.register = (req, resp) => {
    resp.status(200).json({
        register: 'from controller',
    });
}