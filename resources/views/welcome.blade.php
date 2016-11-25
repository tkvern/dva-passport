<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>量子视觉-统一认证登录平台</title>
        <link rel="stylesheet" type="text/css" href="/css/app.css">
    </head>
    <body>
        <div id="layout-container"><div id="header" class="login-header">
            <window-operations>
                <div class="window-operations">
                    <ul>
                        <li class="operation-button close-window""></li>
                        <li class="operation-button mini-window""></li>
                        <li class="operation-button expand-window"></li>
                    </ul>
                </div>
            </window-operations>
        </div>
        <div class="login-form tab login-tab">
            <ul class="tab-items">
                <li class="tab-item current">扫码登录</li>
                <li class="tab-item">密码登录</li>
            </ul>
            <div  class="tab-contents">
                <div class="tab-content qrcode-login current" id="qrcode-login">
                </div>
                <div class="tab-content password-login">
                    <form action="" id="myform">
                        <div class="avatar biger border-thick">
                            <img src="/image/logo.png" class="country-img" alt="">
                        </div>

                        <div class="clearfix">
                            <input type="text" name="account" placeholder="请输入邮箱或手机号" required="" class="fm-input account">
                        </div>
                        <div class="clearfix">
                            <input class="fm-input password" type="password" name="verification" placeholder="请输入密码" required="">
                        </div>
                        <button type="submit" class="blue big ng-binding disabled">登录</button>
                        <!-- <div class="toast warning">手机号或密码错误，请重新输入</div> -->
                    </form>
                </div>
            </div>
        </div>
        <div class="networkdetect">Copyright©2016 深圳市量子视觉科技有限公司 保留所有权利</div>
        </div>

        <script type="text/javascript" src="/js/app.js"></script>
        <script type="text/javascript">
        !function (window, document) {
            function d(a) {
                var e, c = document.createElement("iframe"),
                    d = "https://login.dingtalk.com/login/qrcode.htm?goto=" + a.goto ;
                d += a.style ? "&style=" + a.style : "",
                    d += a.href ? "&href=" + a.href : "",
                    c.src = d,
                    c.frameBorder = "0",
                    c.allowTransparency = "true",
                    c.scrolling = "no",
                    c.width = a.width || "365px",
                    c.height = a.height || "400px",
                    e = document.getElementById(a.id),
                    e.innerHTML = "",
                    e.appendChild(c)
            }
            window.DDLogin = d
        }(window, document);

        $(document).ready(function() {
            var obj = DDLogin({
                 id:"qrcode-login",
                 goto: "",
                 style: "",
                 href: "",
                 width : "365px",
                 height: "316px"
             });


            $('.tab-items li').on('click', function(e) {
                var $this = $(this);
                if (!$this.hasClass("current")) {
                    $this.addClass('current').siblings().removeClass('current');
                    $('.tab-contents .current').removeClass('current').siblings().addClass('current');
                    if ($('.tab-contents .current').hasClass('password-login')) {
                        $('#myform')[0].reset();
                        $("#myform input.account").focus();
                    }
                }
            });
        })
        </script>
    </body>
</html>
