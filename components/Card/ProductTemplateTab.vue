/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <ProductTemplateHeaderCard slot="header" />
        <ProductTemplateCard
            slot="content"
            :language-code="languageCode" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import { mapState } from 'vuex';
import { getObjectByKey, objectToArray } from '~/model/objectWrapper';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'ProductTemplateTab',
    components: {
        ProductTemplateCard: () => import('~/components/Card/ProductTemplateCard'),
        ProductTemplateHeaderCard: () => import('~/components/Card/ProductTemplateHeaderCard'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
        BaseTab,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            buttons: [
                {
                    title: 'SAVE CHANGES',
                    action: this.updateButton.action,
                },
            ],
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        ...mapState('data', {
            languages: state => state.languages,
        }),
        ...mapState('productsDraft', {
            languageCode: state => state.languageCode,
            completeness: state => state.completeness,
        }),
        languagesValues() {
            return objectToArray(this.languages);
        },
        selectedLanguage: {
            get() {
                return getObjectByKey(this.languages, this.languageCode);
            },
            set(newLanguage) {
                this.$store.dispatch('productsDraft/setDraftLanguageCode', {
                    languageCode: newLanguage,
                });
            },
        },
    },
};
</script>
