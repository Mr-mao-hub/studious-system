Zepto(function () {
    var lockDate = {};
    var str=[];
    $('.top-list a').eq(0).addClass('active');
    var arr = [];
    $.get('../src/img/data.json', function (res) {
        for (attr in res) {
            arr.push(res[attr]);
        }
        // console.log(res)
        loadHtml(arr[0]);
        $('.top-item').tap(function () {
            // 当前点击元素的下标
            var index = $(this).index();
            // 找该下标对应的数据
            $(this).addClass("active").siblings().removeClass("active");
            loadHtml(arr[index]);
        })
        $(".ler").tap(function(){
            var id=$(this).parents('.bottom-list').attr('data');
            for(var i=0;str.length>i;i++){
                if(str[i]==id){
                    return;
                }
            }
            str.push(id)
            localStorage.setItem('book',str);
            console.log(id)
        })
        
    })
    //封装渲染列表
    function loadHtml(arr) {
        $('.book-bottom').empty();
        $.each(arr, function (index, item) {
        console.log(item.bookId)
            $(` <div class="bottom-list" data="${item.bookId}">
        <img src="${item.imgSrc}" alt="" class="bottom-img">
        <div class="bottom-le">
            <h6>${item.book_title}</h6>
            <p>评分星星</p>
            <p class="text-le">${item.summary}</p>
            <div class="le">
                <div class="lef">
                    <i class="icon"></i>
                    <span>${item.author}</span>
                </div>
                <div class="ler">
                    <i></i>
                    <span>加入书架</span>
                </div>
            </div>
        </div>`).appendTo('.book-bottom');
        })
    }
  
})