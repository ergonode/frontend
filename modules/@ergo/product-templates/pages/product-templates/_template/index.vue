/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplatePage
        title="New Template"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { asyncRequestWrapper } from '@Core/models/wrappers/asyncRequestWrapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    name: 'New',
    components: {
        TemplatePage: () => import('@Templates/components/Pages/TemplatePage'),
    },
    async fetch({ store }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('templateDesigner/clearStorage');

        const getTypesRequest = asyncRequestWrapper({
            action: 'templateDesigner/getTypes',
            path: `${userLanguageCode}/templates/types`,
            params: {},
            store,
        });

        return Promise.all([getTypesRequest]);
    },
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
            layoutElements: state => state.layoutElements,
        }),
    },
    methods: {
        ...mapActions('templateDesigner', [
            'createTemplateDesigner',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onCreateTemplateDesignerSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Template created' });
            this.$router.push({
                name: 'product-template-edit-id-general',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            import('@Templates/models/templateMapper').then(({ getMappedLayoutElementsForAPIUpdate }) => {
                this.createTemplateDesigner({
                    data: {
                        name: this.templateTitle,
                        image: this.templateImage,
                        elements: getMappedLayoutElementsForAPIUpdate(this.layoutElements),
                    },
                    onSuccess: this.onCreateTemplateDesignerSuccess,
                    onError: this.onError,
                });
            });
        },
    },
};
</script>
