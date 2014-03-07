exports.index = function (req, res) {
    return res.send({
        status: 200,
        data: ['Trial', 'Internal', 'Live']
    });
};
