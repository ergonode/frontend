/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Add products from segment"
        @close="onClose">
        <template #body>
            <AddProductsFromSegmentForm
                :segment-options="segmentOptions"
                :segments="segments"
                @input="onFormValueChange" />
        </template>
        <template #footer>
            <Button
                title="ADD TO COLLECTION"
                :disabled="isRequestPending"
                @click.native="onAdd" />
            <Button
                title="CANCEL"
                :theme="secondaryTheme"
                @click.native="onClose" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AddProductsFromSegmentModalForm',
    components: {
        AddProductsFromSegmentForm: () => import('@Segments/components/Forms/Collection/AddProductsFromSegmentForm'),
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Button/Button'),
    },
    data() {
        return {
            segmentOptions: [],
            segments: [],
            isRequestPending: false,
        };
    },
    computed: {
        ...mapState('collection', {
            id: state => state.id,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    async created() {
        this.segmentOptions = await this.getSegmentOptions();
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        ...mapActions('segment', [
            'getSegmentOptions',
        ]),
        ...mapActions('collection', [
            'addBySegment',
        ]),
        onFormValueChange(value) {
            this.segments = value;
        },
        onClose() {
            this.$emit('close');
        },
        onAdd() {
            this.removeErrors();

            this.isRequestPending = true;
            this.addBySegment({
                segment: this.segments,
            }).then(() => {
                this.isRequestPending = false;
                this.removeErrors();
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: 'Products has been added to collection',
                });

                this.$emit('added');
            }).catch((e) => {
                this.isRequestPending = false;
                this.onError(e.data);
            });
        },
    },
};
</script>
