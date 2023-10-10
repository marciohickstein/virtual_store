const Category = require("../models/category")
const { getErrorMessage } = require('../response');

const categoryController = {
    getAll: async (req, res) => {
        const categories = (await Category.findAll()).map(c => c.dataValues);

        return res.json(categories);
    },

    getOne: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.json(getErrorMessage(`id not informed`));
        }

        try {
            const category = await Category.findByPk(Number(id));
            if (category === null) {
                return res.json(getErrorMessage(`category not found`));
            }

            return res.json(category.dataValues);
        } catch (error) {
            return res.json(getErrorMessage(error.message));
        }

    },

    create: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.json(getErrorMessage(`name not informed`));
        }

        try {
            await Category.create({
                name
            })

            return res.status(201).json({
                success: true,
                message: 'category created'
            })
        } catch (error) {
            return res.json(getErrorMessage(error.message));
        }


    },

    delete: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.json(getErrorMessage(`id not informed`));
        }

        try {
            const result = await Category.destroy({
                where: {
                    id
                }
            })

            return res.status(204).json({
                success: true,
                message: `category removed`
            })
        } catch (error) {
            return res.json(getErrorMessage(error.message));
        }
    }
}

module.exports = categoryController;