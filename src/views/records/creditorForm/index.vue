<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登记人" prop="registerName">
        <el-input
          v-model="queryParams.registerName"
          placeholder="请输入登记人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登记时间" prop="registerDatetime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.registerDatetime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择登记时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="债权人姓名" prop="creditorName">
        <el-input
          v-model="queryParams.creditorName"
          placeholder="请输入债权人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债权人地址" prop="creditorSite">
        <el-input
          v-model="queryParams.creditorSite"
          placeholder="请输入债权人地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债权人概况" prop="creditorSurvey">
        <el-input
          v-model="queryParams.creditorSurvey"
          placeholder="请输入债权人概况"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债权人从事行业" prop="creditorIndustry">
        <el-input
          v-model="queryParams.creditorIndustry"
          placeholder="请输入债权人从事行业"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债权人社会资源" prop="creditorResource">
        <el-input
          v-model="queryParams.creditorResource"
          placeholder="请输入债权人社会资源"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债权起始时间" prop="creditorStartingTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.creditorStartingTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择债权起始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="债权人电话" prop="creditorPhone">
        <el-input
          v-model="queryParams.creditorPhone"
          placeholder="请输入债权人电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否有欠条" prop="isIou">
        <el-input
          v-model="queryParams.isIou"
          placeholder="请输入是否有欠条"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否起诉" prop="isProsecute">
        <el-input
          v-model="queryParams.isProsecute"
          placeholder="请输入是否起诉"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="化债意愿" prop="defuseAspiration">
        <el-input
          v-model="queryParams.defuseAspiration"
          placeholder="请输入化债意愿"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['records:creditorForm:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['records:creditorForm:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['records:creditorForm:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['records:creditorForm:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          @click="assignedHousekeeper"
        >指派债管家</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="creditorFormList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="登记人" align="center" prop="registerName" />
      <el-table-column label="登记时间" align="center" prop="registerDatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.registerDatetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="债权人姓名" align="center" prop="creditorName" />
      <el-table-column label="债权人地址" align="center" prop="creditorSite" />
      <el-table-column label="债权人概况" align="center" prop="creditorSurvey" />
      <el-table-column label="债权人从事行业" align="center" prop="creditorIndustry" />
      <el-table-column label="债权人社会资源" align="center" prop="creditorResource" />
      <el-table-column label="债权起始时间" align="center" prop="creditorStartingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creditorStartingTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="债权人电话" align="center" prop="creditorPhone" />
      <el-table-column label="是否有欠条" align="center" prop="isIou" />
      <el-table-column label="是否起诉" align="center" prop="isProsecute" />
      <el-table-column label="化债意愿" align="center" prop="defuseAspiration" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['records:creditorForm:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['records:creditorForm:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改备案债权单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="登记人" prop="registerName">
          <el-input v-model="form.registerName" placeholder="请输入登记人" />
        </el-form-item>
        <el-form-item label="登记时间" prop="registerDatetime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.registerDatetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择登记时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="债权人姓名" prop="creditorName">
          <el-input v-model="form.creditorName" placeholder="请输入债权人姓名" />
        </el-form-item>
        <el-form-item label="债权人地址" prop="creditorSite">
          <el-input v-model="form.creditorSite" placeholder="请输入债权人地址" />
        </el-form-item>
        <el-form-item label="债权人概况" prop="creditorSurvey">
          <el-input v-model="form.creditorSurvey" placeholder="请输入债权人概况" />
        </el-form-item>
        <el-form-item label="债权人从事行业" prop="creditorIndustry">
          <el-input v-model="form.creditorIndustry" placeholder="请输入债权人从事行业" />
        </el-form-item>
        <el-form-item label="债权人社会资源" prop="creditorResource">
          <el-input v-model="form.creditorResource" placeholder="请输入债权人社会资源" />
        </el-form-item>
        <el-form-item label="债权起始时间" prop="creditorStartingTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.creditorStartingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择债权起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="债权人电话" prop="creditorPhone">
          <el-input v-model="form.creditorPhone" placeholder="请输入债权人电话" />
        </el-form-item>
        <el-form-item label="是否有欠条" prop="isIou">
          <el-input v-model="form.isIou" placeholder="请输入是否有欠条" />
        </el-form-item>
        <el-form-item label="是否起诉" prop="isProsecute">
          <el-input v-model="form.isProsecute" placeholder="请输入是否起诉" />
        </el-form-item>
        <el-form-item label="化债意愿" prop="defuseAspiration">
          <el-input v-model="form.defuseAspiration" placeholder="请输入化债意愿" />
        </el-form-item>
        <el-form-item label="删除标志" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 指派债管家 -->
    <el-dialog
      center
      title="指派债管家"
      :visible.sync="assignedHousekeeperVisible"
      width="590px"
      :before-close="handleClose" :modal-append-to-body='false'>
      <assignedHousekeeper v-if="assignedHousekeeperVisible"></assignedHousekeeper>
    </el-dialog>
  </div>
</template>

<script>
import { listCreditorForm, getCreditorForm, delCreditorForm, addCreditorForm, updateCreditorForm, exportCreditorForm } from "@/api/records/creditorForm";
import assignedHousekeeper from '../components/assignedHousekeeper'
export default {
  name: "CreditorForm",
  components:{ assignedHousekeeper },
  data() {
    return {
      // 指派层控制
      assignedHousekeeperVisible: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 备案债权单表格数据
      creditorFormList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: undefined,
        registerName: undefined,
        registerDatetime: undefined,
        creditorName: undefined,
        creditorSite: undefined,
        creditorSurvey: undefined,
        creditorIndustry: undefined,
        creditorResource: undefined,
        creditorStartingTime: undefined,
        creditorPhone: undefined,
        isIou: undefined,
        isProsecute: undefined,
        defuseAspiration: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        delFlag: [
          { required: true, message: "删除标志（0代表存在 2代表删除）不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询备案债权单列表 */
    getList() {
      this.loading = true;
      listCreditorForm(this.queryParams).then(response => {
        this.creditorFormList = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        id: undefined,
        registerName: undefined,
        registerDatetime: undefined,
        creditorName: undefined,
        creditorSite: undefined,
        creditorSurvey: undefined,
        creditorIndustry: undefined,
        creditorResource: undefined,
        creditorStartingTime: undefined,
        creditorPhone: undefined,
        isIou: undefined,
        isProsecute: undefined,
        defuseAspiration: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        delFlag: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加备案债权单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCreditorForm(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改备案债权单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCreditorForm(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addCreditorForm(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除备案债权单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCreditorForm(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有备案债权单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCreditorForm(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    /** 指派债管家 */
    assignedHousekeeper(){
      this.assignedHousekeeperVisible = true
      console.log('sds')
    },
    handleClose(done) {
      done()
    },
  }
};
</script>
