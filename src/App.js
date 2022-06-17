import React, { Component } from 'react';
import './css/App.css';
import Setting from './components/Setting'
import TrailA from './components/TrailA'
import PartA from './components/PartA'
import TrailB from './components/TrailB'
import PartB from './components/PartB'
import Report from './components/Report'
import { Router, Route, browserHistory } from 'react-router';
const electron = window.require("electron");

const { ipcRenderer } = electron;
const save_dir = "./results/";

const defaultParas = {
    num: 5,
    step: 10,
    task_r: false,
    exp_name: '1-1'
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: {
                num: defaultParas.num,
                step: defaultParas.step,
                task_r: defaultParas.task_r,
                exp_name: defaultParas.exp_name
            }
        };

    }
    reset() {
        if (window.confirm('resetすると、今までの成績は無くなります。本当にresetしますか？')) {
            window.history.pushState(null, null, '/');
            window.location.reload();

        }
    }


    handleParameterChange(name, v) {
        let { setting } = this.state;
        if (name === "task_r" || name === "exp_name") {
            setting[name] = v;
        } else {
            setting[name] = parseFloat(v);
        }
    }


    json2csv(json) {
        var header = Object.keys(json[0]).join(',') + "\n";

        var body = json.map(function(d) {
            return Object.keys(d).map(function(key) {
                return d[key];
            }).join(',');
        }).join("\n");

        return header + body;
    }

    handleNext(next) {
        //this.setState({phase:next});
        browserHistory.push(next);
        if (next === "trailA") {
            var config = [{
                num: this.state.setting.num,
                step: this.state.setting.step,
                task_r: this.state.setting.task_r
            }];
            var file_name = save_dir + "config_" + this.state.setting.exp_name + ".csv";
            this.handleClearHistory(file_name);
            this.handleSubmitResult(file_name, this.json2csv(config));
        }
    }

    handleSubmitResult(file_name, data) {
        ipcRenderer.send('submit-result', { data: data, fname: file_name });
    }

    handleClearHistory(file_name) {
        ipcRenderer.send('clear-history', { fname: file_name });
    }

    quitApp() {
        var ele_window = electron.remote.getCurrentWindow();
        ele_window.close();
        window.history.pushState(null, null, '/');
        window.location.reload();
        ipcRenderer.send('window-all-closed');
    }

    render() {

        const MySettingPage = (props) => {
            return ( <
                Setting num = { this.state.num }
                step = { this.state.step }
                task_r = { this.state.task_r }
                exp_name = { this.state.exp_name }
                handleNext = { this.handleNext.bind(this, "trailA") }
                handleParamChange = { this.handleParameterChange.bind(this) }
                Reset = { this.reset }
                />
            );
        }

        const TrailAPage = (props) => {
            return ( <
                TrailA handleNext = { this.handleNext.bind(this, "partA") }
                Reset = { this.reset }
                exp_name = { this.state.setting.exp_name }
                task_r = { this.state.setting.task_r }
                onClearHistory = { this.handleClearHistory.bind(this) }
                onSubmitResult = { this.handleSubmitResult.bind(this) }
                />
            );
        }

        const PartAPage = (props) => {
            return ( <
                PartA handleNext = { this.handleNext.bind(this, "trailB") }
                Reset = { this.reset }
                exp_name = { this.state.setting.exp_name }
                num = { this.state.setting.num }
                task_r = { this.state.setting.task_r }
                onClearHistory = { this.handleClearHistory.bind(this) }
                onSubmitResult = { this.handleSubmitResult.bind(this) }
                step = { this.state.setting.step }
                />
            );
        }

        const TrailBPage = (props) => {
            return ( <
                TrailB handleNext = { this.handleNext.bind(this, "partB") }
                Reset = { this.reset }
                exp_name = { this.state.setting.exp_name }
                task_r = { this.state.setting.task_r }
                onClearHistory = { this.handleClearHistory.bind(this) }
                onSubmitResult = { this.handleSubmitResult.bind(this) }
                />
            );
        }

        const PartBPage = (props) => {
            return ( <
                PartB handleNext = { this.handleNext.bind(this, "report") }
                Reset = { this.reset }
                exp_name = { this.state.setting.exp_name }
                num = { this.state.setting.num }
                task_r = { this.state.setting.task_r }
                onClearHistory = { this.handleClearHistory.bind(this) }
                onSubmitResult = { this.handleSubmitResult.bind(this) }
                step = { this.state.setting.step }
                />
            );
        }

        const ReportPage = (props) => {
            return ( <
                Report id = "report"
                Reset = { this.reset }
                quitAPP = { this.quitApp }
                exp_name = { this.state.setting.exp_name }
                />);
            }

            return ( <
                div >
                <
                Router history = { browserHistory } >
                <
                Route exact path = "/"
                component = { MySettingPage }
                /> <
                Route path = 'setting'
                component = { MySettingPage }
                /> <
                Route path = 'trailA'
                component = { TrailAPage }
                /> <
                Route path = 'partA'
                component = { PartAPage }
                /> <
                Route path = 'trailB'
                component = { TrailBPage }
                /> <
                Route path = 'partB'
                component = { PartBPage }
                /> <
                Route path = 'report'
                component = { ReportPage }
                /> < /
                Router > <
                /div>
            );
        }
    }

    export default App;