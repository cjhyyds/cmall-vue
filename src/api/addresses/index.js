/*
 * @Descripttion:
 * @Author: congz
 * @Date: 2020-07-20 11:08:33
 * @LastEditors: congz
 * @LastEditTime: 2020-08-05 15:32:59
 */
import axios from 'axios'

// 创建购物车
const postAddress = form =>
  axios.post('http://10.1.162.174:3000/api/v1/addresses', form).then(res => res.data)

// 读取购物车
const showAddresses = user_id =>
  axios.get(`http://10.1.162.174:3000/api/v1/addresses/${user_id}`).then(res => res.data)

// 更新购物车
const updateAddress = form =>
  axios.put('http://10.1.162.174:3000/api/v1/addresses', form).then(res => res.data)

// 删除购物车
const deleteAddress = addressID =>
  axios
    .delete('http://10.1.162.174:3000/api/v1/addresses', {
      data: { address_id: addressID }
    })
    .then(res => res.data)

export { postAddress, showAddresses, updateAddress, deleteAddress }
