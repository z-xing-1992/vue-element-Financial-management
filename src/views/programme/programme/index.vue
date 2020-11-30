<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="流程ID" prop="taskId">
        <el-input
          v-model="queryParams.taskId"
          placeholder="请输入流程ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="方案状态" prop="programmeState">
        <el-select v-model="queryParams.programmeState" placeholder="请选择方案状态" clearable size="small">
          <el-option
            v-for="dict in programmeStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="方案名称" prop="programmeName">
        <el-input
          v-model="queryParams.programmeName"
          placeholder="请输入方案名称"
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
          v-hasPermi="['programme:programme:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['programme:programme:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['programme:programme:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['programme:programme:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="programmeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="流程ID" align="center" prop="taskId" />
      <el-table-column label="方案状态" align="center" prop="programmeState" :formatter="programmeStateFormat" />
      <el-table-column label="方案名称" align="center" prop="programmeName" />
      <el-table-column label="备注" align="center" prop="remark" />
<!--      <el-table-column label="部门ID" align="center" prop="deptId" />-->
      <el-table-column label="部门" align="center" prop="deptId" :formatter="deptFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['programme:programme:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['programme:programme:remove']"
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

    <!-- 添加或修改备案方案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="流程ID" prop="taskId">
          <el-input v-model="form.taskId" placeholder="请输入流程ID" />
        </el-form-item>
        <el-form-item label="方案状态" prop="programmeState">
<!--          <el-input v-model="form.programmeState" placeholder="请输入方案状态" />-->
          <el-select v-model="form.status" placeholder="请选择方案状">
            <el-option
              v-for="dict in programmeStateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方案名称" prop="programmeName">
          <el-input v-model="form.programmeName" placeholder="请输入方案名称" />
        </el-form-item>
<!--        <el-form-item label="部门ID" prop="deptId">-->
<!--          <el-input v-model="form.deptId" placeholder="请输入部门ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="删除标示 (0代表存在 2代表删除)" prop="delFlag">-->
<!--          <el-input v-model="form.delFlag" placeholder="请输入删除标示 (0代表存在 2代表删除)" />-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listProgramme, getProgramme, delProgramme, addProgramme, updateProgramme, exportProgramme } from "@/api/programme/programme";
import { listDept} from "@/api/system/dept";
export default {
  name: "Programme",
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
      //部门列表
      deptFormat: [],
      // 备案方案表格数据
      programmeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 方案状态字典
      programmeStateOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        taskId: undefined,
        programmeState: undefined,
        programmeName: undefined,
        deptId: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        taskId: [
          { required: true, message: "流程ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("programme_state").then(response => {
      this.programmeStateOptions = response.data;
    });
    listDept().then(response => {
      this.deptFormat = response.data;
    });
  },
  methods: {
    /** 查询备案方案列表 */
    getList() {
      this.loading = true;
      listProgramme(this.queryParams).then(response => {
        this.programmeList = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    // 方案状态字典翻译
    programmeStateFormat(row, column) {
      return this.selectDictLabel(this.programmeStateOptions, row.programmeState);
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
        taskId: undefined,
        programmeState: undefined,
        programmeName: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        deptId: undefined,
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
      this.title = "添加备案方案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getProgramme(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改备案方案";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateProgramme(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addProgramme(this.form).then(response => {
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
      this.$confirm('是否确认删除备案方案编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delProgramme(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有备案方案数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportProgramme(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
