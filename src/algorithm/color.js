class ColorBox{
    constructor(colorRange,total,data,size,pointMap){
        this.colorRange = colorRange;
        this.total = total;
        this.data = data;
        this.volume = (colorRange[0][1] - colorRange[0][0]) * (colorRange[1][1]-colorRange[1][0]) * (colorRange[2][1]-colorRange[2][0]);
        this.rank = this.total*(this.volume)
        this.size = size
        this.pointMap = pointMap
    }
    getpointMap(){
        var pointMap = this.pointMap; 
        var Myarr = [];
        for(var value in pointMap){
            Myarr.push([value,pointMap[value]['size']])
        }
       var newArr = Myarr.sort((a,b)=>{
            return b[1]-a[1];
        }).splice(0,10);
        return this.getColor(newArr,pointMap)
    }
    getColor(arr,pointMap){
        var colorArr=[];
        arr.forEach(value=>{
            var Bigx = 0,Bigy = 0, Bigz = 0;
            var length = value[1];
            for(var key in pointMap[value[0]]){
                if(key !== 'size'){
                    var bei = pointMap[value[0]][key]
                    var [x,y,z] = key.split(",").map(item=>item*bei);
                    if(x&&y&&z){
                        Bigx += parseInt(x)
                        Bigy += parseInt(y)
                        Bigz += parseInt(z)
                    }
                }
               
            }
            colorArr.push([parseInt(Bigx/length),parseInt(Bigy/length),parseInt(Bigz/length)])
        })
        return colorArr
    }
}
 

function themeColor(img, userSize, callback) {

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        width = 0,
        height = 0,
        imageData = null,
        size = 1;

    width = canvas.width = img.width;
    height = canvas.height = img.height;
    size = userSize;

    ctx.drawImage(img, 0, 0, width, height);

    imageData = ctx.getImageData(0, 0, width, height).data;

    var total = imageData.length / 4;

    var rMin = 255,
        rMax = 0,
        gMin = 255,
        gMax = 0,
        bMin = 255,
        bMax = 0;
    var pointMap = {};
    // 获取范围
    for (var i = 0; i < total; i++) {
        var red = imageData[i * 4],
            green = imageData[i * 4 + 1],
            blue = imageData[i * 4 + 2];
        var key = `${parseInt(red/51)},${parseInt(green/51)},${parseInt(blue/51)}`
        var name = `${red},${green},${blue}`
        if(pointMap[key]==null){
            pointMap[key] = {};
            pointMap[key][name] = 1;
            pointMap[key]['size'] = 1;
        }else{
            if(pointMap[key][name]==null){
                pointMap[key][name] = 1
            }else{
                pointMap[key][name] += 1
            }
            pointMap[key]['size'] += 1;
        }

    }

    var colorRange = [[rMin, rMax], [gMin, gMax], [bMin, bMax]];
    var colorBox = new ColorBox(colorRange, total, imageData,size,pointMap);
    const colorArr = colorBox.getpointMap();
    callback(colorArr);
}
export default themeColor;