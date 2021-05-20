Zepto(function(){0
    //加载头部
    $(".header").load("./header.html",function(){
        $("header").html("购物车")
    })

     // 加载底部
    $(".floor").load("./footer.html",function(){
        $(".footer-item").eq(2).addClass("active").siblings().removeClass("active");
    })
    //定义变量来保存全选状态
    var allStatus=false;
    // 拿到缓存数据进行页面渲染
    var cartDate=JSON.parse(localStorage.getItem('cart'));
   $(cartDate).each(function(index,item){
        $(`   <li class="cart-item" data-id="${item.id}">
        <img src='../src/images/icon/circle@noselected.png' alt="" class="select-img">
        <div class="product-img"><img src="${item.imgSrc}" alt="" class="imgSrc"></div>
        <div class="product-info">
            <div class="info-top">
                <p class="name">${item.name}</p>
                <p class="price">￥${item.price}</p>

            </div>
            <div class="info-bottom">
                <div class="ctrl-num">
                    <a href="javascript:;" class="cut">-</a>
                    <input type="text" value="${item.counts}">
                    <a href="javascript:;" class="add">+</a>
                </div>
                <p class="del">X</p>
            </div>
        </div>
        </li>`).appendTo('.cart-list');
    })
  
    // 加按钮操作
    $(document).on('tap','.add',function(){
        changeCount(this, 1)
    })
    $(document).on('tap','.cut',function(){
        changeCount(this, -1)
    })
    $(document).on('tap','.del',function(){
        var oP=$(this).parents(".cart-item")
        cartDate.splice(index,1);
    })
        // 删除购物车中，该下标对应的商品
       
   
        // 找父级身上的id
        // 找当前在缓存数组中的当前商品;
       // 更新缓存
        
    // 全选
  
        // 全选状态取反
        //更改全选状态的图片路径
        //更改所有单选按钮的图片路径
        // 更改购物车中所有商品的状态
        
    //封装函数实现数量的改变  el代表当前点击元素
    function changeCount(el, num){
        var oP=$(el).parents(".cart-item");
        var id=$(oP).data("id");
        var product=cartDate.find(function(item){
            return item.id==id
        })
        product.counts+=num;
        if(product.counts<1){
            product.counts=1;
        }
        $(oP).find('input').val(product.counts);
        localStorage.setItem('cart',JSON.stringify(cartDate));
    }
    \
        // 找父级li
        // 找父级身上的id
        // 找当前在缓存数组中的当前商品;
        // 更改当前商品的数量
     
        //更新页面更新缓存
        // 更新缓存
})