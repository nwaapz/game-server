var shortid=require('shortid');

const Vector3 = require('./vector3');
module.exports=class player{
        constructor(){
            this.username="";
            this.id=shortid.generate();
            this.position=new Vector3();
            
        }

}