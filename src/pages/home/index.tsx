import "./styles.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [processes, setProcesses] = useState<any[]>([]);
  const [families, setFamilies] = useState<any[]>([]);

  useEffect(() => {
    async function loadProcess() {
      const responseProcess = await api.get("processes");
      const responseFamily = await api.get("families");
      setProcesses(responseProcess.data);
      setFamilies(responseFamily.data);
    }

    loadProcess();
  }, []);

  const deleteProcess = (id: string) => {
    api.delete(`processes/${id}`).then(() => window.location.reload());
  };

  return (
    <div className="container">
      <div className="initialBlock">
        <div>
          <h1 className="titlePage">Processos</h1>
          <div className="cardBlock">
            {processes.map((process) => {
              return (
                <div key={process.id} className="processCard">
                  <div>
                    <div className="name">Processo: {process.process_name}</div>
                    <div className="family">
                      <p>Familia:</p>
                      <p>
                        {families.map((family) =>
                          process.family_id === family.id
                            ? family.family_name
                            : ""
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link to={`process/${process.id}`}>Editar</Link>
                    <button onClick={() => deleteProcess(process.id)}>
                      Deletar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
