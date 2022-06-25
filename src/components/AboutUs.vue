<!--
 * @Descripttion:个人中心导航组件
 * @Author: congz
 * @Date: 2020-07-03 09:40:21
 * @LastEditors: congz
 * @LastEditTime: 2020-08-09 13:02:14
-->

<template>
  <div class="aboutUs" id="aboutUs">
    <el-col :span="4">
      <div class="menu">
        <div class="menu-content">
          <div class="menu-part">
            <p class="submenu">关于我们</p>
            <ul class="menu-ul">
              <li>
                <router-link to="/about/us01" class="menu-a">关于众筹</router-link>
              </li>
              <li>
                <router-link to="/contact/us" class="menu-a">联系我们</router-link>
              </li>
            </ul>
            <p class="submenu">帮助中心</p>
            <ul class="menu-ul">
              <li>
                <router-link to="/common/problem" class="menu-a">常见问题</router-link>
              </li>
            </ul>
            <p class="submenu">协议条款</p>
            <ul class="menu-ul">
              <li>
                <router-link to="/about" class="menu-a">用户注册协议</router-link>
              </li>
              <li>
                <router-link to="/about" class="menu-a">法律声明及隐私权政策</router-link>
              </li>
              <li>
                <router-link to="/about" class="menu-a">发起者协议</router-link>
              </li>
              <li>
                <router-link to="/about" class="menu-a">支持者协议</router-link>
              </li>
              <li>
                <router-link to="/about" class="menu-a">项目发起上线流程</router-link>
              </li>
              <li>
                <router-link to="/about" class="menu-a">众筹资质要求</router-link>
              </li>
            </ul>
          </div>
          <div class="extra"></div>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'AboutUs',
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.menu {
  background-color: #ffffff;
}
.menu-content {
  width: 120px;
  margin: 0 auto;
}
.submenu {
  padding-top: 30px;
  padding-bottom: 20px;
}
.menu-ul {
  line-height: 30px;
}
.menu-ul .menu-a {
  font-size: 15px;
  color: #7b7f86;
}
.menu-ul .menu-a:hover {
  color: #ff6700;
}
.extra {
  height: 40px;
}
</style>