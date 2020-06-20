import React from 'react'
import themeColor from '../algorithm/color'
import './home.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgReuslt:'',
            colorArr:[],
        }
    }
    readFile(event){
        const file = event.target.files[0];
        const that = this;
        console.log(file);
        if (!/image\/\w+/.test(file.type)) {
            alert("文件必须为图片！");
            return false;
        }
        var reader = new FileReader();
            reader.readAsDataURL(file)
        var Addimage = that.Addimage
        reader.onload = function(e){
            that.setState({imgReuslt:this.result},()=>{
                Addimage.onload = function(){
                    if(Addimage!=null){
                        themeColor(Addimage, 10,(colorArr)=>{
                            that.setState({colorArr});
                    })
                }
            }
        })
    }
}
    render(){
        const {imgReuslt,colorArr} = this.state;
        return (
            <div className="container">
                <div className="myheader">
                    <span>专属于我家猫猫的图片解析器</span>
                </div>
                <div className="main">
                    <div className="left">
                        <form>
                        <label>请选择一个图像文件：</label>
                        <input type="file" id="file_input" onChange={this.readFile.bind(this)} />
                    </form>
                    <div id="result">
                        <img src={imgReuslt} alt="" ref={image=>this.Addimage = image} />
                    </div>
                    </div>
                    <div className="right">
                        {colorArr.length>0?colorArr.map(item=><div className="colorBox" style={{background:`rgba(${item.join(",")})`}}>rgba({item.join(",")})</div>):<div>等待放图中</div>}
                    </div>
                </div>
        </div>
        )
    }
}

export default Home;
