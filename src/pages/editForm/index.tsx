import { Link, useParams } from "react-router-dom";
import InputBar from "../../components/inputBar";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function EditForm() {
  const { id } = useParams();
  const [data, setData] = useState<any>({});
  const [getFamilies, setGetFamilies] = useState<any[]>([]);

  useEffect(() => {
    async function loadProcess() {
      const response = await api.get(`processes/${id}`);
      const responseFamilies = await api.get(`families`);
      setData(response.data);
      setGetFamilies(responseFamilies.data);
    }

    loadProcess();
  }, [id]);

  const handleChange = (e: any) => {
    console.log(e.currentTarget.value);
  };

  return (
    <div>
      <div className="row">Formulário</div>
      <form>
        <div>
          <div>
            <InputBar
              disabled={true}
              size={"100%"}
              label={"ID empresa"}
              type={"text"}
              name={"idEmpresa"}
              value={data.company_id}
            />
            <InputBar
              disabled={true}
              size={"100%"}
              label={"ID do processo"}
              type={"text"}
              name={"idProcesso"}
              value={data.id}
            />
          </div>
          <div>
            <InputBar
              disabled={false}
              size={"100%"}
              label={"Nome do processo"}
              type={"text"}
              name={"name"}
              value={data.process_name}
              onChange={(e: any) => handleChange(e)}
            />
            <InputBar
              disabled={false}
              size={"100%"}
              label={"Lista de email"}
              type={"email"}
              name={"email"}
              value={data.list_emails_responsables}
            />
          </div>
          <div>
            <select name="familyOption">
              <option value="">Escolha sua familia</option>
              {getFamilies.map((family) => {
                return (
                  <option value={family.id} key={family.id}>
                    {family.family_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <Link to="/">Cancelar</Link>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}
