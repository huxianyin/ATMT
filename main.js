const {app,ipcMain,BrowserWindow} = require('electron');
const fs = require('fs');
let win = null;
const save_dir = "./results/";
const phases = ['trailA','partA','trailB','partB'];


function joinPath(phase,exp_name){
    return save_dir + "result_" + phase + "_" + exp_name + ".csv";
  }

function createWindow(){
    win = new BrowserWindow({width:1600,height:1800});
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
    win.on('closed',function(){
        win = null;
    });
    win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });
}

app.on('ready',function(){
    createWindow();
    if (!fs.existsSync(save_dir)){
        fs.mkdirSync(save_dir);
    }
});

app.on('activate',() => {
    if (win == null){
        createWindow();
    }
});

app.on('window-all-closed',function(){
    if(process.platform!='darwin'){
        app.quit();
    }
});

ipcMain.on('window-all-closed',function(){
    win = null;
    app.quit();
});

ipcMain.on('clear-history',(event,arg)=>{
    fs.writeFile(arg.fname, "",  'utf8', function (err) {
        if (err) {
            throw err;
        }
      });
    });

ipcMain.on('submit-result', (event, arg) => {
    fs.appendFile(arg.fname, arg.data, 'utf8', function (err) {
      if (err) {
          throw err;
      }
    });
  });



function readFromFile(file_name,phase)
{
    fs.readFile(file_name,'utf8', function (err,data) {
        if (err) {
            throw err;
        }
        else
        {
            var result = {};
            result[phase] = data;
            win.webContents.send("receive-result",result);
        }
    });
}

  
ipcMain.on('load-result',(event,arg)=>{
    for(var i=0;i<phases.length;i++)
    {
        readFromFile(joinPath(phases[i],arg.exp_name),phases[i]);
    }
    
});

