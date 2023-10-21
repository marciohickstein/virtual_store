module.exports = {
    getErrorResponseMessage: (message) => {
        return {
            error: true,
            message
        }
    }
}