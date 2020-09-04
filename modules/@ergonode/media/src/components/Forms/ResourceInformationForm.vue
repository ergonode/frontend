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
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import Table from '@Core/components/Table/Table';
import TableRow from '@Core/components/Table/TableRow';
import TableRowCell from '@Core/components/Table/TableRowCell';
import TableRowHeader from '@Core/components/Table/TableRowHeader';
import TableRowInfoCell from '@Core/components/Table/TableRowInfoCell';
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
        const metadata = await this.getResourceMetadata();

        this.rows = Object.keys(metadata).reduce((acc, current) => {
            const tmpArray = acc;

            tmpArray.push({
                name: current,
                value: metadata[current].toString(),
            });

            return tmpArray;
        }, []);
        this.isPrefetchingData = false;
    },
    methods: {
        ...mapActions('media', [
            'getResourceMetadata',
        ]),
    },
};
</script>
