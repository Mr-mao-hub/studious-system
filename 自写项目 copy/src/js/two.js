Zepto(function(){
    var arr={};
    $.get('../src/img/data.json',function(data){
        for (attr in data) {
            arr.push(data[attr]);
        }
        console.log(arr)
        var book=localStorage.getItem('book')
        for(var i=0;i<arr.length;i++){
            // if(arr[i] ==)
        }
        console.log(arr)
    })
})