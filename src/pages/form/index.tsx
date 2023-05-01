import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import InputBar from "../../components/inputBar";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaSave } from "react-icons/fa";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function Form() {
  const [nameProcess, setNameProcess] = useState("");
  const [emailList, setEmailList] = useState("");
  const [nameFamily, setNameFamily] = useState("");
  const navigate = useNavigate();
  const [getFamilies, setGetFamilies] = useState<any[]>([]);
  const windowType = useWindowSize();

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
    <div className="container">
      <form className="formBlock">
        <div className="titlePage">Novo Processo</div>
        <div className="inputBlock">
          <InputBar
            disabled={false}
            size={
              windowType === "desktop"
                ? "90%"
                : windowType === "tablet"
                ? "85%"
                : "93%"
            }
            label={"Nome do processo"}
            type={"text"}
            name={"name"}
            value={nameProcess}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setNameProcess(e.currentTarget.value)
            }
            className="input"
          />
          <InputBar
            disabled={false}
            size={windowType === "mobile" ? "93%" : "90%"}
            label={"E-mail"}
            type={"email"}
            name={"email"}
            value={emailList}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmailList(e.currentTarget.value)
            }
            className="input"
          />
        </div>
        <div className="selectBlock">
          <label htmlFor="family">Família</label>
          <select
            name="family"
            className="selectFamily"
            onChange={(e) => changeFamily(e)}
          >
            <option value="">Escolha uma opção</option>
            {getFamilies.map((family) => {
              return (
                <option value={family.id} key={family.id}>
                  {family.family_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="buttonBlock">
          <Link to="/">
            <div className="btn">Cancelar</div>
          </Link>
          <button className="btn btnSave" onClick={saveForm} type="submit">
            Salvar <FaSave />
          </button>
        </div>
      </form>
    </div>
  );
}
