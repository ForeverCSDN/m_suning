$(function () {
    slider();

    $(".sn_advert img").addClass("swing animated").click(function () {
        $(this).parent().hide();
    });
});

/*轮播图*/
function slider() {
    var $slider = $(".sn_slider");
    //获取容器宽
    var $slider_width = $slider.width();
    //图片盒子
    var $imgBox = $slider.find("ul:first");
    //点盒子
    var $pointBox = $slider.find("ul:eq(1)");
    var $points = $pointBox.find("li");

    var sliderFunc = function (callback) {
        $imgBox.animate({"transform":"translateX("+(-index*$slider_width)+"px)"},300,"linear",function () {
            //无缝滑动
            if(index >= 9){
                index = 1;
            }else if(index <= 0){
                index = 8;
            }
            $imgBox.css({"transform":"translateX("+(-index*$slider_width)+"px)"});
            //点同步
            $points.removeClass("active").eq(index-1).addClass("active");

            callback&&callback();
        });
    };
    var index = 1;
    //定时轮播
    var timer = setInterval(function () {
        index++;
        sliderFunc();
    },2000);
    //模拟手势
    //下一张
    $slider.on("swipeLeft", function () {
        clearInterval(timer);
        index++;
        sliderFunc(function () {
            timer = setInterval(function () {
                index++;
                sliderFunc();
            },2000);
        });
    });
    //上一张
    $slider.on("swipeRight", function () {
        clearInterval(timer);
        index--;
        sliderFunc(function () {
            timer = setInterval(function () {
                index++;
                sliderFunc();
            },2000);
        });
    });
}