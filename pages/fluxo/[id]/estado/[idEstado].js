import EstadoForm from "../../../../components/estado/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../../services/api";

export default () => {
  const router = useRouter();
  const { id, idEstado } = router.query;
  const [fluxo, setFluxo] = useState({});
  const [estado, setEstado] = useState({});
  const Load = () => {
    if (!id) {
      return;
    }
    api
      .get(`fluxo/${id}`)
      .then((res) => {
        setFluxo(res.data);
        if (fluxo.estados && idEstado) {
          setEstado(fluxo.estados.find((e) => e._id == idEstado));
        }
      })
      .catch(e=>console.log(e));
  };
  useEffect(Load, [id]);
  return <EstadoForm Fluxo={fluxo} estado={estado} />;
};
