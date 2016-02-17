** Ideas **

logger( string , window);

Pass in a string to be shown on 'window'  

logger = createLogger({location: 'bottom, top, left, right', textColor: , background-color: , width: , height: ,})

Open websocket port to send data to another screen

require('logger');

draggable?
http://stackoverflow.com/questions/3404907/how-to-use-jquery-draggable-with-fixed-position

Maybe Problems with touch devices though

possible library https://github.com/taye/interact.js


 * Discovered that my model between tests would hold values from previous tests.  Determined that module.exports was 
caching the model object so every creation of logger would have the same model reference. Found this link 
(http://bites.goodeggs.com/posts/export-this/) that helped explain.  Made the model code return a function on module.exports
so when it is run it returns a new model object each time.
