Zepto(function(){
    $(".header").load("header.html")
       
    $.get('http://localhost/zerg/public/index.php/api/v1/theme/'+GetStr(),function(res){
        console.log(res)
        var data=res.products;
        $('.theme-img').prepend(`<img src="${res.head_img.url}">`);
        $(".header header").html(res.name)
        $.each(data,function(index,item){
            $(` <li class="theme-item">
            <a href="##">
                <img src="${item.main_img_url}">
                <p class="theme-title">${item.name}</p>
                <p class="theme-price">${item.price}</p>
            </a>
            </li>
        `).appendTo(".theme-list")
        console.log(item)
        })
    })
    
    function GetStr() {
        var url = location.search; //获取url中"?"符后的字串  
        if(url.indexOf("?") != -1) {//判断？后面是否有字符
            var str = url.substr(4,1);//从第一个字符开始截取
            console.log(str);
        }
        return str;
    }
})
