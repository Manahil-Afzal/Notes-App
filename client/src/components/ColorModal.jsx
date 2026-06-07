const colors = [
  "#F79D45",
  "#F4CB45",
  "#D89AB2",
  "#2196F3",
  "#4FD1A5",
  "#36B6C9",
  "#B9C4D4",
  "#C8924A"
];

function ColorModal({
  setSelectedColor,
  setShowColors
}) {
  return (
    <div className="overlay">

      <div className="color-modal">

        <h2>Select Color</h2>

        <div className="colors-grid">

          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{
                backgroundColor: color
              }}
              onClick={() => {
                setSelectedColor(color);
                setShowColors(false);
              }}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default ColorModal;