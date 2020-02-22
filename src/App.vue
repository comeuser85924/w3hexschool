<template>
  <div id="app" class="container">
    <img src="./assets/logo.png">
    <div class="table-responsive">
      <h1>w3HexSchool 鼠年全馬鐵人挑戰 - 查詢系統</h1>
      <v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options">
        <template   slot="name" slot-scope="props">
          <a class="text-left textover"  :href="props.row.blogUrl">{{ props.row.name }}</a>
        </template>
        <template   slot="blogList" slot-scope="props">
          <!-- <button @click="openModal(props.row.blogList)">詳細</button>    -->
          <a v-for="(item,i) in props.row.blogList" :key="i" :href="item.url">{{ item.title }}<br></a>
        </template>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      columns: [ "name", "blogList","updateTime"],
      tableData: [],
      options: {
        headings: {
                blogUrl: "blogUrl",
                blogList: "blogList",
                updateTime: "updateTime"
            }
 
      }
    };
  },
  created(){
    axios.get("https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json")
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
.textover{
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.col-md-12{
  display: flex;
  justify-content: space-between;
}
</style>
