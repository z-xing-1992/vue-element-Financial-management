<template>
  <div class="contianer">
    <div id='code'></div>
    <canvas id="canvas"></canvas>
  </div>

</template>

<script>
  import QRCode from 'qrcode'
  import { getUserProfile,authorizationCode } from "@/api/system/user";
  export default{
    data(){
      return {
        codes:'',
        tiemout:0,
        clearTime:''
      }
    },
    components: {
      QRCode: QRCode
    },
    created() {

    },
    methods:{
      useqrcode(){
        var canvas = document.getElementById('canvas')
        // var id=this.$route.query.id
        // console.log(id)
        QRCode.toCanvas(canvas, this.codes, function (res) {
          console.log(res)
        })
        this.checkTime()
      },
      getUser() {
        authorizationCode().then(response => {
          console.log(response.data)
          this.codes = response.data.code
          this.tiemout = response.data.expireMillisecond
          this.useqrcode();
        });
      },
      checkTime(){
        // 2分钟倒计时 1秒=1000 2*60*1000
        this.clearTime = setTimeout(() => {
          this.$confirm('二维码已过期，请重新获取', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              this.getUser()
            }).catch((err) => {
              console.log('报错')   
          })
        }, this.tiemout);
      }
    },
    mounted(){
      this.getUser();
    },
    destroyed(){
      clearTimeout(this.clearTime)
    }
  }
</script>

<style scoped="scoped">
  .contianer{width: 100%;height: 100%;position: relative;background: #eeeeee;display: flex;justify-content: center;}
  #canvas{
    margin: 80px auto;
  }
</style>
