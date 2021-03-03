/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadImageFile
        :data-cy="dataCyGenerator('image')"
        :value="image"
        height="132px"
        label="Template cover image"
        :disabled="disabled"
        @input="setImageValue" />
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormUploadImage',
    components: {
        UploadImageFile,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        /*
        IMPORTANT: SAFE RELATIONSHIP
        Values in store are extended from this module - no hard relationship.
        No problems when module @Template does not exist.
        */
        ...mapState('productTemplate', [
            'image',
        ]),
    },
    methods: {
        ...mapActions('productTemplate', [
            '__setState',
        ]),
        setImageValue(value) {
            this.__setState({
                key: 'image',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'image',
                value,
            });
        },
        dataCyGenerator(key) {
            return `template-${key}`;
        },
    },
};
</script>
