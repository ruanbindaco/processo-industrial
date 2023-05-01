import "./styles.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchProcessList } from "../../store/process/action";
import api from "../../services/api";

const Home = (props: any) => {
  const [getFamily, setFamily] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [savedId, setId] = useState("");
  useEffect(() => {
    props.fetchProcesses();
    async function loadFamily() {
      const res = await api.get("families");
      setFamily(res.data);
    }
    loadFamily();
  }, []);

  const deleteProcess = (id: string) => {
    setShowModal(true);
    setId(id);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleDeleteItem = () => {
    console.log("ok");
    api.delete(`processes/${savedId}`).then(() => window.location.reload());
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="items">
              <div className="title">Deseja excluir o processo?</div>
              <div className="buttonBlock">
                <button className="btn" onClick={handleDeleteItem}>
                  Excluir
                </button>
                <button className="btn" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {props.processList.loading === false ? (
          <div className="container">
            <div className="initialBlock">
              <div>
                <h1 className="titlePage">Processos</h1>
                <div className="cardBlock">
                  {props.processList.data.map((process: any) => {
                    return (
                      <div key={process.id} className="processCard">
                        <div>
                          <div className="name">
                            Processo: {process.process_name}
                          </div>
                          <div className="family">
                            <p>Familia:</p>
                            <p>
                              {getFamily.map((family: any) => {
                                return (
                                  <div key={process.family_id}>
                                    {family.id === process.family_id
                                      ? family.family_name
                                      : ""}
                                  </div>
                                );
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="optionBlock">
                          <Link to={`process/${process.id}`}>Editar</Link>
                          <FaTrashAlt
                            onClick={() => deleteProcess(process.id)}
                            cursor={"pointer"}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="loading">Carregando...</h1>
        )}
      </div>
    </>
  );
};

const mapStatetoprops = (state: any) => {
  return {
    processList: state.processList,
  };
};

const mapDispatchtoprops = (dispatch: any) => {
  return {
    fetchProcesses: () => dispatch(fetchProcessList()),
  };
};

export default connect(mapStatetoprops, mapDispatchtoprops)(Home);
