/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Export details"
        :api-path="channelGridPath"
        @close="onClose">
        <template #headerActions>
            <div class="export-details-tiles">
                <Tile
                    v-for="(detail, index) in details"
                    :key="index"
                    :label="detail.label"
                    :value="detail.value" />
            </div>
        </template>
        <template #appendFooter>
            <Button
                v-if="downloadLink"
                title="DOWNLOAD FILE"
                :size="smallSize"
                :disabled="!isUserAllowedToUpdate"
                @click.native="onDownloadExportFile" />
        </template>
    </ModalGrid>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import Button from '@Core/components/Button/Button';
import ModalGrid from '@Core/components/Modal/ModalGrid';
import Tile from '@Core/components/Tile/Tile';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ExportDetailsModalGrid',
    components: {
        ModalGrid,
        Tile,
        Button,
    },
    props: {
        channelId: {
            type: String,
            required: true,
        },
        exportId: {
            type: String,
            required: true,
        },
    },
    async fetch() {
        const {
            details,
            links,
        } = await this.getExportDetails({
            channelId: this.channelId,
            exportId: this.exportId,
        });

        this.details = details;

        if (links && links.attachment) {
            this.downloadLink = links.attachment.href;
        }
    },
    data() {
        return {
            details: [],
            downloadLink: '',
        };
    },
    computed: {
        ...mapState('channel', [
            'type',
        ]),
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        channelGridPath() {
            return `channels/${this.channelId}/exports/${this.exportId}/errors`;
        },
    },
    methods: {
        ...mapActions('channel', [
            'getExportDetails',
        ]),
        onDownloadExportFile() {
            this.$axios.$get(this.downloadLink, {
                responseType: 'arraybuffer',
            })
                .then((response) => {
                    const downloadUrl = window.URL.createObjectURL(new Blob([
                        response,
                    ]));
                    const link = document.createElement('a');

                    link.href = downloadUrl;
                    link.setAttribute('download', `export_${this.type}_${this.details[1].value}.zip`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
        },
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .export-details-tiles {
        display: flex;
        flex-wrap: wrap;

        & > * {
            margin-right: 12px;
        }
    }
</style>
