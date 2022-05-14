import dataReducer from '../reducers/dataReducer';
import {
    changeCountry,
    changeCamp,
    changeSchool,
    filterSchools,
    removeSchool,
    resetSchools,
    requestData,
    invalidData,
    receiveData
} from '../actions'

const initialState = {
    camp: "Omaka",
    country: "Egypt",
    data:  [{
        camp: "Omaka",
        country: "Egypt",
        id: "620af3a468e4b2e765e7c9e7",
        lessons: 140,
        month: "Feb",
        school: "Burke High School"
}
],
error: "",
lineColor: ['#FF6633'],
loading: false,
school: "Show all",
selectedSchool: ['Rapaura School'],
}

test('change country',async ()=>{

    const output = dataReducer(initialState, changeCountry("kholoud"))
    expect(output.country).toBe("kholoud")

})

test('change school',async ()=>{

    const output = dataReducer(initialState, changeSchool("kholoud"))
    expect(output.school).toBe("kholoud")

})

test('change camp',async ()=>{

    const output = dataReducer(initialState, changeCamp("kholoud"))
    expect(output.camp).toBe("kholoud")

})

test('add new selected school',async ()=>{

    const output = dataReducer(initialState, filterSchools("kholoud","#eee"))
    expect(output.selectedSchool[1]).toBe("kholoud")
    expect(output.lineColor[1]).toBe("#eee")

})

test('remove selected school',async ()=>{

    const output = dataReducer(initialState, removeSchool("Rapaura School","#FF6633"))
    expect(output.selectedSchool.length).toBe(0)
    expect(output.lineColor.length).toBe(0)

})

test('reset selected schools',async ()=>{

    const output = dataReducer(initialState, resetSchools())
    expect(output.selectedSchool[0]).toBe("")
    expect(output.lineColor[0]).toBe("")

})

test('receive data action',async ()=>{

    let res = [{
        camp: "Omaka",
        country: "Egypt",
        id: "620af3a468e4b2e765e7c9e7",
        lessons: 140,
        month: "Feb",
        school: "Burke High School"
},
{
    camp: "Omaka",
    country: "Egypt",
    id: "620af3a468e4b2e765e7c9e7",
    lessons: 140,
    month: "Feb",
    school: "Burke High School"
},

]
    const output = dataReducer(initialState, receiveData(res))
    expect(output.loading).toBeFalsy()
    expect(output.error).toBe("")
    expect(output.data).toBe(res)

})

test('receive error action',async ()=>{

    const output = dataReducer(initialState, invalidData())
    expect(output.loading).toBeFalsy()
    expect(output.error).toBe("unable to fetch data")
    expect(output.data.length).toBe(0)

})