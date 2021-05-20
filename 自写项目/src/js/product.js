Zepto(function(){
    // 添加开关变量定义当前元素是否正在飞
    var ifFly=false;
    // 定义变量充当购物车
    var cartDate=JSON.parse(localStorage.getItem('cart')) ||[];
    $(".product-header").load("header.html",function(){
        $("header").html("商品详情");
    })
    // 从地址栏获取id
    var str=location.search.split("?")[1];//id=1
    var id=str.split("=")[1];//1
    // 请求数据加载页面
    $.ajax({
        url:"http://localhost/zerg/public/index.php/api/v1/product/"+id,
        type:"get",
        success: function(res){
            console.log(res)
            $(`  <div class="head-img">
            <img src="${res.main_img_url}" alt="">
        </div>
        <div class="counts-btn">
            <div class="counts">
                <span>数量</span>
                <span class="num">1</span>
                <i></i>
            </div>
            <div class="line"></div>
            <div class="btns">
                <span>加入购物车</span>
                <i></i>
                <img src="${res.main_img_url}" class="small-img">
            </div>
        </div>
        <div class="stock">${res.stock>0?'有货':'无货'}</div>
        <p class="name">${res.name}</p>
             <p class="price">￥${res.price}</p>`).appendTo(".product-top");
            //加载商品详情数据
            $.each(res.imgs,function(index,item){
                $(".product-contents li").eq(0).append(`<img src="${item.img_url.url}"/>`);
            });
            // 加载产品参数
            $.each(res.properties,function(index,item){
                $(".product-contents li").eq(1).append(`<p><span>${item.name}</span><span>${item.detail}</span></p>`);
            });
            // 选项卡操作
            $('.product-btns li').tap(function(){
                $(this).addClass('active').siblings().removeClass('active');
                var index=$(this).index();
                $(".product-contents li").eq(index).addClass('show').siblings().removeClass('show');
            })
            $(document).on('touchstart','.btns',function(e){
                if(ifFly){
                    // 元素正在飞不做任何操作
                    return;
                }
                flyTouch(e)
                console.log(1)
               var index = getIndex(id,cartDate);
               if(index == -1){
                var  obj={
                    id:res.id,//商品id
                    imgSrc:res.main_img_url,//图片数据
                     name:res.name,//名字数据
                     price:res.price,//价钱数据
                     counts:1,//数量数据
                     status:true,//是否选中该商品
                };
                cartDate.push(obj)
               }else{
                   cartDate[index].counts++
               }
               localStorage.setItem('carts',JSON.stringify(cartDate))

            })
        }
    })
   function getIndex(id,arr){
        var _index= -1;
        for(var i=0;i<arr.length;i++){
            if(id==arr[i].id){
                _index = i;
                break;
            }
        }
        return _index;
   }
    function flyTouch(e){
        ifFly=true;
        var x=50;
        var y=-(e.targetTouches[0].clientY-80);//求出需要移动的位置
         //让飞的元素出来,让元素进行平移
         console.log(x,y)
         $(".small-img").addClass('fly').css('transform','translate('+x+'px,'+y+'px)');
         //让飞出来的元素到位置后归位
         setTimeout(function(){
             $(".small-img").removeClass('fly').css('transform','none');
             $(".cart-fixed").addClass("ani");
             setTimeout(function(){
             $(".cart-fixed").removeClass("ani");
             },400)
             ifFly=false;
         },1000)
    
    }
})