import {Component, Vue} from "vue-property-decorator";
import {deserializeUser, User} from "@/components/gen/bean/User";
import {PacErrorModel} from "@/components/lib/pac-errors/pac-errors-model";
import {signout, status} from './components/stub-ex/UserStubEx';

Component.registerHooks(['beforeRouteEnter', 'beforeRouteUpdate', 'beforeRouteLeave']);

@Component({name: 'common'})
export default class Common extends Vue {
    getCurrentUser(signin = true): User | null {
        const str = localStorage.getItem('user');
        const user = str !== null ? deserializeUser(str) : null;
        if (user === null) {
            if (signin)
                window.location.assign("");
            return null;
        } else
            return user;
    }

    async status(): Promise<void> {
        try {
            await status();
        } catch (e) {
            await this.signout();
        }
    }

    async signout(): Promise<void> {
        localStorage.removeItem('user');
        try {
            await signout();
        } catch (e) {
            console.error(e);
        }
        this.getCurrentUser();
    }

    get url(): string {
        return this.$route.path;
    }

    focus(error: PacErrorModel, pre?: (error: PacErrorModel) => void) {
        if (pre !== undefined)
            pre(error);
        this.$nextTick(() => document.getElementById(error.id)?.focus());
    }
}
