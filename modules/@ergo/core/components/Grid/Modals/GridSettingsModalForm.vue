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
                    <FormSection title="Image grid">
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
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT.SMALL,
        },
        columnsNumber: {
            type: Number,
            default: +COLUMNS_NUMBER.TWO_COLUMNS.split(' ')[0],
        },
        imageScaling: {
            type: String,
            default: IMAGE_SCALING.FIT_TO_SIZE,
        },
    },
    data() {
        const columnsNumberValues = Object.values(COLUMNS_NUMBER);

        return {
            rowHeightDescription: toCapitalize(
                getKeyByValue(ROW_HEIGHT, this.rowHeight).toLowerCase(),
            ),
            columnsNumberDescription: columnsNumberValues.find(
                value => value.includes(String(this.columnsNumber)),
            ),
            imageScalingDescription: this.imageScaling,
        };
    },
    computed: {
        rowHeightOptions() {
            return Object.keys(ROW_HEIGHT).map(key => toCapitalize(key.toLowerCase()));
        },
        columnsNumberOptions() {
            return Object.values(COLUMNS_NUMBER).map(value => value.split('_')[0]);
        },
        imageScalingOptions() {
            return Object.values(IMAGE_SCALING);
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
            this.$emit('apply', {
                table: {
                    rowHeight: ROW_HEIGHT[this.rowHeightDescription.toUpperCase()],
                },
                collection: {
                    columnsNumber: 0,
                    scaling: null,
                },
            });
        },
    },
};
</script>
