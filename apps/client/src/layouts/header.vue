<template>
    <header class="header flex row-between">
        <h2>X-WINK</h2>
        <div class="links flex col-center">
            <a class="flex row-center" href="/" target="_blank" title="Website">
                <svg-icon height="24" name="logo" />
            </a>
            <a class="flex row-center" href="https://github.com/x-wink" target="_blank" title="Github">
                <svg-icon height="28" name="github" />
            </a>
            <a class="flex row-center" href="https://www.npmjs.com/~xwink" target="_blank" title="Npm">
                <svg-icon height="28" name="npm" />
            </a>
        </div>
    </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
    .header {
        padding: 10px;
        align-items: center;
        .links {
            a {
                color: white;
                + a {
                    margin-left: 10px;
                }
            }
        }
    }
</style>
