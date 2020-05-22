<template>
    <div class="pac-frame">
        <span>{{name}}</span>
        <div>
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({name: 'pac-frame'})
    export default class PacFrame extends Vue {
        @Prop({type: String, required: false, default: ''})
        name!: string;
    }
</script>

<style lang="scss">
    @import "pac-frame";
</style>