import axios from 'axios'

// 创建项目
const postProject = form =>
  axios.post('http://10.1.162.174:3000/api/v1/projects', form).then(res => res.data)

//暴露所有方法
export {
  postProject,
}
