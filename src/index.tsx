import { createRoot } from "react-dom/client"
import { App } from "./components/app"
import "../public/static/css/reset.css"

const root = createRoot(document.getElementById("root")!)
root.render(<App />)
