import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Vip from "./pages/vip/Vip";
import Common from "./pages/common/Common";
import Users from "./pages/showInfo/Users";
import 'primereact/resources/themes/luna-amber/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import JustCommons from "./pages/showInfo/JustCommons";
import Add from "./pages/operations/Add";
import Delete from "./pages/operations/Delete";
import Update from "./pages/operations/Update";
import RegisterProd from "./pages/product/RegisterProd";
import ShowProducts from "./pages/product/ShowProducts";
import RegisterFornecedor from "./pages/fornecedor/RegisterFornecedor";
import ShowForns from "./pages/fornecedor/ShowForns";
import DeleteProduct from "./pages/product/DeleteProduct";
import UpdateProduct from "./pages/product/UpdateProduct";
import DeleteFornecedor from "./pages/fornecedor/DeleteFornecedor";
import UpdateForn from "./pages/fornecedor/UpdateForn";

// no /update que vai ficar a alteração de permissões
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/vip" element={<Vip/>}/>
        <Route path="/common" element={<Common/>}/>
        <Route path="/showusers" element={<Users/>}/>
        <Route path="/showcommons" element={<JustCommons/>}/>
        <Route path="/adduser" element={<Add/>}/>
        <Route path="/deleteuser" element={<Delete/>}/>
        <Route path="/updateuser" element={<Update/>}/>
        <Route path="/registerproduct" element={<RegisterProd/>}/>
        <Route path="/showproducts" element={<ShowProducts/>}/>
        <Route path="/registerforn" element={<RegisterFornecedor/>}/>
        <Route path="/showforn" element={<ShowForns/>}/>
        <Route path="/deleteprod" element={<DeleteProduct/>}/>
        <Route path="/updateprod" element={<UpdateProduct/>}/>
        <Route path="/deleteforn" element={<DeleteFornecedor/>}/> 
        <Route path="/updateforn" element={<UpdateForn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
