<template>
    <section id="h5_date">
        <van-icon name="arrow"/>
        <van-field readonly clickable label="城市" :value="value" placeholder="请选择类型" @click="Picker = true"/>
        <van-popup v-model="Picker" position="bottom">
            <van-datetime-picker @change="endTimeChange" v-model="currentDate" type="datetime" :min-date="minDate"
                                 :max-date="maxDate"/>
        </van-popup>
    </section>
</template>

<script>
    export default {
        name: "v_date",
        data() {
            return {

            }
        },

        methods: {
            endTimeChange(e) {
                console.log(e.getValues());
                // this.userListForm.end_time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`
            },
        },

    }
</script>

<style lang="scss" scoped>
    #h5_date {

    }
</style>
