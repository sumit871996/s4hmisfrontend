function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    // const { fullName, emailAddress, salary } = data
    const { medicineName, quantity, unitCost, dosagePerDay, duration } = data
    return (
      <tr key={index}>
        <td>
          <input
            type='text'
            value={medicineName}
            onChange={(evnt) => handleChange(index, evnt)}
            name='medicineName'
            className='form-control'
          />
        </td>
        <td>
          <input
            type='number'
            value={quantity}
            onChange={(evnt) => handleChange(index, evnt)}
            name='quantity'
            className='form-control'
          />
        </td>
        <td>
          <input
            type='number'
            value={unitCost}
            onChange={(evnt) => handleChange(index, evnt)}
            name='unitCost'
            className='form-control'
          />
        </td>
        <td>
          <input
            type='text'
            value={dosagePerDay}
            onChange={(evnt) => handleChange(index, evnt)}
            name='dosagePerDay'
            className='form-control'
          />
        </td>
        <td>
          <input
            type='number'
            value={duration}
            onChange={(evnt) => handleChange(index, evnt)}
            name='duration'
            className='form-control'
          />
        </td>
        <td>
          <button
            className='btn btn-outline-danger'
            onClick={() => deleteTableRows(index)}>
            x
          </button>
        </td>
      </tr>
    )
  })
}

export default TableRows
