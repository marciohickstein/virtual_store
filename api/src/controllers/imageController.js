const Image = require('../models/image');
const stream = require('stream');
const { getErrorMessage } = require('../utils.js');

const imageController = {
    getImage: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.json(getErrorMessage(`id not informed`));
        }

        try {
            const image = await Image.findByPk(Number(id));
            if (image === null) {
                return res.json(getErrorMessage(`image not found`));
            }

            const bufferStream = new stream.PassThrough();
            
            bufferStream.end(image.dataValues.data);

            return bufferStream.pipe(res);
        } catch (error) {
            return res.json(getErrorMessage(error.message));
        }
    }
}

module.exports = imageController;