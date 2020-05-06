/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div class="modal-grid">
            <Grid
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :is-select-column="true"
                :is-header-visible="true"
                :is-centered-view="true"
                :is-basic-filter="true">
                <template #actions>
                    <h2
                        class="modal-grid__header"
                        v-text="title" />
                </template>
                <template #configuration>
                    <Fab
                        :theme="secondaryTheme"
                        @click.native="onClose">
                        <template #icon="{ color }">
                            <IconClose :fill-color="color" />
                        </template>
                    </Fab>
                </template>
            </Grid>
        </div>
    </ModalOverlay>
</template>

<script>
import { THEME } from '@Core/defaults/theme';
import { DATA_LIMIT } from '@Core/defaults/grid';
import { getGridData } from '@Core/services/grid/getGridData.service';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import Fab from '@Core/components/Buttons/Fab';
import IconClose from '@Core/components/Icons/Window/IconClose';
import Grid from '@Core/components/Grid/Grid';

export default {
    name: 'ModalGrid',
    components: {
        ModalOverlay,
        Fab,
        IconClose,
        Grid,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        apiPath: {
            type: String,
            required: true,
        },
    },
    async fetch() {
        const {
            columns,
            data,
            count,
            filtered,
        } = await getGridData({
            $axios: this.$axios,
            path: this.apiPath,
            params: {
                offset: 0,
                limit: DATA_LIMIT,
                extended: true,
            },
        });

        this.columns = columns;
        this.data = data;
        this.count = count;
        this.filtered = filtered;
    },
    data() {
        return {
            columns: [],
            data: {},
            count: 0,
            filtered: 0,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal-grid {
        display: flex;
        width: 960px;
        height: 100%;
        box-shadow: $ELEVATOR_6_DP;

        &__header {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_20_24;
        }
    }
</style>
