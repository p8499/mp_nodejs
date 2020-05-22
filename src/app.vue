<template>
    <sign-in v-if="currentUser === null"/>
    <div id="app" v-else>
        <div>
            <div>
                <span>移动物业网页客户端</span>
            </div>
            <div style="margin-left: 48px;">
                <img src="" alt="" @click="menuShown = !menuShown"/>
                <pac-menu :shown="menuShown" :value="menuModel" @input="open($event)"/>
            </div>
            <div @click="expanded = !expanded">
                <span>{{currentUser.usname}}</span>
                <img style="margin-left: 8px;" src="" alt=""/>
            </div>
            <div v-if="expanded">
                <div>
                    <div @click="account()">
                        <img style="margin-left: 8px;" src="" alt=""/>
                        <span style="margin-left: 6px;">我的账户</span>
                    </div>
                    <div @click="signout()">
                        <img style="margin-left: 10px;" src="" alt=""/>
                        <span style="margin-left: 12px;">退出登录</span>
                    </div>
                </div>
            </div>
        </div>
        <keep-alive>
            <router-view :key="$route.query.uuid"/>
        </keep-alive>
    </div>
</template>
<script lang="ts">
    import Component from "vue-class-component";
    import menu from "@/menu";
    import SignIn from "@/sign-in.vue";
    import Common from "@/common";

    @Component({name: 'app', components: {SignIn}})
    export default class App extends Common {
        currentUser = this.getCurrentUser(false);
        menuModel = menu;
        menuShown = false;
        expanded = false;

        open(target: string): void {
            this.menuShown = false;
            // this.$router.push(`${target}?uuid=${uuid()}`);
            this.$router.push({name: target}, () => undefined, () => undefined);
        }

        account(): void {
            this.expanded = false;
            this.$router.push({name: 'account'}, () => undefined, () => undefined);
        }

        created(): void {
            if (this.currentUser !== null)
                this.status();
        }
    }
</script>
<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    #app {
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
            > div:nth-of-type(1) {
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

            //icons
            > div:nth-of-type(2) {
                flex-grow: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: start;
                align-items: center;

                > img:nth-of-type(1) {
                    content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNjYzNjljOS1lN2RjLTRhNWQtYWEyMy03MmNmNzQxZGZhYTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Y2RENFNTdFMkJDMTFFMzgyQURENzhBRThFOTNERTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0Y2RENFNTZFMkJDMTFFMzgyQURENzhBRThFOTNERTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGZhNDA2ZDctNzFlYi00Yzk5LTk5MzUtNTBlOGRlZGEzMmNmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmE2NjM2OWM5LWU3ZGMtNGE1ZC1hYTIzLTcyY2Y3NDFkZmFhNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp3jroUAAAHFSURBVHja7JaxSsNQFIYbKa1DID6Ak1CIiyjGKZMO3TsJnWIhs/gE+gYFoVMhZOrg0r2DuIhiCxURLAgu+gKBTlWp/4G/EC73JkVoXAx83KT3nvP33HvOSaz5fF5a9bVWKuAqRKSct+B2PNnG0AJ14IIKmIEJGIDI33NfsnxYpjOBcwdDGwSyLjWVACf1LA5icAaxZOntgsAmhgdwAj5BB/igCkcbMvK5w3lZN6RdfiSMYAhq4Ak04PgtYzu3MPTBDngFB2pEukjaKQFfBOCoDNZ1IvwDPtfXaG/eLh5ywIOVCKacssEY855BSNY1aBfQjzGSFg+5q9kiyaw7OLiQyAwRdWnfyhKpc+xlpPw5uIeQq5nvKX60IgvDUU757INHCNnK7yPFj1ZECi1B6LMlCrmqFjPtEvoxisgiB/+w8pv2QTuHfowiE45qFkn2XILvHB1P8aMVGXBsKtvwBU5xuwtuMkSaih+tSMReFLKS1TR9Boe4PQbvmsoPaR8ZRdhNYx5cX5M9i3VXzKApBWy2FrGL1a5cSO/Stnp202sKzVjJUmgjSVNmkcczCBmBCBxh/uNP3idW3ofESt+M/18ruutHgAEAz1TKENYUzFQAAAAASUVORK5CYII=");
                    cursor: pointer;

                    &:hover {
                        content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNjYzNjljOS1lN2RjLTRhNWQtYWEyMy03MmNmNzQxZGZhYTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjEwRDQzRDhFMkM5MTFFMzgyQURENzhBRThFOTNERTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjEwRDQzRDdFMkM5MTFFMzgyQURENzhBRThFOTNERTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZmExOWFjOWUtYjY3Zi00YzQ2LWI2N2MtOWMwMGNjOWM3ZmRiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmE2NjM2OWM5LWU3ZGMtNGE1ZC1hYTIzLTcyY2Y3NDFkZmFhNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqboMzkAAAFjSURBVHja7JYxTsMwFIYTVBmEKjkDIxMT2Rgy5SAMvQRXYM+GMucgTByAJRPQsRcoSCwO0PBb+oPMk+00QyMGnvQpym/7/X2un9u07/vk0HGUzBB/xiQHFWiBAT2fLfV8NIP9TgJo0IBd/ztexfuO83QoV8jgHLwwiQE1KIHiuOJ7zXEba67by0RzgY0WXESqTTjeOkZ6H5PGMVhSW4CTiNHSMWrGTHLusREVZOAJFCMVGa7PYyYVP00t9Iz6B7hlZT6jmvOqmMlQchkwGeIRXHpMSmerf/RUXCv2/CtwDDpHz8BWnH479wy8O5qi3jGHtxntpDdhEAqbZCG0jutVrOPtJC0nTQjF9V3M5JnPQuh2S+7A14hJIfJ4Te75XAn9E9yAK/AQMVmJPN67K9Qnkmuw4amb3Cehjvdx6vTLpI6f7e4abuH1IW/h2X5P5GGouCXGqa6lno/lSP//rUyJbwEGAAF8SdijHO4MAAAAAElFTkSuQmCC");
                    }
                }
            }

            //sign-in/sign-out
            > div:nth-of-type(3) {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: end;
                align-items: center;
                cursor: pointer;

                > span {
                    font-size: 13px;
                    font-weight: bold;
                    color: white;
                }

                > img {
                    content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAKCAYAAABSfLWiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWIwNjI3MS1lNDViLTRiY2YtYjlmZC1lMDgzZDQ1NWQxYjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjRFQUM0MTFEN0Y1MTFFM0IwRjk5MUE2Q0RDODQ3OTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjRFQUM0MTBEN0Y1MTFFM0IwRjk5MUE2Q0RDODQ3OTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTZkN2Y2YzUtMTE1NC00MWRhLTkyMjMtNzk1YTZjNDM3MDkzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmM5YjA2MjcxLWU0NWItNGJjZi1iOWZkLWUwODNkNDU1ZDFiMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PivNZdEAAABgSURBVHjaYvz//z8DpYAFiDmB2AhKkwq+A/FZBpBLgFgeiO//Jw2A1CuAfQI1hFSD4AagG0KsQSgGYDOEkEEYBuAyBJdBWA3AZwi6QTgNIGQIzKD9+AwAYUZqJDaAAAMAYC6ce1v8GqIAAAAASUVORK5CYII=");
                }

                &:active {
                    > img {
                        content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAKCAYAAABSfLWiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWIwNjI3MS1lNDViLTRiY2YtYjlmZC1lMDgzZDQ1NWQxYjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg3MzkzRENFNUVEMTFFMzk2RTk5RkMxODE3MkZCRTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjg3MzkzREJFNUVEMTFFMzk2RTk5RkMxODE3MkZCRTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZmJmNTZiZTEtYzI3MS00OTdkLTkzNDEtMWQ5ZmM3ZTg3MTdmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmM5YjA2MjcxLWU0NWItNGJjZi1iOWZkLWUwODNkNDU1ZDFiMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PovZD6IAAABrSURBVHjapJJBCsAwCAQjlH6rD+vBf7cUa2ADIsZYurAgYRw8hESkaajVI46XDcOufTBbgIK3ngsyaPQSlKWeW3uOXSv5ImK75yUVEfudSJKJOOJnkkjEMzaTWBFn3ErSe6wYwmf7lVeAAQA67Zix29MBrAAAAABJRU5ErkJggg==");
                    }
                }
            }

            //窗口底
            > div:last-of-type {
                width: fit-content;
                position: static;

                //窗口
                > div {
                    position: absolute;
                    top: 32px;
                    right: 16px;
                    border-width: 1px;
                    border-style: solid;
                    border-color: #c4ced7;
                    border-radius: 1px;
                    box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.45);
                    background: white;
                    cursor: auto;

                    //我的账户行
                    > div:nth-of-type(1) {
                        width: 215px;
                        height: 32px;
                        background-color: white;
                        cursor: pointer;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: start;
                        align-items: center;

                        > img {
                            width: 20px;
                            height: 20px;
                            content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAMAAABYi/ZGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAz1BMVEUAAAAwn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9swn9sAAADLTbFIAAAARHRSTlMAVMvsylZS8lfGzOnwx85VWXk9XLW4X0c2CNKl2Rk0vAYf6oqSqtguBFsMDr2/i4011uEcEsLtr4lzsi/lOc/mKOepLLezLaIAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAuUlEQVQY02XQZxOCMAwG4Cjqq6g4ceHABSoq7oXb//+fbCuIPfOhTZ7r5ZISsYhElVicpEiAR1KylDBVsrSwjGRZYZpkOWF5nhaKX1ShlUSGMv0FwE8dqIiyCui+sU5Kjd31BssIhm9otlh3CNPbvqFjdnvsfZ9XgWEwBCx7NGajTwLjXW1nyu+ZE9qc3E/ihragJd8aWIVmsr9Q15stdnzmwPY4EB1x+l3MO1uX2vXmSdvejfTj+aI3L3QOlxAaqGcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDUtMjJUMTU6NTA6MzQtMDY6MDAzS5XHAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTA1LTIyVDE1OjUwOjM0LTA2OjAwQhYtewAAAABJRU5ErkJggg==");
                        }

                        > span {
                            color: #454545;
                            font-size: 12px;
                            font-weight: bold;
                        }

                        &:hover {
                            > img {
                                content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAMAAABYi/ZGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAz1BMVEUAAAAqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgqkcgAAAD0LbcbAAAARHRSTlMAVMvsylZS8lfGzOnwx85VWXk9XLW4X0c2CNKl2Rk0vAYf6oqSqtguBFsMDr2/i4011uEcEsLtr4lzsi/lOc/mKOepLLezLaIAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAuUlEQVQY02XQZxOCMAwG4Cjqq6g4ceHABSoq7oXb//+fbCuIPfOhTZ7r5ZISsYhElVicpEiAR1KylDBVsrSwjGRZYZpkOWF5nhaKX1ShlUSGMv0FwE8dqIiyCui+sU5Kjd31BssIhm9otlh3CNPbvqFjdnvsfZ9XgWEwBCx7NGajTwLjXW1nyu+ZE9qc3E/ihragJd8aWIVmsr9Q15stdnzmwPY4EB1x+l3MO1uX2vXmSdvejfTj+aI3L3QOlxAaqGcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDUtMjJUMTU6NTA6MzQtMDY6MDAzS5XHAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTA1LTIyVDE1OjUwOjM0LTA2OjAwQhYtewAAAABJRU5ErkJggg==");
                            }
                        }
                    }

                    //退出行
                    > div:last-of-type {
                        width: 215px;
                        height: 32px;
                        background-color: #e8edf4;
                        cursor: pointer;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: start;
                        align-items: center;

                        > img {
                            width: 12px;
                            height: 12px;
                            content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANBAMAAABvB5JxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAMFBMVEUAAADLFxfLFxfLFxfLFxfLFxfLFxfLFxfLFxfLFxfLFxfLFxfLFxfLFxfLFxcAAABeDjz8AAAADnRSTlMARKozEZlV7t1mzHeIu26IAGUAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAXElEQVQI1xXKMQ2AMAAF0SMpQxUgAAOVwEJSGShgqY9KqAQ0VAETM2shlK+BcttLjm6EeWEozsSbTcGrsKpEPVi1MiSpAl4KYKJU3I+fp2rSxa5s9dK3LR0wtY0PqH8q8iLPcoUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDUtMjJUMTU6NTA6MjMtMDY6MDA6RqvXAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTA1LTIyVDE1OjUwOjIzLTA2OjAwSxsTawAAAABJRU5ErkJggg==");
                        }

                        > span {
                            color: #454545;
                            font-size: 12px;
                            font-weight: bold;
                        }

                        &:hover {
                            > img {
                                content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANBAMAAABvB5JxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAMFBMVEUAAAC4ERG4ERG4ERG4ERG4ERG4ERG4ERG4ERG4ERG4ERG4ERG4ERG4ERG4EREAAABLFXSoAAAADnRSTlMARKozEZlV7t1mzHeIu26IAGUAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAXElEQVQI1xXKMQ2AMAAF0SMpQxUgAAOVwEJSGShgqY9KqAQ0VAETM2shlK+BcttLjm6EeWEozsSbTcGrsKpEPVi1MiSpAl4KYKJU3I+fp2rSxa5s9dK3LR0wtY0PqH8q8iLPcoUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDUtMjJUMTU6NTA6MjMtMDY6MDA6RqvXAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTA1LTIyVDE1OjUwOjIzLTA2OjAwSxsTawAAAABJRU5ErkJggg==");
                            }
                        }
                    }
                }
            }
        }

        //body
        > :nth-child(2) {
            flex-shrink: 1;
            /*flex-grow: 1;*/
        }
    }


</style>
