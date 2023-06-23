const { fileLoader } = require('ejs');
const fs = require('fs')
const path = require('path')

const p = path.join(__dirname, '../', 'data', 'products.json')
function getData(cb) {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    })
}
module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    save() {
        getData(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(cb) {
        getData(cb);
    }
}