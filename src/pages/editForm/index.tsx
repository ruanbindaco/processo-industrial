import { Link, useNavigate, useParams } from "react-router-dom";
import InputBar from "../../components/inputBar";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { FamiliesProps, ProcessProps } from "../../interfaces";

export default function EditForm() {
  const { id } = useParams();
  const [data, setData] = useState<ProcessProps>({
    id: "",
    company_id: "",
    process_name: "",
    list_emails_responsables: [""],
    family_id: "",
  });
  const [familySelected, setFamilySelected] = useState();
  const [getFamilies, setFamilies] = useState<FamiliesProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProcess() {
      const response = await api.get(`processes/${id}`);
      const responseFamilies = await api.get(`families`);
      setData(response.data);
      setFamilies(responseFamilies.data);
      setFamilySelected(response.data.family_id);
    }

    loadProcess();
  }, [id]);

  function uploadProcess(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    api.put(`processes/${id}`, data);
    navigate("/");
  }

  const nameChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setData({ ...data, process_name: e.currentTarget.value });
  };

  const emailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setData({ ...data, list_emails_responsables: [e.currentTarget.value] });
  };

  const changeFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, family_id: e.currentTarget.value });
  };

  return (
    <div>
      <div className="row">Formulário</div>
      <form>
        <div>
          <div>
            <InputBar
              disabled={false}
              size={"100%"}
              label={"Nome do processo"}
              type={"text"}
              name={"name"}
              value={data.process_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                nameChange(e)
              }
            />
            <InputBar
              disabled={false}
              size={"100%"}
              label={"Lista de email"}
              type={"email"}
              name={"email"}
              value={data.list_emails_responsables}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                emailChange(e)
              }
            />
          </div>
          <div>
            <select name="familyOption" onChange={(e) => changeFamily(e)}>
              <option value="">Escolha sua familia</option>
              {getFamilies.map((family) => {
                return (
                  <option
                    selected={familySelected === family.id}
                    value={family.id}
                    key={family.id}
                  >
                    {family.family_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <Link to="/">Cancelar</Link>
          <button type="submit" onClick={(e) => uploadProcess(e)}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
