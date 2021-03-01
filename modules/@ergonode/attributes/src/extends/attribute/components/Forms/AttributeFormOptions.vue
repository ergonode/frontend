/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeOptionKeyValues
        key="attrHasOptions"
        :scope="scope"
        :errors="errors"
        :change-values="changeValues"
        :disabled="disabled" />
</template>

<script>
import AttributeOptionKeyValues from '@Attributes/extends/attribute/components/Forms/Sections/AttributeOptionKeyValues';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeFormOptions',
    components: {
        AttributeOptionKeyValues,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        typeKey: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('attribute', [
            'options',
        ]),
        optionsFieldKeys() {
            return 'options';
        },
    },
    watch: {
        typeKey: {
            immediate: true,
            handler() {
                this.removeAttributeOptions();
            },
        },
    },
    methods: {
        ...mapActions('attribute', [
            'removeAttributeOptions',
        ]),
    },
};
</script>
