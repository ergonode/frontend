/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="header">
        <div>
            <Select
                v-model="language"
                solid
                regular
                label="Display language"
                :options="languagesValues" />
        </div>
        <div>
            <ProductCompleteness :language="language" />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeyByValue, getValueByKey } from '~/model/objectWrapper';

export default {
    name: 'ProductTemplateHeaderCard',
    components: {
        Select: () => import('~/components/Inputs/Select/Select'),
        ProductCompleteness: () => import('~/components/Progress/ProductCompleteness'),
    },
    data: () => ({
        language: '',
        progress: 80,
    }),
    watch: {
        language() {
            const languageCode = getKeyByValue(this.languages, this.language);

            this.setDraftLanguageCode({ languageCode });
        },
    },
    created() {
        this.language = getValueByKey(this.languages, this.languageCode);
    },
    computed: {
        ...mapState('data', {
            languages: state => state.languages,
        }),
        ...mapState('productsDraft', {
            languageCode: state => state.languageCode,
            completeness: state => state.completeness,
        }),
        languagesValues() {
            return Object.values(this.languages);
        },
        color() {
            return ['#f44336', '#ffc108', '#00bc87'][Math.floor(this.progress / 40)];
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'setDraftLanguageCode',
        ]),
    },
};
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 34px;
        border-bottom: 1px solid $grey;
    }
</style>
