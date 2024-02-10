// There are two Methods to Define Async Handler : 1 is Use Promise, 2 is Use Try Catch (we use 1st Method)
// Here we have to return a callback function 
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}
 
export {asyncHandler}

/*
2nd Method

const asyncHandler = (requestHandler) => async (req, res, next) => {
    try{
        await requestHandler(req, res, next)
    }
    catch(error){
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/