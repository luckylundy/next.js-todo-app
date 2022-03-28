export default function filter(value, label) {
  //ステータス変更用プルダウンの値の定義
  const filterOptions = [
    { value: "incomplete", label: "未完了" },
    { value: "inProgress", label: "途中" },
    { value: "complete", label: "完了" },
  ];

  return (
    <>
      <select>
        {filterOptions.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </>
  );
}
