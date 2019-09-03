/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplatePage
        :title="templateTitle"
        is-edit
        @dismiss="onCancel"
        @save="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'Edit',
    middleware: ['tab/redirectToTemplateDesignerGeneral'],
    components: {
        TemplatePage: () => import('~/components/Pages/TemplatePage'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('templateDesigner', {
            groups: state => state.templateGroups,
            templateTitle: state => state.title,
            templateImage: state => state.image,
            layoutElements: state => state.layoutElements,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('templateDesigner', [
            'updateTemplateDesigner',
            'getTemplateByID',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onCancel() {
            this.$router.push('/templates');
        },
        onUpdateTemplateDesignerSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Template updated' });
            this.$router.push('/templates');
        },
        onCreate() {
            import('~/model/mappers/templateMapper').then(({ getMappedLayoutElementsForAPIUpdate }) => {
                const { id } = this.$route.params;
                this.updateTemplateDesigner({
                    id,
                    data: {
                        name: this.templateTitle,
                        image: this.templateImage,
                        elements: getMappedLayoutElementsForAPIUpdate(this.layoutElements),
                    },
                    onSuccess: this.onUpdateTemplateDesignerSuccess,
                    onError: this.onError,
                });
            });
        },
    },
    async fetch({ store, params }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;
        const { id } = params;

        await store.dispatch('list/clearStorage');
        await store.dispatch('templateDesigner/getTypes', {
            path: `${userLanguageCode}/templates/types`,
        });
        await store.dispatch('list/getGroups', {
            languageCode: userLanguageCode,
        });
        await store.dispatch('templateDesigner/getTemplateByID', {
            path: `${userLanguageCode}/templates/${id}`,
        });
    },
};
</script>

<style lang="scss" scoped>
    .template-container {
        .template-container__content {
            display: grid;
            grid-template-columns: 300px auto;
        }
    }
</style>
