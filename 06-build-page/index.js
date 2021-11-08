const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');

async function createPage() {
  // index.html
  await fs.promises.mkdir(projectDist, { 'recursive': true });
  const template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
  await fs.promises.writeFile((path.join(projectDist, 'index.html')), template);
  const indexFile = await fs.promises.readFile(path.join(projectDist, 'index.html'), 'utf8'); 
  const result = indexFile.match(/{{[a-z]+}}/g);
  
  for (const i of result) {
    const fileName = i.slice(2,-2);
    const fileContent = await fs.promises.readFile(path.join(__dirname, 'components', `${fileName}.html`), 'utf8');
    const currentIndexFile = await fs.promises.readFile(path.join(projectDist, 'index.html'), 'utf8');
    const newFile = currentIndexFile.replace(i, fileContent);
    await fs.promises.writeFile(path.join(projectDist, 'index.html'), newFile);
  }



  //style.css
const style = fs.createWriteStream(path.join(projectDist, 'style.css'));
const filePath = path.join(__dirname, "styles")
fs.readdir(filePath, (err, files) => {
    if(err) throw err;
    files.forEach((file) => {
        fs.stat(filePath + '/' + file, (err, stats) => {
            if(err) throw err; 
            else if (stats.isFile()) {
                let exitName = path.extname(file)
                if (exitName === '.css') {
                    const stream = fs.createReadStream(filePath + '/' +  file);
                    let result = [];
                    stream.on('data', oneFile => style.write(result += oneFile));
                    }
                }
            });

        });
    });

    

  //assets 
  await fs.promises.mkdir(path.join(projectDist, 'assets'), { 'recursive': true });
  const folders = await fs.promises.readdir(path.join(__dirname, 'assets'));
  for (let folder of folders) {
    
    await fs.promises.mkdir(path.join(projectDist, 'assets', folder), { 'recursive': true });
    const files = await fs.promises.readdir(path.join(__dirname, 'assets', folder));
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'assets', folder.toString(), file), path.join(projectDist, 'assets', folder.toString(), file), (err) => {
        if (err) throw err;
      });
    });
  }

}

createPage()