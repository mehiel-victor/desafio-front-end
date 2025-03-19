import Header from "./components/Header";
import EmployeeTable from "./components/common/EmployeeTable";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-neutral-5 flex-1">
        <div className="flex items-center justify-between p-8">
          <h1 className="text-h1 font-heading font-medium text-neutral-1">
            Funcionários
          </h1>
        </div>
        <EmployeeTable />
      </main>
    </div>
  );
};

export default App;
