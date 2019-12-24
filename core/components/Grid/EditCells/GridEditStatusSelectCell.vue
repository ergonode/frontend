/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :style="{width: `${fixedWidth}px`, height: `${fixedHeight}px`}"
        :value="parsedValue.name"
        solid
        small
        :clearable="clearable"
        :dismissible="false"
        :error-messages="errorMessages"
        autofocus
        :options="workflowOptions"
        @focus="onFocus"
        @input="onSelectValue"
        @apply="onApply">
        <template #prepend>
            <div
                v-if="parsedValue && parsedValue.id"
                class="selected-badge">
                <PointBadge :color="getColor(parsedValue.id)" />
            </div>
        </template>
        <template #option="{ option }">
            <ListElement
                :key="option.id"
                :selected="isSelected(option.id)"
                @click.native="onSelectValue(option)">
                <ListElementAction>
                    <PointBadge :color="getColor(option.id)" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        small
                        :title="option.name || `#${option.code}`" />
                </ListElementDescription>
            </ListElement>
        </template>
    </Select>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'GridEditStatusSelectCell',
    components: {
        Select: () => import('~/core/components/Inputs/Select/Select'),
        ListElement: () => import('~/core/components/List/ListElement'),
        ListElementDescription: () => import('~/core/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/core/components/List/ListElementTitle'),
        ListElementAction: () => import('~/core/components/List/ListElementAction'),
        PointBadge: () => import('~/core/components/Badges/PointBadge'),
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        options: {
            type: Array,
            default: null,
        },
        colors: {
            type: Object,
            default: null,
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        rowId: {
            type: [String, Number],
            default: '',
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        fixedWidth: {
            type: Number,
            required: true,
        },
        fixedHeight: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            workflowOptions: [],
            selectedOptions: {},
        };
    },
    async created() {
        if (this.rowId) {
            await this.$axios.$get(`${this.languageCode}/products/${this.rowId}`).then(({
                workflow = [],
            }) => {
                this.workflowOptions = workflow.map((e) => ({
                    id: e.code,
                    name: e.name,
                    code: e.code,
                }));
                this.selectedOptions = this.workflowOptions.find(
                    (option) => option.id === this.value.key,
                );
            });
        }
    },
    computed: {
        ...mapState('authentication', {
            languageCode: (state) => state.user.language,
        }),
        parsedValue() {
            if (!this.selectedOptions) return { id: this.value.key, name: this.value.value };

            return this.selectedOptions;
        },
    },
    methods: {
        isSelected(id) {
            return id === this.value;
        },
        getColor(key) {
            return this.colors[key] || '';
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onApply() {
            this.$emit('focus', false);
        },
        onSelectValue(optionValue) {
            const { id, code, name } = optionValue;

            this.selectedOptions = { id, name, code };
            this.$emit('input', { key: id, value: name });
        },
    },
};
</script>

<style lang="scss" scoped>
    .selected-badge {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 6px;
        margin-right: 2px;
    }
</style>
