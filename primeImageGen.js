

var Canvas = require('canvas')
var fs = require("fs")




var lastPosition;
var currentPosition=lastPosition

var currentDirection = 0

var delta=2

var getRandomInt=function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var isPrime = function (num) {
    for ( var i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
}

var primeNumberGenerator = function*(RangeMax,Max){
    var i=0
    while (i<Max){
        var n = getRandomInt(1,RangeMax)
        while (!isPrime(n)){
            n = getRandomInt(1,RangeMax)
        }
        i+=1
        yield n
    }
}

var getNextPosition=function(mode){
    if (mode == 1)
        //rotate to left
        currentDirection-=1
        if (currentDirection<0)
            currentDirection=3
    else if (mode == -1)
        currentDirection+=1
        if (currentDirection>3)
            currentDirection=0
    
    if (currentDirection == 0)
        return [lastPosition[0]+delta,lastPosition[1]]
    else if (currentDirection == 1)
        return [lastPosition[0],lastPosition[1]-delta]
    else if (currentDirection == 2)
        return [lastPosition[0]-delta,lastPosition[1]]
    else
        return [lastPosition[0],lastPosition[1]+delta]
}




var setMode=function(num){
    if ((num+1)%6==0)
        return 1
    else if ((num-1)%6==0)
        return -1
    else
        return 0
}


var imagefunction = function (params) {
    var maxWidth=800
    var maxHeight=800
    lastPosition=[maxHeight/2,maxWidth/2]
    currentDirection = 0
    delta=2
    currentPosition=lastPosition
      var canvas = new Canvas(maxWidth,maxHeight)
  var ctx = canvas.getContext('2d');
ctx.strokeStyle = "#FF0000"
ctx.beginPath();
ctx.lineWidth=4
ctx.lineTo(lastPosition[0],lastPosition[1]);
currentDirection=0
var i=0

var primes=primeNumberGenerator(params.randMax,params.max)

for (var l=0;l<params.max;l++){
        var k=primes.next().value
        i+=1
        currentPosition=getNextPosition(setMode(k))
        ctx.lineTo(currentPosition[0],currentPosition[1]);
        lastPosition=currentPosition
}
ctx.stroke();
return canvas;
}




var imagefunctionsave = function(params,id,callback){
    if (!params){
        params={randMax:30000,max:80000}
    }
    var image = imagefunction(params)
    var out = fs.createWriteStream(__dirname+"/"+id+".png")
var stream = image.pngStream()
stream.on("data",function (chunk) {
    out.write(chunk)
})

stream.on("end",function () {
    callback(id+".png")
})

}

var imagefunctionhtml = function (params) {

if (!params){
        params={randMax:30000,max:80000}
    }
    
    var canvas = imagefunction(params)

return canvas.toDataURL()
}

module.exports.imagefunctionhtml = imagefunctionhtml
module.exports.imagefunctionsave = imagefunctionsave