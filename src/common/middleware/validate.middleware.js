const validate = (DtoClass) => {
    return (req, res, next) => {
        const { error, message, data } = DtoClass.validate(req.body);

        if (error) {
            return res.status(400).json({
                message
            });
        }

        req.body = data;
        next();
    };
};

export default validate;