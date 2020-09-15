/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create segment"
        @close="onClose">
        <template #body>
            <SegmentForm
                submit-title="CREATE"
                proceed-title="CREATE AND EDIT"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import SegmentForm from '@Segments/components/Forms/SegmentForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateSegmentModalForm',
    components: {
        ModalForm,
        SegmentForm,
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('segment', [
            'createSegment',
            '__clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.createSegment({
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeErrors();
            this.createSegment({
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment created',
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.$router.push({
                name: 'segment-id-general',
                params: {
                    id,
                },
            });
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
            this.isProceeding = false;
        },
    },
};
</script>
