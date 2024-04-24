import "@/config.server";
import App from "@/app";
import { routes } from "@routes/index";

const app = new App(routes);

app.listen();
