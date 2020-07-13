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
                :multiselect="true"
                :options="mappedOptions"
                :error-messages="errorMessages"
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import GridEditNavigationCell from '@Core/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import {
    getMappedMatchedArrayOptions,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridMultiSelectEditCell',
    components: {
        GridSelectEditContentCell,
        TranslationSelect,
        GridEditNavigationCell,
    },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        options: {
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
    data() {
        return {
            localValue: getMappedMatchedArrayOptions({
                optionIds: this.value,
                options: this.options,
                languageCode: this.languageCode,
            }),
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
        mappedOptions() {
            return getMappedObjectOptions({
                options: this.options,
                languageCode: this.languageCode,
            });
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
            const optionIds = this.localValue.map(option => option.id);

            if (!arraysAreEqual(optionIds, this.value.map(option => option.id))) {
                this.onValueChange(optionIds);
            }
            document.documentElement.querySelector(`.coordinates-${this.column}-${this.row}`).focus();
            this.setEditCell();
        },
    },
};
</script>
