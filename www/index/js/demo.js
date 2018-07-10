
// 粒子化函数

;(function (window, $) {
    // 构造函数
    function Granule(box) {
        this.box = box
        this.box.css({
            "position": "relative",
        })
    }
    // 原型渲染方法
    Granule.prototype.rendan = function (option) {
        this.box.css({
            width:option.width,
            height:option.height
        })
        option.size = option.size ? option.size : 5

        this.row = option.width / option.size
        this.col = option.height / option.size
        this.arr = []
        for (var i = 0; i < this.col; i++) {
            for (var j = 0; j < this.row; j++) {
                var y = i * option.size
                var x = j * option.size
                var li = [x, y, i, j]
                this.arr.push(li)
            }
        }

        var boxY= this.box.offset().top
        var boxX= this.box.offset().left
        this.box.on("mousemove",function(event){
            var Y = event.pageY
            var X = event.pageX;
            var MY = Y - boxY
            var MX = X - boxX
            var col_y =  Math.floor(MY/option.size)
            var row_x =  Math.floor(MX/option.size)
            $(".pic").removeClass("active").each(function(i,e){
                var x = $(e).data("row")-row_x
                var y = $(e).data("col")-col_y
                if(Math.pow(x,2)+Math.pow(y,2)<36){
                    $(e).addClass("active")
                    $(e).css("width",option.size*1.2)
                }
            })
            $(".rowcol"+row_x+col_y).addClass("active")
             
        })
        random(this, option)
    }
    // 私有方法
    function random(object, option) {
        var j = 0;
        var flog;
        for (var i = 0; i < object.arr.length; i++) {
            var hudu = (2 * Math.PI / 360) * (Math.random() * i),
                X = Math.sin(hudu) * 300,
                Y = Math.cos(hudu) * 300,
                $div = $('<div></div>');
            $div.addClass("pic rowcol"+object.arr[i][3]+object.arr[i][2] ).css({
                height: option.size,
                width: option.size,
                background: "url(" + option.src + ") "+(-object.arr[i][0]) + "px " + (-object.arr[i][1]) + "px / "+option.width + "px " +  option.height  + "px"+" no-repeat",
                left: object.arr[i][0] + "px",
                top: object.arr[i][1] + "px",                
            }).data({
                "col":object.arr[i][2],
                "row":object.arr[i][3],
            })

            // 如果方式为上下
            if (option.group.kind == "updown") {
                $div.addClass("animata-normal")
                if (i >= (object.arr.length / 2)) {
                    if (!flog) {
                        flog = i
                    }
                    $div.css({
                        transform: "translate(" + (X) + "px ," + (Y) + "px)",
                        animationDelay: flog * 0.05 - j * 0.05 + "s"
                    })
                    j++
                } 
                else  {
                    $div.css({
                        transform: "translate(" + (X) + "px ," + (Y) + "px)",
                        animationDelay: i * 0.05 + "s"
                    })
                }
            } 

             // 都不是默认为普通
             else if (option.group.kind == "normal") {
                $div.addClass("animata-normal").css({
                    transform: "translate(" + (X) + "px ," + (Y) + "px)",
                    animationDelay: i * 0.02 + "s"
                })
            }

            // 如果方式为波浪
           if(option.texiao.kind){
                if(option.texiao.kind == "oblique"){
                    $div.addClass("animata-wave").css({animationDelay: ($div.data("col")+$div.data("row"))/25 + "s"})
                }else if(option.texiao.kind == "wave"){
                    $div.addClass("animata-wave").css({animationDelay: $div.data("col")/25 + "s"})
                }
                $div.addClass("animata-wave").css({
                    opacity:1,
                    borderRadius:0
                })
            }
            $div.appendTo(object.box)
        }
    }

    // 构造函数暴露给window
    window.Granule = Granule
}(window, $));    
 