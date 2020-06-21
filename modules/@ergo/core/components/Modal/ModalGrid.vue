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
                :is-basic-filter="true"
                @fetchData="getGridData">
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
                <template #appendFooter>
                    <Button
                        :theme="secondaryTheme"
                        :size="smallSize"
                        title="ADD SELECTED">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </Grid>
        </div>
    </ModalOverlay>
</template>

<script>
import Button from '@Core/components/Buttons/Button';
import Fab from '@Core/components/Buttons/Fab';
import Grid from '@Core/components/Grid/Grid';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import IconClose from '@Core/components/Icons/Window/IconClose';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import { DATA_LIMIT } from '@Core/defaults/grid';
import { SIZE, THEME } from '@Core/defaults/theme';
import { getGridData } from '@Core/services/grid/getGridData.service';

export default {
    name: 'ModalGrid',
    components: {
        ModalOverlay,
        Fab,
        IconClose,
        IconAdd,
        Grid,
        Button,
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
        columnParams: {
            type: String,
            default: '',
        },
    },
    fetch() {
        this.getGridData({
            offset: 0,
            limit: DATA_LIMIT,
        });
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
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        async getGridData(params) {
            const {
                columns,
                data,
                count,
                filtered,
            } = await getGridData({
                $axios: this.$axios,
                path: this.apiPath,
                params: {
                    ...params,
                    extended: true,
                    columns: this.columnParams,
                },
            });

            this.columns = columns;
            this.data = data;
            this.count = count;
            this.filtered = filtered;
        },
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
        height: 80%;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;

        &__header {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_20_24;
        }
    }
</style>
