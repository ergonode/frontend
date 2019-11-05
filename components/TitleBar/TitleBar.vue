/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar">
        <TitleBarDetails
            :title="title"
            :icon="icon"
            :is-breadcrumb="breadcrumbs.length !== 0"
            @navigateback="onClick">
            <template #breadcrumb>
                <TitleBarBreadcrumb
                    v-for="(breadcrumb, index) in breadcrumbs"
                    :key="index"
                    :breadcrumb="breadcrumb" />
            </template>
            <template #badge>
                <InformationBadge
                    v-if="status"
                    :background="status.color"
                    :color="statusTextContrastRation"
                    :title="status.code" />
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
        <TitleBarActions :buttons="buttons" />
    </div>
</template>

<script>
import { WHITE, BLUE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';
import {
    hexToRGB, calculateRelativeLuminance, calculateContrastRatio,
} from '~/model/color/ColorContrast';

export default {
    name: 'TitleBar',
    components: {
        TitleBarDetails: () => import('~/components/TitleBar/TitleBarDetails'),
        TitleBarActions: () => import('~/components/TitleBar/TitleBarActions'),
        TitleBarBreadcrumb: () => import('~/components/TitleBar/TitleBarBreadcrumb'),
        InformationBadge: () => import('~/components/Badges/InformationBadge'),
        IconLock: () => import('~/components/Icon/Feedback/IconLock'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            default: () => [],
        },
        status: {
            type: Object,
            default: null,
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
        statusTextContrastRation() {
            if (!this.status) return null;

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
    }

</style>
