<template>
    <div class="app-container">
        <el-form :model="debtForm"  ref="debtForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="债务人姓名(单位)" prop="name">
                <el-input v-model="debtForm.name" placeholder="请输入债务人姓名(单位)" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="tel">
                <el-input v-model="debtForm.tel" placeholder="请输入债务人联系方式" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
                <el-input v-model="debtForm.address" placeholder="请输入债务人联系地址" clearable></el-input>
            </el-form-item>
            <el-form-item label="社会资源" prop="resources">
                <el-input v-model="debtForm.resources" placeholder="请输入社会资源" clearable></el-input>
            </el-form-item>
            <el-form-item label="从事行业" prop="industry">
                <el-input v-model="debtForm.industry" placeholder="请输入债务人从事行业" clearable></el-input>
            </el-form-item>
            <el-form-item label="行业现状" prop="status">
                <el-input v-model="debtForm.status" placeholder="请输入债务人从事行业状况" clearable></el-input>
            </el-form-item>
            <el-form-item label="债务概况" prop="desc">
                <el-input type="textarea" v-model="debtForm.desc" placeholder="请输入债务人概况" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('debtForm')">上传方案</el-button>
                <el-button @click="resetForm('debtForm')">重置</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            debtForm: {
                name: '',
                tel: '',
                address: '',
                resources: '',
                industry: '',
                status: '',
                desc: ''
            }
        }
    },
    methods: {
      submitForm(debtForm) {
        let that = this
        that.$refs[debtForm].validate((valid) => {
          if (valid) {
            that.$emit('uploadImg',true)
          } else {
            console.log('提交报错')
            return false
          }
        });
      },
      resetForm(debtForm) {
        this.$refs[debtForm].resetFields()
      }
    }
}
</script>
<style lang="scss" scoped>
</style>
