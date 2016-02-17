# Mobile Troubleshooter / Logger

This was written to provide a quick way to obtain console.log output on mobile
devices where access to the development console is hard or not possible.

This creates a fixed transparent window and redirects the console.log output to it.

## Usage 

1. Download the `dist/scripts/app/logger.min.js` 
1. Add a '<script>' tag in your HTML file.  `<script src="/yourpath/logger.min.js"></script>`
1. In your javascript file, you can access the jhlogger reference that has been added from the above step.  To turn on:
`var log = jhLogger(true);` 
You can change the location of the window using:
`var log = jhLogger(true, {location: 'top right'});`
location can be either: 'top left' (default), 'top right', 'bottom left', or 'bottom right'

To change the location of the window after you have turned it on by the setConfig function:
`var log = jhLogger(true);
 log.setConfig({location: 'bottom left'});`
 
You can change the style of the window using the addStyle function.  For example, to change the width of the window:

`var log = jhLogger(true);
 log.addStyle('width','20%');`
 
You can temporarily return to the normal console.log, by:
 
 `var log = jhLogger(true);
  log.turnOff();`
  
Then turn back on by:

`log.turnOn();`

You can remove the logger markup from the HTML and restore console.log back to original by:
 `log.remove();`
 
 