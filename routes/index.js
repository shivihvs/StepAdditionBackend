var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

/* GET home page. */
const app=express()
var corsOptions = {
  origin: "http://localhost:3000"
};
const cors = require('cors');
app.use(cors(corsOptions))
app.use(jsonParser)
app.use((req, res, next) => {
  
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})
app.post('/stepAddition',jsonParser, function(req, res) {
 
  num1=req.body.num1
  num2=req.body.num2
  l1=num1.length
  l2=num2.length
  if(l1>l2){
    num2='0'*(l1-l2)+num2
  }
  else if(l2>l1){
    num1='0'*(l2-l1)+num1
  }
  var carryString='_';
  var sumString='';
  var c=1;
  var result={}
  for(let i=num1.length-1;i>=0;i--){
    var NcarryString
    var NsumString
    var sum
    let key='step'+c;
    
    if(carryString[0]=='1'){
      sum=Number(num1[i])+Number(num2[i])+1
    }
    else{
      sum=Number(num1[i])+Number(num2[i])
    }
    if(sum>=10){
      if(i==0){
        NcarryString=carryString
        NsumString=(sum)+sumString
      }
    else{
      NcarryString=1+carryString
    NsumString=(sum-10)+sumString
    }
  }
  else{
    if (i==0){
      NcarryString=carryString
    }
    else{
    NcarryString=0+carryString
    }
    NsumString=sum+sumString
  }
  
    result[key]={"carryString":NcarryString,"sumString":NsumString}
    carryString=NcarryString
    sumString=NsumString

    c++;
  }
  console.log(result)
  res.send(result)
  
});
app.use('/', router);


app.listen(3001)
module.exports = router;
