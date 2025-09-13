function Header() {
  return (
    <header
      style={{
        backgroundColor: 'var(--bg-darker)',
        padding: '15px 20px',
        color: 'var(--text-light)',
        textAlign: 'center',
        borderBottom: '2px solid var(--border-gray)',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-dim)',
          marginBottom: '5px',
          letterSpacing: '1px',
        }}
      >
        UNDERGROUND KAKIGORI SYSTEM
      </div>
      <h1
        style={{
          margin: '0',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
        }}
      >
        🍧 ORDER-8 SYSTEM
      </h1>
    </header>
  );
}

export default Header;
