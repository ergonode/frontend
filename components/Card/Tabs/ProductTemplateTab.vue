/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
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
import { objectToArray } from '~/model/objectWrapper';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'ProductTemplateTab',
    components: {
        ProductTemplateCard: () => import('~/components/Card/ProductTemplateCard'),
        ProductTemplateHeaderCard: () => import('~/components/Card/ProductTemplateHeaderCard'),
        Footer,
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
                    disabled: !this.$hasAccess('PRODUCT_UPDATE'),
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
    },
};
</script>
