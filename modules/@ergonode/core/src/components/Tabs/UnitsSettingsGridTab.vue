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
                :placeholder="noRecordsPlaceholder"
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-border="true"
                :is-basic-filter="true"
                @editRow="onEditRow"
                @deleteRow="onRemoveUnit"
                @fetchData="onFetchData">
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
import {
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import PRIVILEGES from '@Core/config/privileges';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
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
        fetchGridDataMixin({
            path: 'units',
        }),
    ],
    fetch() {
        return this.onFetchData({
            offset: 0,
            limit: DATA_LIMIT,
            filters: '',
            sortedColumn: {},
        }).then(() => {
            this.isPrefetchingData = false;
        });
    },
    data() {
        return {
            isPrefetchingData: true,
        };
    },
    computed: {
        noRecordsPlaceholder() {
            return {
                title: 'No units',
                subtitle: 'There are no units in the system, you can create the first one.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
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
