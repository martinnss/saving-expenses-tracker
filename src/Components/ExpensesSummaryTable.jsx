import React from 'react';

const ExpensesSummaryTable = ({ data }) => {
    return (
        <table>
          <thead>
            <tr>
              <th></th> {/* Empty cell for the colored circle */}
              <th>Categorias</th>
              <th>Totales</th>
            </tr>
          </thead>
          <tbody>
            {data.labels.map((label, index) => (
              <tr key={index}>
                <td >
                  <div
                    style={{
                      width: '30px',
                      height: '30px',

                      backgroundColor: data.datasets[0].backgroundColor[index],
                      display: 'inline-block',
                    }}
                  ></div>
                </td>
                <td>{label}</td>
                <td>{data.datasets[0].data[index].toLocaleString('es-CL', {
                                                                        style: 'currency',
                                                                        currency: 'CLP',
                                                                        })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};

export default ExpensesSummaryTable;
