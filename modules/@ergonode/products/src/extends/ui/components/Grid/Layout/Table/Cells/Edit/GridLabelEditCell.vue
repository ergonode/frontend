/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <TranslationSelect
                v-model="localValue"
                :autofocus="true"
                :size="smallSize"
                :disabled="disabled"
                :clearable="true"
                :options="options"
                :error-messages="errorMessages"
                @focus="onFocus">
                <template #dropdownBody>
                    <Preloader v-if="isFetchingData" />
                </template>
                <template #prepend>
                    <div
                        v-if="localValue"
                        class="presentation-badge">
                        <PointBadge :color="colors[localValue.id].color" />
                    </div>
                </template>
                <template #append>
                    <FadeTransition>
                        <IconSpinner
                            v-if="isFetchingData"
                            :color="graphiteColor" />
                    </FadeTransition>
                </template>
                <template #option="{ option }">
                    <ListElementAction :size="smallSize">
                        <div class="presentation-badge-option">
                            <PointBadge :color="colors[option.id].color" />
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
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import GridSelectEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridLabelEditCell',
    components: {
        GridSelectEditContentCell,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        /**
         * The available colors of statuses
         */
        colors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            default: '',
        },
    },
    async fetch() {
        if (!this.disabled) {
            this.isFetchingData = true;

            await this.getProductWorkflowOptions({
                id: this.rowId,
                languageCode: this.languageCode,
                onSuccess: this.onGetProductWorkflowOptionsSuccess,
            });
        }
    },
    data() {
        return {
            options: [],
            localValue: null,
            isFetchingData: false,
        };
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (!this.disabled && this.localValue && this.localValue.id !== this.value) {
            this.$emit('cell-value', [
                {
                    value: this.localValue.id || this.localValue,
                    rowId: this.rowId,
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                },
            ]);
        }
    },
    methods: {
        ...mapActions('product', [
            'getProductWorkflowOptions',
        ]),
        onGetProductWorkflowOptionsSuccess({
            workflow,
        }) {
            this.options = workflow;

            this.localValue = this.options.find(option => option.id === this.value);

            this.isFetchingData = false;
        },
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
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
