import EstadoForm from "../../../../components/estado/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../../services/api";

export default () => {
  const router = useRouter();
  const { id, idEstado } = router.query;
  const [fluxo, setFluxo] = useState(null);
  const [estado, setEstado] = useState(null);
  const Load = () => {
    if (!id) {
      return;
    }
    api
      .get(`fluxo/${id}`)
      .then((res) => {
        setFluxo(res.data);
        if (res.data && idEstado) {
          setEstado(res.data.estados.find((e) => e._id == idEstado));
        }
      })
      .catch(e=>console.log(e));
  };
  useEffect(Load, [ id, idEstado ]);

  return (<div>
    {fluxo && estado?<EstadoForm estado={estado} Fluxo={fluxo}/>:<p/>}
  </div>)
};
