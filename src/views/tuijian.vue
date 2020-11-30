<template>
  <div class="contianer">
    <div id='code'></div>
    <canvas id="canvas"></canvas>
  </div>

</template>

<script>
  import QRCode from 'qrcode'
  import { getUserProfile } from "@/api/system/user";
  export default{
    data(){
      return {
        codes:'',
        user: {}
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
        QRCode.toCanvas(canvas, 'http://alzhm.m5f.cn/register?id='+this.user.userId, function (error) {
          if (error) console.error(error)
//           console.log('success!');
        })
      },
      getUser() {
        getUserProfile().then(response => {
          this.user = response.data;
          console.log(this.user)
          this.useqrcode();
        });
      }
    },
    mounted(){
      this.getUser();
    }
  }
</script>

<style scoped="scoped">
  .contianer{width: 100%;height: 100%;position: relative;background: #eeeeee;display: flex;justify-content: center;}
  #canvas{
    margin: 80px auto;
  }
</style>
