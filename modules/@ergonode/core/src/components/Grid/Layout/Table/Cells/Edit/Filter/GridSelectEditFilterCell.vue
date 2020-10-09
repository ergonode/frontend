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
                :options="mappedOptions"
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import TranslationSelect from '@Core/components/Select/TranslationSelect';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditFilterCellMixin from '@Core/mixins/grid/cell/gridEditFilterCellMixin';
import {
    getMappedObjectOption,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';

export default {
    name: 'GridSelectEditFilterCell',
    components: {
        GridSelectEditContentCell,
        TranslationSelect,
    },
    mixins: [
        gridEditFilterCellMixin,
    ],
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: 'EN',
        },
    },
    data() {
        let localValue = null;

        if (this.value[FILTER_OPERATOR.EQUAL]) {
            localValue = getMappedObjectOption({
                option: {
                    id: this.value[FILTER_OPERATOR.EQUAL],
                    ...this.options[this.value],
                },
                languageCode: this.languageCode,
            });
        }

        return {
            localValue,
        };
    },
    computed: {
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
    beforeDestroy() {
        if ((this.localValue && this.localValue.id !== this.value)
            || (!this.localValue && this.value)) {
            this.$emit('filter-value', {
                value: {
                    [FILTER_OPERATOR.EQUAL]: this.localValue.id || this.localValue,
                },
                columnId: this.columnId,
                row: this.row,
                column: this.column,
            });
        }
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
    },
};
</script>
