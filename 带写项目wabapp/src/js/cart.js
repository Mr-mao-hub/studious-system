Zepto(function(){0
    //加载头部
    $(".header").load("./header.html",function(){
        $("header").html("购物车")
    })
     // 加载底部
    $(".floor").load("./footer.html",function(){
        $(".footer-item").eq(2).addClass("active").siblings().removeClass("active");
    })
    var total=localStorage.getItem('total')-0;
    // 拿到缓存数据进行页面渲染
    var cartDate=JSON.parse(localStorage.getItem('cart'));
    if(!cartDate){
        $('.cart-container').html('您的购物车是空的');
        return;
    }
    $(cartDate).each(function(index, item){
        $(`   <li class="cart-item" data-id="${item.id}">
        <img src="${item.status?'../src/images/icon/circle@selected.png':'../src/images/icon/circle@noselected.png'}" alt="" class="select-img">
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
    // 初始化全选状态
     //定义变量来保存全选状态
     var allStatus=getAllStatus();
    $('.all-select img').attr('src',`${allStatus?"../src/images/icon/all@selected.png":"../src/images/icon/all.png"}`)
    getTotal()
    // 加按钮操作
    $(document).on("tap",'.add',function(e) {
        changeCount(this,1);
     
    })
    $(document).on("tap",'.cut',function(e) {
        changeCount(this,-1);
      
    })
    // 删除按钮的操作
    $(document).on('tap','.del',function(){
        var oP=$(this).parents('.cart-item');
        var id=$(oP).data('id');
        var index=cartDate.findIndex(function(item){
            return item.id == id;
        })
        //在总数中减去当前删除商品的数量
        total -= cartDate[index].counts;
        localStorage.setItem('total',total);
        // 删除购物车中，该下标对应的商品
        cartDate.splice(index,1);
        $(oP).remove();//更新页面
        localStorage.setItem('cart',JSON.stringify(cartDate));
        getTotal();
        // 当数据删完购物车显示你的数据为空
        if(total<1){
            $(".cart-container").html('您的购物车是空的');
            localStorage.removeItem('cart');
        }
    })
    // 单选按钮
    $(document).on('tap','.select-img',function(){
        var oP=$(this).parents('.cart-item');
        // 找父级身上的id
        var id=$(oP).data('id');
        // 找当前在缓存数组中的当前商品;
        var product= cartDate.find(function(item){
            return item.id== id;
        })
        product.status=!product.status;
        // var src=''
        // if(product.status){
        //     src='../src/images/icon/circle@selected.png';
        // }else{
        //     src='../src/images/icon/circle@noselected.png';
        // }
        $(this).attr('src',`${product.status?'../src/images/icon/circle@selected.png':'../src/images/icon/circle@noselected.png'}`);
        // 更新缓存
        localStorage.setItem('cart',JSON.stringify(cartDate));
        allStatus=getAllStatus();
        $('.all-select img').attr('src',`${allStatus?"../src/images/icon/all@selected.png":"../src/images/icon/all.png"}`)
        getTotal()
    })
    // 全选
    $('.all-select').tap(function() {
        // 全选状态取反
        allStatus=!allStatus;
        //更改全选状态的图片路径
        $(this).find('img').attr('src',`${allStatus?'../src/images/icon/all@selected.png':'../src/images/icon/all.png'}`);
        //更改所有单选按钮的图片路径
        $('.select-img').attr('src',`${allStatus?'../src/images/icon/circle@selected.png':'../src/images/icon/circle@noselected.png'}`);
        // 更改购物车中所有商品的状态
        cartDate.forEach(function(item){
            item.status=allStatus;
        })
        localStorage.setItem('cart',JSON.stringify(cartDate));
        getTotal()
    })
    // 获取总数和总价
    function getTotal(){
        //首先拿到所有选中的商品
        var newArr=cartDate.filter(function (item){
                return item.status;
        });
        var totalNum=0;//累计总数
        var totalPrice=0;//累计总价
        newArr.forEach(function(item){
            totalNum += item.counts;
            totalPrice += (item.price*100)*item.counts;
        })
        $(".all-select span").text('全选('+totalNum+')');
        $(".total-price").html('￥'+totalPrice/100);
    }

    // 封装函数来判断是否全选按钮要选中
    function getAllStatus() {
        return cartDate.every(function (item,index) {
                return item.status;
        })
        // 假设没全选 （过滤验证法）
        // var newArr=cartDate.filter(function (item){
        //     return item.status;
        // })
        // return cartDate.length == newArr.length
    //     // 假设没全选 （假设验证法）
    //     var flag=true;
    //     cartDate.forEach(function(item){
    //         if(item.status == false){
    //             // 说明这个条件成立  有没被选中的商品
    //             flag=false;
    //             return;
    //         }
    //     })
    //     return flag;
    }
    //封装函数实现数量的改变  el代表当前点击元素
    function changeCount(el,num){
        // 找父级li
        var oP=$(el).parents('.cart-item');
        // 找父级身上的id
        var id=$(oP).data('id');
        // 找当前在缓存数组中的当前商品;
        var product= cartDate.find(function(item){
            return item.id== id;
        })
        // 更改当前商品的数量
     
        product.counts+=num;
        if(product.counts<1){
            product.counts=1;
        }else{
             // 更改缓存中的总数
             total+=num;
        }
        localStorage.setItem('total',total);
        //更新页面更新缓存
        $(oP).find('input').val(product.counts);
        // 更新缓存
        localStorage.setItem('cart',JSON.stringify(cartDate));
        getTotal()
    }
})