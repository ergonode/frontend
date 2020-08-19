/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form title="Information">
        <template #body>
            <FormSection>
                <Table>
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
    mapState,
} from 'vuex';

export default {
    name: 'ExportDetails',
    components: {
        Form,
        FormSection,
        Table,
        TableRow,
        TableRowHeader,
        TableRowCell,
        TableRowInfoCell,
    },
    computed: {
        ...mapState('channels', {
            export_details: state => state.export_details,
        }),
        rows() {
            return Object.keys(this.export_details).reduce((acc, current) => {
                const tmpArray = acc;

                if (current !== 'id' && current !== '_links') {
                    tmpArray.push({
                        name: current,
                        value: this.export_details[current] !== null
                            ? this.export_details[current].toString()
                            : '',
                    });
                }

                return tmpArray;
            }, []);
        },
    },
};
</script>
