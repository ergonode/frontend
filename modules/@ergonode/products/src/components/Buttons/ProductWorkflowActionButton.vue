/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="title"
        :theme="secondaryTheme"
        :size="smallSize"
        :disabled="!isAllowedToUpdate || !options.length"
        :options="options"
        :fixed-content="true"
        @input="onUpdateStatus">
        <template #prepend>
            <PointBadge
                v-if="!isFetchingData"
                :color="badgeColor"
                :style="badgeStyles" />
        </template>
        <template #append>
            <Preloader v-if="isFetchingData" />
        </template>
        <template #option="{ option }">
            <ListElementAction :size="smallSize">
                <PointBadge
                    :color="option.color"
                    :style="optionsBadgeStyles" />
            </ListElementAction>
            <ListElementDescription>
                <ListElementTitle
                    :title="option.name || `#${option.code}`"
                    :size="smallSize" />
            </ListElementDescription>
        </template>
    </ActionButton>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import PointBadge from '@UI/components/Badges/PointBadge';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductWorkflowActionButton',
    components: {
        Preloader,
        PointBadge,
        ActionButton,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isFetchingData: true,
        };
    },
    computed: {
        ...mapState('product', [
            'id',
            'workflow',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        currentStatus() {
            if (!this.workflow[this.languageCode]) {
                return {
                    color: '',
                    name: '',
                };
            }

            return this.currentStatus;
        },
        badgeColor() {
            return this.currentStatus.color;
        },
        title() {
            if (this.isFetchingData) {
                return '';
            }

            return this.currentStatus.name;
        },
        options() {
            if (this.isFetchingData || !this.workflow[this.languageCode]) {
                return [];
            }

            return this.workflow[this.languageCode].statuses;
        },
        badgeStyles() {
            return {
                margin: '0 8px 0 4px',
            };
        },
        optionsBadgeStyles() {
            return {
                margin: '0 8px',
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    watch: {
        languageCode: {
            immediate: true,
            async handler() {
                if (typeof this.workflow[this.languageCode] === 'undefined') {
                    this.isFetchingData = true;

                    await this.getProductWorkflow({
                        languageCode: this.languageCode,
                        id: this.id,
                    });

                    this.isFetchingData = false;
                }
            },
        },
    },
    methods: {
        ...mapActions('product', [
            'updateProductStatus',
            'getProductWorkflow',
        ]),
        onUpdateStatus({
            id: statusId,
            code,
        }) {
            this.$confirm({
                type: MODAL_TYPE.POSITIVE,
                title: this.$t('@Products.product.components.ProductWorkflowActionButton.confirmTitle', {
                    info: code,
                }),
                action: () => this.updateProductStatus({
                    value: statusId,
                    languageCode: this.languageCode,
                    attributeId: this.workflow[this.languageCode].currentStatus.attribute_id,
                    onSuccess: () => {
                        this.getProductWorkflow({
                            languageCode: this.languageCode,
                            id: this.id,
                        });
                        this.$addAlert({
                            type: ALERT_TYPE.SUCCESS,
                            message: this.$t('@Products.product.components.ProductWorkflowActionButton.alertSuccess'),
                        });
                    },
                }),
            });
        },
    },
};
</script>
