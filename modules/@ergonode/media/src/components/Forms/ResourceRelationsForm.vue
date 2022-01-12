/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Media.media.components.ResourceRelationsForm.title')"
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
                                    :link="relation._link || {}"
                                    :namespace="row.type" />
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
    <TabBarNoDataPlaceholder
        v-else
        :title="$t('@Media.media.components.ResourceRelationsForm.placeholderTitle')"
        :subtitle="$t('@Media.media.components.ResourceRelationsForm.placeholderSubtitle')" />
</template>

<script>
import LinkRelationButton from '@Media/components/Buttons/LinkRelationButton';
import PRIVILEGES from '@Media/config/privileges';
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
        LinkRelationButton,
        Table,
        TableRow,
        TableRowHeader,
        TableRowCell,
    },
    data() {
        return {
            rows: [],
            isPrefetchingData: true,
        };
    },
    computed: {
        extendedTable() {
            return this.$getExtendSlot('@Media/components/Forms/ResourceRelationsForm/tableBody');
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
