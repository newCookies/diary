<template>
    <section id="thoughts">
        <van-nav-bar title="写心得" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <textarea v-model="thoughtsVal" name="" id="" cols="30" rows="10" placeholder="请输入心得"></textarea>
            <p><span>当前字数：</span>{{thoughtsVal.length }}</p>
        </main>
        <footer>
            <button class="btn_default_style" @click="submit('1')">保存</button>
            <button class="btn_default_style" @click="submit('3')">发布</button>
        </footer>
    </section>
</template>

<script>
    import apilist from './../../../interfase/apiLists'
    import {Toast} from 'vant'
    import {Dialog} from 'vant'
    import {mapGetters} from 'vuex'

    export default {
        name: "thoughts",
        computed: {
            ...mapGetters(['thoughts'])
        },
        data() {
            return {
                thoughtsVal: '',
                id: this.$route.query.id,
                thoughtsMessage: null
            }
        },
        mounted() {
            this.thoughtsMessage = this.thoughts;
            let source = this.$route.query.source;
            this.thoughtsVal = localStorage.getItem('aloneDetail');
            if (!!source && source.toString() === 'learnInspiration') {
                if (!!this.thoughtsMessage && typeof this.thoughtsMessage === 'object') {
                    if (this.thoughtsMessage.hasOwnProperty('content')) {
                        console.log(this.thoughtsMessage);
                        this.thoughtsVal = this.thoughtsMessage.content;
                    }
                }
            }
        },
        methods: {
            back() {
                window.history.back();
            },
            submit(status) {
                if (status) {
                    let me = this;
                    if (!this.thoughtsVal) {
                        Toast("你尚未输入心得");
                        return;
                    }
                    if (this.thoughtsVal.length < 5) {
                        Toast("心得不能低于5个字");
                        return;
                    }
                    if(status == '3'){
                        Dialog.confirm({
                            title: '确认发布',
                        }).then(() => {
                            me.publish(status);
                        }).catch(() => {

                        });
                    }
                    if(status == '1'){
                        me.publish(status);
                    }
                }
            },
            publish(status){
                let data = {};
                let statusVal = status == '3' ? '发布' : '保存';
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });

                if (!!this.thoughtsVal && typeof this.thoughtsVal === 'string') {
                    let url = 'learn_writeThoughts';
                    if (!!this.$route.query.source && this.$route.query.source == 'LearnDetail') {
                        url = 'learn_studytaskWriteThoughts';
                    }

                    if(this.$route.query.source == 'LearnDetail'){
                        data = {
                            studyTaskId: this.id,
                            content: this.thoughtsVal,
                        }
                    }else{
                        if (status.toString() === '3') {
                            data = {
                                studyId: this.id,
                                experience: this.thoughtsVal,
                                status: status
                            }
                        } else {
                            data = {
                                studyId: this.id,
                                experience: this.thoughtsVal,
                            }
                        }
                    }

                    apilist.dataAjax(data, url).then(res => {
                        if (res.code == 1001) {
                            setTimeout(() => {
                                Toast.success(statusVal + "成功");
                                window.history.back();
                            }, 1000);

                        } else if (res.code == 1002) {
                            setTimeout(() => {
                                Toast.fail(statusVal + res.message);
                            }, 1000);
                        } else {

                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #thoughts {
        padding-top: 46px;
        main {
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
            p {
                text-align: right;
                padding-top: 10px;
                font-size: 14px;
            }
        }
        footer {
            padding: 0px 15px 15px 15px;
            overflow: auto;
            .btn_default_style {
                float: left;
                width: 46%;
                background-color: red;
                color: white;
                margin: 2%;
                padding: 5px;
                border: 0px;
                border-radius: 3px;
            }
        }
    }
</style>
