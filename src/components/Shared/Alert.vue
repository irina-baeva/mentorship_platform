<template>
 <v-alert type="error" @input="onClose" dismissible :value="true"> 
     <div>{{text}}</div>
    </v-alert>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose() {
            this.$emit('dismissed')
        }
    }
}
</script>