** Mobile Troubleshooter **

This was written to provide a quick way to obtain console.log output on mobile
devices where access to the development console is hard or not possible.

This creates a fixed window and redirects the console.log output to it.

This was also written for me to get a better feel of using browserfy, jasmine, and
MVC.

 * Discovered that my model between tests would hold values from previous tests.  Determined that module.exports was 
caching the model object so every creation of logger would have the same model reference. Found this link 
(http://bites.goodeggs.com/posts/export-this/) that helped explain.  Made the model code return a function on module.exports
so when it is run it returns a new model object each time.