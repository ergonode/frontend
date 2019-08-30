/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <!-- <div class="tab-wrapper">
        <ListSearchHeader
            header="Categories tree"
            @searchResults="onSearch" />
        <CategoriesList :language-code="userLanguageCode" />
    </div> -->
    <BaseTab>
        <CategoryTreeBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import CategoryTreeBaseCard from '~/components/Card/CategoryTreeBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'CategoryTreeBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        CategoryTreeBaseCard,
        BaseTab,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
// import { mapState } from 'vuex';

// export default {
//     name: 'CategoryTreeBaseTab',
//     components: {
//         CategoriesList: () => import('~/components/List/CategoriesList'),
//         ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
//     },
//     computed: {
//         ...mapState('authentication', {
//             userLanguageCode: state => state.user.language,
//         }),
//     },
//     methods: {
//         onSearch() {
//             // TODO: Add whenever we handle it at the BE
//         },
//     },
// };
</script>

<style lang="scss" scoped>
    // .tab-wrapper {
    //     position: relative;
    //     display: flex;
    //     flex: 1;
    //     flex-direction: column;
    //     width: 275px;
    // }
</style>
