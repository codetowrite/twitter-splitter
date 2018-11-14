const {app, BrowserWindow} = require('electron') // imports for electron
const {Menu, Tray} = require('electron') // imports for tray
const path = require('path')
const url = require('url')

let window = null
let tray = null;

// Wait until the app is ready
app.once('ready', () => {
  app.isQuiting = false;
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 800px
    width: 1024,
    // Set the initial height to 600px
    height: 600,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#D6D8DC",
    icon: "res/icon.png",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    resizable: true
  
  });

  tray = new Tray("res/icon.png");
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
        window.show();
    } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
    } }
  ]);
  tray.setToolTip('Twitter Splitter - ctw');
  tray.setContextMenu(contextMenu);
 

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })

  window.on('minimize',function(event){
    event.preventDefault();
    window.hide();
  });

  window.on('close', function (event) {
    if(!app.isQuiting){
        event.preventDefault();
        window.hide();
    }

    return false;
  });
})
