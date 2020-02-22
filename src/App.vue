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
      <!-- <table id="table" class="table text-nowrap">
        <thead>
            <tr>
                <th>名字</th>
                <th>部落格網址</th>
                <th>文章</th>
                <th>最後更新時間</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in allList" :key=index >
                <td>{{item.name}}</td>
                <td class="text-left textover"><a :href="item.name">{{item.blogUrl}}</a> </td>
                <td>
                  <button @click="openModal(item.blogList)">詳細</button>   
                </td>
                <td>{{item.updateTime}}</td>
            </tr>
            
        </tbody>
      </table> -->
      <vue-modaltor :visible="open" @hide="hideModal">
              <template slot="close-icon" >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="20" height="20" xml:space="preserve" >
                  <path class="st0" fill="#41b883" d="M8.7,7.6c-0.4-0.4-1-0.4-1.4,0C6.9,8,6.9,8.6,7.3,9l11,11l-11,11c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0 l11-11l11,11c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4l-11-11L32,9c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-11,11L8.7,7.6z"/>
                </svg>
              </template>
              <a v-for="(items,i) in articeList" :key="i" :href="items.url" target="_blank" >
                {{items.title}}<br>
              </a>
            </vue-modaltor>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// const FOO_DATA = [
//     {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
//     {id: 2, name:'Luke ',gender:'male', img:'https://goo.gl/KEUxHN'},
//     {id: 3, name:'Luke walker',gender:'male', img:'https://goo.gl/KEUxHN'},
//     {id: 4, name:'Lu Skywal',gender:'male', img:'https://goo.gl/KEUxHN'},
//     {id: 5, name:'ke Sker',gender:'male', img:'https://goo.gl/KEUxHN'},
//     {id: 6, name:'L Sk',gender:'male', img:'https://goo.gl/KEUxHN'},
// ]
export default {
  name: 'App',
  data() {
    return {
      name:null,
      blogUrl:null,
      updateTime:null,
      blogList:[],
      open: false,
      articeList:[],
      /*定義變數裝查詢輸入的字串*/
      search:'',
      select:'名字',
      allLists:[],

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
    // this.tableData = FOO_DATA;
    axios.get("https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json")
      .then(res => {
        this.tableData = res.data
    })

  },
  computed: {
  },
  mounted() {
    
  },
  methods:{
    openModal(list) {
      this.open=true
      this.articeList = list
    },
    hideModal() {
      this.open = false;
    },
    // options: {
    //   requestFunction: function (params) {
    //       return axios.get("https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json", {
    //           params: params
    //       });
    //   }
    // }
  },
}
</script>

<style lang="scss">

@import "~bootstrap/scss/bootstrap";
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
