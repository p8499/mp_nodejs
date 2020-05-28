<template>
    <div class="pac-file" :class="{disabled: disabled}">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <div>
            <span>
                {{disabled? '上传功能被锁定' : fileList===null || fileList.length === 0? '没有选择文件' : fileList.length === 1? fileList[0].name : `已选择 ${fileList.length} 个文件`}}
            </span>
            <input ref="input" :id="id" type="file" :accept="accept" :disabled="disabled" :multiple="multiple"
                   @input="fileList = $event.target.files"
                   :class="{'error': message !== null}"/>
        </div>
        <img style="margin-left: 2px" src="" alt="" @click="$refs['input'].click()" v-if="!disabled"/>
        <img style="margin-left: 2px" src="" alt="" @click="upload()"
             v-if="!disabled && fileList !== null && fileList.length > 0"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import PacCommon from "@/components/lib/pac-common";

    type Type = 'image' | 'video' | 'audio';

    @Component({name: 'pac-file-raw'})
    export default class PacFileRaw extends Vue {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: true})
        multiple!: boolean;

        @Prop({type: Boolean, required: true})
        disabled!: boolean;

        @Prop({
            validator: (value) => Array.isArray(value) && value.every(v => ['image', 'video', 'audio'].includes(v)),
            required: true
        })
        type!: Array<Type>;

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        fileList: FileList | null = null;

        upload(): void {
            if (this.fileList !== null) {
                const files = new Array<File>();
                for (let i = 0; i < this.fileList.length; i++)
                    files.push(this.fileList[i]);
                this.$emit('upload', files);
            } else
                this.$emit('upload', []);
        }

        getAccept(type: Type): string {
            switch (type) {
                case 'image':
                    return 'image/*';
                case 'video':
                    return 'video/*';
                case 'audio':
                    return 'audio/*';
                default:
                    return '';
            }
        }

        get accept(): string {
            if (this.type.length > 0)
                return this.type.map(v => this.getAccept(v)).join(',');
            else
                return '*/*';
        }
    }
</script>

<style lang="scss" scoped>
    div.pac-file {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: stretch;
        align-items: center;

        /*输入框label*/
        > label {
            > span {
                display: inline-block;
                text-align: start;
                width: 120px;
                font-size: 11px;
                color: #454545;
                white-space: nowrap;

                &.no-label {
                    display: none;
                }
            }
        }

        /*输入框*/
        > div {
            width: 120px;
            height: 14px;
            border-width: 1px;
            border-style: solid;
            border-color: #aeb4bd #e0e3e8 #e0e3e8 #aeb4bd;
            padding: 1px 4px 1px 4px;
            font-size: 8pt;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: start;
            align-items: center;

            > span {
            }

            > input {
                display: none;
            }

            &.error {
                border-color: rgb(255, 0, 0);
            }
        }

        /*选择*/
        > img:nth-of-type(1) {
            width: 16px;
            height: 16px;
            content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4T6VTUU7CQBScV4h+wg3EG5QTyA2sJ1BPIC9Sk9YP8UNIpMnCDbiB3MB6AvEE6gn024SO2S2YUmiC+j53Z2fevHkr+GdJ8X3fmOZ+5l0wYyACn8AngFTISRRquk3rh+Du3vjiyaOQ9syC5xA0CQQCOSAxjsOulkkcgVXeW8irgO+oIYhU34rA4cj0IXJDUuNQx8U7R+AAQBd1+OXHK/BwZGYUOfqq8bCvaq25cgSDxFjFNO7pWdVMrUXPk2eCJ3FPZ2sEw2RMkLdRqLaTytqGyy3sQOASWshHeQ65hZFJAWnEYbddJT9IjE3jIcvYvr7SeXkG7nLblIspgXyJQ+1spLAc5FQgpzZvqXOySmOpbAC0KmMsRJXHKdIoqpB8EruVIscQnkeXOl2zsLnOCJChZVeZRLryPEiM67JIsvYXdvlXZZJfE+SxG7vOnain/p8Iip1+Aw9ttBGWVfHgAAAAAElFTkSuQmCC");
            border: 1px solid transparent;
            cursor: pointer;

            &:hover {
                content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVQ4T6WTTVLCQBCFXwMLXcENYG4QTiAbq2BlPIFSErfKCdQTCFtJldxAdkmVC+MJxBMMnkB2bjDPmjGxhkDKv17OvP76580I/hni5ndudWMnrZxJSh8CD8ASQEJyHAcq2VbrC7B/o71aRR5ImjMjnougAcAHpAnKKAqawyLEAkzl3XfRBF9QhR/31cIVdif6UkQuQA6jQI3cOwswAgDnqMErJufi7kTPRGTvrUqV9JUZzYYF9EK9IJDEA3VcttNsxCeAh9FAzQqABUlexYEynZRGL9zUZR18D8j29FrcwydgohNA6lHQapeV74XauHG3Stm+P1Xz4g7s5bYtuy6BfI4C1dlwwToR6qlAjozfrKXj3A1TmZBrAVqlNjpWWTtFpL42CvlIYCkiBxT24xM1XRth8znDR4qWAMsVkeQz5126kLW/8JN/VYT8GpA9vBGBTjxQ3p8AbqcfpPq1EeMtBWwAAAAASUVORK5CYII=");
                border: 1px solid #c4ced7;
            }
        }

        /*上传*/
        > img:nth-of-type(2) {
            width: 16px;
            height: 16px;
            content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8klEQVQ4T63S0W3CMBAG4P9e+gpswAiwASOwQWEDn+pUcvpQ96GJRIKOTlBv0o7AKOERCemqhFIBSpBR6kfL/3e+0xF6HuqZRyfgRYYPB/qqC6SJmXYV6gSyUgKBHn+DwVmzbENagb+w6q4JEQ0A/XCWzTXSCuSFVCAEVUyOeWwVmKeWx1HA6VFWyPdxBjy7ewZ14C7gfSWTl2fenlfqAnKR8R6oPHPVzCArxIDoNbVmdAGUEpoWLC/O7+sZKeDThDcNkBfia8BZE7VYeblRqL65hP3/AiDyUaut6i9/sJYFlD6jwqdHpEv3xCGq51twb+AH675nEfyk07AAAAAASUVORK5CYII=");
            border: 1px solid transparent;
            cursor: pointer;

            &:hover {
                content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+UlEQVQ4T62SMU7DQBBF/y+pgBPguUG4QRoku+MGxGKdOjdguUHS4iD7FmuJghyBGyxHMB1FpEHryIggG21kttvVvDezX0NMPJzIY1Qwr/zF2Z6voYErkuuxRqOCdOtrgncBVLBuzFU+JBkU9LCqfgSI5DmgG2dk9VsyLCh9S6KGYtYBxBuAW2ckiRL0RVnpd4cMZH5yBgE4SXDz5GcvSwmjfp8xQVr55BNod7m0XQZZ6VcgH5xJLn8KQpjh3hhZHL2HjADrCll3grT0lgdB1GJl23dV1cemEPu/AiVtzGpT1R5P8OwXVFYxcF+j1Ly5lzrqz3+JJwu+AO7uaxFY99o+AAAAAElFTkSuQmCC");
                border: 1px solid #c4ced7;
            }
        }

        &.disabled {
            > div {
                background-color: rgb(235, 235, 228);

                > span {
                    color: rgb(84, 84, 84);
                }
            }
        }
    }

</style>