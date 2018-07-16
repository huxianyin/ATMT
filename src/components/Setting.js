import React from 'react';
import '../css/Setting.css';
// a stateless component
const defaultParas = {
  num : 5,
  step : 10,
  task_r : false,
  exp_name : '1-1'
}

const Setting = (props) => {
    const min_num = 1;
    const min_step = 1;
    const max_step = 20;
    const max_num = 20;
    let {num,step,exp_name, task_r} = props;
    return (
      <div className="Setting">
        <header>
        <button className="reset-btn" onClick={()=>{props.Reset();}}>Reset</button>
          <h1 className="h1-text">ATMT</h1>
          <h2 className="h1-text">~Advanced Trail Making Test~</h2>
        </header>

        <div className="input-panel" >

          <div className="sub-container">
            <div className="param-label">{"Experiment Name (n - m)"}</div>
            <div className="param-label">{"Num "+"("+min_num+"~"+max_num+")"}</div>
            <div className="param-label">{"Step "+"("+min_step+"~"+max_step+")"}</div>
            <div className="param-label">Task-R</div>
          </div>

          <div className="sub-container">
              <div className="param-input">
                    <input className="input-area" type="text" pattern="[0-9]*-[0-9]*" value={exp_name} defaultValue={defaultParas.exp_name} onChange={
                      (v) =>{
                      props.handleParamChange("exp_name",v.target.value);
                      }
                    }/>
              </div>
              
              <div className="param-input">
                    <input className="input-area" type="number" pattern="[0-9]*" step="1" min={min_num} max={max_num} value={num} defaultValue={defaultParas.num} onChange={
                      (v) =>{
                        var value = v.target.value > max_num? max_num : v.target.value;
                        value = value < min_num ? min_num : value;
                        props.handleParamChange("num",value);
                      }
                    }/>
              </div>

              <div className="param-input">
                    <input className="input-area" type="number" pattern="[0-9]*" step="1" min={min_step} max={max_step} value={step} defaultValue={defaultParas.step} onChange={
                      (v) =>{
                        var value = v.target.value > max_step? max_step : v.target.value;
                        value = value < min_step ? min_step : value;
                        props.handleParamChange("step",value);
                      }
                    }/>
              </div>

              <div className="param-input">
                <label className="myCheckbox">
                    <input type="checkbox" checked={task_r} defaultValue={defaultParas.task_r} onChange={
                      (v) =>{
                        props.handleParamChange("task_r",v.target.checked);
                      }}/>
                    <span className="checkmark"></span>
                </label>
              </div>
          </div>
        </div>
        <button className="my-btn" onClick={()=>{props.handleNext();}}>Next</button>
        
      </div>
    );
  }

export default Setting;
