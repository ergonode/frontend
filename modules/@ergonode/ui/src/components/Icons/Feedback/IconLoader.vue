/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <svg
        id="elwfecyetv41"
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :viewBox="viewBox"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision">
        <g
            id="elwfecyetv42_to"
            transform="translate(0,0)">
            <path
                id="elwfecyetv42"
                :d="drawingCommands1"
                transform="translate(0,0)"
                fill="rgb(0,188,135)"
                stroke="none"
                stroke-width="1" />
        </g>
        <g
            id="elwfecyetv43_to"
            transform="translate(0,0)">
            <path
                id="elwfecyetv43"
                :d="drawingCommands2"
                transform="translate(0,0)"
                fill="rgb(0,188,135)"
                stroke="none"
                stroke-width="1" />
        </g>
        <g
            id="elwfecyetv44_to"
            transform="translate(0,0)">
            <path
                id="elwfecyetv44"
                :d="drawingCommands3"
                transform="translate(0,0)"
                fill="rgb(0,188,135)"
                stroke="none"
                stroke-width="1" />
        </g>
        <g
            id="elwfecyetv45_ts"
            transform="translate(23.999850,22.817950) scale(1,1)">
            <path
                id="elwfecyetv45"
                :d="drawingCommands4"
                transform="translate(-23.999850,-22.817950)"
                fill="rgb(0,188,135)"
                stroke="none"
                stroke-width="1" />
        </g>
    </svg>
</template>

<script>
export default {
    name: 'IconLoader',
    props: {
        /**
         * Width of the component
         */
        width: {
            type: [
                Number,
                String,
            ],
            default: 24,
        },
        /**
         * Height of the component
         */
        height: {
            type: [
                Number,
                String,
            ],
            default: 24,
        },
        viewBox: {
            type: String,
            default: '0 0 48 48',
        },
    },
    computed: {
        drawingCommands1() {
            return 'M32.336600,29.118800L32.333200,32.271200L23.999800,37L15.666500,32.271200L15.666500,29.122600L22.610900,33.059600L22.610900,27.396000C23.051900,27.525600,23.517200,27.593900,23.999800,27.593900C24.482500,27.593900,24.947800,27.525600,25.388700,27.396000L25.388700,33.059600L32.336600,29.118800Z';
        },
        drawingCommands2() {
            return 'M15.666700,16.513100L20.663200,19.348200C19.985800,19.972500,19.493100,20.791300,19.270800,21.712100L14.277800,18.877400L14.277800,26.754700L13.583300,26.362400L11.500000,25.181600L11.500000,15.724700L19.833300,11L22.611100,12.576200L15.666700,16.513100Z';
        },
        drawingCommands3() {
            return 'M36.499800,15.725100L36.499800,25.182000L33.722000,26.758100L33.722000,18.877400L28.728900,21.712400C28.506400,20.791600,28.013700,19.972500,27.336200,19.348200L32.333100,16.513500L25.388700,12.576500L28.166400,11L36.499800,15.725100Z';
        },
        drawingCommands4() {
            return 'M26.083200,22.818000C26.083200,22.961200,26.069300,23.101100,26.041500,23.237600L26.038000,23.237600C25.947400,23.670800,25.714800,24.056400,25.388700,24.339500C25.020300,24.667000,24.534600,24.864900,23.999800,24.864900C23.465100,24.864900,22.979000,24.667000,22.610900,24.339500C22.284600,24.056400,22.051900,23.670800,21.961600,23.237600L21.958200,23.237600C21.930400,23.101100,21.916500,22.961200,21.916500,22.818000C21.916500,21.910500,22.520300,21.139400,23.350500,20.873300C23.555400,20.805500,23.774100,20.771000,23.999800,20.771000C24.225200,20.771000,24.443900,20.805500,24.649100,20.873300C25.482500,21.139400,26.083200,21.910500,26.083200,22.818000';
        },
    },
};
</script>

<style lang="scss" scoped>
    #elwfecyetv42_to {
        animation: elwfecyetv42_to__to 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv42_to__to {
        0% {
            transform: translate(0, 0);
        }

        16.800000% {
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        40.800000% {
            transform: translate(0, 21px);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        44.800000% {
            transform: translate(-0.0017px, -37px);
            animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
        }

        74.800000% {
            transform: translate(0, 0.004px);
        }

        100% {
            transform: translate(0, 0.004px);
        }
    }

    #elwfecyetv42 {
        animation: elwfecyetv42_f_o 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv42_f_o {
        0% {
            fill-opacity: 1;
        }

        16.800000% {
            fill-opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        28.800000% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        60% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        74.800000% {
            fill-opacity: 1;
        }

        100% {
            fill-opacity: 1;
        }
    }

    #elwfecyetv43_to {
        animation: elwfecyetv43_to__to 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv43_to__to {
        0% {
            transform: translate(0, 0);
        }

        8% {
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        32% {
            transform: translate(-22.6111px, -14.87735px);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        36% {
            transform: translate(36.5px, 21.2453px);
            animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
        }

        66% {
            transform: translate(0, 0);
        }

        100% {
            transform: translate(0, 0);
        }
    }

    #elwfecyetv43 {
        animation: elwfecyetv43_f_o 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv43_f_o {
        0% {
            fill-opacity: 1;
        }

        8% {
            fill-opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        20% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        51.200000% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        66% {
            fill-opacity: 1;
        }

        100% {
            fill-opacity: 1;
        }
    }

    #elwfecyetv44_to {
        animation: elwfecyetv44_to__to 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv44_to__to {
        0% {
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        24% {
            transform: translate(22.6113px, -14.87905px);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        40% {
            transform: translate(-36.4998px, 21.2419px);
            animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
        }

        58% {
            transform: translate(0.0013px, 0);
        }

        100% {
            transform: translate(0.0013px, 0);
        }
    }

    #elwfecyetv44 {
        animation: elwfecyetv44_f_o 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv44_f_o {
        0% {
            fill-opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        12% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        43.200000% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        58% {
            fill-opacity: 1;
        }

        100% {
            fill-opacity: 1;
        }
    }

    #elwfecyetv45_ts {
        animation: elwfecyetv45_ts__ts 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv45_ts__ts {
        0% {
            transform: translate(23.99985px, 22.81795px) scale(1, 1);
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        28.800000% {
            transform: translate(23.99985px, 22.81795px) scale(1, 1);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        41.200000% {
            transform: translate(23.99985px, 22.81795px) scale(10, 10);
            animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }

        52.400000% {
            transform: translate(23.99985px, 22.81795px) scale(9.479485, 9.479485);
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        80.800000% {
            transform: translate(23.99985px, 22.81795px) scale(1, 1);
        }

        100% {
            transform: translate(23.99985px, 22.81795px) scale(1, 1);
        }
    }

    #elwfecyetv45 {
        animation: elwfecyetv45_f_o 2500ms linear infinite normal forwards;
    }

    @keyframes elwfecyetv45_f_o {
        0% {
            fill-opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        28.800000% {
            fill-opacity: 1;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        37.200000% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        72% {
            fill-opacity: 0;
            animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
        }

        80.800000% {
            fill-opacity: 1;
        }

        100% {
            fill-opacity: 1;
        }
    }
</style>
