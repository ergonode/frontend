/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form title="Information">
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
                    </template>
                </Table>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
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
        Form,
        FormSection,
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
    async created() {
        this.rows = await this.getResourceMetadata();

        this.isPrefetchingData = false;
    },
    methods: {
        ...mapActions('media', [
            'getResourceMetadata',
        ]),
    },
};
</script>
