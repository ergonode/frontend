/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form :title="$t('@Media.media.components.ResourceInformationForm.title')">
        <template #body>
            <FormSection>
                <Table :is-prefetching-data="isPrefetchingData">
                    <template #body>
                        <TableRow
                            v-for="row in rows"
                            :key="row.name">
                            <TableRowHeader :title="row.name" />
                            <TableRowCell>
                                <TableRowInfoCell :title="row.value" />
                            </TableRowCell>
                        </TableRow>
                        <template
                            v-for="(item, index) in extendedTable">
                            <Component
                                :is="item.component"
                                :key="index"
                                v-bind="bindingProps(item)" />
                        </template>
                    </template>
                </Table>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Media/config/privileges';
import Table from '@UI/components/Table/Table';
import TableRow from '@UI/components/Table/TableRow';
import TableRowCell from '@UI/components/Table/TableRowCell';
import TableRowHeader from '@UI/components/Table/TableRowHeader';
import TableRowInfoCell from '@UI/components/Table/TableRowInfoCell';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ResourceInformationForm',
    components: {
        Table,
        TableRow,
        TableRowHeader,
        TableRowCell,
        TableRowInfoCell,
    },
    data() {
        return {
            rows: [],
            isPrefetchingData: true,
        };
    },
    computed: {
        extendedTable() {
            return this.$getExtendSlot('@Media/components/Forms/ResourceInformationForm/tableBody');
        },
    },
    async created() {
        await this.getResourceMetadata({
            onSuccess: (({
                rows,
            }) => {
                this.rows = rows;
                this.isPrefetchingData = false;
            }),
        });
    },
    methods: {
        ...mapActions('media', [
            'getResourceMetadata',
        ]),
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.MULTIMEDIA,
                ...props,
            };
        },
    },
};
</script>
