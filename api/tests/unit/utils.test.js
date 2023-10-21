const { getErrorResponseMessage } = require('../../src/utils');

describe('test useful functions', () => {
    
    it('test response function', () => {
        const error = 'This is an error';
        const errorResponseMessage = getErrorResponseMessage(error);

        expect(errorResponseMessage).toEqual({
            error: true,
            message: error
        });
    })

})