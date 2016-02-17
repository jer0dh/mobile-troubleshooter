
jQuery('document').ready(function() {

    console.log('hello');
    console.log(jhLogger);
    var log = jhLogger(true, {location: 'top right'});
    console.log('world');
    for(var i = 0; i < 50 ; ++i) {
        console.log('i = ' + i);
    }
    log.setRemote(false);
    console.log('setRemote');
    for(var i = 0; i < 50 ; ++i) {
        console.log('i = ' + i);
    }
    console.log('addstyle');
    log.addStyle('background-color','rgba(230,230,55,0.8)');
    log.setRemote(true);
    for(var i = 0; i < 50 ; ++i) {
        console.log('i = ' + i);
    }
    log.setConfig({location: 'bottom left'});
    console.log('turning off..you cannot see me');
    log.turnOff();
    log.turnOn();
});





