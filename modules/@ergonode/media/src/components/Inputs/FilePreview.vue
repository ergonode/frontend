/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle
        :disabled="true"
        height="80px">
        <template #activator>
            <InputController>
                <InputImageController>
                    <IconFile />
                </InputImageController>
                <InputLabel
                    :floating="true"
                    :disabled="true"
                    :label="label" />
            </InputController>
        </template>
    </InputSolidStyle>
</template>

<script>
import IconFile from '@UI/components/Icons/Others/IconFile';
import InputController from '@UI/components/Input/InputController';
import InputImageController from '@UI/components/Input/InputImageController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';

export default {
    name: 'FilePreview',
    components: {
        IconFile,
        InputLabel,
        InputSolidStyle,
        InputController,
        InputImageController,
    },
    props: {
        label: {
            type: String,
            default: '',
        },
    },
};
</script>
