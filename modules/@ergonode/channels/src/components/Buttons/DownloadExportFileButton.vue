/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Channels.channel.components.DownloadExportFileButton.title')"
        :size="smallSize"
        :disabled="!isAllowedToUpdate"
        @click.native="onDownloadExportFile" />
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapState,
} from 'vuex';

export default {
    name: 'DownloadExportFileButton',
    props: {
        link: {
            type: String,
            required: true,
        },
        filename: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('channel', [
            'type',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        async onDownloadExportFile() {
            const response = await this.$axios.$get(this.link, {
                responseType: 'arraybuffer',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([
                response,
            ]));
            const link = document.createElement('a');

            link.href = downloadUrl;
            link.setAttribute('download', `export_${this.type}_${this.filename}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
    },
};
</script>
