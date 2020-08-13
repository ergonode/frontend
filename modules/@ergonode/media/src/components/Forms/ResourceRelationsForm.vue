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
    <div
        class="products-relations-placeholder"
        v-else>
        <ListPlaceholder
            :layout-orientation="horizontalOrientation"
            title="Nothing to see here"
            subtitle="Here you can see information about relations in products"
            :bg-url="require('@Core/assets/images/placeholders/comments.svg')" />
    </div>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import ListPlaceholder from '@Core/components/List/ListPlaceholder';
import Table from '@Core/components/Table/Table';
import TableRow from '@Core/components/Table/TableRow';
import TableRowCell from '@Core/components/Table/TableRowCell';
import TableRowHeader from '@Core/components/Table/TableRowHeader';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import LinkRelationButton from '@Media/components/Buttons/LinkRelationButton';

export default {
    name: 'ResourceRelationsForm',
    components: {
        Form,
        FormSection,
        LinkRelationButton,
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
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
    },
    created() {
        const {
            language: userLanguageCode,
        } = this.$store.state.authentication.user;

        this.$axios
            .$get(`${userLanguageCode}/multimedia/${this.$route.params.id}/relation`)
            .then((relations) => {
                this.rows = relations.filter(row => row.relations.length > 0);
                this.isPrefetchingData = false;
            });
    },
};
</script>

<style lang="scss" scoped>
    .products-relations-placeholder {
        padding: 24px;
    }
</style>
