/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="pagination">
        <Transition
            name="fade"
            mode="out-in">
            <div v-visible="!isLowestPage">
                <Button
                    icon="arrow-dart trans-quarter"
                    fab
                    color="transparent"
                    ripple-color="rgba(235, 235, 236, 1)"
                    @click.native="decrementPage" />
            </div>
        </Transition>
        <span class="pagination__text">
            Page
        </span>
        <TextField
            v-model="internalValue"
            style="width: 64px;"
            solid
            center-alignment
            :input="inputNumberType" />
        <span class="pagination__text">
            of
        </span>
        <span class="pagination__number">
            {{ maxPageNumber }}
        </span>
        <Transition name="fade">
            <div v-visible="!isHighestPage">
                <Button
                    icon="arrow-dart trans-three-fourth"
                    fab
                    color="transparent"
                    ripple-color="rgba(235, 235, 236, 1)"
                    @click.native="incrementPage" />
            </div>
        </Transition>
    </div>
</template>

<script>
import nestedVModelMixin from '~/mixins/nestedVModelMixin';

export default {
    name: 'GridPagination',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
        Button: () => import('~/components/Buttons/Button'),
    },
    mixins: [nestedVModelMixin],
    props: {
        maxPageNumber: {
            type: Number,
            required: true,
        },
    },
    computed: {
        isLowestPage() {
            return this.internalValue === 1;
        },
        isHighestPage() {
            return this.internalValue === this.maxPageNumber;
        },
        inputNumberType() {
            return {
                type: 'number',
                min: 0,
                max: this.maxPageNumber,
            };
        },
    },
    methods: {
        incrementPage() {
            this.internalValue += 1;
        },
        decrementPage() {
            this.internalValue -= 1;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/grid/pagination.scss";
    @import "~assets/scss/fade.scss";
</style>
