rm -Rf ../client.prod

# build main app
node ./r.js -o ./app.build.js

# build modules [canvas]
node ./r.js -o ./canvas.build.js  

# clean up unnecessary files for [canvas] module
rm -Rf ../client.prod/js/app/modules/canvas/collections
rm -Rf ../client.prod/js/app/modules/canvas/models
rm -Rf ../client.prod/js/app/modules/canvas/views