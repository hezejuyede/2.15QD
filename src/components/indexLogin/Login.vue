<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">管加工生产执行系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'
    export default {
        components: {Modal},
        data: function(){
            return {
                message: '',
                HideModal: true,

                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post("  "+ url +"/api/login.html", {"username": this.ruleForm.username, "password": this.ruleForm.password})
                            .then((res) => {
                                if (res.data.state === "1") {
                                    let userInfo = res.data;
                                    userInfo = JSON.stringify(userInfo);
                                    localStorage.setItem("userInfo", userInfo);
                                    localStorage.setItem('ms_username',res.data.username);
                                    this.message = "登录成功";
                                    this.HideModal = false;
                                    const that = this;
                                    function a() {
                                        that.message = "";
                                        that.HideModal = true;
                                        that.$router.push('/');
                                    }
                                    function showPromptBox() {
                                        that.openPromptBox = false;
                                        that.needKnown = res.data.needKnown;
                                        that.contentText = res.data.contentText;
                                    }
                                    setTimeout(showPromptBox, 3000);
                                    setTimeout(a, 2000);
                                }
                                else if (res.data === "2") {
                                    this.message = "该用户没有注册";
                                    this.HideModal = false;
                                    const that = this;
                                    function b() {
                                        that.message = "";
                                        that.HideModal = true;
                                        that.username = '';
                                        that.password = '';
                                    }
                                    setTimeout(b, 2000);
                                }
                                else if (res.data === "-1") {
                                    this.message = "密码错误";
                                    this.HideModal = false;
                                    const that = this;
                                    function c() {
                                        that.message = "";
                                        that.HideModal = true;
                                        that.password = '';
                                    }
                                    setTimeout(c, 2000);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    }
                    else {
                        this.message = "请正确填写信息";
                        this.HideModal = false;
                        const that = this;
                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }
                        setTimeout(a, 2000);
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: cover;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: @color-bg-hei;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.7);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
</style>
