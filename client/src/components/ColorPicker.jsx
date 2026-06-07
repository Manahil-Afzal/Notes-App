const colors = [
  "#F79D45",
  "#F4CB45",
  "#D89AB2",
  "#2196F3",
  "#4FD1A5",
  "#36B6C9",
  "#B9C4D4",
  "#C8924A",
];

function ColorPicker() {
  return (
    <div className="colors">
      {colors.map((color) => (
        <div
          key={color}
          className="color-circle"
          style={{
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

export default ColorPicker;