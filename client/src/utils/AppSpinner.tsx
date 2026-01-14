function AppSpinner() {
    return (
      <div className="w-screen h-screen fixed z-[9999] inset-0 bg-black flex items-center justify-center backdrop-blur-md">
        <div className="spinner-container">
          <img src="favicon.ico" alt="Logo" />
          <div className="spinner-ring"></div>
        </div>
      </div>
    );
  }
  
  export default AppSpinner;