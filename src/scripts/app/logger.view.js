

module.exports = {
    $rconsole: null,

    rconsole: function (s) {
        if (typeof this.$rconsole !== 'undefined') {
            var inner = this.$rconsole.innerHTML;
            this.$rconsole.innerHTML = inner + '<p>' + s + '</p>';
        }
    },

    init: function () {
        //prepare rconsole area
        var r = document.createElement('div');
        r.innerHTML = '<div id="rconsole"></div>';
        document.querySelector('body').appendChild(r);
        this.$rconsole = document.getElementById('rconsole');


        //add initial styles
        var sheet = document.createElement('style');
        sheet.innerHTML = "#rconsole { " +
            "     padding: 5px; " +
            "     position: fixed; " +
            "     top: 0; " +
            "     left: 0; " +
            "     width: 20%; " +
            "     max-height: 300px; " +
            "     overflow: auto; " +
            "     background: rgba(255,255,255,0.65); " +
            "     color: #000000; " +
            "     font-size: 12px; " +
            "     line-height: 1; " +
            "     z-index: 9999; " +
            " }" +
            "#rconsole p {" +
            "   margin:0;" +
            "}";

        document.body.appendChild(sheet);

    }
};
