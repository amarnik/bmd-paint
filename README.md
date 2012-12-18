bmd-paint
=========

Browser-Mobile-Desktop paint app

Technologies used:
- node.js
- backbone.js
- underscore.js
- require.js
- jquery
- socket.io
- phonegap
- node-webkit

This app is to demonstrate ability to write a javascript code that can be deployed to web, mobile, desktop.


ToDo:
- fix backbone structure - DONE
- add deployment instructions for mobile and desktop - DONE
- implement responsive design (maybe http://cssgrid.net/?)
- fix touchmove in mobile
- add color wheel instead of four color boxes
- add line thickness slider
- add transparency slider
- remove "start paint" button - just launch paint right away - DONE
- add "clear" button to remove all lines



HOW To USE IT:

run node in main folder:
#node app

BROWSER: open browser and point to 
http://localhost:3000/index.html

DESKTOP:
install node-webkit (https://github.com/rogerwang/node-webkit)
run:
#/Applications/node-webkit.app/Contents/MacOS/node-webkit bmd-paint/client/

MOBILE (iOS):
install PhoneGap and Xcode
copy content of the 'client' folder to the 'www' folder in your phonegap app
run the simulator (or deploy to the device)
