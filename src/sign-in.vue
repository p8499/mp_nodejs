<template>
    <div id="sign-in">
        <div>
            <div>
                <span>移动物业网页客户端</span>
            </div>
        </div>
        <div>
            <div>
                <pac-errors style="width: 100%; margin-bottom: 14px;"
                            :value="errorsModel" @input:focus="focus($event)"/>
                <div>
                    <div>
                        <span style="margin-left: 60px;">登录</span>
                    </div>
                    <pac-select-string style="margin-top: 8px;" :disabled="false"
                                       label="方式" v-model="from" :values="fromValues"/>
                    <pac-input v-if="from === 'an8'" style="margin-top: 8px;"
                               :spec="spec.fields.usan8" v-model="an8" :suppressSelect="true"/>
                    <pac-input v-if="from === 'cell'" style="margin-top: 8px;"
                               :spec="spec.fields.uscell" v-model="cell" nullOrBlank='blank' :suppressSelect="true"/>
                    <pac-input v-if="from === 'mail'" style="margin-top: 8px;"
                               :spec="spec.fields.usmail" v-model="mail" nullOrBlank='blank' :suppressSelect="true"/>
                    <pac-input style="margin-top: 8px;" :password="true"
                               :spec="spec.fields.uspswd" v-model="pswd"/>
                    <div style="margin-top: 16px;">
                        <pac-button text="登录" @input="signin()"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import {USER_SPEC} from "@/components/gen/spec/UserSpec";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import {signin} from "@/components/stub-ex/UserStubEx";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import Common from "@/common";

    @Component({name: 'sign-in'})
    export default class SignIn extends Common {
        spec = USER_SPEC;
        errorsModel = new PacErrorsModel();
        from: 'an8' | 'cell' | 'mail' = 'an8';
        fromValues = [
            new PacValueModel('an8', 'JDE地址号'),
            new PacValueModel('cell', '手机号'),
            new PacValueModel('mail', '电子邮箱')
        ];
        an8: number | null = null;
        cell = '';
        mail = '';

        get alias(): string {
            if (this.from === 'an8')
                return this.an8 !== null ? this.an8.toString() : '';
            else if (this.from === 'cell')
                return this.cell;
            else if (this.from === 'mail')
                return this.mail;
            else
                return '';
        }

        pswd = '';

        async signin(): Promise<void> {
            try {
                const {user} = await signin(this.from, this.alias, this.pswd);
                this.errorsModel.set(new PacErrorObj('signin', null));
                localStorage.setItem('user', user.toString());
                await this.$router.go(0);
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('signin', {
                    subject: '登录失败',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            }
        }
    }
</script>

<style lang="scss" scoped>
    #sign-in {
        width: 100%;
        height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: stretch;
        align-items: stretch;

        //bar
        > :nth-child(1) {
            flex-shrink: 0;
            height: 45px;
            background-color: #1e4a6d;
            padding: 0 16px 0 16px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: stretch;
            align-items: center;

            //title
            > :nth-child(1) {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: start;
                align-items: center;

                > span {
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                }
            }
        }

        //body
        > :nth-child(2) {
            flex-shrink: 1;
            flex-grow: 1;
            background-color: #1e4a6d;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;

            //elements
            > :only-child {
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: center;
                align-items: center;


                ::v-deep.pac-errors {
                    > div:nth-child(2) {
                        background-color: white;
                    }
                }

                //inputs
                > :last-child {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    justify-content: center;
                    align-items: stretch;

                    //label
                    > div:first-of-type {
                        text-align: start;

                        > span {
                            font-size: 16px;
                            font-weight: bold;
                            color: #f2f2f2;
                        }
                    }

                    //inputs
                    ::v-deep.pac-input, ::v-deep.pac-select {
                        > label {
                            > span {
                                width: 72px;
                                font-size: 13px;
                                color: #f2f2f2;
                            }
                        }

                        > input {
                            width: 148px;
                            height: 23px;
                            border-radius: 2px;
                            font-size: 12px;
                        }

                        > select {
                            width: 158px;
                            height: 27px;
                            border-radius: 2px;
                            font-size: 12px;
                        }
                    }

                    //button div
                    > div:last-of-type {
                        text-align: end;

                        ::v-deep.pac-button {
                            width: 52px;
                            height: 28px;
                            font-size: 12px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
</style>