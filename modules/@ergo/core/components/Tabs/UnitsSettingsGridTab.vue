/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :editing-privilege-allowed="isUserAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :cell-values="cellValues"
                :row-ids="rowIds"
                :row-links="rowLinks"
                :is-header-visible="true"
                :is-centered-view="true"
                :is-basic-filters="true"
                :is-edit-column="true"
                @editRow="onEditRow"
                @fetchData="getGridData">
                <template #actions>
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
            <CreateUnitModalForm
                v-if="isModalVisible"
                @close="onCloseModal"
                @created="onCreatedData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'UnitsSettingsGridTab',
    components: {
        Grid: () => import('@Core/components/Grid/Grid'),
        CreateUnitModalForm: () => import('@Core/components/Modals/CreateUnitModalForm'),
        ResponsiveCenteredViewTemplate,
        Button,
        IconAdd,
    },
    mixins: [fetchGridDataMixin({ path: 'units' }), gridModalMixin],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isUserAllowedToCreate() {
            return this.$hasAccess(['SETTINGS_CREATE']);
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['SETTINGS_UPDATE']);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'unit-id-general', params: { id: args[lastIndex] } });
        },
    },
};
</script>
