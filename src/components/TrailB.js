import React from 'react';
import TrailMakingTest from './TrailMakingTest'
// a stateless component
const rule_title="検査Bの練習:ルール";
const rule_content = <p>検査Bは少し違うことをしていただきます。最初はまた練習です。<span>今度は『1－あ－2－い－3－う』というように数字と仮名とを交互に，順番に，</span>クリックしていただきたいのです。もし途中で数字と仮名が交互でなかったり，順番を間違ったりしたときには，間違っていますといいますので，すぐ訂正して次に進んでください。できるだけ早く，数字と仮名を交互に，順番に，マークをクリックしてください。練習の成績は最後の成績に記入しません。練習は終わったら、本番の課題に進めます。</p>

const TrailB = (props) => {
    const trail_num = 2;
    const step = 1;

    return (
      <div className="container">
        <button className="reset-btn" onClick={()=>{props.Reset();}}>Reset</button>
        <h3>~ Part B Trail ~</h3>
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
        phase='trailB'
        step={step}/>
        
      </div>
    );
  }

export default TrailB;
