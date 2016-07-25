var fs = require('fs');

var text = fs.readFileSync(process.argv[2]);

var object = JSON.parse(text);

var flipYZ = function(array, mirrorX, mirrorY, mirrorZ) {
  var y, z;
  
  for(var i = 0; i < array.length - 2; i += 3) {
    z = array[i + 1];
    y = array[i + 2];
    
    array[i + 1] = y;
    array[i + 2] = z;
    
    if(mirrorX) array[i] = -array[i];
    if(mirrorY) array[i + 1] = -array[i + 1];
    if(mirrorZ) array[i + 2] = -array[i + 2];
  }
}

object.meshes.forEach(function(v) {
  flipYZ(v.position, true);
  flipYZ(v.rotation, true);
  flipYZ(v.scaling);
  
  flipYZ(v.positions, true);
  flipYZ(v.normals, true);
  
  // Rewind faces - rewinding trian
//   flipYZ(v.indices);
  
  v.instances.forEach(function(v) {
    flipYZ(v.position, true);
    flipYZ(v.rotation, true);
    flipYZ(v.scaling);
  });
});

console.log(JSON.stringify(object));
