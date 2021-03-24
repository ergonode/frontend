/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <slot />
        <Button
            :title="addListTitle"
            :size="smallSize"
            :theme="secondaryTheme"
            :disabled="disabled"
            @click.native="onAddListElement">
            <template #prepend="{ color }">
                <IconAdd :fill-color="color" />
            </template>
        </Button>
    </FormSection>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import FormSection from '@UI/components/Form/Section/FormSection';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'FormListSection',
    components: {
        IconAdd,
        Button,
        FormSection,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The title of the adding new list element button component
         */
        addListTitle: {
            type: String,
            default: '',
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
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
