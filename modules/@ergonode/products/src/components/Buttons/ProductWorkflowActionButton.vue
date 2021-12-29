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
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductWorkflowActionButton',
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    fetch() {
        this.onGetProductWorkflow();
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
        languageWorkflow() {
            if (typeof this.workflow[this.languageCode] === 'undefined') {
                return {
                    currentStatus: {
                        color: '',
                        name: '',
                    },
                    statuses: [],
                };
            }

            return this.workflow[this.languageCode];
        },
        badgeColor() {
            return this.languageWorkflow.currentStatus.color;
        },
        title() {
            return this.languageWorkflow.currentStatus.name || `#${this.languageWorkflow.currentStatus.code}`;
        },
        options() {
            return this.languageWorkflow.statuses;
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
        languageCode() {
            this.onGetProductWorkflow();
        },
    },
    methods: {
        ...mapActions('product', [
            'updateProductStatus',
            'getProductWorkflow',
        ]),
        async onGetProductWorkflow() {
            if (typeof this.workflow[this.languageCode] === 'undefined') {
                this.isFetchingData = true;

                await this.getProductWorkflow({
                    languageCode: this.languageCode,
                    id: this.id,
                });

                this.isFetchingData = false;
            }
        },
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
