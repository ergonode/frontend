/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Toggler
        :value="value"
        :label="$t('@Attributes.attributeExtend.components.AttributeFormParamsToggle.richTextLabel')"
        :disabled="disabled"
        @input="setParameterValue" />
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import Toggler from '@UI/components/Toggler/Toggler';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeFormParamsToggle',
    components: {
        Toggler,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        typeKey: {
            type: String,
            default: '',
        },
        getParams: {
            type: Function,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
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
            immediate: true,
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

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.parameterData.fieldName,
                value,
            });
        },
    },
};
</script>
