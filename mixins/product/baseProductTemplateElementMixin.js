/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapActions } from 'vuex';
import debounce from 'debounce';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import ProductTemplateDetailsContent from '~/components/Template/ProductDesigner/ProductTemplateDetailsContent';

export default {
    mixins: [errorValidationMixin],
    components: { ProductTemplateDetailsContent },
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
        value: {
            type: [Array, Object, Number, String],
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        hint: {
            type: String,
            default: '',
        },
        parameters: {
            type: [Array, Object],
            required: false,
            default: () => {},
        },
    },
    data() {
        return {
            localValue: this.value,
            debounceFunc: null,
        };
    },
    computed: {
        errorMessages() {
            return this.elementIsValidate(this.label);
        },
        isError() {
            return this.errorMessages !== null && this.errorMessages.length > 0;
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        ...mapActions('productsDraft', [
            'setProductTemplateElementValue',
        ]),
        onValueChange(value) {
            this.localValue = value;
            this.debounceFunc(value);
        },
        onSuccess(name) {
            this.removeValidationError(name);
        },
    },
    created() {
        this.debounceFunc = debounce((value) => {
            this.setProductTemplateElementValue({
                value,
                attributeId: this.id,
                required: this.required,
                name: this.label,
                onSuccess: this.onSuccess,
                onError: this.onError,
            });
        }, 500);
    },
};
