/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar">
        <TitleBarDetails
            :title="title"
            :icon="icon"
            :is-breadcrumb="isBreadcrumb"
            @navigateback="onClick">
            <template #breadcrumb>
                <TitleBarBreadcrumb
                    v-for="(breadcrumb, index) in breadcrumbs"
                    :key="index"
                    :breadcrumb="breadcrumb" />
            </template>
            <template #badge>
                <InformationBadge
                    v-if="isStatus"
                    :background="status.color"
                    :color="statusTextContrastRation"
                    :title="status.name || status.code" />
                <InformationBadge
                    v-if="isReadOnly"
                    :background="blueColor"
                    :color="whiteColor"
                    title="READ ONLY">
                    <template #prepend>
                        <IconLock
                            class="badge__icon"
                            size="24"
                            :fill-color="whiteColor" />
                    </template>
                </InformationBadge>
            </template>
        </TitleBarDetails>
        <div class="title-bar__actions">
            <slot name="buttons" />
        </div>
    </div>
</template>

<script>
import { isEmpty } from '~/model/objectWrapper';
import { WHITE, BLUE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';
import {
    hexToRGB, calculateRelativeLuminance, calculateContrastRatio,
} from '~/model/color/ColorContrast';

export default {
    name: 'TitleBar',
    components: {
        TitleBarDetails: () => import('~/components/TitleBar/TitleBarDetails'),
        TitleBarBreadcrumb: () => import('~/components/TitleBar/TitleBarBreadcrumb'),
        InformationBadge: () => import('~/components/Badges/InformationBadge'),
        IconLock: () => import('~/components/Icon/Feedback/IconLock'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: Object,
            default: () => {},
        },
        icon: {
            type: String,
            default: null,
        },
        breadcrumbs: {
            type: Array,
            default: () => [],
        },
        isReadOnly: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        blueColor() {
            return BLUE;
        },
        isStatus() {
            return !isEmpty(this.status);
        },
        isBreadcrumb() {
            return this.breadcrumbs.length > 0;
        },
        statusTextContrastRation() {
            if (!this.isStatus) return null;
            const convertedRgbText = hexToRGB(WHITE);
            const convertedRgbBg = hexToRGB(this.status.color);
            const relativeLuminance = calculateRelativeLuminance(convertedRgbText);
            const relativeLuminanceBackground = calculateRelativeLuminance(convertedRgbBg);
            const contrastRatio = calculateContrastRatio(
                relativeLuminance,
                relativeLuminanceBackground,
            );

            return contrastRatio > 4.5 ? WHITE : GRAPHITE_DARK;
        },
    },
    methods: {
        onClick() {
            this.$emit('navigateback');
        },
    },
};
</script>

<style lang="scss" scoped>
    .title-bar {
        display: flex;
        flex: 0 0 auto;
        justify-content: space-between;
        align-items: center;
        min-height: 32px;
        padding: 24px;

        .badge__icon {
            margin: -6px 0 -6px -8px;
        }

        &__actions {
            display: flex;
            flex-direction: row-reverse;

            & > * {
                margin-left: 8px;
            }

            & > .btn--primary:first-of-type {
                margin-left: 16px;
            }
        }
    }

</style>
