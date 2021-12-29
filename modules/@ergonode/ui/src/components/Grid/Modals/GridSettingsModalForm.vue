/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Display settings"
        @close="onClose">
        <template #body>
            <Form>
                <template #body>
                    <FormSection title="Table grid">
                        <Select
                            v-model="rowHeightDescription"
                            label="Row height"
                            :options="rowHeightOptions" />
                    </FormSection>
                    <FormSection
                        v-if="isCollectionLayout"
                        title="Image grid">
                        <Select
                            v-model="columnsNumberDescription"
                            label="Number of columns"
                            :options="columnsNumberOptions" />
                        <Select
                            v-model="objectFitDescription"
                            label="Image scaling"
                            :options="objectFitOptions" />
                    </FormSection>
                </template>
                <template #submit>
                    <Button
                        title="SAVE SETTINGS"
                        :size="smallSize"
                        @click.native="onApply" />
                </template>
                <template #proceed>
                    <Button
                        :theme="theme.SECONDARY"
                        :title="$t('@Core._.buttons.cancel')"
                        :size="smallSize"
                        @click.native="onClose" />
                </template>
            </Form>
        </template>
    </ModalForm>
</template>

<script>

import {
    COLUMNS_NUMBER,
    GRID_LAYOUT,
    OBJECT_FIT,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'GridSettingsModalForm',
    props: {
        /**
         * Configuration of table layout
         */
        layoutConfigs: {
            type: Object,
            required: true,
        },
    },
    data() {
        const columnsNumberValues = Object.values(COLUMNS_NUMBER);
        const objectFitValues = Object.values(OBJECT_FIT);

        return {
            rowHeightDescription: toCapitalize(
                getKeyByValue(
                    ROW_HEIGHT,
                    this.layoutConfigs[GRID_LAYOUT.TABLE].rowHeight,
                ).toLowerCase(),
            ),
            columnsNumberDescription: columnsNumberValues.find(
                ({
                    value,
                }) => value === this.layoutConfigs[GRID_LAYOUT.COLLECTION].columnsNumber,
            ).description,
            objectFitDescription: objectFitValues.find(
                ({
                    value,
                }) => value === this.layoutConfigs[GRID_LAYOUT.COLLECTION].objectFit,
            ).description,
        };
    },
    computed: {
        rowHeightOptions() {
            return Object.keys(ROW_HEIGHT).map(key => toCapitalize(key.toLowerCase()));
        },
        columnsNumberOptions() {
            return Object.values(COLUMNS_NUMBER).map(({
                description,
            }) => description);
        },
        objectFitOptions() {
            return Object.values(OBJECT_FIT).map(({
                description,
            }) => description);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        theme() {
            return THEME;
        },
        isCollectionLayout() {
            return typeof this.layoutConfigs[GRID_LAYOUT.COLLECTION] !== 'undefined';
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
        onApply() {
            const columnsNumberValues = Object.values(COLUMNS_NUMBER);
            const objectFitValues = Object.values(OBJECT_FIT);

            this.$emit('apply', {
                [GRID_LAYOUT.TABLE]: {
                    rowHeight: ROW_HEIGHT[this.rowHeightDescription.toUpperCase()],
                },
                [GRID_LAYOUT.COLLECTION]: {
                    columnsNumber: columnsNumberValues.find(
                        ({
                            description,
                        }) => description === this.columnsNumberDescription,
                    ).value,
                    objectFit: objectFitValues.find(
                        ({
                            description,
                        }) => description === this.objectFitDescription,
                    ).value,
                },
            });
        },
    },
};
</script>
