import React , {Component} from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import theme from 'fusioncharts/themes/fusioncharts.theme.ocean';

charts(FusionCharts)
theme(FusionCharts)

const showText = {
  trailA : "Trail-A",
  trailB : "Trail-B",
  partA : "Part-A",
  partB : "Part-B"
}

const chartTheme = "ocean";

// Pass fusioncharts as a dependency of charts
// a stateless component
const electron = window.require("electron");
const {ipcRenderer} = electron;

class Report extends Component {

  constructor(props){
    super(props);
    this.state={
      myDataSource : {},
      dataArry : [],
      dataObj : {},
      exp_name : props.exp_name
    }
    //console.log("constructer expname",this.state.exp_name);
  }

  componentDidMount(){
    ipcRenderer.on('receive-result', (event, arg) => {
      this.state.dataArry.push(arg);
      if(this.state.dataArry.length === 4)
      {
        this.state.dataObj = this.state.dataArry.reduce(function(result, currentObject) {
          for(var key in currentObject) {
              if (currentObject.hasOwnProperty(key)) {
                  result[key] = currentObject[key];
              }
          }
          return result;
      }, {});
        var tempDataSource = {};
        for(var key in this.state.dataObj)
        {
            tempDataSource[key] = this.ParseResult(this.state.dataObj[key]);
        }
        this.state.myDataSource = tempDataSource;
        this.setState({myDataSource:tempDataSource});
      }
    });
    ipcRenderer.send('load-result',{exp_name:this.state.exp_name});
  }

  ParseResult(csvResult)
  {
      var rows = csvResult.split('\n');
      var categories = [];
      var data = [];
      for(var i=2;i<rows.length;i++)
      {
          var item_id = parseInt(rows[i].split(',')[0]) + 1;
          var usedTime = parseFloat(rows[i].split(',')[1]);
          categories.push({"label":item_id});
          data.push({"value":usedTime});
      }
      return {data:data,categories:categories};
  }

  generateChartConfig(phase1,phase2)
  {
    if(this.state.myDataSource[phase1] === undefined )
    {
      return "";
    }
    var categories = this.state.myDataSource[phase1].categories.length > this.state.myDataSource[phase2].categories.length ? 
    this.state.myDataSource[phase1].categories : this.state.myDataSource[phase2].categories ;
    var myDataSource = {
      "chart": {
          "caption": "ATMT Result (" + showText[phase1] + " vs " + showText[phase2]+")",
              "subcaption": "Exp:"+this.state.exp_name,
              "xaxisname": "Question ID",
              "yaxisname": "Time(sec)",
              "theme": chartTheme
      },
          "categories": [{"category": categories }],
          "dataset": [
          {
              "seriesname": showText[phase1],
                  "renderas": "line",
                  "showvalues": "0",
                  "data": this.state.myDataSource[phase1].data
          },
          {
            "seriesname": showText[phase2],
                "renderas": "line",
                "showvalues": "0",
                "data": this.state.myDataSource[phase2].data
        }]};

    var chartConfigs = {
      id: phase1 + "-" + phase2,
      type: "mscombi2d",
      width: 500,
      height: 300,
      dataFormat: "json",
      dataSource: myDataSource
    };
    return chartConfigs

  }

  render(){
    
    var chartConfigs1 = this.generateChartConfig("partA","partB");
    var chartConfigs2 = this.generateChartConfig("trailA","trailB");
    var chartConfigs3 = this.generateChartConfig("partA","trailA");
    var chartConfigs4 = this.generateChartConfig("partB","trailB");


    return (
      <div className="container">
        <button className="reset-btn" onClick={()=>{this.props.Reset();}}>Reset</button>
          <h3>Report</h3>
          <table className="table">
            <tbody className="table">
              <tr>
                <th className="chart"><ReactFC {...chartConfigs1}/></th>
                <th className="chart"><ReactFC {...chartConfigs2}/></th>
              </tr>
              <tr>
                <th className="chart"><ReactFC {...chartConfigs3}/></th>
                <th className="chart"><ReactFC {...chartConfigs4}/></th>
              </tr>
            </tbody>
          </table>
        <button className="quit-btn" onClick={()=>{this.props.quitAPP();}}>Quit</button>
      </div>
    );
  }
  }

export default Report;
