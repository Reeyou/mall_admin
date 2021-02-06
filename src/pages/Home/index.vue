<template>
  <div class="m-home-container">
    <div class="m-home-left">
      <div class="left-statics">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </div>
      <div class="left-info bd6 mgtop20">
        <v-chart :options="option" ref="bar" theme="ovilia-green" autoresize />
      </div>
      <section class="left-task bd6 mgtop20">
      </section>
    </div>
    <div class="m-home-right">
      <div class="right-develop bd6"></div>
      <div class="right-activity bd6 mgtop20"></div>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
export default {
  data () {
    return {
      option: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      },
    }
  },
  components: {
    'v-chart': ECharts
  },
}
</script>
<style lang="scss">
.bd6 {
  border-radius: 6px;
}
.mgtop20 {
    margin-top: 20px;
}
.m-home-container {
  background: #fff;
  padding: 20px 18px;
  display: flex;
  .m-home-left {
    width: 76%;
    .left-info {
        width: 100%;
        height: 400px;
        background: #eee;
        .echarts {
        width: 100%;
        height: 100%;
        }
    }
    .left-task {
        background: #eee;
        height: 320px;
    }
  }
  .m-home-right {
    flex: 1;
    margin-left: 20px;
    .right-develop {
      height: 300px;
      background: #eee;
    }
    .right-activity {
      height: 600px;
      background: #f5f5f5;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 160px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>