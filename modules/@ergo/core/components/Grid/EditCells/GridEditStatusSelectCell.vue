/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :style="{width: `${fixedWidth}px`, height: `${fixedHeight}px`}"
        :value="value"
        :solid="true"
        :small="true"
        :clearable="clearable"
        :dismissible="false"
        :error-messages="errorMessages"
        :autofocus="true"
        :options="workflowOptions"
        @focus="onFocus"
        @input="onSelectValue"
        @apply="onApply">
        <template #prepend>
            <div
                v-if="value.id"
                class="selected-badge">
                <PointBadge :color="getColor(value.id)" />
            </div>
        </template>
        <template #option="{ option }">
            <ListElementAction>
                <PointBadge :color="getColor(option.id)" />
            </ListElementAction>
            <ListElementDescription>
                <ListElementTitle
                    :small="true"
                    :hint="option.hint"
                    :title="option.value || `#${option.key}`" />
            </ListElementDescription>
        </template>
    </TranslationSelect>
</template>

<script>
import { mapState } from 'vuex';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';

export default {
    name: 'GridEditStatusSelectCell',
    components: {
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
        ListElementDescription,
        ListElementTitle,
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        PointBadge: () => import('@Core/components/Badges/PointBadge'),
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
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
    },
    async created() {
        if (this.rowId) {
            await this.$axios.$get(`${this.languageCode}/products/${this.rowId}`).then(({
                workflow = [],
            }) => {
                this.workflowOptions = workflow.map(e => ({
                    id: e.code,
                    key: e.code,
                    value: e.name,
                    hint: '',
                }));
            });
        } else {
            this.workflowOptions = this.options;
        }
    },
    methods: {
        getColor(key) {
            return this.colors[key] || '';
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
