import { useState } from 'react'
import TableRows from './TableRows'
import { useDispatch } from 'react-redux'
import { updateMedicines } from '../../slices/MedicineSlice'
function AddDeleteTableRows() {
  const [rowsData, setRowsData] = useState([])
  const dispatch = useDispatch()
  {
    /*  
            "medicineName" : "paracetamol",
            "quantity" : 5,
            "unitCost" : 3,
            "dosagePerDay" : "twice",
            "duration" : 10 */
  }
  const submitPrescription = () => {
    console.log(rowsData)
    dispatch(updateMedicines(rowsData))
  }
  const addTableRows = () => {
    const rowsInput = {
      medicineName: '',
      quantity: '',
      unitCost: '',
      dosagePerDay: '',
      duration: '',
    }
    setRowsData([...rowsData, rowsInput])
  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData]
    rows.splice(index, 1)
    setRowsData(rows)
  }

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target
    const rowsInput = [...rowsData]
    rowsInput[index][name] = value
    setRowsData(rowsInput)
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <table className='table table-striped '>
            <thead
              className='thead-light text-white '
              style={{
                backgroundColor: '#1F6986',
                alignContent: 'flex-start',
              }}>
              <tr>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Dosage Per Day</th>
                <th>duration</th>
                <th>
                  <button className='btn btn-warning' onClick={addTableRows}>
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
            </tbody>
          </table>
          <div>
            <button
              className='btn btn-outline-success'
              onClick={submitPrescription}>
              submit presciption
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddDeleteTableRows
