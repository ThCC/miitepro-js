/**
 * Created by thiago.dsn.cir on 28/03/18.
 */
const b2a = require('b2a');
const atob = require('atob');
const fileSystem = require('fs');

const bar = {
    getFile: (fileName) => {
        const path = '/home/local/ALTERDATA/thiago.dsn.cir/test_files/';
        const fullPath = path + fileName;
        return new Promise((resolve) => {
            fileSystem.readFile(fullPath, (err, data) => {
                // console.log('');
                // console.log('file name', fileName);
                // console.log('data size', _.divide(data.length, 1024 * 1024));
                // const dataB64 = b2a.btoa(data.toString());
                // console.log('dataB64 size', _.divide(data.length, 1024 * 1024));
                resolve(data);
            });
        });
    },
    f1: () => {
        bar.getFile('sdf.txt').then((content) => {
            try {
                console.log(content);
                b2a.atob(content);
            } catch (e) {
                console.log(e);
            }
        });
    },
    f2: () => {
        bar.getFile('sdf.txt').then((content) => {
            try {
                console.log(content);
                atob(content);
            } catch (e) {
                console.log(e);
            }
        });
    }
};

// bar.f1();
bar.f2();