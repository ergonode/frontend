/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Table title="Details">
        <template #body>
            <TableRow
                v-for="({ title, values }, index) in details"
                :key="index"
                :title="title"
                :values="values" />
        </template>
    </Table>
</template>

<script>
import Table from '@Core/components/Table/Table';
import TableRow from '@Core/components/Table/TableRow';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ExportDetails',
    components: {
        Table,
        TableRow,
    },
    computed: {
        ...mapState('channels', {
            export_details: state => state.export_details,
        }),
        details() {
            return Object.keys(this.export_details).reduce((acc, current) => {
                const tmpArray = acc;

                if (current !== 'id' && current !== '_links') {
                    tmpArray.push({
                        title: current,
                        values: [
                            this.export_details[current].toString(),
                        ],
                    });
                }

                return tmpArray;
            }, []);
        },
    },
};
</script>
