import React from 'react';
import TrailMakingTest from './TrailMakingTest'
import '../css/tmtStyle.css';
// a stateless component
const rule_title="A検査の練習";
const rule_content = <p>スタートしたら，<span>検査B本番</span>が始まります。画面に書かれている数字と仮名を、『1－あ－2－い－3－う』というように数字と仮名とを交互に，順番に，できるだけ早く、クリックしてくだいさい。この成績は最後の成績に記入します。</p>;

const PartB = (props) => {
    return (
      <div className="container">
        <button className="reset-btn" onClick={()=>{props.Reset();}}>Reset</button>
        <h3>~ Part B ~</h3>
        <div className="container">
          <div className="box26">
            <span className="box-title">{rule_title}</span>
            {rule_content}
          </div>
        </div>
        <TrailMakingTest 
        exp_name={props.exp_name}
        num={props.num}
        task_r={props.task_r} 
        phase='partB' 
        onClearHistory={props.onClearHistory}
        onSubmitResult={props.onSubmitResult}
        onClickNext={props.handleNext}
        step={props.step}/>
      </div>
    );
  }

export default PartB;
