/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <Table />
    </FormSection>
</template>

<script>
import Button from '@Core/components/Button/Button';
import FormSection from '@Core/components/Form/Section/FormSection';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Table from '@Core/components/Table/Table';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'FormTableSection',
    components: {
        IconAdd,
        Button,
        FormSection,
        Table,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onAddListElement() {
            this.$el.scrollIntoView(false);
            this.$emit('add');
        },
    },
};
</script>
