

module.exports = {
    $rconsole: null,

    rconsole: function (s) {
        if (typeof this.$rconsole !== 'undefined') {
            var inner = this.$rconsole.innerHTML;
            this.$rconsole.innerHTML = inner + '<p>' + s + '</p>';
        }
    },

    init: function (cfg) {
        //prepare rconsole area
        var r = document.createElement('div');
        r.setAttribute('id', 'rconsole');
        document.querySelector('body').appendChild(r);
        this.$rconsole = document.getElementById('rconsole');

        //add initial styles
        var sheet = document.createElement('style');
        sheet.setAttribute('id', 'rconsoleStyles');
        sheet.innerHTML = `#rconsole {
                 padding: 5px;
                 position: fixed;
                 width: 20%;
                 max-height: 300px;
                 overflow: auto;
                 background: rgba(255,255,255,0.65);
                 color: #000000;
                 font-size: 12px;
                 line-height: 1;
                 z-index: 9999;
             }
            #rconsole p {
               margin:0;
            }`;

        document.body.appendChild(sheet);
        this.positionRconsole(cfg.location);

    },
    positionRconsole: function(s) {
        this.$rconsole.style.right="inherit";
        this.$rconsole.style.left="inherit";
        this.$rconsole.style.top="inherit";
        this.$rconsole.style.bottom="inherit";
        switch (s) {
            case 'top right':
                this.$rconsole.style.right="0";
                this.$rconsole.style.top="0";
                break;
            case 'bottom left':
                this.$rconsole.style.left="0";
                this.$rconsole.style.bottom="0";
                break;
            case 'bottom right':
                this.$rconsole.style.right="0";
                this.$rconsole.style.bottom="0";
                break;
            default:
                this.$rconsole.style.left="0";
                this.$rconsole.style.top="0";
        }

    },
    addStyle: function(style, value) {
        this.$rconsole.style[style] = value;
    },
    removeRconsole: function() {
        document.querySelector('body').removeChild(this.$rconsole);
        var $sheet = document.getElementById('rconsoleSheet');
        document.body.removeChild($sheet);
    },
    hideRconsole: function() {
      this.addStyle('display', 'none');
    },
    showRconsole: function() {
      this.addStyle('display', 'block');
    }
};
