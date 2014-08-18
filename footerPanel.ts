/// <reference path="../../js/jquery.d.ts" />

import baseFooter = require("../coreplayer-shared-module/footerPanel");
import baseExtension = require("../coreplayer-shared-module/baseExtension");
import utils = require("../../utils");
import embed = require("../coreplayer-dialogues-module/embedDialogue");
import IWellcomeExtension = require("../wellcomeplayer-shared-module/iWellcomeExtension");

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
        this.setConfig('extendedFooterPanel');

        super.create();

        this.$saveButton = $('<a class="imageBtn save"  title="' + this.content.save + '"></a>');
        this.$options.prepend(this.$saveButton);

        this.$downloadButton = $('<a class="imageBtn download" title="' + this.content.download + '"></a>');
        this.$options.prepend(this.$downloadButton);

        this.$downloadButton.on('click', (e) => {
            e.preventDefault();

            $.publish(FooterPanel.DOWNLOAD);
        });

        this.$saveButton.on('click', (e) => {
            e.preventDefault();

            $.publish(FooterPanel.SAVE);
        });

        //this.$embedButton.on('click', (e) => {
        //    e.preventDefault();
        //});

        // show embed button if no assets require authentication.
        if ((<IWellcomeExtension>this.extension).isEmbedEnabled()) {
            this.$embedButton.show();
        } else {
            this.$embedButton.hide();
        }

        if ((<IWellcomeExtension>this.extension).isSaveToLightboxEnabled()) {
            this.$saveButton.show();
        } else {
            this.$saveButton.hide();
        }

        if ((<IWellcomeExtension>this.extension).isDownloadEnabled()) {
            this.$downloadButton.show();
        } else {
            this.$downloadButton.hide();
        }
    }

    resize(): void {
        super.resize();
    }
}