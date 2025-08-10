import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import { useGetInsights } from "../common/hooks/insights/get-insights.ts";

export const App = () => {
  const { data: insights, isError, isLoading } = useGetInsights();

  const renderInsights = () => {
    if (isError) {
      return <p>Error loading insights</p>;
    }

    if (isLoading) {
      return <p>Loading insights...</p>;
    }

    return <Insights className={styles.insights} insights={insights} />;
  };

  return (
    <main className={styles.main}>
      <Header />
      {renderInsights()}
    </main>
  );
};
