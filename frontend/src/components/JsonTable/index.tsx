import { FC } from 'react';


interface JsonTableProps {
  rows: any;
}

const JsonTable: FC<JsonTableProps> = (props: JsonTableProps) => {
  const { rows } = props;

  // const data = JSON.parse(rows);
  const data = rows;
  const keys = Object.keys(data.length ? data[0] : {});

  return (
    <div className="JsonTable">
      {rows.length > 0 && (
        <table>
         <thead>
            <tr>
              {keys.map((item, idx) => (
                <th key={idx}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                {keys.map((key, colidx) => (
                  <td key={idx + "_" + colidx}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// JsonTable.propTypes = {
//   rows: PropTypes.string.isRequired
// };


export default JsonTable;
