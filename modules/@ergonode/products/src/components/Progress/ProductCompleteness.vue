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
import ProgressBar from '@UI/components/ProgressBar/ProgressBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductCompleteness',
    components: {
        ProgressBar,
    },
    props: {
        languageCode: {
            type: String,
            default: '',
        },
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
            if (this.isFetchingData) {
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

            return missing.length ? `Missing fields: ${missing.join(', ')}` : 'All completed';
        },
        title() {
            return `${this.progress}% Completed`;
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
        languageCode: {
            immediate: true,
            async handler() {
                if (typeof this.completeness[this.languageCode] === 'undefined') {
                    this.isFetchingData = true;

                    await this.getProductCompleteness({
                        languageCode: this.languageCode,
                    });

                    this.isFetchingData = false;
                }
            },
        },
    },
    methods: {
        ...mapActions('product', [
            'getProductCompleteness',
        ]),
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
