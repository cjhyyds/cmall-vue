<!--
 * @Descripttion: 发布项目页面组件
 * @Author: congz
 * @Date: 2020-06-11 10:01:19
 * @LastEditors: congz
 * @LastEditTime: 2020-08-18 19:58:16
-->

<template>
    <div class="publish" id="publish" name="publish">
        <div class="table">
            <el-form ref="form" :model="form" label-width="100px" size="medium">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            <el-form-item
                label="筹资金额"
                prop="target_amount"
                :rules="[
                  { required: true, message: '筹资金额不能为空'},
                  { type: 'number', message: '金额必须为数字值'}
                ]">
            <el-input type="age" v-model.number="form.target_amount" autocomplete="off"></el-input>
            </el-form-item>
                <el-form-item label="筹资结束">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.remaining_time" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="项目类型">
                    <el-radio-group v-model="form.category_id">
                    <el-radio :label=1 >食用油</el-radio>
                    <el-radio :label=2 >粮食</el-radio>
                    <el-radio :label=3 >水果</el-radio>
                    <el-radio :label=4 >菌类</el-radio>
                    <el-radio :label=5 >蔬菜</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="项目简介">
                    <el-input type="textarea" v-model="form.info"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-upload
                action="http://localhost:3000/api/v1/user/orders"
                list-type="picture-card"
                ref="upload"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>   
                <br>  
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即发起众筹</el-button>
                    <el-button>取消</el-button>
                </el-form-item>              
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import * as projectAPI from '@/api/project'
    import axios from 'axios'
    export default {
    data() {
      return {
        form: {
          "raiser":this.$store.getters.getUser.id,
          "name": '',
          "category_id": 0,
          "remaining_time": '',
          "info":'',
          "delivery": false,
          "target_amount":0,
        }
      }
    },
    methods: {
      onSubmit() {
        this.submitUpload()
          projectAPI
            .postProject(this.form)
            .then(res => {
                // 弹出通知框提示登录成功信息
                this.notifySucceed('发起项目成功')
                this.$router.push({
                  name: 'Home'
                })
            })
            .catch(error => {
              this.notifyError('发起项目失败', error)
            })       
        // axios
        // .post('http://10.1.162.174:3000/api/v1/projects',{
        //   data: this.form
        // })
        // .then(()=>{
        //   this.notifyError('上传成功')
        //   this.$router.push({
        //     name: 'Home'
        //   })
        // })
        // .catch(()=> { // 请求失败处理
        // this.notifyError('上传失败')
        // this.form =''
        // this.$router.push({
        // name: 'Publish'
        //   })
        // });
      },
        submitUpload() {
        this.$refs.upload.submit();
      },
      beforeUpload(file) {
        this.notifyError('上传图片2')
        const isJPG = file.type === 'http://10.1.162.174:3000/api/v1/projects';
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
    .table{
		width: 50%;
		/*边框：这是一个最外边的边距和填充之间的宽度*/
		border: 70px solid rgb(255, 255, 255);
		/*填充：这是边框与实际内容之间的宽度*/
		padding: 50px;
		/*外边框：margin意为边缘*/
		margin: auto;
}
</style>