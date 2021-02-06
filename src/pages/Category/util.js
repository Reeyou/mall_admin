function handleCategoryCascaderData(data) {
    let arr = []
    data.map((i, i_index) => {
        var obj = {}
        if (i.category_id === "0") {
            obj.label = i.category_name
            obj.value = i._id
            arr.push(obj);
        }
        arr.map((j, j_index) => {
            if (j.value === i.category_id) {
                obj.label = i.category_name
                obj.value = i._id
                arr[j_index].hasOwnProperty('children') ? '' : arr[j_index].children = []
                arr[j_index].children.push(obj)
            }
            arr[j_index].children && arr[j_index].children.map((d, d_index) => {
                if (d.value === i.category_id) {
                    obj.label = i.category_name
                    obj.value = i._id
                    arr[j_index].children[d_index].hasOwnProperty('children') ? '' : arr[j_index].children[d_index].children = []
                    arr[j_index].children[d_index].children.push(obj)
                }
            })
        })
    })
    return arr
}

function handleCategoryListData(data) {
    let arr = []
    data.map(i => {
        if (i.category_id === "0") {
            arr.push(i);
        }
        arr.map((j, j_index) => {
            if (j._id === i.category_id) {
                arr[j_index].hasOwnProperty('children') ? '' : arr[j_index].children = []
                arr[j_index].children.push(i)
            }
            arr[j_index].children && arr[j_index].children.map((d, d_index) => {
                if (d._id === i.category_id) {
                    arr[j_index].children[d_index].hasOwnProperty('children') ? '' : arr[j_index].children[d_index].children = []
                    arr[j_index].children[d_index].children.push(i)
                }
            })
        })
    })
    return arr
}

export {
    handleCategoryCascaderData,
    handleCategoryListData
}