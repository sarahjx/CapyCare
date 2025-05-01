function StatusBar({ label, value }) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <label>{label}: {value}/100</label>
        <div style={{ background: '#ccc', width: '100%', height: '20px', borderRadius: '10px' }}>
          <div
            style={{
              width: `${value}%`,
              height: '100%',
              background: value <= 20 ? 'red' : value <= 50 ? 'orange' : 'green',
              borderRadius: '10px',
              transition: 'width 0.5s ease',
            }}
          ></div>
        </div>
      </div>
    );
  }
  
  export default StatusBar;
  