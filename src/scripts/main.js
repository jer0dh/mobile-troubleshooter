
jQuery('document').ready(function() {

    console.log('hello');
    console.log(logger);
    log = logger(true, {location: 'top right'});
    console.log('world');
    for(var i = 0; i < 50 ; ++i) {
        console.log('i = ' + i);
    }
    log.deactivate();
    console.log('deactivated');
    for(var i = 0; i < 50 ; ++i) {
        console.log('i = ' + i);
    }
});





