module.exports.login = (req, resp) => {
    resp.status(200).json({
        login: true,
    });
}

module.exports.register = (req, resp) => {
    resp.status(200).json({
        register: 'from controller',
    });
}