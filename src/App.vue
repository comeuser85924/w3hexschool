  <template>
    <div id="app" class="container f-16" >
      <!-- log圖片 -->
      <img src="./assets/logo.png">
      <!-- 我們的標題 -->
      <h1>w3HexSchool 鼠年全馬鐵人挑戰 - 查詢系統</h1>
      
      
      <div class="d-flex w-100 p-3">
        <select class="form-control w-50 mr-3" v-model="selectType" >
          <!-- <option value="blogArtice" disabled selected>--請選擇--</option> -->
          <option value="name">名字</option>
          <option value="blogArtice">部落格文章</option>
        </select>
        <input class="w-50 form-control" v-model="searchWords" >
      </div>
      <span >符合筆數:{{conformCount}}</span>
      
      <table class="table table-striped">
        <thead >
          <tr>
            <th v-for="(item,i) in columns"  :key=i>
              <a>{{item}}</a>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(item,i) in filterSearch"  :key=i>
            <td><a :href="item.blogUrl">{{item.name}}</a></td>
            <td ><a v-for="(items,k) in item.blogList"  :key=k :href="items.url">{{items.title}}<br></a></td>
            <td>{{item.updateTime}}</td>
          </tr>
        </tbody>
      </table>  
    </div>
  </template>

  <script>
  export default {
    name: 'App',
    data() {
      return {
        columns: [ "名字", "部落格文章","更新時間"],
        tableData: [],
        searchWords:null,
        selectType:'blogArtice',
        conformCount:0,
      };
    },
    computed: {
      filterSearch() {
        //判斷輸入框是否為空
        if(this.searchWords){
          this.conformCount = 0
           if(this.selectType === 'name'){
              //過濾
              return this.tableData.filter((item)=>{
                //名字
                 if(item.name && item.name.match(this.searchWords)) {
                   this.conformCount = this.conformCount +1
                   return true
                 }  
              })
           }else if(this.selectType === 'blogArtice'){
              //過濾
              return this.tableData.filter((item)=>{
                //文章標題
                //find回傳單一true
                return item.blogList.find((items)=>{
                  //如果標題有符合輸入值就回傳true
                  if(items.title.match(this.searchWords)){
                    this.conformCount = this.conformCount +1
                    
                    return true
                  }
                })
              })
           }
         }else{
           this.conformCount = 0
           return this.tableData
         }
        
        // return this.tableData.filter(searchResult => searchResult.match(this.searchWords));
        // return this.tableData.filter(searchResult => searchResult.title.match(this.searchWords));
      }
    },
    beforeMount(){
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
.f-16{
  font-size:16px;
  @media screen and (max-width: 786px){
    font-size:14px;
  }
}
</style>