


module.exports = {
    _remote:         false,
        config:         {
    location:       'top left', //'top left', 'top right', 'bottom left', or 'bottom right'
        styles:          []
},

    oldLog:         console.log,

        setConfig:     function(cfg) {
    if (typeof cfg !== 'undefined'){
        if (cfg.location) {
            this.config.location = cfg.location;
        }
        if (cfg.styles) {
            this.config.styles = cfg.styles;
        }
    }

},

    setRemote:      function(b) {
        if(b) {

            this._remote = true;
        } else {

            this._remote=false;
        }
    },
    getRemote:      function() { return this._remote; }


}