export default {
  data() {
    return {
      searchParams: {}, //搜索列表
      list: [],
      showornot: {
        show: false
      },
      searchTimes: [],
      temp: {},
      isAdd: false,
      title: '',
      isHiddenSearch: false
    }
  },
  methods: {
    handleClose() {
      this.isHiddenSearch = false
      this.handleReset()
    },
    handleSearch() {
      if (!this.$utils.isNull(this.pageOption)) {
        this.pageOption.page = 1
      }
      this.getSearchList()
    },
    handleCommand(command) {
      this.searchParams = {}
      if (command === 'highsearch') {
        this.isHiddenSearch = true
      }
    }
  }
}