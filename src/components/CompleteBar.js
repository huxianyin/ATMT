import React, { Component } from 'react';
import '../css/tmtStyle.css';

class CompleteBar extends Component {

    constructor(props){
        super(props);
        this.state = {
          started : props.started,
          completeNum : 0,
          step : 0,
          num: 0,
          progress:0.0
        }
    }

    setStep(_step)
    {
        this.state.step = _step;
        this.setState({step:_step});
    }

    setNum(_num)
    {
        this.state.num = _num;
        this.setState({num:_num});
    }

    onStart()
    {
        this.state.started = true;
        this.setState({started:true});
    }
    setCompleteNumber(completenum)
    {
        this.state.completeNum = completenum;
        var progress = 0.0;
        if(this.state.num === 0){
            progress = 0.0;
        }
        else
        {
            progress = this.state.completeNum / (this.state.num + this.state.step);
        }
        this.state.progress = progress;
        this.setState({completeNum:completenum,progress:progress});

    }

    componentDidMount()
    {
        this.state.completeNum = 0;
        this.state.step = 0;
        this.state.num = 0;
        this.state.progress = 0.0;
    }

    render(){
        const style = {
            backgroundColor: '#0BD318',
            width: this.state.progress*100 + '%',
            transition: `width ${200}ms`,
            height: 5
          };
        const style_text = {
            position:'fixed',
            textAlign:'center',
            left:'44%'
        };
        return (            
        <div className="completeBar" style={style}>
            {(() => {
                    if (this.state.started)
                    {
                        return <p style={style_text}>{"完成："+ parseInt(this.state.progress*100)+"%"}</p>;
                    }
                })()
            }
        </div>
    );}
}

export default CompleteBar;
