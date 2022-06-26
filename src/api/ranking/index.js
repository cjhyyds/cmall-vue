/*
 * @Descripttion:调用后端热门商品&排行榜的函数
 * @Author: congz
 * @Date: 2020-07-23 14:16:19
 * @LastEditors: congz
 * @LastEditTime: 2020-07-23 15:16:56
 */
import axios from 'axios'

// 读取热门家电
const listElecRanking = () =>
  axios.get('http://10.1.162.174:3000/api/v1/elec-rankings').then(res => res.data)

// 读取热门配件
const listAcceRanking = () =>
  axios.get('http://10.1.162.174:3000/api/v1/acce-rankings').then(res => res.data)

export { listElecRanking, listAcceRanking }
