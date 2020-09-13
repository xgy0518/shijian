$(function () {
  // 设置表格数据请求的查询参数
  var q = {
    pagenum: 1,
    // pagenum	是	int	页码值
    pagesize: 2,
    // pagesize	是	int	每页显示多少条数据
    cate_id: "",
    // cate_id	否	string	文章分类的 Id
    state: "",
    // state	否	string	文章的状态，可选值有：已发布、草稿
  };

  //   适用art-tempalte的其他API方法（声明过滤器formatDate）
  // template.defaults.imports.过滤器的名字  =  过滤器的功能

  template.defaults.imports.formatDate = function (olddate) {
    var timenew = moment(olddate).format("MMMM Do YYYY, h:mm:ss a");
    return timenew;
  };

  initList();
  function initList() {
    $.get(`/my/article/list`, q, function (res) {
      if (res.status === 0) {
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
      } else {
        layer.msg(res.message);
      }
    });
  }
});
