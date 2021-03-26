import axios from 'axios'

export const AddRelationServer = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:4002/person/addrelation`, data)
            .then(ress => { resolve(ress.data) })
    })
}

export const getRelationServer = (data) => {
    // console.log(data);
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4002/person/findrelation?person1=${data.person1}&person2=${data.person2}`)
            .then(ress => { resolve(ress.data) })
    })
}