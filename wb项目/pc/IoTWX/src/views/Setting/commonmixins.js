export default {
  data () {
    return {
      // 主页
      list: [],
      showornot: {
        show: false
      },
      temp: {},
      isAdd: false,
      isReadonly: false,
      title: '',
      isHiddenSearch: false
    }
  },
  methods: {
    handleClose () {
      this.isHiddenSearch = false
      this.handleReset()
    },
    handleSearch () {
      if (!this.$utils.isNull(this.pageOption)) {
        this.pageOption.page = 1
      }
      this.getList()
    },
    handleCommand (command) {
      if (command === 'highsearch') {
        this.isHiddenSearch = true
      }
    },
    indexMethod (index) {
      return (this.pageOption.page - 1) * this.pageOption.limit + (index + 1)
    }
  }
}
