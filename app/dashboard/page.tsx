import PensionTracker from "@/components/pension-tracker";
import Header from "./components/header";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <PensionTracker />
    </div>
  );
}
