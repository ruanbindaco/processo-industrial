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
    <div>
      <div className="row">Home</div>
      <div>
        <a href="/process">Cria novo processo</a>
        <div>
          {processes.map((process) => {
            return (
              <div key={process.id}>
                <div>
                  <div>Nome do Processo: {process.process_name}</div>
                  <div>
                    <p>
                      Nome da Familia:{" "}
                      {families.map((family) =>
                        process.family_id === family.id
                          ? family.family_name
                          : ""
                      )}
                    </p>
                  </div>
                </div>
                <Link to={`process/${process.id}`}>Editar</Link>
                <button onClick={() => deleteProcess(process.id)}>
                  Deletar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
