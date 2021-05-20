Zepto(function(){
    $(".header").load("header.html");
    //向后台加载轮播图数据
    $.get('http://localhost/zerg/public/index.php/api/v1/banner/1',function(res){
        console.log(res);
        $.each(res.items,function(index,item){
            $(`<div class="swiper-slide"><img src="${item.img.url}
            "></div>`).appendTo('.swiper-wrapper');
        })
         //初始化轮播图
    var mySwiper = new Swiper ('.swiper-container', {
        autoplay: {delay:2000}, //自动轮播
        pagination: {el:".swiper-pagination"}
      })
    })
    // 加载精选主题数据
    $.get('http://localhost/zerg/public/index.php/api/v1/theme?ids=1,2,3',function(res){
        console.log(res)
        $.each(res,function(index,item){
            $(`<li class="theme-item">
            <a href="./theme.html?id=${item.id}"><img src="${item.head_img.url}"></a>
             </li>`).appendTo(".theme-list")
        })
    })
    // 加载最近新品数据
    $.get('http://localhost/zerg/public/index.php/api/v1/product/recent',function(res){
        console.log(res);
        $.each(res,function(index,item){
            $(` <li class="product-item">
                <a href="./product.html?id=${item.id}">
                    <img src="${item.main_img_url}">
                    <p class="product-title">${item.name}</p>
                    <p class="prouder-price">${item.price}</p>
                </a>
            </li>
        `).appendTo(".product-list")
        })
    })
    // 加载底部
    $(".footer").load("footer.html");
});