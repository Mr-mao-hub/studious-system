Zepto(function () {
    // 实现购物车图标中的总数
    var total = localStorage.getItem('total') || 0;
    if (total > 0) {
        $('.cart-fixed .cart-num').show().html(total);
    }
    // 添加开关变量定义当前元素是否正在飞
    var ifFly = false;
    // 定义变量充当购物车
    var cartDate = JSON.parse(localStorage.getItem('cart')) || [];
    $(".product-header").load("header.html", function () {
        $("header").html("<span><</span>商品详情");
        $('span').tap(function () {
            history.go(-1);
        })
    })
    // 从地址栏获取id
    var str = location.search.split("?")[1]; //id=1
    var id = str.split("=")[1]; //1
    // 请求数据加载页面
    $.ajax({
        url: "http://localhost/zerg/public/index.php/api/v1/product/" + id,
        type: "get",
        success: function (res) {
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
            $.each(res.imgs, function (index, item) {
                $(".product-contents li").eq(0).append(`<img src="${item.img_url.url}"/>`);
            });
            // 加载产品参数
            $.each(res.properties, function (index, item) {
                $(".product-contents li").eq(1).append(`<p><span>${item.name}</span><span>${item.detail}</span></p>`);
            });
            // 选项卡操作
            $('.product-btns li').tap(function () {
                $(this).addClass('active').siblings().removeClass('active');
                var index = $(this).index();
                $(".product-contents li").eq(index).addClass('show').siblings().removeClass('show');
            })



            // 加入购物车
            $(document).on('touchstart', '.btns', function (e) {
                // 实现飞入购物车的操作
                // changedTouches涉及当前事件的手指列表  一般使用 
                // touches当前屏幕上的手指列表
                // targetTouches位于当前元素上的手指列表
                if (ifFly) {
                    // 元素正在飞 不做任何操作
                    return;
                }
                //元素没有飞可以飞
                flyToCart(e);
                // 先查看购物车种是否含有这个商品
                var index = getIndex(id, cartDate);
                if (index == -1) { //购物车中没有新的商品需要新增
                    //把当前商品加入购物车（存入缓存）
                    var obj = {
                        id: res.id, //商品id
                        imgSrc: res.main_img_url, //图片数据
                        name: res.name, //名字数据
                        price: res.price, //价钱数据
                        counts: 1, //数量数据
                        status: true, //是否选中该商品
                    }
                    cartDate.push(obj);
                } else { //有这个商品，需要更改这个商品的数量
                    cartDate[index].counts++;
                }
                // 把购物车数据保存到本地
                localStorage.setItem('cart', JSON.stringify(cartDate));
                total++;
                localStorage.setItem('total', total);
            })
        }
    })
    // 封装找下标的方法
    function getIndex(id, arr) {
        // 假设下标为-1
        var _index = -1;
        for (var i = 0; i < arr.length; i++) {
            if (id == arr[i].id) {
                _index = i;
                break;
            }
        }
        return _index;
    }
    // 封装函数实现飞入购物车
    function flyToCart(e) {
        ifFly = true
        // 获取水平方向平移距离
        var x = 50;
        // 获取竖直方向的平移距离
        var y = -(e.changedTouches[0].clientY - 80);
        //让飞的元素出来,让元素进行平移
        $(".small-img").addClass("fly").css('transform', 'translate(' + x + 'px,' + y + 'px)');
        // 飞完后归位
        setTimeout(function () {
            $(".small-img").removeClass("fly").css('transform', 'none');
            $(".cart-fixed img").addClass('ani');
            setTimeout(function () {
                $(".cart-fixed img").removeClass('ani');
                //购物车数量更新
                $('.cart-fixed .cart-num').show().text(total);
            }, 400)
            ifFly = false;
        }, 1000)
    }

})