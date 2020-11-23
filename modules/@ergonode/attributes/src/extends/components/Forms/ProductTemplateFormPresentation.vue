/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection title="Presentation product">
        <Autocomplete
            :data-cy="dataCyGenerator('default-label')"
            :value="defaultTextAttribute"
            label="Default label attribute"
            :searchable="true"
            :disabled="disabled"
            filter-type="TEXT"
            href="attributes/autocomplete"
            :error-messages="errors.defaultLabel"
            :additional-static-options="additionalStaticTextOptions"
            @input="setDefaultTextAttributeValue">
            <template #placeholder="{ isVisible }">
                <DropdownPlaceholder
                    v-if="isVisible"
                    :title="textAttributesPlaceholder.title"
                    :subtitle="textAttributesPlaceholder.subtitle">
                    <template #action>
                        <Button
                            title="GO TO ATTRIBUTES"
                            :size="smallSize"
                            :disabled="disabled"
                            @click.native="onNavigateToAttributes" />
                    </template>
                </DropdownPlaceholder>
            </template>
        </Autocomplete>
        <Autocomplete
            :data-cy="dataCyGenerator('default-image')"
            :value="defaultImageAttribute"
            label="Default image attribute"
            :searchable="true"
            :clearable="true"
            :disabled="disabled"
            filter-type="IMAGE"
            :error-messages="errors.defaultImage"
            href="attributes/autocomplete"
            @input="setDefaultImageAttributeValue">
            <template #placeholder="{ isVisible }">
                <DropdownPlaceholder
                    v-if="isVisible"
                    :title="imageAttributesPlaceholder.title"
                    :subtitle="imageAttributesPlaceholder.subtitle">
                    <template #action>
                        <Button
                            title="GO TO ATTRIBUTES"
                            :size="smallSize"
                            :disabled="disabled"
                            @click.native="onNavigateToAttributes" />
                    </template>
                </DropdownPlaceholder>
            </template>
        </Autocomplete>
    </FormSection>
</template>

<script>
import {
    SKU_MODEL,
} from '@Attributes/defaults/attributes';
import {
    SIZE,
} from '@Core/defaults/theme';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import FormSection from '@UI/components/Form/Section/FormSection';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormPresentation',
    components: {
        DropdownPlaceholder,
        Autocomplete,
        FormSection,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('productTemplate', [
            'defaultTextAttribute',
            'defaultImageAttribute',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        imageAttributesPlaceholder() {
            return {
                title: 'No image attributes',
                subtitle: 'There are no image attributes in the system, so you can create the first one.',
            };
        },
        textAttributesPlaceholder() {
            return {
                title: 'No text attributes',
                subtitle: 'There are no text attributes in the system, so you can create the first one.',
            };
        },
        additionalStaticTextOptions() {
            return [
                SKU_MODEL,
            ];
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            '__setState',
        ]),
        onNavigateToAttributes() {
            this.$router.push({
                name: 'attributes-grid',
            });
        },
        setDefaultTextAttributeValue(value) {
            this.__setState({
                key: 'defaultTextAttribute',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'defaultTextAttribute',
                value,
            });
        },
        setDefaultImageAttributeValue(value) {
            this.__setState({
                key: 'defaultImageAttribute',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'defaultImageAttribute',
                value,
            });
        },
        dataCyGenerator(key) {
            return `template-${key}`;
        },
    },
};
</script>
