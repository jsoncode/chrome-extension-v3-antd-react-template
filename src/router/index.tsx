import { useRoutes } from "react-router-dom";
import { routeList } from "@/router/routeList";

const Routers = () => {
    return useRoutes(routeList)
}
export default Routers