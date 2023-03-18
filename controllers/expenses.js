module.exports.getRecords = (req, resp) => {
    resp.status(200).json({
        getRecords: 'getRecords from controller',
    });
}

module.exports.getById = (req, resp) => {
    resp.status(200).json({
        getById: 'getById from controller',
    });
}

module.exports.addRecord = (req, resp) => {
    resp.status(200).json({
        addRecord: 'addRecord from controller',
    });
}

module.exports.updateRecord = (req, resp) => {
    resp.status(200).json({
        updateRecord: 'updateRecord from controller',
    });
}

module.exports.removeRecord = (req, resp) => {
    resp.status(200).json({
        removeRecord: 'removeRecord from controller',
    });
}