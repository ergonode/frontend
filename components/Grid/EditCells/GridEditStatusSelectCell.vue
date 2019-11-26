/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :style="{width: `${fixedWidth}px`, height: `${fixedHeight}px`}"
        :value="value"
        solid
        small
        :clearable="clearable"
        :dismissible="false"
        :error-messages="errorMessages"
        autofocus
        :options="rowId ? workflowOptions : options"
        @focus="onFocus"
        @input="onSelectValue"
        @apply="onApply">
        <template #prepend>
            <div
                v-if="value && value.key"
                class="selected-badge">
                <PointBadge :color="getColor(value.key)" />
            </div>
        </template>
        <template #option="{ option }">
            <ListElementAction>
                <PointBadge :color="getColor(option.key)" />
            </ListElementAction>
            <ListElementDescription>
                <ListElementTitle
                    small
                    :title="option.value || `#${option.key}`" />
            </ListElementDescription>
        </template>
    </TranslationSelect>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'GridEditStatusSelectCell',
    components: {
        TranslationSelect: () => import('~/components/Inputs/Select/TranslationSelect'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementAction: () => import('~/components/List/ListElementAction'),
        PointBadge: () => import('~/components/Badges/PointBadge'),
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
            workflowColors: {},
        };
    },
    async created() {
        if (this.rowId) {
            await this.$axios.$get(`${this.languageCode}/products/${this.rowId}`).then(({
                workflow = [],
            }) => {
                this.workflowOptions = workflow.map((e) => ({
                    key: e.code,
                    value: e.name,
                }));
                this.workflowColors = workflow.reduce((acc, current) => {
                    const newObject = acc;
                    newObject[current.code] = current.color;
                    return newObject;
                }, {});
            });
        }
    },
    computed: {
        ...mapState('authentication', {
            languageCode: (state) => state.user.language,
        }),
    },
    methods: {
        getColor(key) {
            return this.colors[key];
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onApply() {
            this.$emit('focus', false);
        },
        onSelectValue(value) {
            this.$emit('input', value);
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
