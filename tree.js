const fs = require('fs'),
fileContents = JSON.parse(fs.readFileSync('./default.json', 'utf8'));

/*console.log('parent: ' + fileContents[0].name);*/

let newTree = [];


for (let i=0; i<fileContents.length; i++){
    fileContents[i].parentId !==0 ? addChild(fileContents[i]) : newTree.push(fileContents[i])
}

function addChild(child) {
    newTree.find(function(parent){

        if (parent.id == child.parentId){
            parent.hasOwnProperty('childrens') ? '' : parent.childrens = [];
            parent.childrens.push(child)}
        }
    );
}


console.log(newTree);
