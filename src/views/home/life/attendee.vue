<template>
    <section id="attendee">
        <van-nav-bar title="出席人员" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <div class="at_box" v-for="(item, index) in list" :key="index">
            <portrait :comp-data="item" :comp-data-id="compDataId"></portrait>
        </div>
    </section>
</template>

<script>
    import portrait from '../../../components/portrait'
    export default {
        name: "attendee",
        components:{
            portrait
        },
        data(){
            return {
                list:[],
                compDataId: this.$route.query.recorderId
            }
        },
        mounted(){
            console.log(1);
            this.list = JSON.parse(localStorage.getItem('userList'));
            console.log(this.list);
        },
        methods:{
            /*  describe: Go back to the previous page -- 返回上一页面
			 *   @parameter：null
			 *   @return：null
			 */
            back(){
                window.history.back();
            },
        },
    }
</script>

<style lang="scss" scoped>
    #attendee{
        padding-top: 56px;
        .at_box{
            display: inline-block;
            width: 25%;
        }
    }
</style>
