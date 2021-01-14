/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Relations in products"
        v-if="isPrefetchingData || (!isPrefetchingData && rows.length)">
        <template #body>
            <FormSection>
                <Table :is-prefetching-data="isPrefetchingData">
                    <template #body>
                        <TableRow
                            v-for="row in rows"
                            :key="row.name">
                            <TableRowHeader :title="row.name" />
                            <TableRowCell>
                                <LinkRelationButton
                                    v-for="relation in row.relations"
                                    :key="relation.name"
                                    :title="relation.name"
                                    :link="relation._link"
                                    :namespace="row.type" />
                            </TableRowCell>
                        </TableRow>
                    </template>
                </Table>
            </FormSection>
        </template>
    </Form>
    <TabBarNoDataPlaceholer
        v-else
        title="Nothing to see here"
        subtitle="Here you can see information about relations in products" />
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import LinkRelationButton from '@Media/components/Buttons/LinkRelationButton';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import ListPlaceholder from '@UI/components/List/ListPlaceholder';
import TabBarNoDataPlaceholer from '@UI/components/TabBar/TabBarNoDataPlaceholder';
import Table from '@UI/components/Table/Table';
import TableRow from '@UI/components/Table/TableRow';
import TableRowCell from '@UI/components/Table/TableRowCell';
import TableRowHeader from '@UI/components/Table/TableRowHeader';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ResourceRelationsForm',
    components: {
        Form,
        FormSection,
        LinkRelationButton,
        TabBarNoDataPlaceholer,
        Table,
        TableRow,
        TableRowHeader,
        TableRowCell,
        ListPlaceholder,
    },
    data() {
        return {
            rows: [],
            isPrefetchingData: true,
        };
    },
    computed: {
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
    },
    async created() {
        await this.getResourceRelation({
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
            'getResourceRelation',
        ]),
    },
};
</script>
