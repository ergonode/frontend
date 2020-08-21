/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Import details"
        :api-path="importGridPath"
        @close="onClose">
        <template #headerActions>
            <div class="import-details-tiles">
                <Tile
                    v-for="(detail, index) in details"
                    :key="index"
                    :label="detail.label"
                    :value="detail.value" />
            </div>
        </template>
    </ModalGrid>
</template>

<script>
import ModalGrid from '@Core/components/Modal/ModalGrid';
import Tile from '@Core/components/Tile/Tile';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ImportDetailsModalGrid',
    components: {
        ModalGrid,
        Tile,
    },
    props: {
        sourceId: {
            type: String,
            required: true,
        },
        importId: {
            type: String,
            required: true,
        },
    },
    async fetch() {
        await this.getImportDetails();
    },
    data() {
        return {
            details: [],
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        importGridPath() {
            return `${this.languageCode}/sources/${this.sourceId}/imports/${this.importId}/errors`;
        },
    },
    methods: {
        async getImportDetails() {
            const details = await this.$axios.$get(`${this.languageCode}/sources/${this.sourceId}/imports/${this.importId}`);

            this.details = [
                {
                    label: 'Date of start',
                    value: details.started_at,
                },
                {
                    label: 'Status',
                    value: details.status,
                },
                {
                    label: 'Records',
                    value: details.records || '0',
                },
                {
                    label: 'Errors',
                    value: details.errors || '0',
                },
            ];
        },
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .import-details-tiles {
        display: flex;
        flex-wrap: wrap;

        & > * {
            margin-right: 12px;
        }
    }
</style>
