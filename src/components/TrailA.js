import React from 'react';
import TrailMakingTest from './TrailMakingTest'
// a stateless component
const rule_title="検査Aの練習:ルール";
const rule_content = <p>今から，検査Aのための練習をします。画面に書かれている数字の<span>1から2，3というように数字の順番に，</span>"できるだけ早く，クリックしてください。間違っていますといいますので，すぐ訂正して次に進んでください。練習の成績は最後の成績に記入しません。練習は終わったら、本番の課題に進めます。</p>;

const TrailA = (props) => {
    const trail_num = 4;
    const step = 1;

    return (
      <div className="container">
      
        <button className="reset-btn" onClick={()=>{props.Reset();}}>Reset</button>
        <h3>~ Part A Trail ~</h3>
        <div className="container">
          <div className="box26">
            <span className="box-title">{rule_title}</span>
            {rule_content}
          </div>
        </div>

        <TrailMakingTest 
        exp_name={props.exp_name} 
        num={trail_num}
        task_r={props.task_r} 
        onClearHistory={props.onClearHistory}
        onSubmitResult={props.onSubmitResult}
        onClickNext={props.handleNext}
        phase='trailA'
        step = {step}/>
      </div>
    );
  }

export default TrailA;
