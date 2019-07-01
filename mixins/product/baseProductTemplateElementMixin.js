/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapActions } from 'vuex';
import debounce from 'debounce';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    mixins: [errorValidationMixin],
    components: {
        InfoHint: () => import('~/components/Inputs/Hint/InfoHint'),
        ErrorHint: () => import('~/components/Inputs/Hint/ErrorHint'),
    },
    props: {
        placeholder: {
            type: String,
            required: false,
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
            required: true,
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
    watch: {
        value() {
            this.localValue = this.value;
        },
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
        onValueChange(value) {
            const tmpValue = value.key ? value.key : value;

            this.localValue = tmpValue;
            this.debounceFunc(tmpValue);
        },
        onSuccess(name) {
            this.removeValidationError(name);
        },
    },
    created() {
        this.debounceFunc = debounce((value) => {
            this.$store.dispatch('productsDraft/setProductTemplateElementValue', {
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
