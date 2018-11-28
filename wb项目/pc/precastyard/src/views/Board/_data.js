/**
 * 获取数据
 */
import CustomAxios from '@/components/CustomAxios/index'
export default function getData(url, paramObj) {
  return new Promise(function(resolve) {
    CustomAxios.get('/wpBoard/getDuraSafeRun', {
      params: {
        projid: '55400',
        pactid: '1001002414',
        yardid: 'AB8D519B-242E-4F98-B647-EC6AAE496F0F',
        ...paramObj
      }
    }).then(resq => {
      resolve(resq.data)
    }).catch(error => {})
  })

}