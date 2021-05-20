Zepto(function(){
    // 声明一个全局变量来在本地记录数据
    var localData={};

    // 加载头部
    $(".header").load("header.html",function(){
        $("header").html("分类")
    })
    $(".footer").load("footer.html",function(){
        $(".footer-item").eq(1).addClass("active").siblings().removeClass("active");
    })
    // 加载左侧数据
    $.get('http://localhost/zerg/public/index.php/api/v1/category/all',function(res){
        console.log(res)
        $.each(res,function(index,item){
            // 加载左侧数据
            $(` <li class="category-item" data-id=${item.id}>${item.name}</li>`).appendTo('.category-list');
        })
         // 初始化左侧数据
         $('.category-item').eq(0).addClass('active');
         // 加载右侧数据
         var rightDate=res[0];
        // 初始化右侧数据
        loadRightDate(rightDate); 
        // 给左侧的item添加点击事件
        $('.category-item').tap(function(){
            // 当前点击元素的下标
            var index = $(this).index();
            // 找该下标对应的数据
            var rightDate=res[index]
            $(this).addClass("active").siblings().removeClass("active");
            loadRightDate(rightDate);
        })
    })
//    封装函数实现加载右侧的数据
    function loadRightDate(data){
        // 先清空上一条数据
        $('.category-right').html('');
        // 加载上半部分（头图+标题分类）
        $(`  <img src="${data.img.url}" class="header-img">
        <h4 class="category-title">${data.name}</h4>
        <ul class="category-product">
        </ul>`).appendTo('.category-right');
        // 在加载数据之前先看看本地有没有记录
        if(localData['cate'+data.id]){
            //如果localData有这一属性说明之前做过记录
            loadHtml(localData['cate'+data.id])
        }else{
            // 如果localData没有该属性说明是第一次请求该分类数据，需要从服务器加载；
            // 加载商品列表数据
            $.get('http://localhost/zerg/public/index.php/api/v1/product/by_category?id='+data.id,function(res){
                // 把当前从服务器加载回来的数据记录在本地
                localData['cate'+data.id]=res;
                console.log(localData);
                loadHtml(res)
            })
         }
    }
   //封装函数实现渲染页面(分类商品列表)
   function loadHtml(arr) {
        $.each(arr,function(index,item){
            $(`<li class="product-item">
            <a href="#">
                <img src="${item.main_img_url}">
                <p>${item.name}</p>
            </a>
        </li>`).appendTo(".category-product");
        })
   } 

})