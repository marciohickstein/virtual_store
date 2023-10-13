const { Op } = require('sequelize');

const { getErrorMessage } = require('../response');

function createController (model, includes = {}) {
    const tableName = model.getTableName();
    let fieldsFromModel = {};

    (async () => {
        fieldsFromModel = await model.describe();
    })()

    function validateFields(fields) {
        let error = "";

        for (const key in fieldsFromModel) {
            if (Object.hasOwnProperty.call(fieldsFromModel, key)) {
                if (key === 'id') {
                    continue;
                }

                const attributes = fieldsFromModel[key];

                if (attributes.allowNull === false) {
                    error = `Field ${key} not informed`;
                    return error;
                }
            }
        }

        return error;
    }

    function createAnObjectWithFields(fields) {
        let object = {};

        for (const key in fields) {
            if (Object.hasOwnProperty.call(fields, key)) {
                object = {
                    ...object,
                    [key]: fields[key]
                }
            }
        }

        return object;
    }

    return {
            getAll: async (req, res) => {
                const query = req.query;

                for (const key in query) {
                    if (Object.hasOwnProperty.call(query, key)) {
                        query[key] = {
                            [Op.iLike]: `${query[key]}%`
                        };
                    }
                }

                const params = {
                    where: query ? query : {},
                    include: includes.include
                }

                const items = (await model.findAll(params)).map((c) => {
                    return c.dataValues;
                });
                
                return res.json(items);
            },
        
            async getOne(req, res) {
                const { id } = req.params;
        
                if (!id) {
                    return res.status(400).json(getErrorMessage(`id not informed`));
                }
        
                try {
                    const item = await model.findByPk(Number(id));
                    if (item === null) {
                        return res.status(404).json(getErrorMessage(`${tableName} not found`));
                    }
        
                    return res.json(item.dataValues);
                } catch (error) {
                    return res.status(500).json(getErrorMessage(error.message));
                }
        
            },
        
            create: async (req, res) => {
                let error = validateFields(req.body);

                if (error && error.length > 0) {
                    return res.status(400).json(getErrorMessage(error));
                }

                const object = createAnObjectWithFields(req.body);        

                try {
                    await model.create(object);
        
                    return res.status(201).json({
                        success: true,
                        message: `${tableName} created`
                    })
                } catch (error) {
                    return res.status(409).json(getErrorMessage(error.message));
                }
            },
        
            update: async (req, res) => {
                const { id } = req.params;
        
                if (!id) {
                    return res.status(400).json(getErrorMessage(`id not informed`));
                }
        
                let error = validateFields(req.body);

                if (error && error.length > 0) {
                    return res.status(400).json(getErrorMessage(error));
                }

                const object = createAnObjectWithFields(req.body);        

                try {
                    const category = await model.findByPk(Number(id));
        
                    if (category === null) {
                        return res.status(404).json(getErrorMessage(`${tableName} not found`));
                    }
        
                    await model.update(object, {
                        where: {
                            id: Number(id)
                        }
                    })
        
                    return res.status(200).json({
                        success: true,
                        message: ` ${tableName} updated`
                    })
                } catch (error) {
                    return res.status(500).json(getErrorMessage(error.message));
                }
            },
        
            async delete(req, res) {
                const { id } = req.params;
        
                if (!id) {
                    return res.status(400).json(getErrorMessage(`id not informed`));
                }
        
                try {
                    const item = await model.findByPk(Number(id));
        
                    if (item === null) {
                        return res.status(404).json(getErrorMessage(`${tableName} not found`));
                    }
        
                    await model.destroy({
                        where: {
                            id: Number(id)
                        }
                    });
        
                    const response = {
                        success: true,
                        message: `Resource was delete successfully`
                    }
        
                    return res.json(response);
        
                } catch (error) {
                    return res.status(500).json(getErrorMessage(error.message));
                }
        
            },
        }
    }

module.exports =  createController;