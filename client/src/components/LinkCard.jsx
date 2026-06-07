import "./LinkCard.css";


function LinkCard({ show, url, setUrl, onSubmit, onCancel }) {
  if (!show) return null;

  return (
    <div className="link-card-overlay" role="dialog" aria-modal="true">
      <div className="link-card">
        <h3 style={{ marginTop: 0 }}>Insert Link</h3>

        <input
          className="link-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter link URL (e.g. https://example.com)"
        />

        <div className="link-actions">
          <button type="button" className="link-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="link-btn link-btn-primary"
            onClick={onSubmit}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;

