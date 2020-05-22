<template>
    <div class="pac-datetime-picker">
        <div ref="panel">
            <div>
                <div @mousedown="startMove($event)" @mouseup="stopMove()">
                    <span>日期选择</span>
                </div>
                <div>
                    <img src="" alt="" @click="$emit('close')">
                </div>
            </div>
            <div>
                <div>
                    <img src="" alt="" @click="monthDecrease()"/>
                    <span style="margin-left: 4px" @click="today()">今日</span>
                    <label style="margin-left: 6px">
                        <select v-model="rawMonth">
                            <option value="0">一月</option>
                            <option value="1">二月</option>
                            <option value="2">三月</option>
                            <option value="3">四月</option>
                            <option value="4">五月</option>
                            <option value="5">六月</option>
                            <option value="6">七月</option>
                            <option value="7">八月</option>
                            <option value="8">九月</option>
                            <option value="9">十月</option>
                            <option value="10">十一月</option>
                            <option value="11">十二月</option>
                        </select>
                    </label>
                    <label style="margin-left: 3px">
                        <input v-model.lazy="rawYear"/>
                    </label>
                    <img style="margin-left: 1px" src="" alt="" @click="yearIncrease()"/>
                    <img style="margin-left: 1px" src="" alt="" @click="yearDecrease()"/>
                    <img style="margin-left: 2px" src="" alt="" @click="monthIncrease()"/>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th><span>日</span></th>
                        <th><span>一</span></th>
                        <th><span>二</span></th>
                        <th><span>三</span></th>
                        <th><span>四</span></th>
                        <th><span>五</span></th>
                        <th><span>六</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(vi, i) in monthView" :key="i">
                        <td v-for="(vj, j) in vi" :key="j"
                            :class="{'weekday': isInMonthView(vj) && [1, 2, 3, 4, 5].includes(vj.getDay()), 'weekend': isInMonthView(vj) && [0, 6].includes(vj.getDay()), 'today': isToday(vj), 'selected': isSelectedDate(vj)}"
                            @click="select(vj)">
                            <span>{{vj.getDate()}}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="precision === 'datetime'"/>
            <div v-if="precision === 'datetime'">
                <div><span @click="now()">当前时间</span></div>
                <div>
                    <label>
                        <input v-model.lazy="rawHour"/>
                    </label>
                    <span style="margin-left: 2px">:</span>
                    <label style="margin-left: 2px">
                        <input v-model.lazy="rawMinute"/>
                    </label>
                    <span style="margin-left: 2px">:</span>
                    <label style="margin-left: 2px">
                        <input v-model.lazy="rawSecond"/>
                    </label>
                </div>
                <div>
                    <img src="" alt="" :style="{display: currentValue !== undefined? 'block' : 'none'}"
                         @click="submit()">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component({name: 'pac-datetime-picker'})
    export default class PacDatetimePicker extends Vue {
        @Prop({validator: (value) => ['date', 'datetime'].includes(value), required: false, default: 'datetime'})
        precision!: string;

        @Prop({validator: (value) => value instanceof Date || value === null, required: false, default: null})
        value!: Date | null;

        selected: Date | null = this.value !== null ? new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate()) : null;

        rawYear: string | null = this.value !== null ? this.value.getFullYear().toString() : null;
        rawMonth: string | null = this.value !== null ? this.value?.getMonth().toString() : null;
        rawHour: string | null = this.value !== null ? this.value?.getHours().toString().padStart(2, '0') : null;
        rawMinute: string | null = this.value !== null ? this.value?.getMinutes().toString().padStart(2, '0') : null;
        rawSecond: string | null = this.value !== null ? this.value?.getSeconds().toString().padStart(2, '0') : null;

        @Watch('rawYear')
        onRawYearChange(newVal: string | null): void {
            if (newVal === null)
                return;
            //不符合格式要求
            if (!/^[0-9]{4}$/.test(newVal)) {
                this.rawYear = null;
                return;
            }
        }

        @Watch('rawMonth')
        onRawMonthChange(newVal: string | null): void {
            if (newVal === null)
                return;
            //不符合值要求
            if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].includes(newVal)) {
                this.rawMonth = null;
                return;
            }
        }

        @Watch('rawHour')
        onRawHourChange(newVal: string | null): void {
            if (newVal === null)
                return;
            //不符合格式要求
            if (!/^[0-9]{1,2}$/.test(newVal)) {
                this.rawHour = null;
                return;
            }
            //不符合值范围要求
            const hour = parseInt(newVal);
            if (hour >= 24) {
                this.rawHour = null;
                return;
            }
            this.rawHour = newVal.padStart(2, '0');
        }

        @Watch('rawMinute')
        onRawMinuteChange(newVal: string | null): void {
            if (newVal === null)
                return;
            //不符合格式要求
            if (!/^[0-9]{1,2}$/.test(newVal)) {
                this.rawMinute = null;
                return;
            }
            //不符合值范围要求
            const minute = parseInt(newVal);
            if (minute >= 60) {
                this.rawMinute = null;
                return;
            }
            this.rawMinute = newVal.padStart(2, '0');
        }

        @Watch('rawSecond')
        onRawSecondChange(newVal: string | null): void {
            if (newVal === null)
                return;
            //不符合格式要求
            if (!/^[0-9]{1,2}$/.test(newVal)) {
                this.rawSecond = null;
                return;
            }
            //不符合值范围要求
            const second = parseInt(newVal);
            if (second >= 60) {
                this.rawSecond = null;
                return;
            }
            this.rawSecond = newVal.padStart(2, '0');
        }

        yearDecrease(): void {
            if (this.rawYear !== null) this.rawYear = (parseInt(this.rawYear) - 1).toString();
        }

        yearIncrease(): void {
            if (this.rawYear !== null) this.rawYear = (parseInt(this.rawYear) + 1).toString();
        }

        monthDecrease(): void {
            if (this.rawYear !== null && this.rawMonth !== null)
                if (this.rawMonth === '0') {
                    this.yearDecrease();
                    this.rawMonth = '11';
                } else
                    this.rawMonth = (parseInt(this.rawMonth) - 1).toString();
        }

        monthIncrease(): void {
            if (this.rawYear !== null && this.rawMonth !== null)
                if (this.rawMonth === '11') {
                    this.yearIncrease();
                    this.rawMonth = '0';
                } else
                    this.rawMonth = (parseInt(this.rawMonth) + 1).toString();
        }

        today(): void {
            const d = new Date();
            this.selected = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            this.rawYear = d.getFullYear().toString();
            this.rawMonth = d.getMonth().toString();
        }

        now(): void {
            const d = new Date();
            this.selected = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            this.rawYear = d.getFullYear().toString();
            this.rawMonth = d.getMonth().toString();
            this.rawHour = d.getHours().toString();
            this.rawMinute = d.getMinutes().toString();
            this.rawSecond = d.getSeconds().toString();
        }

        get monthView(): Array<Array<Date>> {
            if (this.rawYear !== null && this.rawMonth !== null) {
                const result = new Array<Array<Date>>();
                const dateFirst = new Date(parseInt(this.rawYear), parseInt(this.rawMonth), 1);
                dateFirst.setDate(dateFirst.getDate() - dateFirst.getDay());
                const dateLast = new Date(parseInt(this.rawYear), parseInt(this.rawMonth) + 1, 0);
                dateLast.setDate(dateLast.getDate() + (6 - dateLast.getDay()));
                for (const d = new Date(dateFirst.getTime()); d.getTime() < dateLast.getTime(); d.setDate(d.getDate() + 7)) {
                    const d0 = new Date(d.getTime()), d1 = new Date(d.getTime()), d2 = new Date(d.getTime()),
                        d3 = new Date(d.getTime()), d4 = new Date(d.getTime()), d5 = new Date(d.getTime()),
                        d6 = new Date(d.getTime());
                    d1.setDate(d1.getDate() + 1);
                    d2.setDate(d2.getDate() + 2);
                    d3.setDate(d3.getDate() + 3);
                    d4.setDate(d4.getDate() + 4);
                    d5.setDate(d5.getDate() + 5);
                    d6.setDate(d6.getDate() + 6);
                    result.push([d0, d1, d2, d3, d4, d5, d6]);
                }
                return result;
            } else return [];
        }

        get currentValue(): Date | undefined {
            return this.selected !== null && this.rawHour !== null && this.rawMinute !== null && this.rawSecond !== null ?
                this.precision === 'date' ? this.selected : new Date(this.selected.getFullYear(), this.selected.getMonth(), this.selected.getDate(), parseInt(this.rawHour), parseInt(this.rawMinute), parseInt(this.rawSecond))
                : undefined;
        }

        select(d: Date): void {
            this.selected = d;
            if (this.precision === 'date') {
                this.$emit('input', this.selected);
                this.$emit('close');
            }
        }

        submit(): void {
            this.$emit('input', this.currentValue);
            this.$emit('close');
        }

        isToday(d: Date): boolean {
            const today = new Date();
            return today.getFullYear() === d.getFullYear() && today.getMonth() === d.getMonth() && today.getDate() === d.getDate();
        }

        isSelectedDate(d: Date): boolean {
            return this.selected !== null && this.selected.getFullYear() === d.getFullYear() && this.selected.getMonth() === d.getMonth() && this.selected.getDate() === d.getDate();
        }

        isInMonthView(d: Date): boolean {
            return this.rawYear !== null && this.rawMonth !== null && parseInt(this.rawYear) === d.getFullYear() && parseInt(this.rawMonth) === d.getMonth();
        }

        startOffsetLeft: number | undefined;
        startOffsetTop: number | undefined;
        startClientX: number | undefined;
        startClientY: number | undefined;

        startMove(e: MouseEvent): void {
            const panel = this.$refs['panel'] as HTMLElement;
            this.startOffsetLeft = panel.offsetLeft;
            this.startOffsetTop = panel.offsetTop;
            this.startClientX = e.clientX;
            this.startClientY = e.clientY;
            window.addEventListener('mousemove', this.move);
        }

        move(e: MouseEvent): void {
            if (this.startOffsetLeft !== undefined && this.startOffsetTop !== undefined && this.startClientX !== undefined && this.startClientY !== undefined) {
                const panel = this.$refs['panel'] as HTMLElement;
                panel.style.left = `${this.startOffsetLeft + e.clientX - this.startClientX}px`;
                panel.style.top = `${this.startOffsetTop + e.clientY - this.startClientY}px`;
            }
        }

        stopMove(): void {
            this.startOffsetLeft = undefined;
            this.startOffsetTop = undefined;
            this.startClientX = undefined;
            this.startClientY = undefined;
            window.removeEventListener('mousemove', this.move);
        }
    }
</script>

<style lang="scss">
    @import "pac-input";
</style>