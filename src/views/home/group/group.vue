<template>
    <section id="group">
        <van-nav-bar title="组织团队" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <dropDown :copm-data="towlist" :copm-data1="tonelist" :copm-source="'group'"></dropDown>
        </main>
    </section>
</template>

<script>
    import dropDown from './../../../components/dropDown'
    import apiLists from './../../../interfase/apiLists'
    export default {
        name: "learn",
        components: {
            dropDown
        },
        data(){
            return {
                towlist: [],
                tonelist: [],
            }
        },
        mounted() {

        },
        methods: {
            back() {
                window.history.back();
            },
        },
    }
</script>

<style lang="scss" scoped>
    #group{
        padding-top: 46px;
        main{
            padding: 0 15px;
        }
    }

</style>
