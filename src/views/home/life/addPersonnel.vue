<template>
    <section id="addPersonnel">
        <van-nav-bar title="添加人员管理" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <dropDown></dropDown>
        </main>

    </section>
</template>

<script>
    import dropDown from './../../../components/dropDown'
    import apiLists from './../../../interfase/apiLists'

    export default {
        name: "addPersonnel",
        components: {
            dropDown
        },
        data() {
            return {
                towlist: [],
                tonelist: [],
            }
        },
        mounted() {
            /*let organization = this.Util.localStorageGet('userInfo').organization;
            apiLists.dataAjax({}, 'life_ManagerialRganizationThree').then(res => {
                if(res.code == 1001){
                    this.tonelist = res.result.children;
                    apiLists.dataAjax({}, 'life_ManagerialRganization', organization).then(res => {
                        console.log("res-2 = ",res);
                        if(res.code == 1001){
                            this.towlist = res.result.children;
                            for (let i = 0; i < this.towlist.length; i++) {
                                this.towlist[i].stair_tow = false;
                            }
                        }
                    })
                }
            })*/

        },
        methods: {
            /*  describe: Go back to the previous page -- 返回上一页面
            *   @parameter：null
            *   @return：null
            */
            back() {
                window.history.back();
            },
        },
    }
</script>

<style lang="scss" scoped>
    #addPersonnel {
        main {
            padding: 0 15px;
        }
    }
</style>
