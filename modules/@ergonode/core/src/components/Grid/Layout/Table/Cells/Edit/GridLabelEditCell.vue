/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <TranslationSelect
                v-model="localValue"
                :autofocus="true"
                :size="smallSize"
                :clearable="true"
                :options="options"
                :error-messages="errorMessages"
                @focus="onFocus">
                <template #prepend>
                    <div
                        v-if="localValue"
                        class="presentation-badge">
                        <PointBadge :color="colors[localValue.id]" />
                    </div>
                </template>
                <template #option="{ option }">
                    <ListElementAction :size="smallSize">
                        <div class="presentation-badge-option">
                            <PointBadge :color="colors[option.id]" />
                        </div>
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :size="smallSize"
                            :hint="option.hint"
                            :title="option.value || `#${option.key}`" />
                    </ListElementDescription>
                </template>
            </TranslationSelect>
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import PointBadge from '@Core/components/Badges/PointBadge';
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import GridEditNavigationCell from '@Core/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridLabelEditCell',
    components: {
        GridSelectEditContentCell,
        TranslationSelect,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        PointBadge,
        GridEditNavigationCell,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        colors: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: 'EN',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        bounds: {
            type: [
                DOMRect,
                Object,
            ],
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        onValueChange: {
            type: Function,
            required: true,
        },
    },
    fetch() {
        this.$axios.$get(`${this.languageCode.toLowerCase()}/products/${this.rowId}`).then(({
            workflow = [],
        }) => {
            this.options = workflow.map(e => ({
                id: e.code,
                key: e.code,
                value: e.name,
                hint: e.name
                    ? `#${e.code} ${this.languageCode}`
                    : '',
            }));

            this.localValue = this.options.find(option => option.id === this.value);
        });
    },
    data() {
        return {
            options: [],
            localValue: null,
        };
    },
    computed: {
        positionStyle() {
            const {
                x,
                y,
                width,
                height,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: `${width}px`,
                height: `${height}px`,
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditCell',
        ]),
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
        onEditCell() {
            if (this.localValue && this.localValue.id !== this.value) {
                this.onValueChange(this.localValue.id || this.localValue);
            }
            document.documentElement.querySelector(`.coordinates-${this.column}-${this.row}`).focus();
            this.setEditCell();
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-badge {
        margin-right: 8px;
    }

    .presentation-badge-option {
        margin: 0 4px;
    }
</style>
