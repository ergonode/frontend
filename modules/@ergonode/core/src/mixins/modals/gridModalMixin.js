/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        HorizontalRoutingTabBarContent: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBarContent'),
    },
    data() {
        return {
            isModalVisible: false,
            fetchGridData: false,
        };
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onCreatedData() {
            this.onCloseModal();
            this.fetchGridData = true;
        },
        onFetchedGridData() {
            this.fetchGridData = false;
        },
    },
};
