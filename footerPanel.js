var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/footerPanel"], function(require, exports, __baseFooter__) {
    var baseFooter = __baseFooter__;
    
    
    
    

    var FooterPanel = (function (_super) {
        __extends(FooterPanel, _super);
        function FooterPanel($element) {
            _super.call(this, $element);
        }
        FooterPanel.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$saveButton = $('<a class="imageButton save"></a>');
            this.$options.prepend(this.$saveButton);

            this.$downloadButton = $('<a class="imageButton download"></a>');
            this.$options.prepend(this.$downloadButton);

            this.$downloadButton.on('click', function (e) {
                e.preventDefault();

                $.publish(FooterPanel.DOWNLOAD);
            });

            this.$saveButton.on('click', function (e) {
                e.preventDefault();

                $.publish(FooterPanel.SAVE);
            });

            if (this.provider.pkg.extensions && !this.provider.pkg.extensions.isAllOpen) {
                this.$embedButton.hide();
            }

            if (!(this.app).isSaveToLightboxEnabled()) {
                this.$saveButton.hide();
            }
        };

        FooterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        FooterPanel.DOWNLOAD = 'footer.onDownload';
        FooterPanel.SAVE = 'footer.onSave';
        return FooterPanel;
    })(baseFooter.FooterPanel);
    exports.FooterPanel = FooterPanel;
});
