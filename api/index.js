const database = require('./database');
const Product = require('./models/product');
const Manufacturer = require('./models/manufactor');
const Category = require('./models/category');
const ProductCategory = require('./models/productCategory');

(async () => {
    await database.sync();
    //---

    const cat = await Category.create({
        name: 'Phonesxx'
    })

    const p1 = await Product.findByPk(1)

    p1.addCategory(cat);

    //---

    const models = {
        P: {
            model: Product,
            fields: {
                field1: 'title',
                field2: 'description',
                field3: 'manufacturerId',
            }
        },
        M: {
            model: Manufacturer,
            fields: {
                field1: 'name',
                field2: 'info'
            }
        },
        C: {
            model: Category,
            fields: {
                field1: 'name'
            }
        }
    }
    if (process.argv.length >= 4) {
        const [ operation, table ] = process.argv.slice(2, 4);

        const model = models[table].model;
        //        const model = Product;

        if (!model) {
            console.log(`Table not exist`);
            process.exit(1);
        }

        if (operation === 'C') {
            const [ field1, field2, field3 ] = process.argv.slice(4);

            let record = {
                [models[table].fields.field1]: field1,
            }
            
            if (field2) {
                record = {
                    ...record,
                    [models[table].fields.field2]: field2,
                }
            }

            if (field3) {
                record = {
                    ...record,
                    [models[table].fields.field3]: field3,
                }
            }

            console.log(`creating record...`)
            console.log(record)
            await model.create(record)
        } else if (operation === 'R') {
            const [ id ] = process.argv.slice(4);

            if (id) {
                console.log(`show id: ${id}`)
                const record = await model.findByPk(id);
    
                console.log(record.dataValues);

                if (model === Product) {
                    const m = await record.getManufacturer();
                    if (m)
                        console.log(m.dataValues);
                }

                if (model === Manufacturer) {
                    const p = await record.getProducts();
                    if (p)
                        console.table(p.map((p) => p.dataValues));
                }

            } else {
                console.log('show all')
                const resultSet = await model.findAll();

                const products = resultSet.map((p) => p.dataValues)
                console.table(products);
            }
        } else if (operation === 'U') {
            const [ title, description, id ] = process.argv.slice(4);

            await model.update({
                title,
                description
            }, {
                where: {
                    id
                }
            })
        } else if (operation === 'D') {
            const [ id ] = process.argv.slice(4);
            if (id) {
                await model.destroy({
                    where: {
                        id
                    }
                })
            }
        }
    }
})()

//database.sync({force: true});
