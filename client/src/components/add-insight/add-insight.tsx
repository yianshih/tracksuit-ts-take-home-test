import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { queryClient } from "../../index.tsx";
import { useAddInsight } from "../../common/hooks/insights/add-insight.ts";
import { QUERY_KEY } from "../../common/hooks/insights/get-insights.ts";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const { mutate } = useAddInsight({
    onSuccess: () => {
      // Refetch after addition
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      props.onClose();
    },
    onError: () => {
      // TODO: Handle error case
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const brand = formData.get("brand");
    const text = formData.get("text");

    // TODO: Add validation on formData and display error message
    if (typeof brand === "string" && typeof text === "string") {
      mutate({ brand: Number(brand), text });
    }
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.field}>
          <select name="brand" className={styles["field-input"]}>
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            name="text"
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
          />
        </label>
        <Button
          data-testid="add-insight-submit"
          className={styles.submit}
          type="submit"
          label="Add insight"
        />
      </form>
    </Modal>
  );
};
