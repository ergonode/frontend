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
                    <!--                    <FormSection title="Image grid">-->
                    <!--                        <Select-->
                    <!--                            v-model="columnsNumberDescription"-->
                    <!--                            solid-->
                    <!--                            regular-->
                    <!--                            label="Number of columns"-->
                    <!--                            :options="columnsNumberOptions"-->
                    <!--                        />-->
                    <!--                        <Select-->
                    <!--                            v-model="imageScalingDescription"-->
                    <!--                            solid-->
                    <!--                            regular-->
                    <!--                            label="Image scaling"-->
                    <!--                            :options="imageScalingOptions"-->
                    <!--                        />-->
                    <!--                    </FormSection>-->
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
import FormSection from '@Core/components/Form/Section/FormSection';
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
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT.SMALL,
        },
        columnsNumber: {
            type: Number,
            default: COLUMNS_NUMBER.FOURTH_COLUMNS.value,
            validator: value => Object.keys(COLUMNS_NUMBER)
                .map(key => COLUMNS_NUMBER[key].value)
                .indexOf(value) !== -1,
        },
        imageScaling: {
            type: String,
            default: IMAGE_SCALING.FIT_TO_SIZE.value,
            validator: value => Object.keys(IMAGE_SCALING)
                .map(key => IMAGE_SCALING[key].value)
                .indexOf(value) !== -1,
        },
    },
    data() {
        const columnsNumberValues = Object.values(COLUMNS_NUMBER);
        const imageScalingValues = Object.values(IMAGE_SCALING);

        return {
            rowHeightDescription: toCapitalize(
                getKeyByValue(ROW_HEIGHT, this.rowHeight).toLowerCase(),
            ),
            columnsNumberDescription: columnsNumberValues.find(
                ({ value }) => value === this.columnsNumber,
            ).description,
            imageScalingDescription: imageScalingValues.find(
                ({ value }) => value === this.imageScaling,
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
                    ),
                    scaling: imageScalingValues.find(
                        ({ description }) => description === this.imageScalingDescription,
                    ),
                },
            });
        },
    },
};
</script>
