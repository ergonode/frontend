/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="footerClasses">
        <slot
            v-if="isPaginationVisible"
            name="pagination" />
        <Button
            large
            title="SAVE CHANGES"
            @click.native="saveDrafts" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridFooter',
    components: {
        Button: () => import('~/components/Buttons/Button'),
    },
    props: {
        isPaginationVisible: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState('gridDraft', {
            drafts: state => state.drafts,
        }),
        ...mapState('grid', {
            rows: state => state.rows,
        }),
        footerClasses() {
            return [
                'footer-wrapper',
                {
                    'footer-wrapper--pagination': this.isPaginationVisible,
                },
            ];
        },
    },
    methods: {
        ...mapActions('gridDraft', [
            'removeDraft',
            'forceDraftsMutation',
        ]),
        ...mapActions('productsDraft', [
            'applyDraft',
        ]),
        ...mapActions('grid', [
            'addDraftToProduct',
        ]),
        saveDrafts() {
            const promises = [];

            Object.entries(this.drafts).forEach(([productId, column]) => {
                Object.entries(column).forEach(([columnId, languageCode]) => {
                    const [value] = Object.values(languageCode);

                    promises.push(this.applyDraft({
                        id: productId,
                        onSuccess: () => {
                            this.addDraftToProduct({ columnId, productId, value });
                            this.removeDraft(productId);
                        },
                        onError: () => {},
                    }));
                });
            });

            Promise.all(promises).then(() => {
                this.forceDraftsMutation();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .footer-wrapper {
        z-index: 999;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 12px 24px;
        background-color: $white;
        flex-shrink: 0;
        box-shadow:
            0 6px 10px 0 rgba(0, 0, 0, 0.14),
            0 1px 18px 0 rgba(0, 0, 0, 0.12),
            0 3px 5px -1px rgba(0, 0, 0, 0.2);

        &--pagination {
            justify-content: space-between;
        }
    }
</style>
