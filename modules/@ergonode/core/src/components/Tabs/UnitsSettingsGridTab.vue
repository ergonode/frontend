/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="isUserAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-border="true"
                :is-basic-filter="true"
                @editRow="onEditRow"
                @deleteRow="onRemoveUnit"
                @fetchData="getGridData">
                <template #headerActions>
                    <Button
                        title="NEW UNIT"
                        :theme="secondaryTheme"
                        :disabled="!isUserAllowedToCreate"
                        :size="smallSize"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </Grid>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import PRIVILEGES from '@Core/config/privileges';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import gridFetchDataMixin from '@Core/mixins/grid/gridFetchDataMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UnitsSettingsGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Button,
        IconAdd,
    },
    mixins: [
        gridFetchDataMixin({
            path: 'units',
        }),
    ],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isUserAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.create,
            ]);
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
    },
    methods: {
        ...mapActions('dictionaries', [
            'getCurrentDictionary',
        ]),
        onRemoveUnit() {
            Promise.all([
                this.onRemoveRow(),
                this.getCurrentDictionary({
                    dictionaryName: 'units',
                }),
            ]);
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'unit-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
        onShowModal() {
            this.$emit('showModal', 'units');
        },
    },
};
</script>
