/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Toggler
        :value="value"
        :label="$t('@Attributes.attributeExtend.components.FormParamsToggle.richTextLabel')"
        @input="setParameterValue" />
</template>

<script>
import Toggler from '@UI/components/Toggler/Toggler';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'FormParamsToggle',
    components: {
        Toggler,
    },
    props: {
        typeKey: {
            type: String,
            default: '',
        },
        getParams: {
            type: Function,
            default: () => ({}),
        },
    },
    data() {
        return {
            parameterData: {},
        };
    },
    computed: {
        value() {
            return this.$store.state.attribute[this.parameterData.fieldName];
        },
    },
    watch: {
        typeKey: {
            handler() {
                this.setParameterValue();
            },
        },
    },
    created() {
        this.parameterData = this.getParams(this).params;
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
                key: this.parameterData.fieldName,
                value,
            });
        },
    },
};
</script>
