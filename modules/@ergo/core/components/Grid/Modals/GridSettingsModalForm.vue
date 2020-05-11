/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                            solid
                            regular
                            label="Row height"
                            :options="rowHeightOptions" />
                    </FormSection>
                    <FormSection
                        title="Image grid"
                        v-if="isCollectionLayout">
                        <Select
                            v-model="columnsNumberDescription"
                            solid
                            regular
                            label="Number of columns"
                            :options="columnsNumberOptions"
                        />
                        <Select
                            v-model="imageScalingDescription"
                            solid
                            regular
                            label="Image scaling"
                            :options="imageScalingOptions"
                        />
                    </FormSection>
                </template>
            </Form>
        </template>
        <template #footer>
            <Button
                title="SAVE SETTINGS"
                :size="smallSize"
                @click.native="onApply" />
            <Button
                :theme="theme.SECONDARY"
                title="CANCEL"
                :size="smallSize"
                @click.native="onClose" />
        </template>
    </ModalForm>
</template>

<script>

import { ROW_HEIGHT, IMAGE_SCALING, COLUMNS_NUMBER } from '@Core/defaults/grid';
import { toCapitalize } from '@Core/models/stringWrapper';
import { getKeyByValue } from '@Core/models/objectWrapper';
import { SIZE, THEME } from '@Core/defaults/theme';
import Button from '@Core/components/Buttons/Button';
import ModalForm from '@Core/components/Modal/ModalForm';
import FormSection from '@Core/components/Form/FormSection';
import Select from '@Core/components/Inputs/Select/Select';
import Form from '@Core/components/Form/Form';

export default {
    name: 'GridSettingsModalForm',
    components: {
        ModalForm,
        Form,
        FormSection,
        Button,
        Select,
    },
    props: {
        tableLayoutConfig: {
            type: Object,
            required: true,
        },
        collectionLayoutConfig: {
            type: Object,
            required: true,
        },
        isCollectionLayout: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        const columnsNumberValues = Object.values(COLUMNS_NUMBER);
        const imageScalingValues = Object.values(IMAGE_SCALING);

        return {
            rowHeightDescription: toCapitalize(
                getKeyByValue(ROW_HEIGHT, this.tableLayoutConfig.rowHeight).toLowerCase(),
            ),
            columnsNumberDescription: columnsNumberValues.find(
                ({ value }) => value === this.collectionLayoutConfig.columnsNumber,
            ).description,
            imageScalingDescription: imageScalingValues.find(
                ({ value }) => value === this.collectionLayoutConfig.scaling,
            ).description,
        };
    },
    computed: {
        rowHeightOptions() {
            return Object.keys(ROW_HEIGHT).map(key => toCapitalize(key.toLowerCase()));
        },
        columnsNumberOptions() {
            return Object.values(COLUMNS_NUMBER).map(({ description }) => description);
        },
        imageScalingOptions() {
            return Object.values(IMAGE_SCALING).map(({ description }) => description);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        theme() {
            return THEME;
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
        onApply() {
            const columnsNumberValues = Object.values(COLUMNS_NUMBER);
            const imageScalingValues = Object.values(IMAGE_SCALING);

            this.$emit('apply', {
                tableConfig: {
                    rowHeight: ROW_HEIGHT[this.rowHeightDescription.toUpperCase()],
                },
                collectionConfig: {
                    columnsNumber: columnsNumberValues.find(
                        ({ description }) => description === this.columnsNumberDescription,
                    ).value,
                    scaling: imageScalingValues.find(
                        ({ description }) => description === this.imageScalingDescription,
                    ).value,
                },
            });
        },
    },
};
</script>
