// 深拷贝
function DeepClone(src, tar) {
    var tar = tar || {}

    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            if (typeof(src[prop]) == 'object') {
                tar[prop] = (src[prop].constructor === Array ? [] : {})
                DeepClone(src[prop], tar[prop])
            } else {
                tar[prop] = src[prop]
            }
        }
    }
    return tar
}
/**
 * 扁平化分类表格数据
 * @param {*} data 
 * 分类数据
 * [
 *   {
 *      name: '',
 *      children: [
 *          {
 *              name: '',
 *              children: []
 *          }
 *      ]
 *    }
 * ]
 * 转换后
 * [{name: ''},{},{},...]
 */
function flatten(data, flatData) {
    // return data.reduce((result, item) => {
    //     return result.concat(Array.isArray(item) ? flatten(item) : item)
    // }, [])
    let _flatData = flatData || []
    for (let prop in data) {
        if (data[prop].hasOwnProperty('children')) {
            if (data[prop]['children'].constructor === Array) {
                var obj = {}
                for (let _prop in data[prop]) {
                    if (_prop !== 'children') {
                        obj[_prop] = data[prop][_prop]
                    }
                }
                _flatData.push(obj)
                flatten(data[prop].children, _flatData)
            }
        } else {
            _flatData.push(data[prop])
        }

    }
    return _flatData
}

/**
 * 
 * @param {*} formRefs
 * formRef: this.$refs[''] 
 */
function validateForms(formRefs) {
    let errList = [],
        res
    let results = formRefs.map(formRef => {
        new Promise((resolve, reject) => {
            formRef.validate((valid, err) => {
                if (valid) {
                    res = valid
                    resolve();
                } else {
                    errList.push(err)
                    reject()
                }
            })
        }).catch(e => { console.log(errList) })
    })
    return Promise.all(results).then(() => {
        return res
    })
}

/**
 * 
 * @param {*} arr 
 * {
 *  {
 *      color: {
 *          color: '',
 *          label: ''
 *      },
 *      ...
 *  },
 *  ...
 * }
 * 
 * 为了判断sku数据中颜色是否唯一
 */
const removeDuplication = (arr) => {
    const res = [];
    const _obj = {}
    for (const item of arr) {
        if (item.constructor == Object) {
            for (const prop in item) {
                if (item[prop].constructor == Object) {
                    if (!_obj[item[prop]["color"]]) {
                        _obj[item[prop]["color"]] = true
                        res.push(item);
                    }
                }
            }
        }
    }
    return res;
}
export {
    DeepClone,
    flatten,
    validateForms,
    unique,
    unique2,
    removeDuplication
}