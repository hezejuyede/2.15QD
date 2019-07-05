<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../assets/js/bus';
    import axios from 'axios'
    import url from '../assets/js/URL'

    export default {
        data() {
            return {
                collapse: false,
                items: []
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            this.getAdminState();
        },
        methods: {
            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {

                }
                else {
                    let Info = JSON.parse(userInfo);
                    let username = Info.username;
                    axios.post(" " + url + "/menu/getFirstMenu", {"name":username})
                        .then((res) => {
                            if(res.data.state==="1"){
                                if(res.data.data.length>0){
                                    this.items=res.data.data;
                                }
                                else {
                                    this.$message.warning("暂无数据");
                                }
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/less/base";

    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        line-height: 70px;
        bottom: 0;
        overflow-y: scroll;
        ul {
            height: 100%;
        }
        i {

            font-size: 250%;
            margin-right: 30px;
        }
        span {
            font-size: @font-size-medium-x;
        }

    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

</style>
