/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle>
        <template #activator>
            <InputController>
                <InputLabel
                    :style="{ top: 0 }"
                    :required="required"
                    :size="size"
                    :floating="true"
                    :disabled="disabled"
                    :label="label" />
                <div class="category-select-content">
                    <Autocomplete
                        :value="categoryTree"
                        :searchable="true"
                        :disabled="disabled"
                        href="categories/autocomplete">
                        <template #placeholder="{ isVisible }">
                            <DropdownPlaceholder
                                v-if="isVisible"
                                :title="placeholder.title"
                                :subtitle="placeholder.subtitle">
                                <template #action>
                                    <Button
                                        title="GO TO CATEGORIES"
                                        :size="smallSize"
                                        :disabled="!isAllowedToCreate"
                                        @click.native="onNavigateToCategories" />
                                </template>
                            </DropdownPlaceholder>
                        </template>
                    </Autocomplete>
                    <div class="category-select-content__header">
                        <Toggler label="Show only selected" />
                        <CheckBox label="Select all" />
                    </div>
                    <Divider />
                </div>
            </InputController>
        </template>
    </InputSolidStyle>
</template>

<script>
import PRIVILEGES from '@Categories/config/privileges';
import {
    ROUTE_NAME,
} from '@Categories/config/routes';
import {
    SIZE,
} from '@Core/defaults/theme';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Button from '@UI/components/Button/Button';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import Divider from '@UI/components/Dividers/Divider';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import Toggler from '@UI/components/Toggler/Toggler';

export default {
    name: 'CategorySelect',
    components: {
        InputSolidStyle,
        InputController,
        InputLabel,
        Autocomplete,
        DropdownPlaceholder,
        Button,
        Divider,
        Toggler,
        CheckBox,
    },
    props: {
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            categoryTree: null,
        };
    },
    computed: {
        label() {
            return 'Category';
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
        onNavigateToCategories() {
            this.$router.push({
                name: ROUTE_NAME.CATEGORIES_GRID,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-select-content {
        display: grid;
        grid-auto-flow: row;
        grid-row-gap: 12px;
        width: 100%;
        padding: 4px 0 4px 2px;
        box-sizing: border-box;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
