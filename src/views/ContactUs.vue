<template>
  <div class="center" id="center" name="center">
    <div class="center-layout">
      <el-row :gutter="10">
        <div>
          <AboutUs></AboutUs>
        </div>
        <el-col :span="20">
          <div class="center-content">
            <div class="user-info">
              <h1>联系我们</h1><br/>
            </div>
            <div class="user-message">
              <p><strong>联系邮箱：Kefu@zhongchou.com<br/><br/>
                服务热线：+65-86500000</strong></p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import AboutUs from "@/components/AboutUs";
export default {
  name: "ContactUs",
  data() {
    return {}
  },
  methods: {},
  components: {
    AboutUs
  }
}
</script>
<style scoped>
.center-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.center-content {
  background-color: #ffffff;
  margin-bottom: 30px;
  padding:40px;
  border-radius: 10px;
}
.user-avator img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  padding: 5px;
  border: 1px solid #ddd;
}
.user-info {

}
.user-message {
  color: #6c757d !important;
  font-size: 17px;
}
.user-message ul li {
  color: #77787b;
  font-size: 15px;
}
.user-data {
  line-height: 30px;
  padding: 0;
}
.user-data ul li {
  color: #77787b;
  font-size: 15px;
}
.user-data ul li a {
  color: #77787b;
}
.user-data ul li a:hover {
  color: #ff6700;
}
.user-details {
  height: 150px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 50px;
}
.user-details1 {
  height: 150px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-bottom: 50px;
}
.operate {
  margin-left: 200px;
}
.operate1 {
  line-height: 30px;
  margin-left: 20px;
}
.operate1 .oper-title {
  font-size: 20px;
  color: #7b7f86;
}
.operate1 .oper-href {
  font-size: 15px;
  color: #7b7f86;
}
.operate1 .oper-href:hover {
  color: #ff6700;
}

.email-pop-out {
  text-align: center;
}
</style>