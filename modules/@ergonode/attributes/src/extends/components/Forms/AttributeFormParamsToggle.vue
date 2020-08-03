/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Toggler
        :value="parameter"
        label="Rich text content enabled"
        @input="setParameterValue" />
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeFormParamsToggle',
    components: {
        Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
    },
    props: {
        typeKey: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('attribute', {
            parameter: state => state.parameter,
        }),
    },
    watch: {
        typeKey: {
            immediate: true,
            handler() {
                this.setParameterValue();
            },
        },
    },
    beforeDestroy() {
        this.setParameterValue();
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
        ]),
        setParameterValue(value = null) {
            this.__setState({
                key: 'parameter',
                value,
            });
        },
    },
};
</script>
