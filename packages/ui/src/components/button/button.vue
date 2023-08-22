<template>
    <button :class="classList" :disabled="props.disabled || props.loading">
        <span class="x-button__icon">
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
    import { computed } from 'vue';

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
    const classList = computed(() => {
        return {
            'x-button': true,
            [`--${props.theme}`]: true,
            '--link': props.link,
            '--text': props.text,
            '--normal': !props.link && !props.text,
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
        vertical-align: middle;
        font-size: inherit;
        line-height: 1;
        outline: none;
        user-select: none;
        cursor: pointer;

        &.--normal {
            height: var(--x-height);
            padding: 5px 10px;
            border-radius: var(--x-border-radius);
            border: 1px solid var(--x-gray);
        }

        &.--text,
        &.--link {
            background-color: transparent !important;
            border: none;
            font-weight: bold;
        }

        &.--text {
            &:disabled {
                text-decoration: line-through;
            }
        }

        &.--link {
            text-decoration: underline;

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

        @themes: default, primary, second, info, success, warn, error;
        @bgcs: var(--x-gray), var(--x-purple), var(--x-mauve), var(--x-blue), var(--x-green), var(--x-yellow),
            var(--x-red);
        @simpleBgcs: rgba(255, 255, 255, 0.2), var(--x-light-purple), var(--x-light-mauve), var(--x-light-blue),
            var(--x-light-green), var(--x-light-yellow), var(--x-light-red);
        @bcs: var(--x-white), var(--x-purple), var(--x-mauve), var(--x-blue), var(--x-green), var(--x-yellow),
            var(--x-red);
        @fcs: var(--x-gray), var(--x-purple), var(--x-mauve), var(--x-blue), var(--x-green), var(--x-yellow),
            var(--x-red);

        each(@themes, {
            &.--@{value} {
                color: if(@value =default, var(--x-black), var(--x-white));
                background-color: extract(@bgcs, @index);
                border-color: extract(@bcs, @index);

                &.--simple {
                    color: extract(@fcs, @index);
                    background-color: extract(@simpleBgcs, @index);

                    &:hover:not(:disabled) {
                        background-color: extract(@bgcs, @index);
                        color: if(@value =default, var(--x-black), var(--x-white));
                    }
                }

                &.--text, &.--link {
                    color: extract(@bgcs, @index);
                }

                &:active {
                    box-shadow: 0 0 5px extract(@bgcs, @index);
                }
            }
        });

        &:hover {
            filter: brightness(110%);
        }

        &:active {
            filter: brightness(90%);
        }

        &:disabled {
            cursor: not-allowed;
            filter: brightness(66%) grayscale(66%);
        }

        &.--loading {
            cursor: wait;
        }

        & + & {
            margin-left: var(--x-space);
        }

        .x-button__icon + span:not(:empty) {
            margin-left: var(--x-space-mini);
        }
    }
</style>
