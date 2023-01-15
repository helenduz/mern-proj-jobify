const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        msg: "Not your fault... server error!",
    })
};

export default errorHandlerMiddleware;