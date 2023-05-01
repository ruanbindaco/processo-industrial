import { Link, useNavigate } from "react-router-dom";
import InputBar from "../../components/inputBar";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Form() {
  const [nameProcess, setNameProcess] = useState("");
  const [emailList, setEmailList] = useState("");
  const [nameFamily, setNameFamily] = useState("");
  const navigate = useNavigate();
  const [getFamilies, setGetFamilies] = useState<any[]>([]);

  useEffect(() => {
    async function loadFamily() {
      const response = await api.get(`families`);
      setGetFamilies(response.data);
    }

    loadFamily();
  }, []);

  const saveForm = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    api
      .post("/processes", {
        list_emails_responsables: [emailList],
        process_name: nameProcess,
        family_id: nameFamily,
      })
      .then(() => {
        clearFrom();
        navigate("/");
      });
  };

  const clearFrom = () => {
    setNameProcess("");
    setEmailList("");
    setNameFamily("");
  };

  const changeFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNameFamily(e.currentTarget.value);
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
              value={nameProcess}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setNameProcess(e.currentTarget.value)
              }
            />
            <InputBar
              disabled={false}
              size={"100%"}
              label={"Lista de email"}
              type={"email"}
              name={"email"}
              value={emailList}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEmailList(e.currentTarget.value)
              }
            />
          </div>
          <div>
            <select name="familyOption" onChange={(e) => changeFamily(e)}>
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
          <button onClick={saveForm} type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
