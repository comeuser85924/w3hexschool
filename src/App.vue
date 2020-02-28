  <template>
    <div id="app" class="container">
      <!-- log圖片 -->
      <img src="./assets/logo.png">
      <!-- 我們的標題 -->
      <h1>w3HexSchool 鼠年全馬鐵人挑戰 - 查詢系統</h1>
      <v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options">
        <template   slot="名字" slot-scope="props">
          <a  class="text-left textover"  :href="props.row.blogUrl">{{ props.row.name }}</a>
        </template>
        <template   slot="部落格文章" slot-scope="props">
          <!-- <button @click="openModal(props.row.blogList)">詳細</button>    -->
          <a v-for="(item,i) in props.row.blogList" :key="i" :href="item.url">{{ item.title }}<br></a>
        </template>
        <template   slot="更新時間" slot-scope="props">
          {{ props.row.updateTime }}
        </template>
      </v-client-table>

    </div>
  </template>

  <script>
  export default {
    name: 'App',
    data() {
      return {
        columns: [ "名字", "部落格文章","更新時間"],
        tableData: [],
        options: {
          headings: {
                  blogUrl: "名字",
                  blogList: "部落格文章",
                  updateTime: "更新時間"
              }
  
        }
      };
    },
    created(){
      this.$http.get("https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json")
        .then(res => {
          this.tableData = res.data
      })
    },
  }
  </script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table {
  background-color: transparent !important;
  table-layout: fixed !important;
}
.col-md-12{
  display: flex;
  justify-content: space-between;
}
</style>