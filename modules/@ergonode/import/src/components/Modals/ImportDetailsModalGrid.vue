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
    mapActions,
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
        this.details = await this.getImportDetails({
            sourceId: this.sourceId,
            importId: this.importId,
        });
    },
    data() {
        return {
            details: [],
        };
    },
    computed: {
        importGridPath() {
            return `sources/${this.sourceId}/imports/${this.importId}/errors`;
        },
    },
    methods: {
        ...mapActions('import', [
            'getImportDetails',
        ]),
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
