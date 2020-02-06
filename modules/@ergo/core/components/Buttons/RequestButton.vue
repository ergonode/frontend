/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        v-bind="$attrs"
        v-on="$listeners"
        :disabled="isPending"
        @click.native="onClick">
        <template #prepend="{ color }">
            <slot
                name="prepend"
                :color="color" />
        </template>
        <template #append="{ color }">
            <slot
                name="append"
                :color="color" />
        </template>
    </Button>
</template>

<script>
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'RequestButton',
    components: {
        Button,
    },
    inheritAttrs: false,
    props: {
        config: {
            type: Object,
            required: true,
        },
        getData: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            isPending: false,
        };
    },
    methods: {
        onClick() {
            this.isPending = true;
            this.$axios({
                ...this.config,
                data: this.getData(),
            })
                .then((response) => {
                    this.isPending = false;
                    this.$emit('response', response);
                })
                .catch((e) => {
                    console.error(e);
                    this.isPending = false;
                });
        },
    },
};
</script>
