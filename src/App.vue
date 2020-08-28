  <template>
    <div id="app" class="w-full">
      <!-- log圖片 -->
      <img class="m-auto object-cover w-full object-top h-mb lg:h-pc opacity-50 blur" src="https://i.imgur.com/0lbPEOk.png">
      <div class="absolute inset-x-0" style="top:7vw">
        <!-- 我們的標題 -->
        <h1 class="font-bold text-2xl lg:text-4xl pt-2">w3HexSchool 鼠年全馬鐵人挑戰 <br><span>查詢系統</span></h1>
        <div class="flex w-full lg:w-1/2 my-4 mx-auto p-2">
          <select class="w-1/2 mr-3 bg-gray-200 p-2" v-model="selectType" >
              <!-- <option value="blogArtice" disabled selected>--請選擇--</option> -->
            <option  value="name">名字</option>
            <option value="blogArtice">部落格文章</option>
          </select>
          <input class="w-1/2 bg-gray-200 p-2" v-model="searchWords" >
        </div>
        <span class="text-2xl">符合筆數:{{conformCount}}</span>
        
      </div>
      <div class="max-w-screen-xl mx-auto  flex" style="border-bottom: 1px solid #ededed;">
        <span class="m-2 font-bold text-2xl">選擇排序</span>
        <button v-for="(item,i) in filterList" :key="i" class="m-2" :class="{'active':sortCurrent == item.id}" @click="handleFilter(item.id)">{{item.name}}</button>
      </div>
      <div class="max-w-screen-xl mx-auto mt-4" > 
        <p v-if="loading">載入中...請稍等</p>
        <div class=" flex w-full flex-wrap justify-center m-auto ">
          <div class="p-2 w-full lg:w-1/3"  v-for="(item,i) in filterSearch"  :key=i>
            <div class="h-auto shadow-lg  ">
              <div class="flex justify-between py-3 bg-green-700">
                <a class="w-full  lg:text-lg m-auto text-white " :href="item.blogUrl">{{item.name}}</a>
                <span  class="w-full  m-auto text-white">更新時間:{{item.updateTime.split(" ")[0]}}</span><br>
              </div>
              <hr>
              <div class="w-full py-2 bg-gray-200 ">
                <a class="m-auto leading-relaxed" v-for="(items,k) in item.blogList" :key=k v-if="k<3" :href="items.url">
                  
                  <p class="px-4 text-sm lg:text-base" >
                    {{items.title}} 
                  </p>
                  
                </a>
              <hr v-if="item.blogList.length>3" class="mt-3 border-gray-400">
              <button v-if="item.blogList.length>3" class="w-full pt-2" @click="open=true && handlerAlert(i)" >看更多文章({{item.blogList.length-3}})</button>
              </div>
              
              
              
            </div>
            
          </div>
        </div>
        <!-- <table class="table table-striped">
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
        </table>  -->
      </div> 
      <vue-modaltor :resize-width='{1200:"60%",992:"80%",768:"90%"}' :visible="open" @hide="hideModal" :animation-panel="'modal-slide-bottom'" :close-scroll="false">
        <template slot="close-icon">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="20"
            height="20"
            xml:space="preserve"
          >
            <path
              class="st0"
              fill="#41b883"
              d="M8.7,7.6c-0.4-0.4-1-0.4-1.4,0C6.9,8,6.9,8.6,7.3,9l11,11l-11,11c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0 l11-11l11,11c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4l-11-11L32,9c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-11,11L8.7,7.6z"
            />
          </svg>
        </template>
        <a v-for="(item,i) in alertList" :key=i :href="item.url">
          <p class="leading-7" >{{item.title}}</p>
        </a>

      </vue-modaltor>
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
        loading:true,

        open: false,
        alertList:[],
        //篩選功能
        filterList:[
          {id:"newSort",name:'最新文章'},
          {id:"manySort",name:'文章多到寡'}
        ],
        sortCurrent:'newSort',
        //分頁功能
        currentPage:0,
        totalPage:0,
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
        }
        else if(this.sortCurrent =='manySort'){
          this.conformCount = 0
          return  this.handleFilter('manySort')
        }
        else{
          this.conformCount = 0
          return  this.handleFilter('newSort')
        }
       
        // return this.tableData.filter(searchResult => searchResult.match(this.searchWords));
        // return this.tableData.filter(searchResult => searchResult.title.match(this.searchWords));
      }
    },
    async beforeMount(){
      await this.$http.get("https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json")
        .then(res => {
          this.loading = false
          this.tableData = res.data 
        })
      
    },
    methods: {
      hideModal() {
        this.open = false;
      },
      handlerAlert(i){
        this.alertList = this.filterSearch[i].blogList
        return true
      },
      handleFilter(item){
        
        if( item == 'newSort'){
          this.sortCurrent = item
          var reg =/[\u4e00-\u9fa5]/g;
          return this.tableData.sort(function (a, b) {
            return  new Date(b.updateTime.replace(reg,'')) - new Date(a.updateTime.replace(reg,'')) 
          }); 
        }else if(item == 'manySort'){
          this.sortCurrent = item
          return this.tableData.sort(function (a, b) {
            return b.blogList.length - a.blogList.length 
          }); 
        }
      }
    },
  }
  </script>

<style lang="scss">
#app {
  font-family: "微軟正黑體", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a:hover{ 
  color:#F7B52D;
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
.blur{
  -webkit-filter:blur(6px);
  }
.active{
  color:#FF5E45;
}
</style>