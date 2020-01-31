<template>
    <section id="lieThoughts">
        <van-nav-bar title="写心得" :fixed="true" left-arrow @click-left="back" right-text="保存"
                     @click-right="onSubmit" :z-index="999"/>
        <main>
            <textarea v-model="thoughtsVal" name="" id="" cols="30" rows="10" placeholder="请输入心得"></textarea>
            <p> <span>当前字数：</span>{{thoughtsVal.length }}</p>
        </main>
    </section>
</template>

<script>
    import apilist from './../../../interfase/apiLists'
    import {Toast} from 'vant'
    import {mapGetters} from 'vuex'
    export default {
        name: "lieThoughts",
        computed: {
            ...mapGetters(['thoughts'])
        },
        data(){
            return {
                thoughtsVal: '',
                id: this.$route.query.id,
            }
        },
        mounted(){
            let inspiration = localStorage.getItem('inspiration');
            if(!!inspiration){
                this.thoughtsVal = inspiration;
            }
        },
        methods: {
            back(){
                window.history.back();
            },
            onSubmit(){
                if(!this.thoughtsVal){
                    Toast.fail("请输入心得");
                    return;
                }
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                let url = 'life_addThoughts';
                let data = {
                    meetingId: this.$route.query.id, //记录者ID
                    content: this.thoughtsVal, //会议记录
                };
                if(this.$route.query.source == 'inspiration'){
                    url = 'life_updateThoughts';
                    data = {
                        meetingexpId: this.$route.query.id, //记录者ID
                        content: this.thoughtsVal, //会议记录
                    };
                }
                apilist.dataAjax(data, url).then(res => {
                    if (res.code == 1001) {
                        setTimeout(() => {
                            Toast.success("提交成功");
                            window.history.back();
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            Toast.fail("发布失败");
                        }, 1000);
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    #lieThoughts{
        padding-top: 46px;
        main{
            box-sizing: border-box;
            margin: 15px;
            textarea {
                box-sizing: border-box;
                width: 100%;
                height: 160px;
                padding: 5px;
                border-radius: 5px;
                font-size: 12px;
            }
            p{
                text-align: right;
                padding-top: 10px;
                font-size: 14px;
            }
        }
    }
</style>
