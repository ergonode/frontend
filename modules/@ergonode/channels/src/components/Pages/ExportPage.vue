/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigationBackFab />
            </template>
            <template #mainAction>
                <Button
                    v-if="isDownloadFile"
                    title="DOWNLOAD FILE"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    :disabled="!isUserAllowedToUpdate"
                    @click.native="onDownloadExportFile" />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar :items="tabs" />
    </Page>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ExportPage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        ...mapState('channels', {
            export_details: state => state.export_details,
            type: state => state.type,
        }),
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
        isDownloadFile() {
            return this.export_details._links && this.export_details._links.attachment;
        },
    },
    methods: {
        onDownloadExportFile() {
            const {
                _links,
                ended_at,
            } = this.export_details;
            const url = _links.attachment.href;

            this.$axios.$get(url, {
                responseType: 'arraybuffer',
            })
                .then((response) => {
                    const downloadUrl = window.URL.createObjectURL(new Blob([
                        response,
                    ]));
                    const link = document.createElement('a');

                    link.href = downloadUrl;
                    link.setAttribute('download', `export_${this.type}_${ended_at}.zip`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
        },
    },
};
</script>
