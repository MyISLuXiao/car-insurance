// ............................................
//                  _ooOoo_
//                 o8888888o
// 	  	  	       88" . "88
//                 (| -_- |)
//                  O\ = /O
//              ____/`---*\____
//               . * \\| |// `.
//             / \\||| : |||// \
//           / _||||| -:- |||||- \
//             | | \\\ - /// | |
//            | \_| **\---/** | |
//           \  .-\__ `-` ___/-. /
//            ___`. .* /--.--\ `. . __
//        ."" *< `.___\_<|>_/___.* >*"".
//      | | : `- \`.;`\ _ /`;.`/ - ` : | |
//         \ \ `-. \_ __\ /__ _/ .-` / /
//======`-.____`-.___\_____/___.-`____.-*======
//                   `=---=*
//
// .............................................
//              佛祖保佑 永无BUG
// =============================================
var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    smartSelectInPopup: true,
    smartSelectBackOnSelect: true,
    animateNavBackIcon: true,
    uniqueHistory: true,
    domCache: true,
    // reloadPages:true
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Framework7.$;


// var numpad = myApp.keypad({
//     input: '#pwd-input'
// });
//
// var calculator = myApp.keypad({
//     input: '#pwd-input',
//     type: 'calculator',
//     toolbar: false
// });
// var numpadLimited = myApp.keypad({
//     input: '#pwd-input',
//     valueMaxLength: 6,
//     dotButton: false,
//     toolbar: false,
//     formatValue: function (p, value) {
//         var input = $$(".fake-box input");
//         var len = value.length;
//         console.log(p);
//         for (var i = 0; i < len; i++) {
//             input.eq("" + i + "").val(value[i]);
//         }
//         if (len == 6) {
//             p.value = "";
//         }
//         input.each(function () {
//             var index = $$(this).index();
//             if (index >= len) {
//                 $$(this).val("");
//             }
//         });
//     }
// });

var login = {};

//初始化
var mainView = myApp.addView('.view-main', {
    uniqueHistory: true
});

//首页轮播图
var mySwiper = myApp.swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    speed: 400,
    autoplay: 3000
});

// Option 1. Using one 'pageInit' event handler for all pages (recommended way):
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    $$('.index-button').on('click', function () {

    });

    $$(".label-my").on("click", function () {
        $$('.index-button').removeClass('active');
        $$(this).addClass('active');
        if (login.user) {
            mainView.router.loadPage('my-home.html')
        } else {
            mainView.router.loadPage('login.html')
        }
    });

    var url=mainView.url;
    if( url==="home.html") {
        console.log(mainView.main);
        $$('.index-button').removeClass('active');
        $$(".label-home").addClass('active')

    }else if(url==="details-list.html"){
    console.log(mainView.main);
       $$('.index-button').removeClass('active');
        $$(".label-details").addClass('active');

    }else if(url==="my-home.html"){
         console.log(mainView.main);
        $$('.index-button').removeClass('active');
        $$(".label-my").addClass('active')
    }
// =======================================================================================================================
    //首页
    if (page.name === 'home') {

        var mySwiper = myApp.swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            speed: 400,
            autoplay: 3000
        });
        $$.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost/JavaScript/home.php",
            success: function (data) {
                // console.log(data);
            }
        });

        $$.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost/JavaScript/details.php",
            success: function (data) {
                // console.log(data);
            }
        });

    }

    if (page.name === 'login') {
        // Following code will be executed for page with data-page attribute equal to "about"
        $$(".login-note").on('click', function () {
            var phone = $$('input[name="iphone"]').val();
            re = /^1[34578]\d{9}$/;
            if (phone.search(re)) {
                myApp.alert('', '请填写正确的手机号码');
                return false;
            }
            $$(".login-verification").removeClass('commodity-none')
        });

        $$(".verification-close").on("click", function () {
            $$(".login-verification").addClass('commodity-none')
        });

        $$(".login-submit").on("click", function () {
            login.user = "ceshi";
            mainView.router.loadPage('my-home.html');
        });


        return false;
    }
    // ==========================商品详情====================================
    if (page.name === 'commodity-details') {
        var mySwiper = myApp.swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            speed: 400,
            autoplay: 3000
        });

        $$(".option-item").on('click', function () {
            if ($$(this).hasClass('active')) {
                $$(this).removeClass('active');
            } else {
                $$('.option-item').removeClass('active');
                $$(this).addClass('active');
            }
        });

        $$(".bottom-number-add").on("click", function () {
            var count = $$('.bottom-count').text();
            count++;
            $$(".bottom-count").html(count);
        });

        $$(".bottom-number-minus").on("click", function () {
            var count = $$('.bottom-count').text();
            count--;
            if (count <= 0) {
                count = 0;
            }
            $$(".bottom-count").html(count);
        });

        $$('.commodity-parameter-body').on("click", function () {
            $$(".commodity-none-details").removeClass('commodity-none');
        });

        $$('.bottom-close').on("click", function () {
            var fashion = $$(".bottom-body-option").children('.active').html();
            var count = $$(".bottom-count").html();
            myApp.alert(fashion);
            if ((fashion != null) && (count !== 0)) {
                $$(".fashion-list").removeClass('commodity-none');
                $$(".fashion-list .option-item").html(fashion);
                $$(".fashion-list .option-count").html(count);
            } else {
                $$(".fashion-list").addClass('commodity-none');
            }
            $$(".commodity-none-details").addClass('commodity-none');
        });
        //
        var ptrContent = $$('.commodity-detail-body');
        var startX = 0, startY = 0;
        ptrContent.on("touchstart", function (event) {
            var touch = event.targetTouches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        });

        var moveX = 0, moveY = 0;
        ptrContent.on("touchmove", function () {
            var touch = event.targetTouches[0];
            moveX = touch.pageX;
            moveY = touch.pageY;
            var count = startY - moveY;
            var height = $$(".commodity-body").height();
            console.log(count);
            console.log(height);
        });

        ptrContent.on("touchend", function () {
            if (startY > moveY + 50 && moveY != 0 && startX != moveX) {
                mainView.router.loadPage('commodity-option.html');
            }
        })

    }
// ============================================我的主页==========================================================

    if (page.name === "my-home") {
        $$(".home-bank").on('click', function () {
            mainView.router.loadPage('bank-card-list.html')
        });

        $$(".home-discount").on("click", function () {
            login.path =null;
            mainView.router.loadPage('discount-coupon.html')
        });

        $$(".home-bill").on("click", function () {
            mainView.router.loadPage('bill-my.html')
        });

        $$(".home-order").on("click", function () {
            mainView.router.loadPage('order-all.html');
        });

        $$(".home-help").on("click", function () {
            mainView.router.loadPage('help.html');
        });

        return false;
    }

    // ======================我的账单================================

    if (page.name === "bill-my") {
        $$(".bill-body-item").on("click", function () {
            mainView.router.loadPage('bill-details.html');
        })
    }

    if (page.name === "bill-details") {
        $$(".explain-img").on("click", function () {
            myApp.alert("", "服务费=手续费¥0.00元(首期还款扣除)+总利息¥0.00元(每期还款分摊扣除)+逾期罚金¥0.00元...", "关闭")
        })
    }

    if (page.name === "bank-card-list") {
        $$(".card-button-add").on('click', function () {
            mainView.router.loadPage('bank-card-add.html')
        });
        return false;
    }

    // ===========================我的订单=====================================

    if (page.name === "order-all") {
        $$(".details").on("click", function () {
            mainView.router.loadPage('order-preview.html')
        });

        $$(".confirm-money").on("click", function () {
            mainView.router.loadPage("order-message.html")
        });
        $$(".audit-details").on("click", function () {
            mainView.router.loadPage('order-my.html')
        });
        return false;
    }


    if (page.name === "order-preview") {
        $$('.stages-ratio li').on("click", function () {
            $$(".stages-ratio li").removeClass('active');
            $$(this).addClass('active');
        });

        $$('.stages-count li').on("click", function () {
            $$(".stages-count li").removeClass('active');
            $$(this).addClass('active');
        });

        $$("#stages").on("click", function () {
            if ($$(this).hasClass("checked")) {
                $$(this).removeClass("checked");
                $$(this).addClass("no-checked");
                $$(".order-stages-details").addClass("display")
            } else {
                $$(this).removeClass("no-checked");
                $$(this).addClass("checked");
                $$(".order-stages-details").removeClass("display")
            }
        });

        $$(".all-bottom-favorable").on("click", function () {
            login.path = "favorable";
            mainView.router.loadPage('discount-coupon.html');
        });

        $$(".stages-submit").on("click", function () {
            mainView.router.loadPage('order-preview.html')
        });

        $$(".confirm-money").on("click", function () {
            mainView.router.loadPage('order-message.html');
        });
    }

    if (page.name === "order-my") {
        $$(".logistics").on("click", function () {
            $$(".logistics-details").toggleClass("active")
        });

        $$(".bill").on("click", function () {
            mainView.router.loadPage('bill-details.html');
        });
        return false;
    }

    // ===================================优惠券==================================================
    if (page.name === "discount-coupon") {
        if (login.path) {
            $$(".discount-coupon-body .employ").on("click", function () {
                var b = $$(this).parents(".discount-coupon-img").find(".money").html();
                mainView.router.back({url: 'order-preview.html'});
                $$(".all-bottom-favorable").find(":last-child").remove();
                $$(".all-bottom-favorable").append('<span class="money"><i>¥</i>' + b + '</span>')
            })
        }
        return false;
    }

// =======================================我要询价=====================================================
    if (page.name === 'car-insurance') {
        // Following code will be executed for page with data-page attribute equal to "about"
        return false;
    }
// ===================================商品列表========================================
    if (page.name === 'details-list') {

        var loading = false;
        // Last loaded index
        var lastIndex = $$('.class-list .class-list-product').length;
        var maxItems = 60;
        var itemsPerLoad = 6;
        $$('.infinite-scroll').on('infinite', function () {
            if (loading) return;
            loading = true;
            setTimeout(function () {
                // Reset loading flag
                loading = false;
                if (lastIndex >= maxItems) {
                    // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                    myApp.detachInfiniteScroll($$('.infinite-scroll'));
                    // Remove preloader
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                // Generate new items HTML
                var html = '';
                for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
                    html += '<div class="class-list-product">' +
                        '<div class="list-product-img"><a href=""><img src="./img/images/details-list-img.png" alt=""></a></div>' +
                        '<div class="list-product-right">' +
                        '<div class="right-title">iPhone 7 Plus 国行正iPhone </div>' +
                        '<div class="right-body">' +
                        '<div class="right-price"><b>¥</b> 5999</div>' +
                        '<div class="right-money"><b>¥</b> 5999</div>' +
                        '<div class="right-label">优惠价</div>' +
                        '</div>' +
                        '<div class="right-foot">' +
                        '<div class="right-label"><span class="money"><i>¥</i>114 元/ </span><span class="text">月 起</span></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
                // Append new items
                $$('.class-list').append(html);

                // Update last loaded index
                lastIndex = $$('.class-list .class-list-product').length;
            }, 1000);
        });


        $$(".option").on('click', function () {
            if ($$(this).hasClass('active')) {
                $$('.class-down').toggleClass('display');
            }
        });

        $$(".recommend").on('click', function () {
            $$('.class-down').addClass('display');
        });
        $$(".class-host").on('click', function (even) {
            console.log(even.target.tagName);
            $$('.class-host').removeClass('active');
            $$(this).addClass('active');
        });
        $$('.class-option').on('click', function (e) {
            $$('.class-down').addClass('display');
            $$('.class-option').removeClass('active');
            $$(this).addClass('active');
        });


        // ========跳转详情页面===============on事件委派======================
        $$(".class-list").on('click', ".class-list-product", function () {
            mainView.router.loadPage('commodity-details.html')
        })


    }
// =========================安全中心===========================================
    if (page.name === "security-center") {
        $$(".pay-password").on("click", function () {
            mainView.router.loadPage('iphoneverification.html')
        });
    }
// ===============================手机号验证===================================
    if (page.name === "iphoneverification") {
        $$('.body-input-yzm').on('click', function () {
            var phone = $$('input[name="iphone"]').val();
            re = /^1[34578]\d{9}$/;
            if (phone.search(re)) {
                myApp.alert('', '请填写正确的手机号码');
                return false;
            }

            var countdown = 60,
                $_this = $$(this),
                demo = function () {
                    if (countdown == 0) {
                        $_this.removeAttr('disabled');
                        $_this.text('重新获取');
                        return false
                    } else {
                        $_this.attr('disabled', 'disabled');
                        $_this.text(countdown + 's');
                        countdown--;
                        setTimeout(function () {
                            demo()
                        }, 1000)
                    }
                };
            demo()
        })
    }


// =============================密码==========================
    if (page.name === "iphone-password") {
        var numpadLimited = myApp.keypad({
            input: '#pwd-input',
            valueMaxLength: 6,
            dotButton: false,
            toolbar: false,
            formatValue: function (p, value) {
                var input = $$(".fake-box input");
                var len = value.length;
                console.log(p);
                for (var i = 0; i < len; i++) {
                    input.eq("" + i + "").val(value[i]);
                }
                if (len == 6) {
                    p.value = "";
                }
                input.each(function () {
                    var index = $$(this).index();
                    if (index >= len) {
                        $$(this).val("");
                    }
                });
            }
        });
    }

    // =================================添加地址========================================

    if (page.name === "address-list") {
        $$(".card-button-add").on("click", function () {
            mainView.router.loadPage('address-add.html')
        })

        $$(".label-checkbox").on("click", function () {
            $$(".address-checked .text").removeClass("active");
            $$(this).parent().find('.text').addClass("active");
        })
    }

    if (page.name === "address-add") {
        var carVendors = {
            北京市: ['北京市'],
            天津市: ['天津市'],
            河北省: ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'],
            山西省: ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '忻州市', '吕梁市', '晋中市', '临汾市', '运城市'],
            内蒙古: ['呼和浩特市', '包头市', '乌海市', '赤峰市', '呼伦贝尔市', '兴安盟', '通辽市', '锡林郭勒盟', '乌兰察布盟', '伊克昭盟', '巴彦淖尔盟', '阿拉善盟'],
            辽宁省: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'],
            吉林省: ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'],
            黑龙江省: ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区'],
            上海市: ['上海市'],
            江苏省: ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮阴市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
            浙江省: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
            安徽省: ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '宣城市', '巢湖市', '池州市'],
            福建省: ['福州市', '厦门市', '宁德市', '莆田市', '泉州市', '漳州市', '龙岩', '三明市', '南平市'],
            江西省: ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '宜春市', '上饶市', '吉安市', '抚州市'],
            山东省: ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '莱芜市', '临沂市', '德州市', '聊城市', '滨州地区', '菏泽地区'],
            河南省: ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店地区', '济源市'],
            湖北省: ['武汉市', '黄石市', '十堰市', '宜昌市', '襄樊市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '恩施土家族苗族自治州', '仙桃市', '潜江市', '天门市', '神农架林区'],
            湖南省: ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底地区', '湘西土家族苗族自治州'],
            广东省: ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '潮州市', '揭阳市', '云浮市'],
            广西: ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '崇左市', '来宾市', '贺州市', '百色市', '河池市'],
            海南省: ['海口市', '三亚市', '琼海市', '儋州市', '五指山市', '文昌市', '万宁市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县', '三沙市'],
            重庆市: ['重庆市'],
            四川省: ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '宜宾市', '广安市', '达川地区', '雅安地区', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州', '巴中地区', '眉山地区', '资阳地区'],
            贵州省: ['贵阳市', '六盘水市', '遵义市', '铜仁地区', '黔西南布依族苗族自治州', '毕节地区', '安顺地区', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
            云南省: ['昆明市', '曲靖市', '玉溪市', '昭通地区', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '思茅市', '西双版纳傣族自治州', '大理白族自治州', '保山地区', '德宏傣族景颇族自治州', '丽江地区', '怒江傈僳族自治州', '迪庆藏族自治州', '临沧地区'],
            西藏: ['拉萨市', '昌都地区', '山南地区', '日喀则地区', '那曲地区', '阿里地区', '林芝地区'],
            陕西省: ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '安康地区', '商洛地区', '榆林地区'],
            甘肃省: ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '酒泉地区', '张掖地区', '武威地区', '定西地区', '陇南地区', '平凉地区', '庆阳地区', '临夏回族自治州', '甘南藏族自治州'],
            青海省: ['西宁市', '海东地区', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
            宁夏: ['银川市', '石嘴山市', '吴忠市', '固原地区', '中卫市'],
            新疆: ['乌鲁木齐市', '克拉玛依市', '吐鲁番地区', '哈密地区', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '石河子市', '阿拉尔市', '图木舒克市', '五家渠市'],
            香港: ['香港'],
            澳门: ['澳门'],
            台湾: ['台湾']
        };

        var pickerDependent = myApp.picker({
            input: '#city',
            rotateEffect: true,
            formatValue: function (picker, values) {
                return values[1];
            },
            cols: [
                {
                    textAlign: 'left',
                    values: ['北京市', '天津市', '河北省', "山西省", "内蒙古", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏", "陕西省", "甘肃省", "青海省", "宁夏", "新疆", "香港", "澳门", "台湾"],
                    onChange: function (picker, country) {
                        $$("#c").val(country);
                        // $$(".close-picker").html("完成");
                        if (picker.cols[1].replaceValues) {
                            picker.cols[1].replaceValues(carVendors[country]);
                        }
                    }
                },
                {
                    values: carVendors.北京市,
                    width: 200
                }
            ]
        });
    }

    if (page.name === "commodity-option") {

    }

    if (page.name === "message-center") {
        $$('.recommend-title').on('click', function () {
            $$('.title').removeClass('active');
            $$(this).addClass('active');
            $$('.tab').removeClass('active');
            $$('.recommend').addClass('active');
        });

        $$('.system-title').on('click', function () {
            $$('.title').removeClass('active');
            $$(this).addClass('active');
            $$('.tab').removeClass('active');
            $$('.system').addClass('active');
        });
        return false;
    }

});

// Init slider and store its instance in mySwiper variable

// Option 2. Using live 'pageInit' event handlers for each page
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//     // Following code will be executed for page with data-page attribute equal to "about"
//     myApp.alert('Here comes About page');
// })