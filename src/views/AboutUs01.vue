<template>
  <div class="center" id="aboutUs01" name="aboutUs01">
    <div class="center-layout">
      <el-row :gutter="10">
        <div>
          <AboutUs></AboutUs>
        </div>
        <el-col :span="20">
          <div class="center-content">
            <div class="user-info">
              <h1>关于我们</h1><br/>
            </div>
            <div class="user-message">
              <p><strong>抛出一枚硬币，你会得到什么？<br/><br/>
                是想到抛物线原理，还是想到牛顿定律？<br/><br/>
                或是什么都不想，只看抛出正反的结果？<br/><br/>
                一切皆在创意，皆由你想，也皆由你所得。<br/><br/>
                <br/>
                众筹的“有趣”定义<br/><br/>
                有趣的灵魂设计出有趣的程序<br/><br/>
                有趣的程序吸引到有趣的灵魂<br/><br/>
                相辅相成<br/><br/>
                有趣的灵魂和有趣的程序哪个更吸引你？<br/><br/>
                而我们愿意为这些“有趣”提供更大更丰富的资源平台<br/><br/>
                让有趣的灵魂有所安放，<br/><br/>
                让有趣的创意拥有自己的根据地<br/><br/>
                <br/>
                众筹平台的使命<br/><br/>
                梦没有想法等于黄粱一梦，想法不能变现等于纸上谈兵<br/><br/>
                如果你的一切规则，一切的溯源，在于资金<br/><br/>
                众筹平台，给与你一个亲自搭建梦想house的机会<br/><br/>
                在这里，你可以发起任何创意<br/><br/>
                在这里，你可以实现任何计划<br/><br/>
                在这里，你可以学到一些必备技能<br/><br/>
                只要有idea，一起寻找志同道合的人<br/><br/>
                一起做出独一无二的创意，将创意变现<br/><br/>
                期待你的加入！</strong></p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import AboutUs from '../components/AboutUs'
export default {
  name: "AboutUs01",
  data() {
    return {

    }
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

</style>