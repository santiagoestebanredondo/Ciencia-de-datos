function HPNTable({ rows }) {

  return (

    <table>

      <thead>
        <tr>
          <th>ID</th>
          <th>Hecho</th>
          <th>Prueba</th>
          <th>Norma</th>
          <th>Estado</th>
          <th>Riesgo</th>
        </tr>
      </thead>

      <tbody>

        {rows.map((row) => (

          <tr key={row.id}>

            <td>{row.id}</td>

            <td>{row.hecho}</td>

            <td>{row.prueba}</td>

            <td>{row.norma}</td>

            <td>{row.estado_epistemico}</td>

            <td>{row.riesgo}</td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}

export default HPNTable;