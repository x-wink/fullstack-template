<template>
    <button :class="classList" :disabled="props.disabled || props.loading">
        <span v-if="props.loading || props.icon || slots.icon" class="x-button__icon">
            <XIcon v-if="props.loading" animation="spin" name="Loading" />
            <slot v-else name="icon">
                <XIcon v-if="props.icon" :name="props.icon" />
            </slot>
        </span>
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
    import { ButtonTheme, XIcon, IconName } from '../';
    import { computed, useSlots } from 'vue';

    defineOptions({
        name: 'XButton',
    });
    const props = withDefaults(
        defineProps<{
            theme?: ButtonTheme;
            icon?: IconName;
            text?: boolean;
            link?: boolean;
            simple?: boolean;
            round?: boolean;
            circle?: boolean;
            loading?: boolean;
            disabled?: boolean;
        }>(),
        {
            theme: 'default',
            disabled: false,
            loading: false,
            text: false,
            link: false,
            circle: false,
            round: false,
            simple: false,
        }
    );
    const slots = useSlots();
    const classList = computed(() => {
        return {
            'x-button': true,
            [`--${props.theme}`]: true,
            '--link': props.link,
            '--text': props.text,
            '--simple': props.simple,
            '--round': props.round,
            '--circle': props.circle,
            '--loading': props.loading,
        };
    });
</script>

<style lang="less">
    .x-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        text-align: center;
        font-size: inherit;
        line-height: 0;
        outline: none !important;
        user-select: none;
        cursor: pointer;

        height: var(--x-height);
        padding: 5px 10px;
        border-radius: var(--x-border-radius);
        border: 1px solid var(--x-gray);

        @themes: default, primary, second, info, success, warn, error;
        @bgcs: var(--x-white), var(--x-purple), var(--x-mauve), var(--x-blue), var(--x-green), var(--x-yellow),
            var(--x-red);
        @bcs: var(--x-white), var(--x-purple), var(--x-mauve), var(--x-blue), var(--x-green), var(--x-yellow),
            var(--x-red);
        @fcs: var(--x-black), var(--x-purple), var(--x-mauve), var(--x-blue), var(--x-green), var(--x-yellow),
            var(--x-red);
        @simpleBgcs: var(--x-dark-white), var(--x-dark-purple), var(--x-dark-mauve), var(--x-dark-blue),
            var(--x-dark-green), var(--x-dark-yellow), var(--x-dark-red);
        @simpleFcs: var(--x-light-white), var(--x-light-purple), var(--x-light-mauve), var(--x-light-blue),
            var(--x-light-green), var(--x-light-yellow), var(--x-light-red);

        each(@themes, {
            &.--@{value} {
                color: if(@value =default, var(--x-black), var(--x-white));
                background-color: extract(@bgcs, @index);
                border-color: extract(@bcs, @index);

                &.--simple {
                    color: if(@value =default, extract(@bcs, @index), var(--x-white));
                    background-color: transparent;

                    &:hover:not(:disabled) {
                        background-color: extract(@bgcs, @index);
                        color: if(@value =default, var(--x-black), var(--x-white));
                    }
                }

                &.--text, &.--link {
                    color: extract(@bgcs, @index);
                    &:active:not(:disabled) {
                        box-shadow: none;
                    }
                }
                &.--text{
                    &:hover:not(:disabled) {
                        color: if(@value =default, var(--x-gray), var(--x-white));
                        background-color: extract(@simpleBgcs, @index);
                    }
                }
                &.--link{
                    &::after {
                        border-bottom-color: extract(@bgcs, @index);
                    }
                }

                &:active {
                    box-shadow: 0 0 5px extract(@bgcs, @index);
                }
            }
        });

        &.--text,
        &.--link {
            background-color: transparent;
            border-color: transparent;
        }

        &.--text {
            &:disabled {
                text-decoration: line-through;
            }
        }

        &.--link {
            position: relative;
            &::after {
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                height: 0;
                width: 0;
                border-bottom: 2px dashed var(--x-white);
                transition: width 0.3s;
            }
            &:hover:not(:disabled) {
                &::after {
                    width: 70%;
                }
            }
            &:active:not(:disabled) {
                &::after {
                    border-bottom-style: solid;
                }
            }
            &:disabled {
                font-style: italic;
            }
        }

        &.--round {
            border-radius: 9999px;
        }

        &.--circle {
            border-radius: 50%;
            height: fit-content;
            padding: 10px;
            min-width: 30px;
            min-height: 30px;

            &::before {
                content: '';
                display: inline-block;
                vertical-align: middle;
                padding-top: 100%;
                height: 0;
            }
        }

        &:hover {
            filter: brightness(120%);
        }

        &:active {
            filter: brightness(80%);
        }

        &:disabled {
            cursor: not-allowed;
            filter: brightness(66%) grayscale(66%);
        }

        &.--loading {
            cursor: wait;
        }

        &__icon {
            + span:not(:empty) {
                margin-left: var(--x-space-mini);
            }
        }
    }
</style>
