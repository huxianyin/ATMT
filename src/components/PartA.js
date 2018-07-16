import React from 'react';
import TrailMakingTest from './TrailMakingTest'
import '../css/tmtStyle.css';
const rule_title="検査A本番:ルール";
const rule_content = <p>スタートしたら，<span>検査A本番</span>が始まります。画面に書かれている数字の1から2，3というように数字の順番に，できるだけ早く，クリックしてください。この成績は最後の成績に記入します。</p>;
// a stateless component
const PartA = (props) => {
    return (
      <div className="container">
          <button className="reset-btn" onClick={()=>{props.Reset();}}>Reset</button>
          <h3>~ Part A ~</h3>
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
          phase='partA'
          onClearHistory={props.onClearHistory}
          onSubmitResult={props.onSubmitResult}
          onClickNext={props.handleNext}
          step={props.step}/>
        
      </div>
    );
  }

export default PartA;
