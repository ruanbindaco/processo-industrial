import { Link, useNavigate, useParams } from "react-router-dom";
import InputBar from "../../components/inputBar";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { FamiliesProps, ProcessProps } from "../../interfaces";
import { useWindowSize } from "../../hooks/useWindowSize";
import { FaSave } from "react-icons/fa";

export default function EditForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProcessProps>({
    id: "",
    company_id: "",
    process_name: "",
    list_emails_responsables: [""],
    family_id: "",
  });
  const [familySelected, setFamilySelected] = useState();
  const [getFamilies, setFamilies] = useState<FamiliesProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const windowType = useWindowSize();

  useEffect(() => {
    async function loadProcess() {
      const response = await api.get(`processes/${id}`);
      const responseFamilies = await api.get(`families`);
      setLoading(false);
      setData(response.data);
      setFamilies(responseFamilies.data);
      setFamilySelected(response.data.family_id);
    }

    loadProcess();
  }, [id]);

  function uploadProcess(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    api.put(`processes/${id}`, data).then(() => setShowModal(true));
  }

  const nameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setData({ ...data, process_name: e.currentTarget.value });
  };

  const emailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setData({ ...data, list_emails_responsables: [e.currentTarget.value] });
  };

  const changeFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, family_id: e.currentTarget.value });
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="items">
              <div className="title">Processo editado com sucesso!</div>
              <div className="buttonBlock">
                <button className="btn" onClick={() => navigate("/")}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <h1 className="loading">Carregando...</h1>
      ) : (
        <div className="container">
          <form className="formBlock">
            <div className="titlePage">Editar Processo</div>
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
                value={data.process_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  nameChange(e)
                }
                className="input"
              />
              <InputBar
                disabled={false}
                size={windowType === "mobile" ? "93%" : "90%"}
                label={"E-mail"}
                type={"email"}
                name={"email"}
                value={data.list_emails_responsables}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  emailChange(e)
                }
                className="input"
              />
            </div>
            <div className="selectBlock">
              <label htmlFor="family">Família</label>
              <select
                name="familyOption"
                className="selectFamily"
                onChange={(e) => changeFamily(e)}
              >
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
            <div className="buttonBlock">
              <Link to="/">
                <div className="btn">Cancelar</div>
              </Link>
              <button
                className="btn btnSave"
                onClick={(e) => uploadProcess(e)}
                type="submit"
              >
                Salvar <FaSave />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
