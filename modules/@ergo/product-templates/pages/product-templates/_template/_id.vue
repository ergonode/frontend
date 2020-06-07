/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplatePage
        :title="templateTitle"
        @remove="onRemove"
        @save="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { SKU_MODEL_ID } from '@Templates/defaults/product';
import { MODAL_TYPE } from '@Core/defaults/modals';

export default {
    name: 'Edit',
    components: {
        TemplatePage: () => import('@Templates/components/Pages/TemplatePage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;
        const { id } = params;

        await store.dispatch('templateDesigner/getTypes', {
            path: `${userLanguageCode}/templates/types`,
        });
        await store.dispatch('templateDesigner/getTemplateByID', {
            path: `${userLanguageCode}/templates/${id}`,
        });
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
            defaultTextAttribute: state => state.defaultTextAttribute,
            defaultImageAttribute: state => state.defaultImageAttribute,
        }),
    },
    destroyed() {
        this.listClearStorage();
        this.clearStorage();
    },
    methods: {
        ...mapActions('templateDesigner', [
            'updateTemplateDesigner',
            'removeTemplate',
            'getTemplateByID',
            'clearStorage',
        ]),
        ...mapActions('list', {
            listClearStorage: 'clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onUpdateTemplateDesignerSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Template updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Template removed' });
            this.$router.push({ name: 'product-templates' });
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this template?',
                confirmCallback: () => {
                    const { id } = this.$route.params;

                    this.removeTemplate({
                        id,
                        onSuccess: this.onRemoveSuccess,
                    });
                },
            });
        },
        onCreate() {
            import('@Templates/models/templateMapper').then(({ getMappedLayoutElementsForAPIUpdate }) => {
                const { id } = this.$route.params;
                this.updateTemplateDesigner({
                    id,
                    data: {
                        name: this.templateTitle,
                        image: this.templateImage,
                        defaultLabel: this.defaultTextAttribute !== SKU_MODEL_ID
                            ? this.defaultTextAttribute
                            : null,
                        defaultImage: this.defaultImageAttribute,
                        elements: getMappedLayoutElementsForAPIUpdate(this.layoutElements),
                    },
                    onSuccess: this.onUpdateTemplateDesignerSuccess,
                    onError: this.onError,
                });
            });
        },
    },
    head() {
        return {
            title: `${this.templateTitle} - Product templates - Ergonode`,
        };
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
