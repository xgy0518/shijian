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
