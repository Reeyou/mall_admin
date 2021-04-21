<template>
  <div>
    <MTable
      :loading="loading"
      :table-data="tableData"
      :table-label="tableLabel"
      :table-option="tableOption"
      @handleButton="handleButton"
      @handleSortChange="handleSortChange"
      @handleSelectionChange="handleSelectionChange"
    ></MTable>
  </div>
</template>

<script>
import MTable from "@/components/MTable"
export default {
  data () {
    return {
      loading: false,
      border: true,
      tableData: [
        {
          usr: 'yy',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          email1: 'find@allyum.com',
          email2: '2019 8',
          email3: 'find@allyum.com',
          email4: '2019 8',
          email5: 'find@allyum.com',
          email6: 'find@allyum.com',
          email7: 'find@allyum.com',
          status: '0'
        },
        {
          usr: 'yy',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          email1: 'find@allyum.com',
          email2: '2019 8',
          email3: 'find@allyum.com',
          email4: '2019 8',
          email5: 'find@allyum.com',
          email6: 'find@allyum.com',
          email7: 'find@allyum.com',
          status: '0'
        },
        {
          usr: 'yy',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          email1: 'find@allyum.com',
          email2: '2019 8',
          email3: 'find@allyum.com',
          email4: '2019 8',
          email5: 'find@allyum.com',
          email6: 'find@allyum.com',
          email7: 'find@allyum.com',
          status: '0'
        },
        {
          usr: 'yy',
          company: 'hahahha',
          email: 'find@allyum.com',
          registTime: '2019 8',
          email1: 'find@allyum.com',
          email2: '2019 8',
          email3: 'find@allyum.com',
          email4: '2019 8',
          email5: 'find@allyum.com',
          email6: 'find@allyum.com',
          email7: 'find@allyum.com',
          status: '0'
        },
      ],
      tableLabel: [
        { label: "user name", prop: "usr", sortable: true, fixed: 'left'},
        { label: "company name", prop: "company", link: true, linkFn: this.linkTo, fixed: 'left', },
        { label: "office mailbox", prop: "email", width: 200 },
        { label: "registration time", prop: "registetime", sortable: true },
        { label: "registration time", prop: "email1" },
        { label: "registration time", prop: "email2" },
        { label: "registration time", prop: "email3" },
        { label: "registration time", prop: "email4" },
        { label: "registration time", prop: "email5" },
        { label: "registration time", prop: "email6" },
        {
          label: "audit status", prop: "status", sortable: true,
          render: row => {
            if (row.status == 0) {
              return "未接收";
            } else if (row.status == 1) {
              return "已接收";
            } else if (row.status == 2) {
              return "failed the audit";
            } else {
              return "未接收2122";
            }
          }
        },
        {
          label: "操作",
          fixed: 'right',
          width: 140,
          handle: [
            {label: '查看', type:'primary',clickFun: this.handleEdit },
            {label: '删除', type:'danger', clickFun: this.handleDelete },
          ]
        }
      ]
    };
  },
  methods: {
    linkTo (scope) {
      console.log(scope);
    },
    //Collation
    handleSortChange () {
      Console.Log('collation ')
    },
    handleSelectionChange () { }

  },
  components: {
    MTable
  }
};
</script>

<style lang="scss" scoped>
</style>