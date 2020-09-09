$(function () {
  $("#link-login").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link-reg").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
});

layui.form.verify({
  password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

  repassword: function (value) {
    if ($("#reg-psd").val() !== value) {
      return "密码不一致";
    }
  },
});

$(".layui-form").submit(function (e) {
  e.preventDefault();
  // 3. 获取表单数据

  var username = $("#reg-username").val();
  var password = $("#password").val();

  // 4. 看接口文档 发送ajax
  var formdata = {
    username: username,
    password: password,
  };

  $.post("http://ajax.frontend.itheima.net/api/reguser", formdata, function (
    res
  ) {
    if (res.status === 0) {
      layer.msg("res.message");
    } else {
      layer.msg("res.message");
    }
  });
});
