/// <reference path="../../js/jquery.d.ts" />

import baseFooter = require("../coreplayer-shared-module/footerPanel");
import baseApp = require("../coreplayer-shared-module/baseApp");
import app = require("../../extensions/wellcomeplayer-seadragon-extension/app");
import utils = require("../../utils");
import embed = require("../coreplayer-dialogues-module/embedDialogue");

// adds save and download buttons
// checks if embed is enabled
export class FooterPanel extends baseFooter.FooterPanel {

    $saveButton: JQuery;
    $downloadButton: JQuery;
    
    static DOWNLOAD: string = 'footer.onDownload';
    static SAVE: string = 'footer.onSave';

    constructor($element: JQuery) {
        super($element);
    }

    create(): void {
        super.create();

        this.$saveButton = $('<a class="imageButton save"></a>');
        this.$options.prepend(this.$saveButton);

        this.$downloadButton = $('<a class="imageButton download"></a>');
        this.$options.prepend(this.$downloadButton);

        this.$downloadButton.on('click', (e) => {
            e.preventDefault();

            $.publish(FooterPanel.DOWNLOAD);
        });

        this.$saveButton.on('click', (e) => {
            e.preventDefault();

            $.publish(FooterPanel.SAVE);
        });

        // show embed button if no assets require authentication.
        if (this.provider.pkg.extensions && !this.provider.pkg.extensions.isAllOpen) {
            this.$embedButton.hide();
        }

        if (!(<app.App>this.app).isSaveToLightboxEnabled()) {
            this.$saveButton.hide();
        } 
    }

    resize(): void {
        super.resize();
    }
}