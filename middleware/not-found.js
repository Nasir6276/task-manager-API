const notFound = function(req, res) {
    res.status(404).send('Routes does not exist')
}

module.exports = notFound