<template>
    <button
        type='button'
        @click='handleClick'
        :class="[
            're-button',
            type ? type + '-btn':'',
            size ? size : '',
            {
                'plain': plain,
                'loading': loading,
                'disabled': disabled
            }
        ]"
    >
        <i class='el-icon-loading' v-if='loading'></i>
        <i :class='icon' v-if="icon && !loading"></i>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 're-button',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            loading: Boolean,
            size: String,
            plain: Boolean,
            icon: String,
            disabled: Boolean
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>