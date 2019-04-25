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

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-document',
                        index: '/',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'PlannedProduction',
                        title: '生产管理'
                    },
                    {
                        icon: 'el-icon-lx-cartfill',
                        index: 'MaterialManagement',
                        title: '物料管理'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'QualityAssurance',
                        title: '质量管理'
                    },

                  /*  {
                        icon: 'el-icon-view',
                        index: 'ProductionMonitoring',
                        title: '设备管理'
                    },*/
                    {
                        icon: 'el-icon-news',
                        index: 'PersonnelManagement',
                        title: '人员管理'
                    },
                  /*  {
                        icon: 'el-icon-share',
                        index: 'SecurityManagement',
                        title: '看板管理'
                    },*/
                    {
                        icon: 'el-icon-star-off',
                        index: 'SecurityManagement',
                        title: '安全管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'SystemManagement',
                        title: '系统管理'
                    }
                ]
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
            })
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
