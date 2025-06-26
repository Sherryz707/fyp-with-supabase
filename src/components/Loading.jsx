const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-base-100/50">
      <div className={`lds-grid text-primary`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
