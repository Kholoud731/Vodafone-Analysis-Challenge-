import { store } from '../store/rootStore';
import {
    changeCountry,
    changeCamp,
    changeSchool,
    apiRequest,
    filterSchools,
    removeSchool,
    resetSchools,
    requestData,
    receiveData,
    invalidData
} from '../actions'

test('request api check', async ()=>{

    await apiRequest()
    expect(store.getState().data.loading).toBe(false)
    expect(store.getState().data.error).toBe('')
    expect(store.getState().data.data).toBeTruthy()

})

test('change School',  ()=>{

    const school =  changeSchool("Egypt")
    expect(school.school).toBe("Egypt")

})

test('change counrty',  ()=>{

    const country =  changeCountry("Egypt")
    expect(country.country).toBe("Egypt")

})

test('change camp',  ()=>{

    const camp =  changeCamp("Egypt")
    expect(camp.camp).toBe("Egypt")

})

test('Request data',  ()=>{

    const res =  requestData()
    console.log(res.data)
    expect(res.data.length).toBe(0)
    expect(res.loading).toBeTruthy()
    expect(res.error).toBeFalsy()
    expect(res.camp).toBeFalsy()
    expect(res.country).toBeFalsy()
    expect(res.school).toBeFalsy()
    expect(res.selectedSchool).toBeFalsy()

})


test('Recive Error',  ()=>{

    const res =  invalidData()
    expect(res.data.length).toBe(0)
    expect(res.loading).toBeFalsy()
    expect(res.error).toBeTruthy()
    expect(res.camp).toBeFalsy()
    expect(res.country).toBeFalsy()
    expect(res.school).toBeFalsy()
    expect(res.selectedSchool).toBeFalsy()

})
