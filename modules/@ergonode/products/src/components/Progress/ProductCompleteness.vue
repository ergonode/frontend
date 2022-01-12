/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="completeness-progress"
        :title="hint">
        <span
            class="completeness-progress__title"
            v-text="title" />
        <ProgressBar
            :value="progress"
            :color="color" />
    </div>
</template>

<script>
import {
    GREEN,
    RED,
    YELLOW,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductCompleteness',
    props: {
        languageCode: {
            type: String,
            default: '',
        },
    },
    fetch() {
        this.onGetProductCompleteness();
    },
    data() {
        return {
            isFetchingData: true,
        };
    },
    computed: {
        ...mapState('product', [
            'completeness',
        ]),
        languageCompleteness() {
            if (this.isFetchingData || !this.completeness[this.languageCode]) {
                return {
                    missing: [],
                    filled: 0,
                    required: 0,
                };
            }

            return this.completeness[this.languageCode];
        },
        hint() {
            const missing = this.languageCompleteness.missing.map(field => field.name);

            return missing.length
                ? this.$t('@Products.product.components.ProductCompleteness.missingFields', {
                    info: missing.join(', '),
                })
                : this.$t('@Products.product.components.ProductCompleteness.allCompleted');
        },
        title() {
            return this.$t('@Products.product.components.ProductCompleteness.title', {
                info: this.progress,
            });
        },
        progress() {
            const {
                filled,
                required,
            } = this.languageCompleteness;
            const progress = Math.round((filled / required) * 100);

            if (Number.isNaN(progress)) {
                return 100;
            }
            return progress;
        },
        color() {
            return [
                RED,
                YELLOW,
                GREEN,
            ][Math.floor(this.progress / 40)];
        },
    },
    watch: {
        languageCode() {
            this.onGetProductCompleteness();
        },
    },
    methods: {
        ...mapActions('product', [
            'getProductCompleteness',
        ]),
        async onGetProductCompleteness() {
            this.isFetchingData = true;

            await this.getProductCompleteness({
                languageCode: this.languageCode,
            });

            this.isFetchingData = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .completeness-progress {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 160px;
        cursor: help;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            margin-bottom: 4px;
        }
    }
</style>
