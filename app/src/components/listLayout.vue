<template>
  <div>
    <!-- form slot -->
    <div class="form-wrap" v-if="hasForm" @keyup.enter="doFilter">
      <div class="list-layout-header">
        <el-form inline :model="filterData" :label-width="labelWidth">
          <slot name="form"></slot>
          <el-form-item>
            <el-button @click="doFilter" type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="header_other" v-if="$slots.header_other">
          <slot name="header_other"></slot>
        </div>
      </div>
      <hr class="divider" />
    </div>
    <!-- 分隔线 -->
    <!-- table slot -->
    <div class="table-wrap" v-loading="loading">
      <slot name="table"></slot>
    </div>
    <!-- pagination -->
    <div class="row-flex">
      <el-pagination
        v-if="hasPagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="filterData.PageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="filterData.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        class="mart-15 text-right row-flex-eq"
      >
      </el-pagination>
      <slot name="pagination-right"></slot>
    </div>
  </div>
</template>

<script>
/* 列表页layout */
export default {
  name: 'ListLayout',
  props: {
    labelWidth: {
      type: String,
      default: '100px',
    },
    filterData: {
      required: true,
      default: function() {
        return {
          PageIndex: 1,
          PageSize: 10,
        };
      },
    },
    serviceName: {
      required: false,
      type: String,
    },
    isDelayload: {
      type: Boolean,
      default: false,
    },
    url: {
      required: true,
      type: String,
    },
    listLiteral: {
      type: String,
      default: 'List',
    },
    totalLiteral: {
      type: String,
      default: 'TotalRecord',
    },
    sessionKey: {
      type: String,
    },
    dateRanges: {
      type: Array,
      default: function() {
        return [];
      },
    },
    dates: {
      type: [String, Array],
      default: '',
    },
    hasPagination: {
      type: Boolean,
      default: true,
    },
    ignoreNull: {
      type: Boolean,
      default: false,
    },
    hasForm: {
      type: Boolean,
      default: true,
    },
    hasSearchForm: {
      type: Boolean,
      default: true,
    },
    needTime: {
      // 日期加时间(精确到分秒)时
      type: Boolean,
      default: false,
    },
    beforeQuery: Function, // submit前处理数据
  },
  data() {
    return {
      loading: false,
      copyfilterData: {},
      total: 0,
      localDates: [],
    };
  },
  mounted() {
    this.initFilterData();
  },
  methods: {
    // 初始化时，处理数据，如日期，行业，地点....
    initFilterData() {
      this.handleDateRanges();
    },
    // 请求api前, 处理数据
    handleSubmitData() {
      this.handleDateRanges();
      this.handleDate();
      this.beforeQuery && this.beforeQuery();
      this.initData();
    },
    // 处理dateRange
    handleDateRanges() {
      this.localDates = [];
      let length = this.dateRanges.length;
      if (!length) return;
      this.dateRanges.forEach((dateRange) => {
        let range = this.filterData[dateRange['rangeName']];
        if (range) {
          let rangeArr = [].slice.call(range);
          if (rangeArr.length) {
            [this.filterData[dateRange['childName'][0]], this.filterData[dateRange['childName'][1]]] = rangeArr;
            this.localDates = this.localDates.concat(dateRange.childName);
          }
        } else {
          this.filterData[dateRange['childName'][0]] = '';
          this.filterData[dateRange['childName'][1]] = '';
        }
      });
    },
    handleDate() {
      let datesArr = this.dates !== (undefined || null) ? [].slice.call(this.dates) : [];
      let dates = [...new Set([...datesArr, ...this.localDates])];
      dates.forEach((date, index) => {
        if (index === 1 && this.filterData[date]) {
          if (this.needTime) {
            let time = new Date(this.filterData[date]);
            this.filterData[date] = time.getTime();
          } else {
            let time = new Date(this.filterData[date]);
            this.filterData[date] = time.getTime() + 1000 * 60 * 60 * 24 - 1000;
          }
        }
        this.filterData[date] = this.$utils.handleDate(this.filterData[date]);
      });
    },
    initData() {
      this.copyfilterData = this.$utils.deepClone(this.filterData);
      // if (!this.ignoreNull) {
      //   for (let data of Object.keys(this.copyfilterData)) {
      //     if (this.copyfilterData[data] === null) {
      //       this.copyfilterData[data] = 0
      //     }
      //   }
      // }
    },
    queryList() {
      this.loading = true;
      this.handleSubmitData();
      this.$api(this.url, this.copyfilterData)
        .then((res) => {
          this.pubList(res);
        })
        .catch((err) => {
          this.$message.error(err.Message || '');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    pubList(res) {
      // 保存页码及filterData
      this.sessionKey && sessionStorage.setItem(this.sessionKey, JSON.stringify(this.filterData));
      // 让列表渲染
      let list = res[this.listLiteral];
      this.total = res[this.totalLiteral];
      this.$emit('queried', list, res);
    },
    handleSizeChange(size) {
      this.filterData.PageSize = size;
      this.doFilter();
    },
    handleCurrentChange() {
      this.queryList();
    },
    // 搜索
    doFilter() {
      if (this.filterData.PageIndex !== 1) {
        this.filterData.PageIndex = 1;
        return false;
      }

      this.queryList();
    },
  },
  // destroyed() {
  //   this.sessionKey && sessionStorage.removeItem(this.sessionKey)
  // }
};
</script>

<style lang="scss" scoped>
.pageTotal {
  font-size: 14px;
  line-height: 32px;
  color: #3e3e3e;
}
.divider {
  border: none;
  border-bottom: 1px solid #e8e9ed;
}

.list-layout-header {
  display: flex;
  align-items: flex-start;
  .list-layout-header {
    flex: auto;
    min-width: 150px;
    text-align: right;
  }
}
</style>
