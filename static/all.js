$(document).ready(function () {
    let data_index = 0;
    let todo_list_array = [];
    let todo_list = $(".todo-list");
    let list_body = $(".list-body");
    let list_header = $(".list-header");
    $(".input-todo").click(function (e) {
        if (e.target.id == "addon-wrapping") {
            let matter = $(".text-todo").val().trim();
            if (matter) {
                obj = {
                    data_index: ++data_index,
                    matter: matter,
                    is_finished: false,
                }
                todo_list_array.push(obj);
                $(".text-todo").val("");
                render_content("add_list_item", [obj]);
                update_todo_length();
            } else {
                alert("請輸入待辦事項");
            }
        }
    })
    list_body.delegate(".list-item", "mouseenter mouseleave", function (e) {
        let parent = $(e.target).closest(".list-item");
        let list_delete = parent.find(".list-delete");
        if ($(window).width() > 768) {
            list_delete.toggleClass("d-none");
        }
    });
    list_body.delegate(".list-delete", "click", function (e) {
        let parent = $(e.target).closest(".list-item");
        todo_list_array.forEach((item, index, object) => {
            if (item.data_index == parent.data().index) {
                object.splice(index, 1);
            }
        })
        parent.remove();
        update_todo_length();
        if (todo_list_array.length <= 0) {
            todo_list.addClass("invisible");
        }
    });
    list_body.delegate(".checkbox", "click", function (e) {
        $(e.target).toggleClass("checked");
        let parent = $(e.target).closest(".list-item");
        let matter = parent.find(".list-content");
        if ($(e.target).hasClass("checked")) {
            $(e.target).text("✔");
            matter.addClass("text-decoration");
            todo_list_array.forEach((item) => {
                if (item.data_index == parent.data().index) {
                    item.is_finished = true;
                }
            })
        } else {
            $(e.target).text("");
            matter.removeClass("text-decoration");
            todo_list_array.forEach((item) => {
                if (item.data_index == parent.data().index) {
                    item.is_finished = false;
                }
            })
        }
        update_todo_length();
        $(".nav-item.active").trigger('click');
    });
    $(window).resize(function (e) {
        if ($(window).width() <= 768) {
            $(".list-delete").removeClass("d-none");
            $(".list-item").off("mouseenter mouseleave");
        } else {
            $(".list-delete").addClass("d-none");
        }
    });
    // 全部, 待完成, 已完成的動作
    list_header.delegate(".nav-item", "click", function (e) {
        $(".nav-item").removeClass("active");
        let parent = $(e.target).closest(".nav-item");
        parent.addClass("active");
        list_body.empty();
        if (parent[0].id == "all") {
            todo_list_array.forEach((item) => {
                list_body.append(create_list_item(item));
            })
        } else if (parent[0].id == "todo") {
            todo_list_array.forEach((item) => {
                if (item.is_finished == false) {
                    list_body.append(create_list_item(item));
                }
            })
        } else if (parent[0].id == "finished") {
            todo_list_array.forEach((item) => {
                if (item.is_finished == true) {
                    list_body.append(create_list_item(item));
                }
            })
        }
        list_body.trigger("resize");
        if (todo_list_array.length <= 0) {
            todo_list.addClass("invisible");
        }
    });
    render_content = function (action, item) {
        if (todo_list.hasClass("invisible")) {
            todo_list.removeClass("invisible");
        }
        if (action == "add_list_item" && item.length > 0) {
            list_body.append(create_list_item(item[0]));
        }
        list_body.trigger("resize");
    }
    create_list_item = function (item) {
        list_item_html = `
        <li class="list-item row justify-content-center m-0" data-index=${item.data_index}>
            <div class="col-1">
                <div class="checkbox ${item.is_finished? "checked":""}">${item.is_finished? "✔":""}</div>
            </div>
            <div class="col">
                <label class="list-content ${item.is_finished? "text-decoration":""}">${item.matter}</label>
            </div>
            <div class="col-1 mr-4px">
                <div class="list-delete d-none"></div>
            </div>
        </li>`
        return list_item_html
    }
    update_todo_length = function () {
        let count = 0;
        todo_list_array.forEach((item) => {
            if (item.is_finished == false) {
                count += 1;
            }
        });
        $("div.todo-list .wait_todo > span").text(`${count}`);
    }
    $(".clear_todo_finished").click(function (e) {
        let temp_todo_list_array = todo_list_array.filter(function (item) {
            return item.is_finished == false;
        })
        todo_list_array = [...temp_todo_list_array];
        update_todo_length();
        $(".nav-item.active").trigger('click');
    })
});