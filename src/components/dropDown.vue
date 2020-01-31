<template>
    <section id="drop-down">
        <van-icon v-show="stair_one" name="arrow" @click="onStairOne"/>
        <van-icon v-show="!stair_one" name="arrow-down" @click="onStairTwo(stair_one)"/>
        <p class="van-hairline--bottom"> {{ stair_one.organizationName }}</p>
        <span @click="goPage(stair_one.organizationName,stair_one,stair_one.userCount)">{{ stair_one.userCount }}人</span>
        <div v-show="stair_two" class="stair-two">
            <div v-for="(item,index) in stair_two" :key="index">
                <van-icon v-show="!item.stair_tow" name="arrow" @click="onStairTwo(item,index)"/>
                <van-icon v-show="item.stair_tow" name="arrow-down" @click="onStairTwo(item,index)"/>
                <p> {{ item.organizationName }}</p>
                <span @click="goPage(item.organizationName,item,item.userCount)">{{ item.userCount }}人</span>

                <div class="stair_three" v-show="item.stair_tow" v-if="squadList"
                     v-for="(threeItem,threeIndex) in squadList[index]" :key="threeIndex">

                    <p @click="onStairfour(threeItem,threeIndex)">{{ threeItem.organizationName }}</p>
                    <span @click="goPage(threeItem.organizationName,threeItem,threeItem.userCount)">{{ threeItem.userCount }}人</span>

                    <div class="stair_four" v-show="threeItem.stair_four"
                         v-for="(fourItem,fourIndex) in fourList[threeIndex]" :key="fourIndex">

                        <p>{{ fourItem.organizationName }}</p>
                        <span @click="goPage(fourItem.organizationName,fourItem,fourItem.userCount)">{{ fourItem.userCount }}人</span>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import apiLists from "../interfase/apiLists";
    import { Toast } from 'vant'
    export default {
        name: "dropDown",
        props: {
            copmSource: String
        },
        data() {
            return {
                stair_one: [],
                stair_two: [],
                squadList: [],
                fourList: [],
                source: this.copmSource
            }
        },
        computed: {

        },
        mounted() {
            let organization = this.Util.localStorageGet('userInfo').organization;
            apiLists.dataAjax({}, 'life_ManagerialRganizationThree').then(res => {
                if(res.code != 1001){
                    Toast("暂无数据");
                }
                return res;
            }).then(re => {
                if(re.code == 1001){
                    this.stair_one = re.result.subOrganization;
                    if(!this.stair_one){
                        let stair_one = {};
                        stair_one.organizationName = re.result.children[0].organizationName;
                        stair_one.userCount = re.result.children[0].userCount;
                        stair_one.id = re.result.children[0]._id;
                        this.stair_one = stair_one;
                    }
                    console.log("stair_one = ",this.stair_one);
                    apiLists.dataAjax({}, 'life_ManagerialRganization', organization).then(res => {
                        if(res.code == 1001){
                            this.stair_two = res.result.children;
                        }
                    })
                }
            });
            console.log("source = ",this.source);
        },
        methods: {
            onStairOne() {
                // this.stair_one = !this.stair_one;
            },
            onStairTwo(item, index) {
                apiLists.dataAjax({}, 'life_ManagerialRganizationAll', item._id).then(res => {
                    if (res.code == 1001) {
                        item.organizationName = item.organizationName + ' ';
                        item.stair_tow = !item.stair_tow;
                        this.squadList[index] = res.result.children;
                        for (let i = 0; i < this.squadList[index].length; i++) {
                            this.squadList[index][i].stair_four = false;
                        }
                    }
                })
            },
            onStairfour(threeItem, threeIndex) {
                apiLists.dataAjax({}, 'life_ManagerialRganizationAll', threeItem._id).then(res => {
                    if (res.code == 1001) {
                        this.fourList[threeIndex] = res.result.children;
                        threeItem.stair_four = !threeItem.stair_four;
                        this.$forceUpdate();
                    }
                })
            },
            goPage(name, stair_one, num) {
                let id = '';
                if(!!stair_one.id){
                    id = stair_one.id;
                }
                if(!!stair_one._id){
                    id = stair_one._id;
                }
                let url = '/life/selectionID';
                if(this.copmSource === 'group'){
                    url = '/group/PersonnelList'
                }
                if (num > 0) {
                    this.$router.push({
                        path: url ,
                        query: {
                            id: id,
                            name: name,
                            source: this.source
                        }
                    });
                }
            },

        },
    }
</script>

<style lang="scss" scoped>
    #drop-down {
        font-size: 14px;
        p {
            display: inline-block;
            margin-left: 5px;
            padding: 10px 0;
        }
        span {
            float: right;
            color: #127cdf;
            padding: 10px 0;
        }
        .stair-two {
            padding-left: 15px;
            .stair_three {
                padding-left: 15px;
                .stair_four {
                    padding-left: 15px;
                }
            }
        }
    }
</style>
