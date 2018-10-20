import fs from 'fs';
import Tokens from 'csrf';

const csrf = new Tokens();

module.exports = {
  generateAntiForgery() {
    const secret = csrf.secretSync();
    return {
      secret,
      csrf: csrf.create(secret),
    };
  },

  readJson(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(require.resolve(path), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },

  // saveFile(name, body) {
  //   fs.writeFile(name, body, (err) => {
  //     if (err) throw err;
  //     console.log('success');
  //   });
  // },

  // // for debug
  // displayProperties(props) {
  //   props.forEach((prop) => {
  //     console.log(`"${prop.name}","${prop.label}"`);
  //     // console.log({
  //     //   name: prop.name,
  //     //   label: prop.label,
  //     //   // description: prop.description,
  //     //   // groupName: prop.groupName,
  //     //   // type: prop.type
  //     // });
  //   });
  // },

};
