$(function () {
  initTable();
  function initTable() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
      }
    });
  }

  var addIndex = 0;
  var editIndex = 0;
  //   添加分类按钮
  $("#addBtn").on("click", function (e) {
    e.preventDefault();
    var strAddHtml = $("#tpl-add").html();

    addIndex = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: strAddHtml,
    });
  });

  
  // 代理事件-添加分类
  // 给body绑定submit事件，触发事件的对象是表单

  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    $.post("/my/article/addcates", formdata, function (res) {
      if (res.status === 0) {
        // 关闭弹出层
        layui.layer.close(addIndex);
        // 更新视图
        initTable();
      }
    });
  });
  // 代理事件-编辑分类

  $("tbody").on("click", ".btn-edit", function (e) {
    e.preventDefault();
    var strEditHtm = $("#tpl-edit").html();

    editIndex = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: strEditHtm,
    });

    // 获取button的data-Id属性值
    var Id = $(this).attr("data-id");
    // 根据Id查询对应的文章分类
    //    /my/article/cates/:id ->  参数名字id ->  /my/article/cates/1  ...
    $.get(`/my/article/cates/${Id}`, function (res) {
      if (res.status === 0) {
        layui.form.val("editForm", res.data);
      }
    });
  });
  // 代理事件-编辑分类-确定修改
  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    $.post(`/my/article/updatecate`, formdata, function (res) {
      if (res.status === 0) {
        layui.layer.close(editIndex);
        initTable();
      }
    });
  });

  // 代理事件-删除分类
  $("tbody").on("click", ".btn-delete", function (e) {
    e.preventDefault();
    var Id = $(this).attr("data-id");
    // console.log(Id)
    // 弹层：
    layer.confirm(
      "亲, 你要退出吗？",
      { icon: 3, title: "真的要把我删除嘛？" },
      function (index) {
        //do something
        $.get(`/my/article/deletecate/${Id}`, function (res) {
          //   console.log(res);
          if (res.status === 0) {
            initTable();
            layer.close(index);
          }
        });
      }
    );
  });
});
