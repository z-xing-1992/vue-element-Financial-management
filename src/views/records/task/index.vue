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
      <el-form-item label="订单状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择订单状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="金额范围" prop="status">
        <el-select v-model="queryParams.money" placeholder="请选择订单状态" clearable size="small">
          <el-option
            v-for="dict in moneyOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="部门ID" prop="deptId">-->
<!--        <el-input-->
<!--          v-model="queryParams.deptId"-->
<!--          placeholder="请输入部门ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="关联债务表单id" prop="debtFormId">-->
<!--        <el-input-->
<!--          v-model="queryParams.debtFormId"-->
<!--          placeholder="请输入关联债务表单id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="关联债权表单id" prop="creditorFormId">-->
<!--        <el-input-->
<!--          v-model="queryParams.creditorFormId"-->
<!--          placeholder="请输入关联债权表单id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
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
          v-hasPermi="['records:task:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['records:task:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['records:task:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['records:task:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="taskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="用户" align="center" prop="recordUserName" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="百分比" align="center" prop="speed" />
      <el-table-column label="订单状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="所属运营中心" align="center" prop="deptId" :formatter="deptFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['records:task:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['records:task:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handlexiugai(scope.row)"
            v-if="scope.row.status==1"
          >指配债管家</el-button>
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

    <!-- 添加或修改备案系统工作流对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="百分比" prop="speed">
          <el-input v-model="form.speed" placeholder="请输入百分比" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.status" placeholder="请选择订单状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
        <el-form-item label="删除标示 0代表存在 2代表删除" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入删除标示 0代表存在 2代表删除" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改备案系统工作流对话框 -->
    <el-dialog :title="title" :visible.sync="xiugaiOpen" width="500px">
      <el-form ref="form" :model="xiugaiForm" :rules="rules" label-width="80px">
        <el-form-item label="债管家等级" prop="status">
          <el-select v-model="roleKey.roleKey" placeholder="请选择债管家等级" @change="getUser"  clearable size="small">
            <el-option
              v-for="dict in roleOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="债管家" prop="status">
          <el-select v-model="user" placeholder="请选择债管家"  @change="checkUser" clearable size="small">
            <el-option
              v-for="dict in sysUser"
              :key="dict.userId"
              :label="dict.nickName"
              :value="dict.userId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitxiugaiForm">确 定</el-button>
        <el-button @click="xiugaicancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTask, getTask, delTask, addTask, updateTask, exportTask ,listUserByRoleKey,editZGJ} from "@/api/records/task";
import { listDept} from "@/api/system/dept";
export default {
  name: "Task",
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
      // 备案系统工作流表格数据
      taskList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      xiugaiOpen:false,
      xiugaiForm:{},
      //权限字符
      roleKey:{
        releKey: ''
      },
      //
      user:{

      },
      sysUser:[],
      // 订单状态字典
      statusOptions: [],
      deptOptions: [],
      //金额范围
      moneyOptions: [
        {dictValue:0,
          dictLabel:"0-1百万",
        },
        {dictValue:1,
          dictLabel:"1百万-1千万",
        },
        {dictValue:2,
          dictLabel:"1千万-一亿",
        },
        {dictValue:3,
          dictLabel:"一亿以上",
        },
      ],
      //权限选择
      roleOptions: [
        {dictValue:'low_level_dh',
          dictLabel:"初级债管家",
        },
        {dictValue:'mid_level_dh',
          dictLabel:"中级债管家",
        },
        {dictValue:'high_level_dh',
          dictLabel:"中级债管家",
        },
        {dictValue:'expert_level_dh3',
          dictLabel:"专家级债管家",
        },
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: undefined,
        speed: undefined,
        status: undefined,
        deptId: undefined,
        debtFormId: undefined,
        creditorFormId: undefined,
        money:undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("order_status").then(response => {
      this.statusOptions = response.data;
    });
    listDept(this.queryParams).then(response => {
      console.log(response.data)
      this.deptOptions = response.data;
    });
  },
  methods: {
    /** 查询备案系统工作流列表 */
    getList() {
      this.loading = true;
      listTask(this.queryParams).then(response => {
        this.taskList = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    // 订单状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 部门字典翻译
    deptFormat(row, column) {
      return this.selectDeptLabel(this.deptOptions, row.deptId);
    },
    checkUser(){
        this.xiugaiForm.debtHousekeeperId = this.user;
    },
    getUser(){
      this.sysUser = [];
      this.user = '';
      let data = {
        'roleKey':this.roleKey.roleKey
      }
      listUserByRoleKey(data).then(response => {
          console.log(response)
        this.sysUser = response.data;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮
    xiugaicancel() {
      this.xiugaiOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
      };
      this.resetForm("form");
      this.xiugaiForm = {
      };
      this.resetForm("xiugaiForm");
      this.user = ''
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
      this.title = "添加备案系统工作流";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTask(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改备案系统工作流";
      });
    },
    /** 修改按钮操作 */
    handlexiugai(row) {
      this.reset();
      const id = row.id || this.ids
      getTask(id).then(response => {
        this.xiugaiForm = response.data;
        this.xiugaiOpen = true;
        this.title = "修改备案系统工作流";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateTask(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addTask(this.form).then(response => {
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
    /** 指配债管家 */
    submitxiugaiForm: function() {
      console.log("进来了");
          if (this.xiugaiForm.id != undefined) {
            editZGJ(this.xiugaiForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("指派成功");
                this.xiugaiOpen = false;
                this.getList();
                this.reset();
              } else {
                this.msgError(response.msg);
              }
            });
          }
      this.reset();
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除备案系统工作流编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTask(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有备案系统工作流数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTask(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
