import { useEffect, useState } from "react";
import axios from "axios";

const Onboarding: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [tarrifs, setTarrifs] = useState<{ super: []; units: [] }>();
  const [choiceList, setChoiceList] = useState<string[]>([]);

  const handleTypeChange = (e: any) => {
    if (tarrifs) {
      const list: string[] = [];
      if (e.target.value === "super") {
        tarrifs.super.forEach((item: any) =>
          list.push(`${item.mb}MB ${item.level}, ${item.price}EGP`)
        );
      } else if (e.target.value === "units") {
        tarrifs.units.forEach((item: any) =>
          list.push(`${item.unit}, ${item.mins}mins, ${item.price}EGP`)
        );
      }
      setChoiceList(list);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:9000/tarrifs").then((res) => {
      const superList: string[] = [];
      res.data.super.forEach((entry: any) => {
        superList.push(`${entry.mb}MB ${entry.level}, ${entry.price}EGP`);
      });
      setTarrifs(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? null : (
        // <Formik
        //   initialValues={{ type: "super", selection: "ass" }}
        //   onSubmit={() => {}}
        // >
        <form>
          <select name="type" id="type" onChange={handleTypeChange}>
            <option value="super">Super</option>
            <option value="units">Units</option>
          </select>

          <select name="selection" id="selection">
            {choiceList.map((item, idx) => (
              <option key={idx} value={idx}>
                {item}
              </option>
            ))}
          </select>
        </form>
      )}
    </>
  );
};

export default Onboarding;
