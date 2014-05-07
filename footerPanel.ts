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

        this.$saveButton = $('<a class="imageButton save"  title="' + this.content.save + '"></a>');
        this.$options.prepend(this.$saveButton);

        this.$downloadButton = $('<a class="imageButton download" title="' + this.content.download + '"></a>');
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

        this.$embedButton.hide();

        // show embed button if no assets require authentication.
        if (this.provider.manifest.extensions && this.provider.manifest.extensions.isAllOpen) {
            this.$embedButton.show();
        }

        this.$saveButton.hide();

        if ((<IWellcomeExtension>this.extension).isSaveToLightboxEnabled()) {
            this.$saveButton.show();
        }

        this.$downloadButton.hide();

        if ((<IWellcomeExtension>this.extension).isDownloadEnabled()) {
            this.$downloadButton.show();
        }
    }

    resize(): void {
        super.resize();
    }
}