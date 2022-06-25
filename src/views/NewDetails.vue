<!--
 * @Descripttion: 商品详情
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-10-28 12:05:31
-->

<template>
  <div id="details">
    <!-- 主要内容 -->
    <div class="details-main">
      <!-- 左侧商品轮播图 -->
      <div class="details-block">
        <div>
          <img style="height: 560px;width: 560px" :src="productDetails.img_path" />
          <!-- <img style="height: 560px;" src="https://p3.ssl.qhimgs1.com/sdr/400__/t01afc62eeaeda03719.jpg"/> -->
        </div>
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="details-content">
        <el-tag type="success">还剩10{{productDetails.remaining_time}}天结束</el-tag>
        <h1 class="name" style="margin-left: 30px;font-size: 30px">{{ productDetails.name }}</h1>
        <li class="view">
          <i class="el-icon-view"></i>
          {{ productDetails.view }}34
        </li>
        <div style="width:570px">
        <p style="margin-top: 20px;">详情介绍：{{ productDetails.info }}</p>
        </div>
        <div class="d-flex align-items-center mb-4" style="padding-top: 20px">
          <el-avatar :size="30" :src="productDetails.name"></el-avatar>
          <span class="ml-2" style="margin-left: 10px">发起人：{{productDetails.name}}</span>
        </div>

        <el-divider></el-divider>

        <div class="pro-list">
          <div class="d-flex justify-content-between align-items-baseline">
            <p class="text-success font-weight-bold mb-3" style="font-size:25px;">已筹金额 ￥{{productDetails.raiser_amount}}</p>
            <p class="font-weight-bold" style="margin-left:30px;font-size:36px;color:red">目标金额 ¥{{productDetails.target_amount}}</p>
          </div>

          <p style="margin-top: 50px;font-size: 20px">众筹进度：{{productDetails.raiser_amount*100/productDetails.target_amount}}%</p>
          <el-progress class="mb-3" style="margin-top: 10px" :percentage="productDetails.raiser_amount*100/productDetails.target_amount" color="#1D8F1D" :stroke-width="10" :show-text="false"></el-progress>
        </div>


        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">项目预投</el-button>
          <el-button class="like" @click="addFavorite">关注</el-button>
        </div>
        <!-- 内容区底部按钮END -->

      </div>
      <!-- 右侧内容区END -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as productsAPI from '@/api/products/'
import * as imgsAPI from '@/api/img/'
import * as favoritesAPI from '@/api/favorites/'
import * as cartsAPI from '@/api/carts/'
export default {
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: 0, // 商品id
      productDetails: '', // 商品详细信息
      productPictures: '', // 商品图片
      imgs: '', //商品概述图片
      infoImgs: '',
      paramImgs: '',
      select: 0
    }
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function() {
      this.load()
      //this.getDetailsPicture(val);
    }
  },
  methods: {
    ...mapActions(['unshiftShoppingCart', 'addShoppingCartNum']),
    // 获取商品详细信息
    load() {
      productsAPI.showProduct(this.productID).then(res => {
        this.productDetails = res.data
      })
      productsAPI.showPictures(this.productID).then(res => {
        this.productPictures = res.data
      })
    //   imgsAPI.showInfoImgs(this.productID).then(res => {
    //     this.infoImgs = res.data
    //     this.imgs = this.infoImgs
    //   })
    //   imgsAPI.showParamImgs(this.productID).then(res => {
    //     this.paramImgs = res.data
    //   })
    },
    // goInfo() {
    //   this.showInfoImgs()
    //   document.getElementById('product-select').scrollIntoView()
    // },
    // goParam() {
    //   this.showParamImgs()
    //   document.getElementById('product-select').scrollIntoView()
    // },
    // showInfoImgs() {
    //   this.select = 0
    //   this.imgs = this.infoImgs
    // },
    // showParamImgs() {
    //   this.select = 1
    //   this.imgs = this.paramImgs
    // },
    // 加入购物车
    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$router.push({ name: 'Login' })
        return
      }
      var form = {
        user_id: this.$store.getters.getUser.id,
        project_id: Number(this.productID)
      }
      cartsAPI
          .postCart(form)
          .then(res => {
            switch (res.status) {
              case 200:
                //新加入购物车成功
                this.unshiftShoppingCart(res.data)
                this.notifySucceed('添加购物车成功')
                break
              case 201:
                // 该商品已经在购物车，数量+1
                this.addShoppingCartNum(this.productID)
                this.notifySucceed('该商品已在购物车，数量+1')
                break
              case 202:
                // 商品数量达到限购数量
                this.dis = true
                this.notifyError('商品达到限购数量', res.msg)
                break
              case 20001:
                //token过期，需要重新登录
                this.loginExpired(res.msg)
                break
              default:
                this.notifyError('添加购物车失败', res.msg)
            }
          })
          .catch(err => {
            this.notifyError('添加购物车失败', err)
          })
    },
    addFavorite() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$router.push({ name: 'Login' })
        return
      }
      var form = {
        user_id: this.$store.getters.getUser.id,
        project_id: Number(this.productID)
      }
      favoritesAPI
          .postFavorite(form)
          .then(res => {
            if (res.status === 200) {
              this.notifySucceed('添加收藏夹成功')
            } else if (res.status === 20001) {
              //token过期，需要重新登录
              this.loginExpired(res.msg)
            } else {
              this.notifyError('添加收藏夹失败', res.msg)
            }
          })
          .catch(err => {
            this.notifyError('添加收藏夹失败', err)
          })
    }
  },
  beforeRouteEnter(to, from, next) {
    // 添加背景色
    document
        .querySelector('body')
        .setAttribute('style', 'background-color:#ffffff')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document
        .querySelector('body')
        .setAttribute('style', 'background-color:#f5f5f5')
    next()
  }
}
</script>
<style scoped>

.font-weight-bold {
  font-weight: 700!important;
}

.align-items-baseline {
  -ms-flex-align: center!important;
  align-items: center!important;
  margin-left: 30px;
}

.text-success {
  color: #1d8f1d!important;
}

.mb-3{
  margin-bottom: 0rem!important;
}

.mb-4{
  margin-bottom: 1.5rem!important;
}
.d-flex {
  display: -ms-flexbox!important;
  display: flex!important;
}
.align-items-center {
  -ms-flex-align: center!important;
  align-items: center!important;
  margin-left: 0;
}
/* 头部CSS */
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  height: 64px;
  float: right;
  display: flex;
  align-items: center;
}
#details .page-header .title .list .select {
  float: left;
  margin-left: 20px;
}

#details .page-header .title .list .select .list-select {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list .select .list-select:hover {
  font-size: 14px;
  color: #ff6700;
}
#details .page-header .title .list .cut {
  font-size: 17px;
  color: #c9c7c7;
  margin-left: 20px;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .details-main {
  width: 1225px;
  height: 560px;
  padding-top: 30px;
  margin: 0 auto;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
}
#details .details-main .details-block {
  float: left;
  width: 560px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .details-main .details-content {
  float: left;
  margin-left: 25px;
  width: 640px;
}

#details .details-main .details-content .name {
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
  display: inline;
}

#details .details-main .details-content .view {
  color: #b0b0b0;
  float: right;
  padding-top: 5px;
  font-size: 18px;
}

#details .details-main .details-content .intro {
  color: #b0b0b0;
  padding-top: 10px;
  width: 100px;
}
#details .details-main .details-content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .details-main .details-content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .details-main .details-content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .details-main .details-content .pro-list {
  background: #f9f9f9;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .details-main .details-content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .details-main .details-content .pro-list .pro-price {
  float: right;
}
#details .details-main .details-content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .details-main .details-content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .details-main .details-content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .details-main .details-content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .details-main .details-content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .details-main .details-content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .details-main .details-content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .details-main .details-content .button .like:hover {
  background-color: #757575;
}
#details .details-main .details-content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 主要内容CSS END */

/*商品概述&参数*/
#details .product-select {
  width: 300px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  align-items: center;
}
#details .product-select .notSelect {
  font-size: 19px;
  color: #757575;
}
#details .product-select .isSelect {
  font-size: 19px;
  color: #ff6700;
}
#details .product-select .notSelect:hover {
  color: #ff6700;
}
#details .product-select .cut {
  font-size: 25px;
  color: #c9c7c7;
  margin-left: 35px;
  margin-right: 35px;
}
#details .product-img img {
  width: 1225px;
  display: block;
  margin: 0 auto;
}
/*商品概述&参数END*/

/*v-else*/
.not-found {
  height: 500px;
  text-align: center;
}
/*v-else END*/
</style>
