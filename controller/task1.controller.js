const fs = require('fs');
var csv = require('csv-parse');


let task1 = {};


task1.getCSVData = async (req, res) => {

    try {
        if (req.params.slug) {

            if (req.params.slug == '' || req.params.slug.toLowerCase() == 'books') {
                file = 'books.csv';
                renderPath = 'index';
            } else if (req.params.slug != '' && req.params.slug.toLowerCase() == 'magazine') {
                file = 'magazines.csv';
                renderPath = 'magazine';
            } else {
                res.render('notfound');
            }
        } else {
            file = 'books.csv';
            renderPath = 'index';
        }
        let resData = [];
        if (fs.existsSync('public/files/' + file)) {
            var csvData = [];
            fs.createReadStream('public/files/' + file)
                .pipe(csv.parse({ delimiter: ';' }))
                .on('data', function (csvrow) {
                    csvData.push(csvrow);
                })
                .on('end', function () {
                    for (let d = 1; d < csvData.length; d++) {
                        let obj = {};
                        obj.title = csvData[d][0];
                        obj.isbn = csvData[d][1];
                        obj.author = [];
                        let au = csvData[d][2].split(',');
                        for (let a = 0; a < au.length; a++) {
                            obj.author[a] = au[a];
                        }
                        obj.desc = csvData[d][3];
                        resData.push(obj);
                    }
                    console.log(resData);
                    res.render(renderPath, { data: resData });
                })
                .on('error', (CsvError) => {
                    console.log(CsvError);
                })
        }
    } catch (error) {
        return error.message;
    }

}






module.exports = task1;