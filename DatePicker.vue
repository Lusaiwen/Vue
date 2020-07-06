<template>
    <div class="date-picker" v-click-outside>
        <div class="picker-input">
            <span class="input-prefix">
                <i class="iconfont">&#xe642;</i>
            </span>
            <input type="text" :value="chooseDate">
        </div>
        <div class="picker-panel" v-if="showPanel">
            <div class="picker-arrow" />
            <div class="picker-body">
                <div class="picker-header">
                    <span class="iconfont picker-btn icon-prev-year" @click="onChangeYear('prev')"/>
                    <span class="iconfont picker-btn icon-prev-month" @click="onChangeMonth('prev')" />
                    <span class="date-picker">{{ showDate.year }}年{{ showDate.month + 1 }}月</span>
                    <span class="iconfont picker-btn icon-next-month" @click="onChangeMonth('next')"/>
                    <span class="iconfont picker-btn icon-next-year" @click="onChangeYear('next')"/>  
                </div>
                <div class="picker-content">
                    <div class="picker-weeks">
                        <div v-for="week in ['日','一','二','三','四','五','六']"
                        :key="week"
                        >{{ week }}</div>
                    </div>
                    <div class="picker-days">
                        <div
                            v-for="date in showDay"
                            :key="date.getTime()"
                            :class="{
                                'is-select': isCur(date).select,
                                'is-today': isCur(date).day,
                                'other-month': !isCur(date).month,
                            }"
                            @click="onChooseDate(date)"
                        >{{ date.getDate() }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'date',
        event: 'choose-date'
    },
    directives: {
        'click-outside': {
            bind(el, binding, vnode){
                const vm = vnode.context;
                document.onclick = function (e){
                    const dom = e.target;
                    const isElSon = el.contains(dom);
                    if(isElSon && !vm.showPanel){
                            vm.changeShow(true);
                    }else if(!isElSon && vm.showPanel){
                            vm.changeShow(false);
                    }
                }                
            }
        }
    },
    props: {
        date: {
            type: Date,
            default: () => new Date()
        }
    },
    data(){
        return {
            showPanel: false,
            showDate: {
                year: 0,
                month: 0,
                day: 0
            }
        }
    },
    created() {
        this.getShowDate(this.date);
    },
    methods: {
        dateInit(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return {
                year, month, day
            }
        },
        changeShow(flag) {
            this.showPanel = flag;
        },
        getShowDate(date) {
            const { year, month, day } = this.dateInit(date);
            this.showDate = {
                year, month, day
            }
        },
        isCur(date) {
            const chooseDate = new Date(this.chooseDate);
            const { year:showYear, month:showMonth } = this.showDate;
            const { year, month, day } = this.dateInit(date);
            const { year: curYear, month: curMonth, day: curDay } = this.dateInit(new Date());
            const { year:chooseYear, month: chooseMonth, day:chooseDay } = this.dateInit(chooseDate)

            return {
                day: curYear === year && curMonth === month && curDay === day,
                month: showYear === year && showMonth === month,
                select: year === chooseYear && month === chooseMonth && day === chooseDay
            }
        },
        onChooseDate(date) {
            this.$emit('choose-date', date);
            this.changeShow(false);
            this.getShowDate(date);
        },
        onChangeMonth(type) {
            let { month, year, day } = this.showDate;
            const moveMonth = type === 'prev' ? -1 : 1;
            const showDate = new Date(year, month, day);
            showDate.setMonth(month + moveMonth);
            const { year: showYear, month: showMonth } = this.dateInit(showDate);
            this.showDate.year = showYear;
            this.showDate.month = showMonth;
        },
        onChangeYear(type){
            const moveYear = type === 'prev' ? -1 : 1;
            this.showDate.year += moveYear;
        }
    },
    computed: {
        chooseDate(){
            const { year, month, day } = this.dateInit(this.date);
            return `${year}-${month + 1}-${day}`;
        },
        showDay(){
            var arr = [];
            const { year, month } = this.showDate;
            const firstDay = new Date(year, month, 1);
            const week = firstDay.getDay();
            const startDay = firstDay;
            for(let i = 0; i < 42; i ++){
                arr.push(new Date(startDay.getTime() - ( week - i ) * 24 * 60 * 60 * 1000 ));
            }
            return arr;
        },
    },
}
</script>

<style scoped>
@import './assest/font_1923675_0wkkarorx3gb/font.css';
.date-picker{
    display: inline-block;
}

.picker-input {
    position: relative;
}
.picker-input .input-prefix {
    position: absolute;
    left: 5px;
    width: 25px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    cursor: pointer;
}

.picker-input input {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    background-color: #fff;
}

.picker-panel {
    position: absolute;
    width: 322px;
    height: 339px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 2px 12px 0 rgba(0, 0, 0, .5);
    margin-top: 5px;
    cursor: pointer;
    user-select: none;
}
.picker-panel .picker-arrow {
    position: absolute;
    border: 6px solid transparent;
    border-bottom-color: #dcdfe6;
    left: 40px;
    top: -12px;
}
.picker-panel .picker-arrow::after {
    content: '';
    display: block;
    position: absolute;
    border: 6px solid transparent;
    border-bottom-color: #fff;
    left: -6px;
    top: -5px;
}
.picker-panel .picker-body { }
.picker-panel .picker-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 10px;
}
.picker-panel .picker-header .picker-btn {
    margin-left: 5px;
    margin-right: 5px;
    color: #303133;
    font-size: 12px;
}
.picker-panel .picker-header .picker-btn:hover {
    color: #4e9eff;
}
.picker-panel .picker-header .date-picker {
    margin-left: 60px;
    margin-right: 60px;
    font-size: 14px;
}
.picker-panel .picker-content {
    padding: 0 10px 10px 10px;
}

.picker-panel .picker-content .picker-weeks {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.picker-panel .picker-content .picker-days {
    display: flex;
    /* align-items: center; */
    justify-content: space-around;
    flex-wrap: wrap;
}
.picker-panel .picker-content .picker-days div{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 4px 6px;
    font-size: 12px;
    cursor: pointer;
}
.picker-panel .picker-content .picker-days div:hover {
    color: #4e9eff;
}
.picker-panel .picker-content .picker-days div.is-today {
    color: #409eff;
    font-weight: 700;;
}
.picker-panel .picker-content .picker-days div.is-select {
    border-radius: 50%;
    color: #fff;
    background-color: #409eff;
}
.picker-panel .picker-content .picker-days div.other-month {
    color: #c0c4cc;
}
</style>