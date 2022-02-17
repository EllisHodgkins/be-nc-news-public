    //error handling

    exports.handlesInvalidInput = (err, req, res, next) => {
        if (err.status && err.msg) {
            res.status(err.status).send({msg: err.msg})
        } else {
            next(err)
        }
    }

    exports.handlesInvalidPath = (req, res) => {
        res.status(404).send({msg : "404 - path not found"})
    }
