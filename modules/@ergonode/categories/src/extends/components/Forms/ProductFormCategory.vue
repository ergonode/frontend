/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <!--    <Autocomplete-->
    <!--        :value="categories"-->
    <!--        :multiselect="true"-->
    <!--        :clearable="true"-->
    <!--        :searchable="true"-->
    <!--        label="Category"-->
    <!--        :disabled="disabled"-->
    <!--        :error-messages="errors[categoryFieldKey]"-->
    <!--        href="categories/autocomplete"-->
    <!--        @input="onCategoriesValueChange">-->
    <!--        <template #placeholder="{ isVisible }">-->
    <!--            <DropdownPlaceholder-->
    <!--                v-if="isVisible"-->
    <!--                :title="placeholder.title"-->
    <!--                :subtitle="placeholder.subtitle">-->
    <!--                <template #action>-->
    <!--                    <Button-->
    <!--                        title="GO TO CATEGORIES"-->
    <!--                        :size="smallSize"-->
    <!--                        :disabled="!isAllowedToCreate"-->
    <!--                        @click.native="onNavigateToCategories" />-->
    <!--                </template>-->
    <!--            </DropdownPlaceholder>-->
    <!--        </template>-->
    <!--    </Autocomplete>-->
    <!--    <TreeAccordion />-->
    <CategorySelect />
</template>

<script>
import CategorySelect from '@Categories/components/Selects/CategorySelect';
import PRIVILEGES from '@Categories/config/privileges';
import {
    ROUTE_NAME,
} from '@Categories/config/routes';
import {
    SIZE,
} from '@Core/defaults/theme';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Button from '@UI/components/Button/Button';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import TreeAccordion from '@UI/components/TreeAccordion/TreeAccordion';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductFormCategory',
    components: {
        CategorySelect,
        TreeAccordion,
        Autocomplete,
        Button,
        DropdownPlaceholder,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('product', [
            'categories',
        ]),
        categoryFieldKey() {
            return 'categories';
        },
        placeholder() {
            return {
                title: 'No categories',
                subtitle: 'There are no categories in the system, so you can create the first one.',
            };
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('product', [
            '__setState',
        ]),
        onNavigateToCategories() {
            this.$router.push({
                name: ROUTE_NAME.CATEGORIES_GRID,
            });
        },
        onCategoriesValueChange(value) {
            this.__setState({
                key: this.categoryFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.categoryFieldKey,
                value,
            });
        },
    },
};
</script>
