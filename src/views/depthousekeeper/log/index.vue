<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="主键ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入主键ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门ID" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入部门ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债管家ID" prop="deptHousekeeperId">
        <el-input
          v-model="queryParams.deptHousekeeperId"
          placeholder="请输入债管家ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运营中心ID" prop="operationsCenterId">
        <el-input
          v-model="queryParams.operationsCenterId"
          placeholder="请输入运营中心ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运营中心名称" prop="operationsCenterName">
        <el-input
          v-model="queryParams.operationsCenterName"
          placeholder="请输入运营中心名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备案人id" prop="recordPeopleId">
        <el-input
          v-model="queryParams.recordPeopleId"
          placeholder="请输入备案人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备案人类型 1->个人用户 2-企业用户" prop="recordPeopleType">
        <el-select v-model="queryParams.recordPeopleType" placeholder="请选择备案人类型 1->个人用户 2-企业用户" clearable size="small">
          <el-option
            v-for="dict in recordPeopleTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备案表id" prop="recordFormId">
        <el-input
          v-model="queryParams.recordFormId"
          placeholder="请输入备案表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备案类型 1->债务 2->债权" prop="recordType">
        <el-select v-model="queryParams.recordType" placeholder="请选择备案类型 1->债务 2->债权" clearable size="small">
          <el-option
            v-for="dict in recordTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="queryParams.content"
          placeholder="请输入内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间">
        </el-date-picker>
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
          v-hasPermi="['depthousekeeper:log:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['depthousekeeper:log:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['depthousekeeper:log:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['depthousekeeper:log:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="logList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="债管家ID" align="center" prop="deptHousekeeperId" />
      <el-table-column label="运营中心ID" align="center" prop="operationsCenterId" />
      <el-table-column label="运营中心名称" align="center" prop="operationsCenterName" />
      <el-table-column label="备案人id" align="center" prop="recordPeopleId" />
      <el-table-column label="备案人类型 1->个人用户 2-企业用户" align="center" prop="recordPeopleType" :formatter="recordPeopleTypeFormat" />
      <el-table-column label="备案表id" align="center" prop="recordFormId" />
      <el-table-column label="备案类型 1->债务 2->债权" align="center" prop="recordType" :formatter="recordTypeFormat" />
      <el-table-column label="类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6" align="center" prop="type" :formatter="typeFormat" />
      <el-table-column label="内容" align="center" prop="content" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['depthousekeeper:log:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['depthousekeeper:log:remove']"
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

    <!-- 添加或修改债管家日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
        <el-form-item label="债管家ID" prop="deptHousekeeperId">
          <el-input v-model="form.deptHousekeeperId" placeholder="请输入债管家ID" />
        </el-form-item>
        <el-form-item label="运营中心ID" prop="operationsCenterId">
          <el-input v-model="form.operationsCenterId" placeholder="请输入运营中心ID" />
        </el-form-item>
        <el-form-item label="运营中心名称" prop="operationsCenterName">
          <el-input v-model="form.operationsCenterName" placeholder="请输入运营中心名称" />
        </el-form-item>
        <el-form-item label="备案人id" prop="recordPeopleId">
          <el-input v-model="form.recordPeopleId" placeholder="请输入备案人id" />
        </el-form-item>
        <el-form-item label="备案人类型 1->个人用户 2-企业用户">
          <el-select v-model="form.recordPeopleType" placeholder="请选择备案人类型 1->个人用户 2-企业用户">
            <el-option
              v-for="dict in recordPeopleTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备案表id" prop="recordFormId">
          <el-input v-model="form.recordFormId" placeholder="请输入备案表id" />
        </el-form-item>
        <el-form-item label="备案类型 1->债务 2->债权">
          <el-select v-model="form.recordType" placeholder="请选择备案类型 1->债务 2->债权">
            <el-option
              v-for="dict in recordTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6">
          <el-select v-model="form.type" placeholder="请选择类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLog, getLog, delLog, addLog, updateLog, exportLog } from "@/api/depthousekeeper/log";

export default {
  name: "Log",
  data() {
    return {
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
      // 债管家日志表格数据
      logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 备案人类型 1->个人用户 2-企业用户字典
      recordPeopleTypeOptions: [],
      // 备案类型 1->债务 2->债权字典
      recordTypeOptions: [],
      // 类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        deptId: undefined,
        deptHousekeeperId: undefined,
        operationsCenterId: undefined,
        operationsCenterName: undefined,
        recordPeopleId: undefined,
        recordPeopleType: undefined,
        recordFormId: undefined,
        recordType: undefined,
        type: undefined,
        content: undefined,
        createTime: undefined,
        updateTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          { required: true, message: "主键ID不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "部门ID不能为空", trigger: "blur" }
        ],
        deptHousekeeperId: [
          { required: true, message: "债管家ID不能为空", trigger: "blur" }
        ],
        operationsCenterId: [
          { required: true, message: "运营中心ID不能为空", trigger: "blur" }
        ],
        operationsCenterName: [
          { required: true, message: "运营中心名称不能为空", trigger: "blur" }
        ],
        recordPeopleId: [
          { required: true, message: "备案人id不能为空", trigger: "blur" }
        ],
        recordPeopleType: [
          { required: true, message: "备案人类型 1->个人用户 2-企业用户不能为空", trigger: "blur" }
        ],
        recordFormId: [
          { required: true, message: "备案表id不能为空", trigger: "blur" }
        ],
        recordType: [
          { required: true, message: "备案类型 1->债务 2->债权不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("record_people_type").then(response => {
      this.recordPeopleTypeOptions = response.data;
    });
    this.getDicts("record_type").then(response => {
      this.recordTypeOptions = response.data;
    });
    this.getDicts("dept_housekeeper_log_type").then(response => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询债管家日志列表 */
    getList() {
      this.loading = true;
      listLog(this.queryParams).then(response => {
        this.logList = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    // 备案人类型 1->个人用户 2-企业用户字典翻译
    recordPeopleTypeFormat(row, column) {
      return this.selectDictLabel(this.recordPeopleTypeOptions, row.recordPeopleType);
    },
    // 备案类型 1->债务 2->债权字典翻译
    recordTypeFormat(row, column) {
      return this.selectDictLabel(this.recordTypeOptions, row.recordType);
    },
    // 类型 授权->1 查看备案表->2 上传方案->3 上传合约->4 更新解债进度->5 上传支付佣金凭证->6字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        deptId: undefined,
        deptHousekeeperId: undefined,
        operationsCenterId: undefined,
        operationsCenterName: undefined,
        recordPeopleId: undefined,
        recordPeopleType: undefined,
        recordFormId: undefined,
        recordType: undefined,
        type: undefined,
        content: undefined,
        createTime: undefined,
        updateTime: undefined
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
      this.title = "添加债管家日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改债管家日志";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateLog(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addLog(this.form).then(response => {
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
      this.$confirm('是否确认删除债管家日志编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有债管家日志数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
