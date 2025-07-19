import Chat from "../components/Chat/Chat";
import ActivePanels from "../components/Panels/ActivePanels";
import GlobalSearch from "../components/Search/GlobalSearch";
import APISidebar from "../components/Sidebar/APISidebar";

const Layout = () => {
  return (
    <div className="relative z-10 flex flex-col h-full p-4 md:p-6 space-y-4">
      {/* Header */}
      <header className="hidden md:flex items-center justify-between text-white px-4 py-2 rounded-xl bg-primary shadow-lg">
        <div className="text-xl font-bold">Available APIs</div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar  */}
        <APISidebar />
        <main className="flex-1 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 overflow-hidden ">
          {/* Panels */}
          <div className="bg-primary rounded-2xl shadow-xl md:p-5 p-10 overflow-y-auto flex flex-col">
            <GlobalSearch />
            <ActivePanels />
          </div>
          {/* Chat */}
          <div className="bg-primary rounded-2xl shadow-xl  flex flex-col overflow-y-auto">
            <Chat />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
