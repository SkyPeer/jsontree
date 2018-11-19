const fs = require('fs'),
fileContents = JSON.parse(fs.readFileSync('./default.json', 'utf8'));

let tree = [];

for (let i=0; i<fileContents.length; i++){
    if (fileContents[i].parentId == 0){
        tree.push(fileContents[i])
    }
}
for (let i=0; i<fileContents.length; i++){
    if (fileContents[i].parentId !=0){
        tree.find((parent)=>{
            if (parent.id == fileContents[i].parentId)
            {
                parent.hasOwnProperty('childrens') ? '' : parent.childrens = []
                parent.childrens.push(fileContents[i])
            }
        })
    }
}
for (let i=0; i<fileContents.length; i++){
    chilcrensCheck(fileContents[i])
}
function chilcrensCheck(seniorChildren) {
    for (let i=0; i<tree.length; i++){

        if (tree[i].hasOwnProperty('childrens')){

            tree[i].childrens.find((parent)=>{
                if (parent.id == seniorChildren.parentId)
                {
                    parent.hasOwnProperty('childrens') ? '' : parent.childrens = []
                    parent.childrens.push(seniorChildren)
                }
            })
        }
    }
}



console.log(tree[9]) // 14 root parents*/
