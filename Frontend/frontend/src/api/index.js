import axios from "axios";

export const getData = async (URL) => {
    try {
        const {data} = await axios.get(URL)
        return data
    } catch (e) {
        alert(e)
    }
}

export const postData = async (URL, logInf) => {
    try {
        const data = await axios.post(URL, logInf)
        return data
    } catch (error) {
        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}

export const getFilteredData = async (params) => {
    let url = new URL('http://127.0.0.1:8000/shop/models/');
    Object.keys(params).forEach((el) => {
        url.searchParams.set(el, params[el]);
    })
    try {
        const {data} = await axios.get(url)
        return data
    } catch (e) {
        alert(e)
    }
}

export const getUserInf = async (id) => {
    try {
        const { data } = await axios.get("http://127.0.0.1:8000/shop/users/" + id)
        return data
    } catch (e) {
        console.log(e)
    }
}

// export const getParams = () => {
//     try {
//         const urls = [
//             "carcase",
//             "engine",
//             "gearbox",
//             "mark",
//             "transmission"
//         ]

//         let res = {}
//         urls.forEach(async el => {
//             const {data} = await axios.get(
//                 `http://127.0.0.1:8000/shop/${el}/`
//             )
//             res[el] = data
//         })
//         return res
//     } catch (e) {
//         alert(e)
//     }
// }

export const sendLogInf = async (logInf) => {
    try {
        const data = await axios.post("http://127.0.0.1:8000/sys/login", logInf)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}

export const create = async (logInf) => {
    try {
        console.log('loginf')
        console.log(logInf)
        const data = await axios.post("http://127.0.0.1:8000/shop/models/", logInf)
        console.log('data')
        console.log(data)
        return data
    } catch (error) {
        console.log('error')
        console.log(error)
        alert(error)
    }
}

export const sendRegInf = async (regInf) => {
    try {
        const data = await axios.post("http://127.0.0.1:8000/aauth/users/", regInf)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}
