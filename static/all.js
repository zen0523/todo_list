$(document).ready(function () {
    let data_index = 0;
    let todo_list = [];
    let list_body = $(".list-body");
    $(".input-todo").click(function (e) {
        if (e.target.id == "addon-wrapping") {
            let matter = $(".text-todo").val().trim();
            if (matter) {
                obj = {
                    data_index: ++data_index,
                    matter: matter,
                    is_finished: false,
                }
                todo_list.push(obj);
                $(".text-todo").val("");
                render_content("add_list_item", [obj]);
                let checkbox = $(".checkbox");
                checkbox.click(function (e) {
                    $(e.target).toggleClass("checked");
                    let parent = $(e.target).closest(".list-item");
                    let matter = parent.find(".list-content");
                    if ($(e.target).hasClass("checked")) {
                        $(e.target).text("✔");
                        matter.addClass("text-decoration");
                    } else {
                        $(e.target).text("");
                        matter.removeClass("text-decoration");
                    }
                })
                let list_item = $(".list-item");
                list_item.hover(function (e) {
                    let parent = $(e.target).closest(".list-item");
                    let list_delete = parent.find(".list-delete");
                    list_delete.toggleClass("d-none");
                })
                let list_delete = $(".list-delete");
                list_delete.click(function (e) {
                    let parent = $(e.target).closest(".list-item");
                    parent.remove();
                })
            } else {
                alert("請輸入待辦事項");
            }
        }
    })

    render_content = function (action, item) {
        // console.log("render_content", action, item)
        if (action == "add_list_item" && item.length > 0) {
            // console.log(create_list_item(item[0]));
            list_body.append(create_list_item(item[0]));
        }
    }
    create_list_item = function (item) {
        list_item_html = `
        <li class="list-item row justify-content-center m-0" data-index=${item.data_index}>
            <div class="col-1">
                <div class="checkbox ${item.is_finished? "checked":"non_checked"}"></div>
            </div>
            <div class="col">
                <label class="list-content">${item.matter}</label>
            </div>
            <div class="col-1 mr-4px">
                <div class="list-delete d-none"></div>
            </div>
        </li>`
        return list_item_html
    }
});