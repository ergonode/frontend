/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <AttributeGroupForm
                :submit-title="$t('@AttributeGroups._.submit')"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import AttributeGroupForm from '@AttributeGroups/components/Forms/AttributeGroupForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeGroupGeneralTab',
    components: {
        AttributeGroupForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('attributeGroup', [
            'updateAttributeGroup',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateAttributeGroup({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@AttributeGroups.attributeGroup.components.AttributeGroupGeneralTab.updateSuccess'),
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
